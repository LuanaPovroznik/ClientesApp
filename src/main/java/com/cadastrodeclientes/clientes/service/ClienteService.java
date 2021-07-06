package com.cadastrodeclientes.clientes.service;

import com.cadastrodeclientes.clientes.exception.UserNotFoundException;
import com.cadastrodeclientes.clientes.model.Cliente;
import com.cadastrodeclientes.clientes.repository.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ClienteService {

    private final ClienteRepositorio repositorio;

    @Autowired
    public ClienteService(ClienteRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    public Cliente addCliente(Cliente cliente){
        return repositorio.save(cliente);
    }

    public List<Cliente> findAllClientes (){
        return repositorio.findAll();
    }

    public Cliente updateCliente(Cliente cliente){
        return repositorio.save(cliente);
    }
    public  Cliente findClienteById(Long id){
        return repositorio.findClienteById(id).orElseThrow(() -> new UserNotFoundException("Usuario pela id"+ id +" não foi encontrado"));
    }

    public void deleteCliente(Long id){
        repositorio.deleteClienteById(id);
    }
}
