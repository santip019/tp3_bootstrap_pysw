import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Agencia {
  id: number;
  nombre: string;
  logo: string;
  titulo: string;
  descripcion: string;
  caracteristicas: string[];
  rating: number;
  ratingPromedio: number;
  frase: string;
  flipped: boolean;
}

@Component({
  selector: 'app-agencias',
  imports: [CommonModule],
  templateUrl: './agencias.html',
  styleUrl: './agencias.css',
})
export class Agencias {
  agencias: Agencia[] = [
    {
      id: 1,
      nombre: 'Expedia',
      logo: '../assets/img/expedia.png',
      titulo: 'Todo en un solo lugar',
      descripcion: 'Líder mundial en reservas online. Conectamos a millones de viajeros con vuelos, hoteles y actividades en cualquier rincón del planeta.',
      caracteristicas: [
        'Soporte 24/7 multiidioma',
        'Cancelación gratuita (seleccionados)',
        'Programa Expedia Rewards'
      ],
      rating: 4,
      ratingPromedio: 3.5,
      frase: '"Tu viaje de principio a fin en una app"',
      flipped: false
    },
    {
      id: 2,
      nombre: 'TUI Group',
      logo: '../assets/img/tui.jpg',
      titulo: 'Sonrisas por el mundo',
      descripcion: 'El mayor grupo turístico global. Especialistas en paquetes "todo incluido" en el Mediterráneo, Caribe y destinos exóticos.',
      caracteristicas: [
        'Cruceros de lujo (TUI Cruises)',
        'Hoteles temáticos familiares',
        'Guías locales certificados'
      ],
      rating: 5,
      ratingPromedio: 4.0,
      frase: '"Expertos en crear momentos inolvidables"',
      flipped: false
    },
    {
      id: 3,
      nombre: 'Abercrombie & Kent',
      logo: '../assets/img/aber.jpg',
      titulo: 'Viajes de Ultra Lujo',
      descripcion: 'Pioneros en safaris de lujo y expediciones exclusivas con un nivel de confort y personalización sin precedentes.',
      caracteristicas: [
        'Jet privado para expediciones',
        'Acceso VIP a monumentos',
        'Campamentos de lujo en África'
      ],
      rating: 5,
      ratingPromedio: 4.5,
      frase: '"Redefiniendo la aventura desde 1962"',
      flipped: false
    },
    {
      id: 4,
      nombre: 'G Adventures',
      logo: '../assets/img/g.jpg',
      titulo: 'Aventura con Propósito',
      descripcion: 'Viajes en grupos pequeños enfocados en la cultura local y el impacto social positivo en comunidades remotas.',
      caracteristicas: [
        'Grupos pequeños (máx. 16 personas)',
        'Impacto social positivo',
        'Expertos locales certificados'
      ],
      rating: 3,
      ratingPromedio: 2.5,
      frase: '"Cambiamos vidas a través de los viajes"',
      flipped: false
    },
    {
      id: 5,
      nombre: 'Contiki',
      logo: '../assets/img/contiki.jpg',
      titulo: 'Sin Remordimientos',
      descripcion: 'Diseñado para jóvenes de 18 a 35 años. Experiencias que combinan fiesta, cultura y nuevas amistades por el mundo.',
      caracteristicas: [
        'Viajes para jóvenes 18-35 años',
        'Experiencias sociales incluidas',
        'Fiestas temáticas organizadas'
      ],
      rating: 3,
      ratingPromedio: 3.0,
      frase: '"Viaja con gente de tu edad"',
      flipped: false
    },
    {
      id: 6,
      nombre: 'Intrepid Travel',
      logo: '../assets/img/intrepid.png',
      titulo: 'Explora de forma ética',
      descripcion: 'Viajes responsables para descubrir la esencia de cada destino de la mano de expertos líderes locales.',
      caracteristicas: [
        'Viajes responsables y éticos',
        'Expertos locales como guías',
        'Grupos pequeños y auténticos'
      ],
      rating: 4,
      ratingPromedio: 3.5,
      frase: '"Para quienes buscan lo auténtico"',
      flipped: false
    }
  ];

  toggleCard(agencia: Agencia): void {
    agencia.flipped = !agencia.flipped;
  }

  setRating(agencia: Agencia, rating: number, event: Event): void {
    event.stopPropagation();
    agencia.rating = rating;
    agencia.ratingPromedio = rating;
  }

  getStarsArray(count: number): number[] {
    return Array(count).fill(0).map((_, i) => i + 1);
  }
}
