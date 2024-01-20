import { ESTADO } from "../enums/Estado";
import { CategoriaModel } from "./Categoria";
import { ImagenModel } from "./Imagen";
export interface ProductoModel {
   id?: number;
   nombre: string;
   descripcion: string;
   marca: string;
   precio: number;
   stock: number;
   estado: string;
   modelo: string;
   codigo: string;
   categoria: CategoriaModel;
   imagenes?: ImagenModel[];
   filename?: string;
   filePath?: string;
   publicUrl?: string;
   


   
 }
 export interface UpdateProductoDTO extends Partial<ProductoModel> {

 }