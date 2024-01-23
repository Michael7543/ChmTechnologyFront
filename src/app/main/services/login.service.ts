import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoginModel } from '../entities/Login';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


    private readonly API_URL = `${environment.HOST}/`;
  
  
  
    constructor(private http:HttpClient) { }
  
 
    login(username: string, password: string): Observable<any> {
      // Genera una clave aleatoria
      const key = v4();
    
      return this.http.post(`${this.API_URL}auth/login`, { username, password }).pipe(
        tap((response: any) => {
          if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
    
            // Utiliza la clave aleatoria para encriptar
            const encryptedPassword = CryptoJS.AES.encrypt(password, key).toString();
            localStorage.setItem('password', encryptedPassword);
    
            const encryptedUsername = CryptoJS.AES.encrypt(username, key).toString();
            localStorage.setItem('username', encryptedUsername);
    
            // Guarda la clave aleatoria
            localStorage.setItem('encryptionKey', key);
          }
    
          if (response.refreshToken) {
            localStorage.setItem('refreshToken', response.refreshToken);
          }
    
          // ... (otra lógica si es necesario)
        })
      );
    }
    
    
    getPassword(): string | null {
      const encryptedPassword = localStorage.getItem('password');
      const encryptionKey = localStorage.getItem('encryptionKey');
    
      if (encryptedPassword && encryptionKey) {
        // Utiliza la clave aleatoria para desencriptar
        const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey).toString(CryptoJS.enc.Utf8);
        console.log('contraseña',decryptedPassword);
        return decryptedPassword;
      }
    
      return null;
    }
    
    getUsername(): string {
      const encryptedUsername = localStorage.getItem('username');
      const encryptionKey = localStorage.getItem('encryptionKey');
      
      if (encryptedUsername && encryptionKey) {
        try {
          // Utiliza la clave aleatoria para desencriptar
          const decryptedUsername = CryptoJS.AES.decrypt(encryptedUsername, encryptionKey).toString(CryptoJS.enc.Utf8);
          
          if (!decryptedUsername) {
            console.error('Decrypted username is empty. Check encryption process.');
            return 'Error al desencriptar el nombre de usuario';
          }
    
          console.log('Decrypted username:', decryptedUsername);
          return decryptedUsername;
        } catch (error) {
          console.error('Error decrypting username:', error);
          // Aquí decides qué valor devolver en caso de error
          return 'Error al desencriptar el nombre de usuario';
        }
      }
      
      return 'Usuario no disponible';
    }
    
    // Método para renovar el token
    refreshToken(username: string, password: string, refreshToken: string): Observable<any> {
      const body = { username, password, refreshToken };
      return this.http.post(`${this.API_URL}auth/refresh`, body);
    }
    
    isAuthenticated(): boolean {
      // Implementa la lógica para verificar si el usuario está autenticado
      // Puedes comprobar si existe el token u otros criterios
      return localStorage.getItem('accessToken') !== null;
    }
  
    logout(): void {
      // Implementa la lógica para cerrar sesión
      localStorage.removeItem('accessToken');
      // Puedes limpiar otros datos relacionados con la sesión si es necesario
    }
    
    
  }