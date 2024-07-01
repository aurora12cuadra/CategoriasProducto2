/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CategoriaProductos2.RestController;

import com.CategoriaProductos2.Entidades.Categoria;
import com.CategoriaProductos2.Service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/categories")

public class CategoriaController {

    @Autowired
    private CategoriaService CategoriaService;

    @PostMapping("/")
    public ResponseEntity<Categoria> createCategoria(@RequestBody Categoria Categoria) {
        Categoria createdCategoria = CategoriaService.createCategoria(Categoria);
        return new ResponseEntity<>(createdCategoria, HttpStatus.CREATED);
    }

    @GetMapping("/allCategories")
    public ResponseEntity<List<Categoria>> getAllCategories() {
        List<Categoria> categories = CategoriaService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable Long id) {
        Optional<Categoria> optionalCategoria = CategoriaService.getCategoriaById(id);
        return optionalCategoria.map(Categoria -> new ResponseEntity<>(Categoria, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> updateCategoria(@PathVariable Long id, @RequestBody Categoria Categoria) {
        if (!CategoriaService.getCategoriaById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Categoria.setId(id);
        Categoria updatedCategoria = CategoriaService.updateCategoria(Categoria);
        return new ResponseEntity<>(updatedCategoria, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        if (!CategoriaService.getCategoriaById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        CategoriaService.deleteCategoria(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("/randomCategoria")
    public ResponseEntity<Categoria> getRandomCategoria() {
        Categoria randomCategoria = CategoriaService.findRandomCategoria();
        if (randomCategoria != null) {
            return ResponseEntity.ok(randomCategoria);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
