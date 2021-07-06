import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteModule } from './cliente/cliente.module';
import { ClienteService } from './cliente/cliente.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ClienteModule,
    HttpClientModule, FormsModule
  ],
  providers: [ClienteService],
  bootstrap: [ClienteComponent]
})
export class AppModule { }
