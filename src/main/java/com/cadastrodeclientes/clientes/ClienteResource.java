package com.cadastrodeclientes.clientes;

import com.cadastrodeclientes.clientes.model.Cliente;
import com.cadastrodeclientes.clientes.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "http://localhost:4200")
class ClienteResource {

    @Autowired
    private final  ClienteService clienteService;

    public ClienteResource(ClienteService clienteService) {
        this.clienteService = clienteService;
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Cliente>> getAllCliente(){
        List<Cliente> clientes = clienteService.findAllClientes();
        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable("id") Long id){
        Cliente cliente = clienteService.findClienteById(id);
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Cliente> addCliente(@RequestBody Cliente cliente){
        Cliente newcliente = clienteService.addCliente(cliente);
        return  new ResponseEntity<>(newcliente, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Cliente> updateCliente(@RequestBody Cliente cliente){
        Cliente updateCliente = clienteService.updateCliente(cliente);
        return  new ResponseEntity<>(updateCliente, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCliente(@PathVariable("id") Long id){
        clienteService.deleteCliente(id);
        return  new ResponseEntity<>(HttpStatus.OK);
    }


}
