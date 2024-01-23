import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUsuarioDTO, UsuarioModel } from '../entities/Usuario';
import { RolesModel } from '../entities/Roles';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {




  private readonly API_URL = `${environment.HOST}/`;
  private readonly endpointuser: string = 'usuario';
  private readonly endpointuserall: string = 'usuario/all';
  private readonly endpointrol: string = 'role/all';


  constructor(private http:HttpClient) { }

  crearUsuario(usuario: UsuarioModel): Observable<any>{
    const url = `${this.API_URL}${this.endpointuser}/create`;
    return this.http.post(url, usuario);
  
  }
  
  getUsuario(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(this.API_URL + this.endpointuserall);
  }

  getRoles(): Observable<RolesModel[]> {
    return this.http.get<RolesModel[]>(this.API_URL + this.endpointrol);
  }


  eliminarUsuario(id: number): Observable<any>{
    return this.http.delete(`${this.API_URL + this.endpointuser}/delete/${id}`);
  }

  updateUsuario(id: number, report: UpdateUsuarioDTO): Observable<UpdateUsuarioDTO>{
    return this.http.put<UpdateUsuarioDTO>(`${this.API_URL + this.endpointuser}/edit/${id}`, report )
  }
  
  
}
