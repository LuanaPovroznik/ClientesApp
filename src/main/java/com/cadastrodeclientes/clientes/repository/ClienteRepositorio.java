package com.cadastrodeclientes.clientes.repository;

import com.cadastrodeclientes.clientes.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepositorio extends JpaRepository <Cliente, Long> {

    void deleteClienteById(Long id);
    Optional<Cliente> findClienteById(Long id);
}
