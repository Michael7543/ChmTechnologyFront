import { ProductoModel } from "./Producto";
import { ServiciosChmModel } from "./ServiciosChm";
import { UsuarioModel } from "./Usuario";

export interface CarritoModel {
id?: number ; 
cantidad: number;
producto?: ProductoModel;
servicio?: ServiciosChmModel;
usuario?: UsuarioModel
}

export interface UpdateCarritoDTO extends Partial<CarritoModel> {

}
