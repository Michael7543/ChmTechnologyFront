import { Component, OnInit } from '@angular/core';
import { WhatsappService } from '../../services/whasapp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoModel, UpdateProductoDTO } from '../../entities/Producto';
import { ImagenModel } from '../../entities/Imagen';
import { CategoriaModel } from '../../entities/Categoria';
import { ESTADO } from '../../enums/Estado';
import { ProductosService } from '../../services/productos.service';
import { ImagenesService } from '../../services/imagenes.service';
import { CategoriaService } from '../../services/categoria.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { CarritoService } from '../../services/carrito.service';
import { CarritoModel } from '../../entities/Carrito';
import { ServiciosChmModel } from '../../entities/ServiciosChm';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-pagina-productos',
  templateUrl: './pagina-productos.component.html',
  styleUrls: ['./pagina-productos.component.css'],
})
export class PaginaProductosComponent implements OnInit {
  ProductosForm: FormGroup = new FormGroup({});
  isUploading = false;
  selectedFile: string | ArrayBuffer | null = null;
  listadoproductos: ProductoModel[] = [];
  listadoservicio: ServiciosChmModel[] = [];
  listadoimagenes: ImagenModel[] = [];
  listadocategoria: CategoriaModel[] = [];
  selectProducto: UpdateProductoDTO = {};
  estados = Object.values(ESTADO);
  loading: boolean = true;
  carrito: CarritoModel[] = [];
  productos: ProductoModel[] = [];
  displayModal: boolean = false;
  selectedProduct: ProductoModel | undefined;
  listadoproductosFiltrados: ProductoModel[] = [];
  categoriasConProductos: CategoriaModel[] = [];
  categoriaActivaIndex: number | null = null;
  constructor(
    private productoService: ProductosService,
    private imagenService: ImagenesService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService
  ) {
    {
     
    }
  }

  ngOnInit(): void {
    this.getProducto();
    this.getCategoria();
    this.getImagenes();

    

  }

  

  agregarAlCarrito(selectedProduct: any | undefined) {
    if (selectedProduct) {
      const carrito = {
        cantidad: 1,
        producto: selectedProduct.nombre,
        
        
        // Otros campos específicos del producto, según lo requerido por el servidor
      };
  
      console.log('Datos del producto a enviar al carrito:', carrito);
  
      this.carritoService.agregarCarrito(carrito).subscribe(
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
          this.displayModal = false;
          Swal.fire({
            icon: 'error',
            title: 'Loguearse para poder agregar al carrito al Carrito',
            text: 'El producto no se ha agregado correctamente.',
            timer: 2000
          });
      
          // Maneja el error según sea necesario
        }
      );
    } else {
      console.error('Error: selectedProduct es undefined');
      // Maneja el caso cuando selectedProduct es undefined según sea necesario
    }
  }
    
  
  filtrarPorCategoria(categoriaId: number): void {
    if (categoriaId) {
      this.filtrarProductosPorCategoria(categoriaId);
    } else {
      this.mostrarTodosLosProductos();
    }
  }
  
  private filtrarProductosPorCategoria(categoriaId: number): void {
    this.listadoproductosFiltrados = this.listadoproductos.filter(producto => producto.categoria.id === categoriaId);
  }
  
  private mostrarTodosLosProductos(): void {
    this.categoriaActivaIndex = -1;
    this.listadoproductosFiltrados = this.listadoproductos;
  }

  
  

  getCategoria(): void {
    this.categoriaService.getCategoria().subscribe(
      (categorias: CategoriaModel[]) => {
        // Filtrar categorías que pertenecen a ProductoModel y excluyen ServiciosChmModel
        this.listadocategoria = categorias.filter(categoria =>
          this.listadoproductos.some(producto => producto.categoria.id === categoria.id) &&
          !this.listadoservicio.some(servicio => servicio.categoria.id === categoria.id)
        );
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }
  trackByIdCategoria(index: number, categoria: CategoriaModel): number {
    return categoria.id;
  }

  
  
  
  openModal(producto: ProductoModel): void {
    this.selectedProduct = producto;
    this.displayModal = true;
  }

  async getProducto() {
    try {
      const data = await firstValueFrom(this.productoService.getProductos());
      this.listadoproductos = data;
      this.loading = false;
      console.log('Productos:', this.listadoproductos);
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




  
  
 

}
