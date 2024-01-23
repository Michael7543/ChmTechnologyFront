import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import * as emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import { CategoriaModel } from '../../entities/Categoria';
import { ImagenModel } from '../../entities/Imagen';
import { ProductoModel, UpdateProductoDTO } from '../../entities/Producto';
import { ESTADO } from '../../enums/Estado';

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
  video: HTMLVideoElement | undefined;

  @ViewChild('contactForm') contactForm!: NgForm;

  constructor() {}

  ngOnInit(): void {}

  enviarDatos() {
    // Verifica que todos los campos necesarios estén presentes
    if (
      this.datos.nombre &&
      this.datos.numero &&
      this.datos.correo &&
      this.datos.mensaje
    ) {
      // Configura los datos que se enviarán a través de EmailJS
      const emailjsData = {
        to_name: this.datos.nombre,
        from_name: this.datos.numero,
        to_email: this.datos.correo,
        message: this.datos.mensaje,
      };

      console.log(emailjsData); // Verifica si los datos del correo electrónico son correctos

      emailjs
        .send(
          'service_v282uft',
          'template_jpuw94c',
          emailjsData,
          'vGg3XGGDDJzrRQEvg'
        )
        .then((response) => {
          console.log('Correo enviado con éxito:', response);

          // Muestra un SweetAlert de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Envío exitoso!',
            text: 'Tu mensaje ha sido enviado con éxito.',
          });

          // Limpia el formulario
          this.datos = { nombre: '', numero: '', correo: '', mensaje: '' };

          // Puedes mostrar un mensaje de éxito o redirigir a otra página aquí
        })
        .catch((error) => {
          console.error('Error al enviar correo:', error);

          // Muestra un SweetAlert de error
          Swal.fire({
            icon: 'error',
            title: 'Error al enviar el correo',
            text: 'Hubo un problema al enviar el correo. Por favor, inténtalo de nuevo.',
          });

          // Puedes manejar errores y mostrar un mensaje de error al usuario
        });
    }
  }

  enviarMensaje() {
    // Obtener los valores del formulario
    const nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
    const correo = (<HTMLInputElement>document.getElementById('correo')).value;
    const numero = (<HTMLInputElement>document.getElementById('numero')).value;
    const sugerencia = (<HTMLInputElement>document.getElementById('sugerencia'))
      .value;

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
