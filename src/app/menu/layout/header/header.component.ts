import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/main/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginservice:LoginService,private router: Router) { }

  ngOnInit() {
  }

  
  isLoggedIn(): boolean {
    return this.loginservice.isAuthenticated();
  }
  mostrarIcono = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.mostrarIcono = window.innerWidth >= 991;
  }

  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica de cierre de sesión
        this.loginservice.logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('encryptionKey');
        this.router.navigate(['/paginainicio']);
      }
    });
  }

  openCart(): void {
    if (this.isLoggedIn()) {
      // Aquí puedes redirigir al usuario a la página del carrito
      this.router.navigate(['/carrito/user']);
    } else {
      // Muestra el mensaje de SweetAlert2 si el usuario no está logueado
      Swal.fire({
        icon: 'info',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para acceder al carrito.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

}
