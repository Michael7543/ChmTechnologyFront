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
      titulo: 'Experto en Servidores Web',
      imagenSrc: '../../../../assets/team1.png',
      imagenAlt: 'Imagen de Acerca d',
      imagenEstilo: {
        'max-width': '50%',
        filter: 'drop-shadow(5px 5px 9px blue)',
      },
      contenidoParrafos: [
        'Con 8 años de experiencia, Michael Moran es el arquitecto detrás de nuestra infraestructura tecnológica. Su destreza en el diseño, implementación y optimización de sistemas establece un estándar excepcional en la gestión de servidores web.',

        'Michael crea arquitecturas robustas que garantizan estabilidad, seguridad y rendimiento óptimo. Lo que lo distingue es su capacidad para personalizar soluciones según las necesidades de cada cliente, superando expectativas. Está a la vanguardia de las últimas tendencias en tecnologías de servidor, trabajando incansablemente para mantenernos actualizados. Su dedicación va más allá de la configuración técnica; es un comunicador eficiente, explicando conceptos complejos de manera accesible para que nuestros clientes comprendan plenamente el valor y rendimiento de sus entornos web. ¡Descubre cómo Michael Moran redefine el estándar en la gestión de servidores web!',
      ],
      firmaAutor: '- MICHAEL MORÁN',
    },
    {
      titulo: 'Experto en Impresoras y Plotters',
      imagenSrc: '../../../../assets/team2.png',
      imagenAlt: 'Imagen de Acerca de',
      imagenEstilo: {
        'max-width': '50%',
        filter: 'drop-shadow(5px 5px 9px blue)',
      },
      contenidoParrafos: [
        'Nos destacamos como líderes en impresoras y plotters gracias a Darwin Barrera, nuestro experto con más de 16 años de dedicación al mundo tecnológico. Su apasionado profesionalismo y competencia lo han llevado a la cima del campo',
        'Con un conocimiento técnico que abarca desde impresoras convencionales hasta los últimos plotters, Darwin ofrece soluciones personalizadas que se adaptan a las necesidades de nuestros clientes. Su habilidad para optimizar el rendimiento, resolver problemas complejos y mantenerse al día con las últimas tendencias tecnológicas lo sitúa como referente en el sector. ¡Descubre el liderazgo tecnológico con Darwin Barrera a la cabeza!',
      ],
      firmaAutor: '- DARWIN BARRERA',
    },
  ];
}
