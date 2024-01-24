export interface ImagenModel {
    id?:number;
    filename:string;
    file_path?:string;
    publicUrl?:string;
 
 }
 export interface UpdateImagenDTO extends Partial<ImagenModel> {

 }