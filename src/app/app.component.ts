import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private meta: Meta) {}
  title = 'ChmTechnology';

  ngOnInit(): void {
    const metaDescription =
      'Elevamos la excelencia en servicios tecnológicos. Líderes en innovación y maestría técnica. Transformamos desafíos tecnológicos en soluciones brillantes. Compromiso con calidad y satisfacción del cliente. Tu tecnología es nuestra pasión. Descubre cómo mejorar tu experiencia tecnológica hoy. Servicios tecnológicos, innovación, calidad, satisfacción del cliente, soluciones tecnológicas, maestría técnica, experiencia tecnológica, soporte técnico, consultoría IT, integración de sistemas, seguridad informática.';
    this.meta.updateTag({ name: 'description', content: metaDescription });
  }
}
