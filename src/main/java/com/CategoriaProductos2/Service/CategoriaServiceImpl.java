/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CategoriaProductos2.Service;

import com.CategoriaProductos2.Entidades.Categoria;
import com.CategoriaProductos2.Repository.CategoriaRepository;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    private CategoriaRepository CategoriaRepository;

    @Override
    public Categoria createCategoria(Categoria Categoria) {
        return CategoriaRepository.save(Categoria);
    }

    @Override
    public List<Categoria> getAllCategories() {
        return CategoriaRepository.findAll();
    }

    @Override
    public Optional<Categoria> getCategoriaById(Long id) {
        return CategoriaRepository.findById(id);
    }

    @Override
    public Categoria updateCategoria(Categoria Categoria) {
        return CategoriaRepository.save(Categoria);
    }

    @Override
    public void deleteCategoria(Long id) {
        CategoriaRepository.deleteById(id);
    }

    @Override
    public Categoria findRandomCategoria() {
        // Obtener el número total de categorías
        long CategoriaCount = CategoriaRepository.count();

        if (CategoriaCount > 0) {
            // Generar un número aleatorio entre 0 y CategoriaCount - 1
            Random random = new Random();
            long randomIndex = random.nextInt((int) CategoriaCount);

            // Obtener la categoría en la posición aleatoria
            List<Categoria> allCategories = CategoriaRepository.findAll();
            return allCategories.get((int) randomIndex);
        } else {
            
            return null;
        }
    }

}
