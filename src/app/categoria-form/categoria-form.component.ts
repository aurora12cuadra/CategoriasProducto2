import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Product } from '../Model/product.model';
import { Category } from '../Model/category.model';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnInit{

  categories: Category[] = [];
  products: Product[] = [];
  selectedCategory: any = { id: null, nombre: '', descripcion: '', fechaCreacion: '' };
  selectedProduct: any = { id: null, nombreProducto: '', descripcionProducto: '', precioProducto: 0, existenciaProducto: 0, category: { id: null } };

  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {

    this.loadProducts();
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
  CreateProduct(): void {
    Swal.fire({
      title: 'Crear Nuevo Producto',
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
          <div class="form-group">
            <label for="precio">Precio:</label>
            <input id="precio" type="number" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="existencia">Existencia:</label>
            <input id="existencia" type="number" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="idCategoria">ID de Categoría:</label>
            <input id="idCategoria" type="number" class="form-control" required>
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
        const precio = parseFloat((document.getElementById('precio') as HTMLInputElement).value);
        const existencia = parseInt((document.getElementById('existencia') as HTMLInputElement).value);
        const idCategoria = parseInt((document.getElementById('idCategoria') as HTMLInputElement).value);
        return { nombre, descripcion, precio, existencia, idCategoria };
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        const product: Product = { 
          nombreProducto: result.value.nombre,
          descripcionProducto: result.value.descripcion,
          precioProducto: result.value.precio,
          existenciaProducto: result.value.existencia,
          category: {
            id: result.value.idCategoria,
            nombre: '',  // Aunque estos campos no sean necesarios en el front end
            descripcion: '',
            fechaCreacion: new Date()
          }
        };
  
        this.productService.CreateProduct(product).subscribe(data => {
          console.log('Product created:', data);
          this.loadProducts();
        }, error => {
          console.error('Error creating product:', error);
        });
      }
    });
  }

  editProduct(product: any): void {
    this.selectedProduct = { ...product };

    Swal.fire({
      title: 'Editar Producto',
      html: `
        <label for="nombre">Nombre:</label>
        <input id="nombre" class="swal2-input" value="${this.selectedProduct.nombreProducto}" required>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" class="swal2-textarea">${this.selectedProduct.descripcionProducto}</textarea>
        <label for="precio">Precio:</label>
        <input id="precio" type="number" class="swal2-input" value="${this.selectedProduct.precioProducto}" required>
        <label for="existencia">Existencia:</label>
        <input id="existencia" type="number" class="swal2-input" value="${this.selectedProduct.existenciaProducto}" required>`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.selectedProduct.nombreProducto = (document.getElementById('nombre') as HTMLInputElement).value;
        this.selectedProduct.descripcionProducto = (document.getElementById('descripcion') as HTMLTextAreaElement).value;
        this.selectedProduct.precioProducto = parseFloat((document.getElementById('precio') as HTMLInputElement).value);
        this.selectedProduct.existenciaProducto = parseInt((document.getElementById('existencia') as HTMLInputElement).value);
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.updateProduct();
      }
    });
  }

  updateProduct(): void {
    this.productService.UpdateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(data => {
      console.log('Product updated:', data);
      this.loadProducts();
      this.selectedProduct = { id: null, nombreProducto: '', descripcionProducto: '', precioProducto: 0, existenciaProducto: 0 };
    });
  }

  deleteProduct(productId: number | undefined): void {
    if (!productId) {
      console.error('Product ID is undefined. Unable to delete product.');
      return;
    }
  
    Swal.fire({
      title: '¿Seguro que quieres eliminarlo?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.DeleteProduct(productId).subscribe(
          response => {
            this.loadProducts();
            Swal.fire(
              '¡Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            );
          },
          error => {
            console.error('Error deleting product:', error);
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
          }
        );
      }
    });
  }

}
