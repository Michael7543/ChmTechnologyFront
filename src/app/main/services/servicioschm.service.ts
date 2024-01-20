import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ServiciosChmModel } from '../entities/ServiciosChm';


@Injectable({
  providedIn: 'root'
})
export class ServicioChmService {
    
    private readonly API_URL = `${environment.HOST}/`;
  
    private readonly endpointservicioschm: string = 'servicios';
    private readonly endpointservicioschmall: string = 'servicios/all';

    
  
    constructor(private http:HttpClient) { }
  
    getServicio(): Observable<ServiciosChmModel[]> {
        return this.http.get<ServiciosChmModel[]>(this.API_URL + this.endpointservicioschmall);
      }

      crearServicio(servicio:FormData): Observable<any>{
        const URL = `${this.API_URL}${this.endpointservicioschm}/create`;
    
        const headers = new HttpHeaders();
        // Ajusta el límite de carga útil según tus necesidades
        headers.append('Content-Length', servicio.toString().length.toString());
        headers.append('Content-Type', 'multipart/form-data');
        return this.http.post(URL, servicio, { headers });
      }

      updateServicio(id: number, report: FormData): Observable<any> {
        const headers = new HttpHeaders();
        // Ajusta el límite de carga útil según tus necesidades
        headers.append('Content-Length', report.toString().length.toString());
        headers.append('Content-Type', 'multipart/form-data');
      
        return this.http.put(`${this.API_URL + this.endpointservicioschm}/update/${id}`, report, { headers });
      }

     

    eliminarServicio(id: number): Observable<any>{
        return this.http.delete(`${this.API_URL + this.endpointservicioschm}/delete/${id}`);
      }
    
    
    
  }