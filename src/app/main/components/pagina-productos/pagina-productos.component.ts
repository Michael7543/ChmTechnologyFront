import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { CategoriaModel } from '../../entities/Categoria';
import { ProductoModel } from '../../entities/Producto';
import { ServiciosChmModel } from '../../entities/ServiciosChm';
import { CarritoService } from '../../services/carrito.service';
import { CategoriaService } from '../../services/categoria.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-pagina-productos',
  templateUrl: './pagina-productos.component.html',
  styleUrls: ['./pagina-productos.component.css'],
})
export class PaginaProductosComponent implements OnInit {
  ProductosForm: FormGroup = new FormGroup({});
  listadoproductos: ProductoModel[] = [];
  listadoservicio: ServiciosChmModel[] = [];
  listadocategoria: CategoriaModel[] = [];
  displayModal: boolean = false;
  selectedProduct: ProductoModel | undefined;
  listadoproductosFiltrados: ProductoModel[] = [];
  categoriasConProductos: CategoriaModel[] = [];

  constructor(
    private productoService: ProductosService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    forkJoin({
      productos: this.productoService.getProductos(),
      categorias: this.categoriaService.getCategoria(),
    }).subscribe({
      next: ({ productos, categorias }) => {
        this.listadoproductos = productos;
        //console.log('Productos:', this.listadoproductos);

        // Filtrar categorías después de obtener productos
        this.listadocategoria = categorias.filter(
          (categoria) =>
            this.listadoproductos.some(
              (producto) => producto.categoria.id === categoria.id
            ) &&
            !this.listadoservicio.some(
              (servicio) => servicio.categoria.id === categoria.id
            )
        );
      },
      error: (error) => {
        console.error('Error al obtener productos o categorías:', error);
      },
      complete: () => {
        // Optional: Handle completion if needed
      },
    });
  }

  agregarAlCarrito(selectedProduct: any | undefined) {
    if (selectedProduct) {
      const carrito = {
        cantidad: 1,
        producto: selectedProduct.nombre,
      };

      //console.log('Datos del producto a enviar al carrito:', carrito);

      this.carritoService.agregarCarrito(carrito).subscribe({
        next: (response) => {
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
        error: (error) => {
          this.displayModal = false;
          Swal.fire({
            icon: 'error',
            title: 'Loguearse para poder agregar al carrito.',
            text: 'El producto no se ha agregado correctamente.',
            timer: 2000,
          });

          // Maneja el error según sea necesario
        },
        complete: () => {
          // Optional: Handle completion if needed
        },
      });
    } else {
      console.error('Error: selectedProduct es undefined');
      // Maneja el caso cuando selectedProduct es undefined según sea necesario
    }
  }

  filtrarPorCategoria(categoriaId: number): void {
    if (categoriaId) {
      this.filtrarProductosPorCategoria(categoriaId);
    }
  }

  private filtrarProductosPorCategoria(categoriaId: number): void {
    this.listadoproductosFiltrados = this.listadoproductos.filter(
      (producto) => producto.categoria.id === categoriaId
    );
  }

  getCategoria(): void {
    this.categoriaService.getCategoria().subscribe({
      next: (categorias: CategoriaModel[]) => {
        // Filtrar categorías que pertenecen a ProductoModel y excluyen ServiciosChmModel
        this.listadocategoria = categorias.filter(
          (categoria) =>
            this.listadoproductos.some(
              (producto) => producto.categoria.id === categoria.id
            ) &&
            !this.listadoservicio.some(
              (servicio) => servicio.categoria.id === categoria.id
            )
        );
      },
      error: (error) => {
        console.error('Error al obtener categorías:', error);
      },
      complete: () => {
        // Optional: Handle completion if needed
      },
    });
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
      //console.log('Productos:', this.listadoproductos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }

  trackProductoBy(index: number, producto: any): any {
    return producto.id;
  }
}
