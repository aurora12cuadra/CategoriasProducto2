/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.CategoriaProductos2.Service;

import com.CategoriaProductos2.Entidades.Producto;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author auror
 */
public interface ProductoService {
    Producto createProducto(Producto Producto);
    List<Producto> getAllProductos();
    Optional<Producto> getProductoById(Long ProductoId);
    Producto updateProducto(Long ProductoId, Producto updatedProducto);
    void deleteProducto(Long ProductoId);

    
}
