import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const decodedToken: any = jwtDecode(token);

      // Verifica si el usuario tiene el rol "ADMIN"
      const isAdmin = decodedToken.role.some((role: any) => role.name === 'ADMIN');

      if (isAdmin) {
        return true; // Permite el acceso si el rol es "ADMIN"
      } else {
        // Redirige a una página de acceso no autorizado o a donde desees
        this.router.navigate(['/unauthorized']);
        return false;
      }
    } else {
      // Redirige al inicio de sesión si no hay token
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}