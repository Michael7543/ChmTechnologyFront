// carrito.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarritoModel } from '../entities/Carrito';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  private carrito: any[] = [];
    private readonly API_URL = `${environment.HOST}/`;

    private readonly endpointcarrito: string = 'carrito';
    private readonly endpointcarritoall: string = 'carrito/all';
  
    constructor(private http: HttpClient) {}
  
    getCarrito(): Observable<CarritoModel[]> {
      return this.http.get<CarritoModel[]>(`${this.API_URL}${this.endpointcarritoall}`);
    }
  
    agregarCarrito(carrito: CarritoModel): Observable<any> {
        const URL = `${this.API_URL}${this.endpointcarrito}/create`;
      
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(URL, carrito, { headers });
      }

      eliminarCarrito(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL + this.endpointcarrito}/delete/${id}`);
      }
      vaciarCarrito() {
        this.carrito = [];
      }
      
      
}
