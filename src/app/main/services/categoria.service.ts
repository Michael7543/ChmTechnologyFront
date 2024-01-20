import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaModel, UpdateCategoriaDTO } from '../entities/Categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly API_URL = `${environment.HOST}/`;

  private readonly endpointcategorias: string = 'categorias';
  private readonly endpointcategoriaall: string = 'categorias/all';

  constructor(private http: HttpClient) {}

  getCategoria(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(
      this.API_URL + this.endpointcategoriaall
    );
  }

  crearCategoria(producto: CategoriaModel): Observable<any> {
    const url = `${this.API_URL}${this.endpointcategorias}/create`;
    return this.http.post(url, producto);
  }
  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(
      `${this.API_URL + this.endpointcategorias}/delete/${id}`
    );
  }
  updateCategoria(id: number, report: UpdateCategoriaDTO): Observable<any> {
    return this.http.put(
      `${this.API_URL + this.endpointcategorias}/update/${id}`,
      report
    );
  }
}
