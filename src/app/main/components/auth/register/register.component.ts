import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/main/entities/Usuario';
import { UsuarioService } from 'src/app/main/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  FormUsuario: FormGroup;
  mostrarContrasenia: boolean = false;
  passwordPromptLabel = 'Ingrese su contraseña';
  weakLabel = 'Débil';
  mediumLabel = 'Media';
  strongLabel = 'Fuerte';

  constructor(
    private form: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.FormUsuario = this.form.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, this.validarFormatoCorreo],
      ],
    });
  }

  ngOnInit(): void {}

  /* agregarUsuario() {
    let usuario: UsuarioModel = this.FormUsuario.value;

    //console.log('Datos del formulario:', usuario);
    this.usuarioService.crearUsuario(usuario).subscribe(
      (response: any) => {
        // Muestra el token en la consola para depuración
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado',
          text: 'El usuario se ha registrado correctamente.',
        });

        // Redirigir a la ruta deseada
        this.router.navigate(['/auth/login']);
      },
      (error: any) => {
        if (error.status === 400 && error.error && error.error.message) {
          // Filtra la cadena "BAD_REQUEST :: " del mensaje de error
          const errorMessage = error.error.message.replace(
            /BAD_REQUEST :: /i,
            ''
          );
          // Muestra el mensaje de error específico de la respuesta HTTP
          this.showCustomErrorAlert(errorMessage);
        } else {
          // Muestra un mensaje de error genérico
          this.showServerErrorAlert();
        }
      }
    );
  } */

  agregarUsuario() {
    let usuario: UsuarioModel = this.FormUsuario.value;

    //console.log('Datos del formulario:', usuario);

    this.usuarioService.crearUsuario(usuario).subscribe({
      next: (response: any) => {
        // Muestra el token en la consola para depuración
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado',
          text: 'El usuario se ha registrado correctamente.',
        });

        // Redirigir a la ruta deseada
        this.router.navigate(['/auth/login']);
      },
      error: (error: any) => {
        if (error.status === 400 && error.error && error.error.message) {
          // Filtra la cadena "BAD_REQUEST :: " del mensaje de error
          const errorMessage = error.error.message.replace(
            /BAD_REQUEST :: /i,
            ''
          );
          // Muestra el mensaje de error específico de la respuesta HTTP
          this.showCustomErrorAlert(errorMessage);
        } else {
          // Muestra un mensaje de error genérico
          this.showServerErrorAlert();
        }
      },
    });
  }

  showServerErrorAlert() {
    Swal.fire({
      title: 'Error del servidor',
      text: 'Por favor, inténtelo más tarde.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  showCustomErrorAlert(errorMessage: string) {
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  validarFormatoCorreo(control: FormControl) {
    if (control.touched) {
      const email = control.value;
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;

      if (!pattern.test(email)) {
        return { formatoCorreoInvalido: true };
      }
    }

    return null;
  }

  onInputletras(event: any) {
    const input = event.target;
    const value = input.value;

    // Remover caracteres no alfabéticos
    const alphabeticValue = value.replace(/[^A-Za-z\s]/g, '');
    input.value = alphabeticValue;
  }
  onInput(event: any) {
    const input = event.target;
    const value = input.value;

    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
  }
}
