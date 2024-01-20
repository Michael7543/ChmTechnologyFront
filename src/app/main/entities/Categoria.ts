export interface CategoriaModel {
   id:number;
   nombre:string;
   descripcion:string;
   estado:string;
 
 }
 export interface UpdateCategoriaDTO extends Partial<CategoriaModel> {

 }