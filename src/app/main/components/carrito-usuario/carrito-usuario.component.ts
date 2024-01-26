import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { CarritoModel } from '../../entities/Carrito';
import { ImagenModel } from '../../entities/Imagen';
import { CarritoService } from '../../services/carrito.service';
import { CatidadRegistrosService } from '../../services/catidadRegistros.service';
import { ImagenesService } from '../../services/imagenes.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-carrito-usuario',
  templateUrl: './carrito-usuario.component.html',
  styleUrls: ['./carrito-usuario.component.css'],
})
export class CarritoUsuarioComponent implements OnInit {
  @Input() carritoItem: any;
  listadocarrito: CarritoModel[] = [];
  loading: boolean = true;
  listadoimagenes: ImagenModel[] = [];
  cantidadRegistros: number = 0;

  constructor(
    private carritoService: CarritoService,
    private authservice: LoginService,
    private imagenService: ImagenesService,
    private catidadRegistrosService: CatidadRegistrosService
  ) {}

  ngOnInit() {
    this.getCarrito();
  }

  modificarCantidad(carritoItem: any, cantidad: number) {
    carritoItem.cantidad = cantidad;
  }

  hayProductosServiciosEnCarrito(carrito: CarritoModel[]): boolean {
    return carrito.some((item) => item && (item.producto || item.servicio));
  }

  realizarPago() {
    // Obtener el monto a cotizar
    const montoCotizar = this.calcularMontoCotizar();

    // Obtener la lista de productos o servicios en el carrito
    const productosServicios = this.listadocarrito
      .filter((item) => item && (item.producto || item.servicio))
      .map((item) => ({
        nombre:
          item.producto?.nombre ||
          item.servicio?.nombre ||
          'Producto/Servicio sin nombre',
        cantidad: item.cantidad || 1, // Considera un valor predeterminado si la cantidad no está definida
      }));

    // Preparar el mensaje para WhatsApp, incluyendo el monto a cotizar
    const mensajeWhatsApp =
      `Hola, estoy listo para adquirir mis productos. Aquí está mi pedido:\n\n` +
      productosServicios
        .map((item) => `${item.nombre} - Cantidad: ${item.cantidad}`)
        .join('\n') +
      `\n\nMonto a cotizar: $${montoCotizar}`;

    // Enviar el mensaje a WhatsApp (aquí puedes implementar la lógica para enviar a WhatsApp)
    this.enviarMensajeWhatsApp(mensajeWhatsApp);
  }

  enviarMensajeWhatsApp(mensaje: string) {
    const numeroTelefono = '+593998684386';

    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      numeroTelefono
    )}&text=${encodeURIComponent(mensaje)}`;

    // Abre la URL de WhatsApp en una nueva ventana/página
    window.open(urlWhatsApp, '_blank');
  }

  async getCarrito() {
    try {
      const data = await this.fetchCarritoData();
      this.processCarritoData(data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchCarritoData() {
    return await firstValueFrom(this.carritoService.getCarrito());
  }

  processCarritoData(data: any) {
    this.listadocarrito = data;
    this.loading = false;
    //console.log('Carrito antes del filtrado:', this.listadocarrito);

    const username = this.authservice.getUsername();
    //console.log(username);

    if (!username) {
      this.handleError('No se pudo obtener el username desencriptado.');
      return;
    }

    this.filterCarritoByUsername(username);
  }

  filterCarritoByUsername(username: any) {
    this.listadocarrito = this.listadocarrito.filter(
      (item) => item.usuario && item.usuario.email === username
    );
    const cantidadRegistros = this.listadocarrito.length;
    this.catidadRegistrosService.actualizarCantidadRegistros(cantidadRegistros);
  }

  handleError(error: unknown) {
    console.error('Error al obtener carrito:', error);
  }

  // async getCarrito() {
  //   try {
  //     const data = await firstValueFrom(this.carritoService.getCarrito());
  //     this.listadocarrito = data;
  //     this.loading = false;
  //     //console.log('Carrito antes del filtrado:', this.listadocarrito);

  //     // Obtener el username desencriptado del localStorage
  //     const username = this.authservice.getUsername();
  //     //console.log(username);
  //     if (username) {
  //       // Filtrar la lista de carrito por username
  //       this.listadocarrito = this.listadocarrito.filter(
  //         (item) => item.usuario && item.usuario.email === username
  //       );

  //       //console.log('Carrito después del filtrado:', this.listadocarrito);
  //       /* Emision de cantidad de registros en el carrito */
  //       const cantidadRegistros = this.listadocarrito.length;
  //       this.catidadRegistrosService.actualizarCantidadRegistros(
  //         cantidadRegistros
  //       );
  //     } else {
  //       console.error('No se pudo obtener el username desencriptado.');
  //     }
  //   } catch (error) {
  //     console.error('Error al obtener carrito:', error);
  //   }
  // }

  async getImagenes() {
    try {
      const data = await firstValueFrom(this.imagenService.getImagenes());
      this.listadoimagenes = data;
      this.loading = false;
      //console.log(this.listadoimagenes);
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
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
          (error: any) => {
            console.error('Error al eliminar producto:', error);
            // Maneja el error según tus necesidades
          }
        );
      }
    });
  }

  private calcularSubtotal(carritoItem: CarritoModel): number {
    const precio = carritoItem.producto?.precio;
    return precio ? carritoItem.cantidad * precio : 0;
  }

  calcularTotal(): number {
    return this.listadocarrito.reduce(
      (total, carritoItem) => total + this.calcularSubtotal(carritoItem),
      0
    );
  }

  calcularMontoCotizar(): number {
    return this.listadocarrito.reduce(
      (total, carritoItem) => total + this.calcularSubtotal(carritoItem),
      0
    );
  }
}
