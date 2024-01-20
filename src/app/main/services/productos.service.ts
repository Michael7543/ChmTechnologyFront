import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel, UpdateProductoDTO } from '../entities/Producto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
    
    private readonly API_URL = `${environment.HOST}/`;
  
    private readonly endpointproductos: string = 'productos';
    private readonly endpointproductosall: string = 'productos/all';

    
  
    constructor(private http:HttpClient) { }
  
    getProductos(): Observable<ProductoModel[]> {
        return this.http.get<ProductoModel[]>(this.API_URL + this.endpointproductosall);
      }

      crearProductos(producto:FormData): Observable<any>{
        const URL = `${this.API_URL}${this.endpointproductos}/create`;
    
        const headers = new HttpHeaders();
        // Ajusta el límite de carga útil según tus necesidades
        headers.append('Content-Length', producto.toString().length.toString());
        headers.append('Content-Type', 'multipart/form-data');
        return this.http.post(URL, producto, { headers });
      }

      eliminarProductos(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL + this.endpointproductos}/delete/${id}`);
      }

      updateProducto(id: number, report: FormData): Observable<any> {
        const headers = new HttpHeaders();
        // Ajusta el límite de carga útil según tus necesidades
        headers.append('Content-Length', report.toString().length.toString());
        headers.append('Content-Type', 'multipart/form-data');
      
        return this.http.put(`${this.API_URL + this.endpointproductos}/update/${id}`, report, { headers });
      }
    
  }