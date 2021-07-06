import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-root',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public clientes: Cliente[];
  public editCliente!: Cliente;
  public deleteCliente!: Cliente;

  constructor(private clienteService: ClienteService) {
    this.clientes = [];
   }

  ngOnInit() {
    this.getClientes();
  }
  public getClientes(): void{
    this.clienteService.getClientes().subscribe(
      (response: Cliente[]) => {
        this.clientes = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
     
      );   
  }
  public onAddCliente(addForm: NgForm): void{
    document.getElementById('add-cliente-form')?.click();
    this.clienteService.addClientes(addForm.value).subscribe(
      (response: Cliente) => {
        console.log(response);
        this.getClientes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onUpdateCliente(cliente: Cliente): void{
    document.getElementById('update-cliente-form')?.click();
    this.clienteService.updateClientes(cliente).subscribe(
      (response: Cliente) => {
        console.log(response);
        this.getClientes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onDeleteCliente(clienteId:number): void{
     this.clienteService.deleteClientes(clienteId).subscribe(
      (response: void) => {
        console.log(response);
        this.getClientes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCliente(key: string): void{
    const results: Cliente[] = [];
    for (const cliente of this.clientes){
      if(cliente.nome.toLowerCase().indexOf(key.toLowerCase())!== -1
      || cliente.telefone.toLowerCase().indexOf(key.toLowerCase())!== -1
      || cliente.sobrenome.toLowerCase().indexOf(key.toLowerCase())!== -1){
        results.push(cliente);
      }
    }
    this.clientes = results;
    if(results.length === 0 || !key){
      this.getClientes();
    }
  }
 
 // form sem form

   public addCliente(): void{
  document.getElementById('add-cliente-form')?.click();

    let nome : string =((<HTMLInputElement>document.getElementById("nome")).value);
    let email : string = (<HTMLInputElement>document.getElementById("email")).value;      
    let sobrenome : string = (<HTMLInputElement>document.getElementById("sobrenome")).value;
    let telefone : string = (<HTMLInputElement>document.getElementById("telefone")).value;
    
    const cliente: Cliente = {
      id: 100,
      nome: nome,
      email: email,
      sobrenome: sobrenome,
      telefone: telefone     

    }

    this.clienteService.addClientes(cliente).subscribe(
      (response: Cliente) => {
        console.log(response);
        this.getClientes();          
      },
      (error: HttpErrorResponse) => {
        alert(error.message);         
      }
    );
}


  public onOpenModal(cliente: Cliente, mode: String): void{
    const container = document.getElementById('main-container');
    const button= document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode == 'edit'){
      this.editCliente = cliente;
      button.setAttribute('data-bs-target', '#editClienteModal');
    }
    if(mode == 'delete'){
      this.deleteCliente = cliente;
      button.setAttribute('data-bs-target', '#deleteClienteModal');
    }
    container?.appendChild(button);

    button.click();
  }

}
