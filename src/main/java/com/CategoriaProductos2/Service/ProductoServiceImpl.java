/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CategoriaProductos2.Service;

import com.CategoriaProductos2.Entidades.Producto;
import com.CategoriaProductos2.Repository.ProductoRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository ProductoRepository;

    @Autowired
    public ProductoServiceImpl(ProductoRepository ProductoRepository) {
        this.ProductoRepository = ProductoRepository;
    }

    @Override
    public Producto createProducto(Producto Producto) {
        return ProductoRepository.save(Producto);
    }

    @Override
    public List<Producto> getAllProductos() {
        return ProductoRepository.findAll();
    }

    @Override
    public Optional<Producto> getProductoById(Long ProductoId) {
        return ProductoRepository.findById(ProductoId);
    }

    @Override
    @Transactional
    public Producto updateProducto(Long ProductoId, Producto updatedProducto) {
        // Buscar el Productoo existente por su ID
        Producto existingProducto = ProductoRepository.findById(ProductoId)
                .orElseThrow(() -> new RuntimeException("Producto not found with id: " + ProductoId));

        // Actualizar los campos del Productoo existente con los datos del Productoo actualizado
        existingProducto.setNombreProducto(updatedProducto.getNombreProducto());
        existingProducto.setDescripcionProducto(updatedProducto.getDescripcionProducto());
        existingProducto.setPrecioProducto(updatedProducto.getPrecioProducto());
        existingProducto.setExistenciaProducto(updatedProducto.getExistenciaProducto());
        existingProducto.setCategoria(updatedProducto.getCategoria());

        // Guardar el Productoo actualizado en la base de datos
        return ProductoRepository.save(existingProducto);
    }
    
    @Override
    public void deleteProducto(Long ProductoId) {
        ProductoRepository.deleteById(ProductoId);
    }

}