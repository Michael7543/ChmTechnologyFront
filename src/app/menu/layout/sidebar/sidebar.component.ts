import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  @Input() sideNavState: boolean = false;
  
  constructor(private router: Router) {}
  list = [    
    {
      number: "1",
      name: "Usuario",
      icon: "pi pi-user",
      route: "/home/administracion/usuario",
    },
    {
      number: "2",
      name: "Productos",
      icon: "pi pi-tag",
      route: "/home/administracion/productos",
    },
    {
      number: "3",
      name: "Servicios",
      icon: "pi pi-tag",
      route: "/home/administracion/servicios",
    },
    {
      number: "4",
      name: "Categorias",
      icon: "pi pi-list",
      route: "/home/administracion/categorias",
    },
    {
      number: "4",
      name: "Historial del Carrito",
      icon: "pi pi-shopping-bag",
      route: "/home/administracion/carrito",
    }

  ];
  logout() {
    Swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Elimina los valores del localStorage y redirige a la página de inicio de sesión
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('encryptionKey');
        this.router.navigate(['/auth/login']);
      }
    });
  }
  
}

