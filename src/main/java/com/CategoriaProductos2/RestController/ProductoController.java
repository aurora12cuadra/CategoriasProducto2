/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CategoriaProductos2.RestController;
import com.CategoriaProductos2.Entidades.Producto;
import com.CategoriaProductos2.Service.ProductoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/Productos")
public class ProductoController {

    @Autowired
    private ProductoService ProductoService;

    @PostMapping("/")
    public ResponseEntity<Producto> createProducto(@RequestBody Producto Producto) {
        Producto createdProducto = ProductoService.createProducto(Producto);
        return new ResponseEntity<>(createdProducto, HttpStatus.CREATED);
    }

    @GetMapping("/allProductos")
    public ResponseEntity<List<Producto>> getAllProductos() {
        List<Producto> ProductoList = ProductoService.getAllProductos();
        return new ResponseEntity<>(ProductoList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        Optional<Producto> ProductoOptional = ProductoService.getProductoById(id);
        if (ProductoOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ProductoOptional.get(), HttpStatus.OK);
    }

    @PutMapping("/{ProductoId}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long ProductoId, @RequestBody Producto updatedProducto) {
        try {
            Producto Producto = ProductoService.updateProducto(ProductoId, updatedProducto);
            return ResponseEntity.ok(Producto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable("id") Long ProductoId) {
        ProductoService.deleteProducto(ProductoId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}