/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.CategoriaProductos2.Repository;

import com.CategoriaProductos2.Entidades.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author auror
 */
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
}
