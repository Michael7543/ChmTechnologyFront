import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImagenModel, UpdateImagenDTO } from '../entities/Imagen';


@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
    
    private readonly API_URL = `${environment.HOST}/`;
  
    private readonly endpointimagenes: string = 'imagenes';
    private readonly endpointimagenesall: string = 'imagenes/all';

    
  
    constructor(private http:HttpClient) { }
  
    getImagenes(): Observable<ImagenModel[]> {
        return this.http.get<ImagenModel[]>(this.API_URL + this.endpointimagenesall);
      }

    crearImagenes(producto: ImagenModel): Observable<any>{
        const url = `${this.API_URL}${this.endpointimagenes}/upload`;
        return this.http.post(url, producto);
      
      }
    eliminarImagenes(id: number): Observable<any>{
        return this.http.delete(`${this.API_URL + this.endpointimagenes}/delete/${id}`);
      }
    
      updateImagenes(filename: string, data: FormData): Observable<UpdateImagenDTO> {
        const headers = new HttpHeaders();
        // Ajusta el límite de carga útil según tus necesidades
        headers.append('Content-Length', data.toString().length.toString());
        headers.append('Content-Type', 'multipart/form-data');
        
        return this.http.put(`${this.API_URL + this.endpointimagenes}/update/${filename}`, data, { headers });
      }
      
    
    
  }