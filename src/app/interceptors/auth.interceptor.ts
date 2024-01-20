import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, catchError, filter, switchMap, take, throwError, timer } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../main/services/login.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  constructor(private router: Router, private authService: LoginService) {
    
   
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken: string = localStorage.getItem('accessToken') || '';
  
    let request = this.addToken(req, accessToken);
  
    // Añade un parámetro único a la URL para el cache-busting
    const cacheBustingRequest = request.clone({ setParams: { '_t': new Date().getTime().toString() } });
  
    return this.handleRequestWithTokenExpirationCheck(cacheBustingRequest, req, next);
  }
  
  private handleRequestWithTokenExpirationCheck(request: HttpRequest<any>, originalRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isRefreshing) {
          console.error('Recibido error 401. Intentando actualizar el token.');
          return this.handle401Error(originalRequest, next);
        } else {
          return throwError(error);
        }
      })
    );
  }
  
  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return token
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;
  }
  
  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const refreshToken = localStorage.getItem('refreshToken') || '';
    //const username = localStorage.getItem('username') || '';

    // Obtener la contraseña desencriptada utilizando el método del servicio
    const decryptedPassword = this.authService.getPassword();
    const decryptedUsername = this.authService.getUsername();
    if (!decryptedPassword) {
      // Manejar el caso en el que la contraseña no se puede desencriptar
      console.error('No se pudo desencriptar la contraseña.');
      // Puedes redirigir al usuario al inicio de sesión u otra lógica aquí
      return throwError('No se pudo desencriptar la contraseña');
    }

    console.log('Usando refreshToken:', refreshToken);

    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.refreshToken(decryptedUsername, decryptedPassword, refreshToken).pipe(
      switchMap((refreshResponse) => {
        console.log('Token se actualizó con éxito:', refreshResponse);
        this.isRefreshing = false;
        this.refreshTokenSubject.next(refreshResponse.accessToken);

        localStorage.setItem('accessToken', refreshResponse.accessToken);
        localStorage.setItem('refreshToken', refreshResponse.refreshToken); // Actualiza el refreshToken

        // Retrata la solicitud original con el nuevo token y continúa
        const updatedRequest = this.addToken(request, refreshResponse.accessToken);
        console.log('Volver a intentar la solicitud original con un nuevo token:', updatedRequest);

        // Llama recursivamente a handleRequestWithTokenExpirationCheck para volver a intentar la solicitud original
        return this.handleRequestWithTokenExpirationCheck(updatedRequest, request, next);
      }),
      catchError((refreshError) => {
        console.error('Error refreshing token:', refreshError);
        this.isRefreshing = false;

        // Aquí decides si redirigir al usuario al login o manejar el error de otra manera
        // this.router.navigateByUrl('/login');

        return throwError(() => refreshError); // Propagar el error hacia arriba
      })
    );
  }
  
}
