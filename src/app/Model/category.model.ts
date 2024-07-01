import { Product } from '../Model/product.model';

export interface Category {
    id?: number;
    nombre: string;
    descripcion: string;
    fechaCreacion: Date;
    products?: Product[]; // Opcional si también quieres manejar productos asociados
  }
  
  