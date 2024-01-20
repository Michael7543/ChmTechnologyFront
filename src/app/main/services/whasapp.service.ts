import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  constructor() {}


  



  enviarMensaje(numero: string, mensaje: string): void {
    const enlaceWhatsApp = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(enlaceWhatsApp, '_blank');
  }
  private construirMensaje(productos: any[]): string {
    const mensaje = '¡Hola! Estoy interesado en los siguientes productos:%0A%0A';
    const productosTexto = productos.map(producto => `- ${producto.nombre} - Precio: ${producto.precio}`).join('%0A');
    return mensaje + productosTexto;
  }
}
