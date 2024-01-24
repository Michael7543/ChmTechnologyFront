import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nosotros',
  templateUrl: './pagina-nosotros.component.html',
  styleUrls: ['./pagina-nosotros.component.css'],
})
export class PaginaNosotrosComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  secciones: any[] = [
    {
      titulo: 'Instalación de Camaras de Seguridad',
      imagenSrc: '/assets/equipo-soft.png',
      imagenAlt: 'Imagen de Acerca de',
      imagenEstilo: {
        'max-width': '50%',
        filter: 'drop-shadow(5px 5px 9px rgba(255, 100, 247, 0.863))',
      },
      contenidoParrafos: [
        'En "CHM TECHNOLOGY", nos dedicamos a proporcionar soluciones tecnológicas avanzadas que impulsan la eficiencia y el rendimiento. Ofrecemos una amplia gama de productos y servicios diseñados para abordar los desafíos contemporáneos y mejorar la competitividad de nuestros clientes.',
        'Nuestra misión es implementar tecnología de vanguardia para resolver problemas complejos y mejorar los procesos empresariales. Nos comprometemos a brindar soluciones innovadoras y de alta calidad que impulsen el éxito de nuestros clientes en la era digital.',
      ],
      firmaAutor: '- MIGUEL SERVANTES',
    },
    {
      titulo: 'Mantenimiento de equipos de computo',
      imagenSrc: '/assets/equipo-soft.png',
      imagenAlt: 'Imagen de Acerca de',
      imagenEstilo: {
        'max-width': '50%',
        filter: 'drop-shadow(5px 5px 9px rgba(255, 100, 247, 0.863))',
      },
      contenidoParrafos: [
        'En "CHM TECHNOLOGY", nos dedicamos a proporcionar soluciones tecnológicas avanzadas que impulsan la eficiencia y el rendimiento. Ofrecemos una amplia gama de productos y servicios diseñados para abordar los desafíos contemporáneos y mejorar la competitividad de nuestros clientes.',
        'Nuestra misión es implementar tecnología de vanguardia para resolver problemas complejos y mejorar los procesos empresariales. Nos comprometemos a brindar soluciones innovadoras y de alta calidad que impulsen el éxito de nuestros clientes en la era digital.',
      ],
      firmaAutor: '- MIGUEL SERVANTES',
    },
  ];
}
