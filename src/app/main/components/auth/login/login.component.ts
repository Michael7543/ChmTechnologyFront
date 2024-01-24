import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observer } from 'rxjs';
import { LoginService } from 'src/app/main/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  UsuarioForm: FormGroup = new FormGroup({});
  username: string = '';
  password: string = '';
  emailPattern: string = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  mostrarContrasenia: boolean = false;
  passwordPromptLabel = 'Ingrese su contraseña';
  weakLabel = 'Débil';
  mediumLabel = 'Media';
  strongLabel = 'Fuerte';

  constructor(
    private readonly router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {}

  /* login() {
    if (!this.username || !this.password) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, ingrese tanto el nombre de usuario como la contraseña.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    this.loginService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);

          Swal.fire({
            icon: 'success',
            title: 'Usuario logueado',
            text: 'El usuario se ha logueado correctamente.',
          });

          this.router.navigate(['/home/administracion/usuario']);
        } else {
          console.error(
            'La respuesta del servidor no contiene un token:',
            response
          );
          this.showInvalidCredentialsAlert();
        }
      },
      () => {
        this.password = '';
        this.showInvalidCredentialsAlert();
      }
    );
  } */

  /* funciona bien */

  login() {
    if (!this.username || !this.password) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, ingrese tanto el nombre de usuario como la contraseña.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const observer: Observer<any> = {
      next: (response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);

          Swal.fire({
            icon: 'success',
            title: 'Usuario logueado',
            text: 'Has iniciado sesión exitosamente.',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          const userRole = this.extractUserRole(response.accessToken);
          this.redirectBasedOnUserRole(userRole);
        } else {
          console.error(
            'La respuesta del servidor no contiene un token:',
            response
          );
          this.showInvalidCredentialsAlert();
        }
      },
      error: () => {
        this.password = '';
        this.showInvalidCredentialsAlert();
      },
      complete: () => {},
    };

    setTimeout(() => {
      this.loginService.login(this.username, this.password).subscribe(observer);
    }, 200);
  }

  private extractUserRole(accessToken: string): string {
    try {
      const decodedToken: any = jwtDecode(accessToken);
      //console.log(decodedToken);

      // Verifica si el campo "role" existe y es un array
      if (decodedToken.role && Array.isArray(decodedToken.role)) {
        const firstRole = decodedToken.role[0];
        return firstRole ? firstRole.name : '';
      } else if (decodedToken.role && typeof decodedToken.role === 'string') {
        // Si "role" es una cadena, devuélvela directamente
        return decodedToken.role;
      } else {
        console.error(
          'El campo "role" no es un array o una cadena en el token.'
        );
        return '';
      }
    } catch (error) {
      console.error('Error al extraer el rol del token', error);
      return '';
    }
  }

  /* private extractUserRole(accessToken: string): string {
    try {
      const decodedToken: any = jwtDecode(accessToken); // Asegúrate de que estás utilizando jwt_decode
      console.log(decodedToken);
      const firstRole = decodedToken.role[0]; // Obtén el primer rol del array
      return firstRole ? firstRole.name : ''; // Asegúrate de que existe un rol y devuelve su nombre
    } catch (error) {
      console.error('Error al extraer el rol del token', error);
      return '';
    }
  } */

  private redirectBasedOnUserRole(userRole: string): void {
    // Objeto de mapeo de roles a rutas
    const roleToRouteMap: { [key: string]: string } = {
      ADMIN: '/home/administracion/usuario',
      BASIC: '/inicio',
    };

    // Ruta por defecto en caso de que el rol no coincida
    const defaultRoute = '/not-found';

    // Obtén la ruta correspondiente al rol del usuario o la ruta por defecto
    const targetRoute = roleToRouteMap[userRole] || defaultRoute;

    // Redirige a la ruta determinada
    this.router.navigate([targetRoute]);
  }

  /*   private redirectBasedOnUserRole(userRole: string): void {
    switch (userRole) {
      case 'ADMIN':
        this.router.navigate(['/home/administracion/usuario']);
        break;
      case 'BASIC':
        this.router.navigate(['/inicio']);
        break;
      // Agrega más casos según los roles que tengas
      default:
        console.error('Rol no reconocido:', userRole);
        break;
    }
  }
 */

  showInvalidCredentialsAlert() {
    Swal.fire({
      title: 'Credenciales incorrectas',
      text: 'Por favor, verifique su correo y contraseña.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
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
