import { RolesDTO } from "../Dto/Roles.dto";
import { RolesModel } from "./Roles";

export interface UsuarioModel {
    id:number;
    nombre: string;
    apellido: string;
    telefono: string;
    direccion: string;
    email: string;
    username: string;
    password: string;
    role:RolesModel;
}


export interface UpdateUsuarioDTO extends Partial<UsuarioModel> {

}
