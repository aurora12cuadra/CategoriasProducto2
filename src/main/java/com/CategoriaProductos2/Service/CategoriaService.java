    /*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.CategoriaProductos2.Service;

import com.CategoriaProductos2.Entidades.Categoria;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author auror
 */
public interface CategoriaService {
    Categoria createCategoria(Categoria Categoria);
        List<Categoria> getAllCategories();
        Optional<Categoria> getCategoriaById(Long id);
        Categoria updateCategoria(Categoria Categoria);
        void deleteCategoria(Long id);
        Categoria findRandomCategoria();
    
}
