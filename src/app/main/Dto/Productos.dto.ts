import { CategoriaModel } from "../entities/Categoria";
import { ImagenModel } from "../entities/Imagen";
import { ESTADO } from "../enums/Estado";

export class ProductoDto {
    id?: number;
    nombre: string;
    descripcion: string;
    marca: string;
    precio: number;
    stock: number;
    categoria: CategoriaModel;
    filename?: string;
    filePath?: string;
    publicUrl?: string;
    estado: string;
    file: File;
    constructor(data: ProductoDto) {
      this.id = data.id;
      this.nombre = data.nombre;
      this.descripcion = data.descripcion;
      this.marca = data.marca;
      this.precio = data.precio;
      this.stock = data.stock;
      this.categoria = data.categoria;
      this.estado = data.estado;
      this.filename = data.filename;
      this.filePath = data.filePath;
      this.publicUrl = data.publicUrl;
      this.file = data.file;
    }
  }