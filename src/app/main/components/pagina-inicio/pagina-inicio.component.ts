import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { CategoriaModel } from '../../entities/Categoria';
import { ImagenModel } from '../../entities/Imagen';
import { ProductoModel, UpdateProductoDTO } from '../../entities/Producto';
import { ESTADO } from '../../enums/Estado';
import { CategoriaService } from '../../services/categoria.service';
import { ImagenesService } from '../../services/imagenes.service';
import { ProductosService } from '../../services/productos.service';
import * as emailjs from 'emailjs-com';


@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css'],
})
export class PaginaInicioComponent implements OnInit {
  ProductosForm: FormGroup = new FormGroup({});
  isUploading = false;
  selectedFile: string | ArrayBuffer | null = null;
  listadoproductos: ProductoModel[] = [];
  listadoimagenes: ImagenModel[] = [];
  listadocategoria: CategoriaModel[] = [];
  selectProducto: UpdateProductoDTO = {};
  estados = Object.values(ESTADO);
  loading: boolean = true;
  carrito: any[] = [];
  productos: ProductoModel[] = [];
  displayModal: boolean = false;
  selectedProduct: ProductoModel | undefined;
  datos: any = {};

  @ViewChild('contactForm') contactForm!: NgForm;

  constructor(
    private productoService: ProductosService,
    private form: FormBuilder,
    private imagenService: ImagenesService,
    private categoriaService: CategoriaService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private http: HttpClient

  ) {
    {
      this.ProductosForm = this.form.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        marca: ['', Validators.required],
        precio: [0, Validators.required],
        stock: [0, Validators.required],
        categoria: ['', Validators.required],
        estado: ['', Validators.required],
        file: [''],
      });
    }
    
  }

  ngOnInit(): void {
    this.getProducto();
    this.getCategoria();
    this.getImagenes();
  }

  enviarDatos() {
    // Verifica que todos los campos necesarios estén presentes
    if (this.datos.nombre && this.datos.numero && this.datos.correo && this.datos.mensaje) {

      // Configura los datos que se enviarán a través de EmailJS
      const emailjsData = {
        to_name: this.datos.nombre,
        from_name: this.datos.numero,
        message: this.datos.mensaje,
        // Puedes agregar otros campos según lo necesites
      };

      // Envia el correo electrónico a través de EmailJS
      emailjs.send('service_6bq6ajp', 'template_8oq30kh', emailjsData, 'vGg3XGGDDJzrRQEvg')
        .then((response) => {
          console.log('Correo enviado con éxito:', response);
          // Puedes mostrar un mensaje de éxito o redirigir a otra página aquí
        })
        .catch((error) => {
          console.error('Error al enviar correo:', error);
          // Puedes manejar errores y mostrar un mensaje de error al usuario
        });
    } else {
      console.error('Faltan datos para enviar el correo electrónico.');
    }
  }
  
  // verMas(categoria: CategoriaModel) {
  //   console.log('Categoría seleccionada:', categoria);
  
  //   // Verifica que el nombre de la categoría no esté en blanco
  //   if (categoria.nombre.trim() !== 'productos') {
  //     // Asegúrate de que 'categoria.nombre' sea el valor adecuado para tu ruta
  //     this.router.navigate(['/', categoria.nombre.toLowerCase()]);
  //   } else {
  //     console.warn('Nombre de categoría en blanco. No se realizará la navegación.');
  //   }
  // }
  
  
  enviarMensaje() {
    // Obtener los valores del formulario
    const nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
    const correo = (<HTMLInputElement>document.getElementById('correo')).value;
    const numero = (<HTMLInputElement>document.getElementById('numero')).value;
    const sugerencia = (<HTMLInputElement>document.getElementById('sugerencia')).value;

    // Formar el mensaje de WhatsApp con saltos de línea
    const mensajeAdicional = 'Hola, quiero que me contacten:';

    // Formar el mensaje de WhatsApp con saltos de línea
    const mensaje = `${mensajeAdicional}\nNombre: ${nombre}\nCorreo: ${correo}\nNúmero: ${numero}\nSugerencia: ${sugerencia}`;

    // Codificar el mensaje para URL

    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Crear el enlace de WhatsApp
    const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=+593995864018&text=${mensajeCodificado}`;

    // Redirigir a WhatsApp
    window.open(enlaceWhatsApp, '_blank');

    // Limpiar el formulario
    this.contactForm.reset();
  
  }

  

  openModal(producto: ProductoModel): void {
    this.selectedProduct = producto;
    this.displayModal = true;
  }

  // showDialog(producto: ProductoModel) {
  //   this.selectedProduct = producto;
  //   // Abre el modal manualmente
  //   const modal = document.getElementById('productosModal');
  //   modal?.classList.add('show');
  //   modal?.setAttribute('style', 'display: block; background: rgba(0, 0, 0, 0.5);');
  // }

  // hideDialog() {
  //   this.selectedProduct = undefined;
  //   // Cierra el modal manualmente
  //   const modal = document.getElementById('productosModal');
  //   modal?.classList.remove('show');
  //   modal?.removeAttribute('style');
  // }

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

  async getCategoria() {
    try {
      const data = await firstValueFrom(this.categoriaService.getCategoria());
      this.listadocategoria = data;
      console.log(this.listadocategoria);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  }

  trackByCategoria(index: number, categoria: any): number {
    return categoria.id;
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.ProductosForm.patchValue({ file });
      this.ProductosForm.get('file')?.updateValueAndValidity();

      // Vista previa de la imagen seleccionada
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFile = reader.result;
      };
    }
  }
  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.ProductosForm.patchValue({
      file,
    });
  }

  async agregarProductos() {
    if (this.ProductosForm.valid) {
      const formData = new FormData();

      // Agregar los campos del formulario al FormData
      Object.keys(this.ProductosForm.value).forEach((key) => {
        formData.append(key, this.ProductosForm.get(key)?.value);
      });

      try {
        // Enviar el FormData al servicio utilizando firstValueFrom
        const response = await firstValueFrom(
          this.productoService.crearProductos(formData)
        );

        console.log('Producto creado con éxito:', response);
        this.getProducto();
      } catch (error) {
        console.error('Error al crear producto:', error);
        // Maneja el error según tus necesidades
      }
    }
  }

  updateProducto(): void {
    const id = this.selectProducto.id ?? 0;
    const data = this.ProductosForm.value;
    console.log('Datos a enviar para actualizar:', data);

    this.productoService.updateProducto(id, data).subscribe(
      (response) => {
        console.log(response);
        this.getProducto();
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          text: 'El producto se ha actualizado correctamente.',
        });
        this.ProductosForm.reset();
      },
      (error) => {
        console.error('Error al actualizar producto:', error);
        // Manejar el error según tus necesidades
      }
    );
  }

  editProducto(lista: any) {
    console.log('Datos recibidos para editar:', lista);
    this.selectProducto = lista;

    this.ProductosForm.patchValue({
      nombre: lista.nombre,
      descripcion: lista.descripcion,
      marca: lista.marca,
      stock: lista.stock,
      precio: lista.precio,
      categoria: lista.categoria.nombre,
      file: lista.file,
      estado: lista.estado,
    });
  }

  eliminarProducto(id: number): void {
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
        this.productoService.eliminarProductos(id).subscribe(
          () => {
            Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
            this.getProducto(); // Vuelve a cargar la lista después de la eliminación
          },
          (error) => {
            console.error('Error al eliminar producto:', error);
            // Maneja el error según tus necesidades
          }
        );
      }
    });
  }

  getEventValue(event: any): string {
    return event.target.value;
  }

  onInput(event: any) {
    const input = event.target;
    const value = input.value;

    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
  }
}
