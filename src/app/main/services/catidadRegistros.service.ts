import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatidadRegistrosService {
  constructor() {}

  private cantidadRegistrosSource = new BehaviorSubject<number>(0);
  cantidadRegistros$ = this.cantidadRegistrosSource.asObservable();

  actualizarCantidadRegistros(cantidad: number) {
    this.cantidadRegistrosSource.next(cantidad);
  }
}
