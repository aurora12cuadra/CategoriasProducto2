import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Product } from '../Model/product.model';
import { Category } from '../Model/category.model';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {

  categories: Category[] = [];
  products: Product[] = [];
  selectedCategory: any = { id: null, nombre: '', descripcion: '', fechaCreacion: '' };
  selectedProduct: any = { id: null, nombreProducto: '', descripcionProducto: '', precioProducto: 0, existenciaProducto: 0, category: { id: null } };

  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.GetAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.GetProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  CreateCategory(): void {
    Swal.fire({
      title: 'Crear Nueva Categoría',
      html: `
        <form>
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input id="nombre" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" class="form-control"></textarea>
          </div>
        </form>`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#dc3545', // Color rojo
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#28a745', // Color verde
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;
        return { nombre, descripcion };
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        const category: Category = { 
          nombre: result.value.nombre,
          descripcion: result.value.descripcion,
          fechaCreacion: new Date()
        };
  
        this.categoryService.CreateNewCategory(category).subscribe(data => {
          console.log('Category created:', data);
          this.loadCategories();
        }, error => {
          console.error('Error creating category:', error);
        });
      }
    });
  }
  EditCategory(category: any): void {
    this.selectedCategory = { ...category };

    Swal.fire({
      title: 'Editar Categoría',
      html: `
        <label for="nombre">Nombre:</label>
        <input id="nombre" class="swal2-input" value="${this.selectedCategory.nombre}" required>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" class="swal2-textarea">${this.selectedCategory.descripcion}</textarea>`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.selectedCategory.nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        this.selectedCategory.descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.UpdateCategory();
      }
    });
  }

  UpdateCategory(): void {
    this.categoryService.UpdateCategory(this.selectedCategory.id, this.selectedCategory).subscribe(data => {
      console.log('Category updated:', data);
      this.loadCategories();
      this.selectedCategory = { id: null, nombre: '', descripcion: '' };
    }, error => {
      console.error('Error updating category:', error);
    });
  }

  DeleteCategory(categoryId: number | undefined): void {
    if (!categoryId) {
      console.error('Category ID is undefined. Unable to delete category.');
      return;
    }

    Swal.fire({
      title: '¿Seguro que quieres eliminar la categoría?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.DeleteCategoryById(categoryId).subscribe(
          response => {
            this.loadCategories();
            Swal.fire(
              '¡Eliminado!',
              'La categoría ha sido eliminada.',
              'success'
            );
          },
          error => {
            console.error('Error deleting category:', error);
            Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
          }
        );
      }
    });
  }
}
