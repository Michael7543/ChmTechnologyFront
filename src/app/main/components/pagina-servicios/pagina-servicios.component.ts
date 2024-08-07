import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { CategoriaModel } from '../../entities/Categoria';
import { ImagenModel } from '../../entities/Imagen';
import {
  ServiciosChmModel,
  UpdateServicioDTO,
} from '../../entities/ServiciosChm';
import { CarritoService } from '../../services/carrito.service';
import { CategoriaService } from '../../services/categoria.service';
import { ServicioChmService } from '../../services/servicioschm.service';

@Component({
  selector: 'app-pagina-servicios',
  templateUrl: './pagina-servicios.component.html',
  styleUrls: ['./pagina-servicios.component.css'],
})
export class PaginaServiciosComponent implements OnInit {
  ServiciosForm: FormGroup = new FormGroup({});
  listadoservicios: ServiciosChmModel[] = [];
  listadoimagenes: ImagenModel[] = [];
  listadocategoria: CategoriaModel[] = [];
  selectProducto: UpdateServicioDTO = {};
  carrito: any[] = [];
  servicios: ServiciosChmModel[] = [];
  displayModal: boolean = false;
  selectedServ: ServiciosChmModel | undefined;
  listadoserviciosFiltrados: ServiciosChmModel[] = [];

  constructor(
    private serviciosService: ServicioChmService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    forkJoin({
      servicios: firstValueFrom(this.serviciosService.getServicio()),
      categorias: this.categoriaService.getCategoria(),
    }).subscribe(
      ({ servicios, categorias }) => {
        this.listadoservicios = servicios;
        //console.log('Servicios:', this.listadoservicios);

        // Filtrar categorías después de obtener servicios
        this.listadocategoria = categorias.filter((categoria) =>
          this.listadoservicios.some(
            (servicio) => servicio.categoria.id === categoria.id
          )
        );
      },
      (error) => {
        console.error('Error al obtener servicios o categorías:', error);
      }
    );
  }

  filtrarPorCategoria(categoriaId: number): void {
    if (categoriaId) {
      this.listadoserviciosFiltrados = this.listadoservicios.filter(
        (servicios) => servicios.categoria.id === categoriaId
      );
    } else {
      // Si no hay categoría seleccionada, mostrar todos los productos
      this.listadoserviciosFiltrados = this.listadoservicios;
    }
  }

  agregarAlCarrito(selectedServ: any | undefined) {
    if (selectedServ) {
      const servicio = {
        cantidad: 1,
        servicio: selectedServ.nombre,
        // Otros campos específicos del producto, según lo requerido por el servidor
      };

      //console.log('Datos del producto a enviar al carrito:', servicio);

      this.carritoService.agregarCarrito(servicio).subscribe(
        (response) => {
          this.displayModal = false;
          //console.log('Producto agregado al carrito con éxito:', response);
          Swal.fire({
            icon: 'success',
            title: 'Producto Agregado al Carrito',
            text: 'El producto se ha agregado correctamente.',
            timer: 2000,
          });
          // Aquí puedes agregar lógica adicional si es necesario
        },
        (error) => {
          this.displayModal = false;
          Swal.fire({
            icon: 'error',
            title: 'Loguearse para poder agregar al carrito.',
            text: 'El servicio no se ha agregado correctamente.',
            timer: 2000,
          });
        }
      );
    } else {
      console.error('Error: selectedProduct es undefined');
      // Maneja el caso cuando selectedProduct es undefined según sea necesario
    }
  }

  /*  trackByImagen(index: number, imagen: any): number {
    return imagen.id;
  } */

  getCategoria(): void {
    this.categoriaService.getCategoria().subscribe(
      (categorias: CategoriaModel[]) => {
        // Filtrar categorías que pertenecen a ServiciosChmModel
        this.listadocategoria = categorias.filter((categoria) =>
          this.listadoservicios.some(
            (servicio) => servicio.categoria.id === categoria.id
          )
        );
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  trackByIdCategoriaService(index: number, categoria: CategoriaModel): number {
    return categoria.id;
  }

  async getServicio() {
    try {
      const data = await firstValueFrom(this.serviciosService.getServicio());
      this.listadoservicios = data;
      //console.log('Productos:', this.listadoservicios);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }

  openModal(servicios: ServiciosChmModel): void {
    this.selectedServ = servicios;
    this.displayModal = true;
  }
}
