import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosChmModel, UpdateServicioDTO } from '../../entities/ServiciosChm';
import { ImagenModel } from '../../entities/Imagen';
import { CategoriaModel } from '../../entities/Categoria';
import { ESTADO } from '../../enums/Estado';
import { ServicioChmService } from '../../services/servicioschm.service';
import { ImagenesService } from '../../services/imagenes.service';
import { CategoriaService } from '../../services/categoria.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-pagina-servicios',
  templateUrl: './pagina-servicios.component.html',
  styleUrls: ['./pagina-servicios.component.css']
})
export class PaginaServiciosComponent implements OnInit {
  ServiciosForm: FormGroup = new FormGroup({});
  isUploading = false;
  selectedFile: string | ArrayBuffer | null = null;
  listadoservicios: ServiciosChmModel[] = [];
  listadoimagenes: ImagenModel[] = [];
  listadocategoria: CategoriaModel[] = [];
  selectProducto: UpdateServicioDTO = {};
  estados = Object.values(ESTADO);
  loading: boolean = true;
  carrito: any[] = [];
  servicios: ServiciosChmModel[] = [];
  displayModal: boolean = false;
  selectedServ: ServiciosChmModel | undefined;
  listadoserviciosFiltrados: ServiciosChmModel[]=[];
  constructor(
    private serviciosService: ServicioChmService,
    private imagenService: ImagenesService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService
  ) {
  }

  ngOnInit(): void {
    this.getServicio();
    this.getCategoria();
    this.getImagenes();
  }

  openModal(servicios: ServiciosChmModel): void {
    this.selectedServ = servicios;
    this.displayModal = true;
  }

  agregarAlCarrito(selectedServ: any | undefined) {
    if (selectedServ) {
      const servicio = {
        cantidad: 1,
        servicio: selectedServ.nombre,
        // Otros campos específicos del producto, según lo requerido por el servidor
      };
  
      console.log('Datos del producto a enviar al carrito:', servicio);
  
      this.carritoService.agregarCarrito(servicio).subscribe(
        (response) => {
          this.displayModal = false;
          console.log('Producto agregado al carrito con éxito:', response);
          Swal.fire({
            icon: 'success',
            title: 'Producto Agregado al Carrito',
            text: 'El producto se ha agregado correctamente.',
            timer: 2000
          });
          // Aquí puedes agregar lógica adicional si es necesario
        },
        (error) => {
          console.error('Error al agregar producto al carrito:', error);
          // Maneja el error según sea necesario
        }
      );
    } else {
      console.error('Error: selectedProduct es undefined');
      // Maneja el caso cuando selectedProduct es undefined según sea necesario
    }
  }


  async getServicio() {
    try {
      const data = await firstValueFrom(this.serviciosService.getServicio());
      this.listadoservicios = data;
      this.loading = false;
      console.log('Productos:', this.listadoservicios);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }

  trackByImagen(index: number, imagen: any): number {
    return imagen.id;
  }

  async getImagenes() {
    try {
      const data = await firstValueFrom(this.imagenService.getImagenes());
      this.listadoimagenes = data;
      this.loading = false;
      console.log(this.listadoimagenes);
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
    }
  }

  getCategoria(): void {
    this.categoriaService.getCategoria().subscribe(
      (categorias: CategoriaModel[]) => {
        // Filtrar categorías que pertenecen a ServiciosChmModel
        this.listadocategoria = categorias.filter(categoria =>
          this.listadoservicios.some(servicio => servicio.categoria.id === categoria.id)
        );
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }
  

  filtrarPorCategoria(categoriaId: number): void {
    if (categoriaId) {
      this.listadoserviciosFiltrados = this.listadoservicios.filter(servicios => servicios.categoria.id === categoriaId);
    } else {
      // Si no hay categoría seleccionada, mostrar todos los productos
      this.listadoserviciosFiltrados = this.listadoservicios;
    }
  }
  
 
 
}
