import { ImagenModel } from "./Imagen";
import { CategoriaModel } from "./Categoria";

export interface  ServiciosChmModel{
id: number;
nombre:string;
descripcion: string;
categoria:CategoriaModel;
estado: string;
imagenes?: ImagenModel[];
filename?: string;
filePath?: string;
publicUrl?: string;

}
export interface UpdateServicioDTO extends Partial<ServiciosChmModel> {

}