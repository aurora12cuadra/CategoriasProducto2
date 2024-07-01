import { Category } from '../Model/category.model';

export interface Product {
    id?: number;
    nombreProducto: string;
    descripcionProducto?: string;
    precioProducto: number;
    existenciaProducto: number;
    category: Category;
  }