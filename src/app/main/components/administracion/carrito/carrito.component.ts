import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { CarritoModel } from '../../../entities/Carrito';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  @Input() carritoItem: any; 
  listadocarrito: CarritoModel[] = [];
  loading: boolean = true;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.getCarrito();
  }

  async getCarrito() {
    try {
      const data = await firstValueFrom(this.carritoService.getCarrito());
      this.listadocarrito = data;
      this.loading = false;
    } catch (error) {
      console.error('Error al obtener carrito:', error);
    }
  }

  
  
  getEventValue(event: any): string {
    return event.target.value;
  }

  eliminarCarrito(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrá revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.eliminarCarrito(id).subscribe(
          () => {
            Swal.fire('Eliminado', ' sido eliminado', 'success');
            this.getCarrito(); // Vuelve a cargar la lista después de la eliminación
          },
          (error) => {
            console.error('Error al eliminar producto:', error);
            // Maneja el error según tus necesidades
          }
        );
      }
    });
  }

}
