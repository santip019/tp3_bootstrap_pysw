import { Component, AfterViewInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-destinos',
  imports: [],
  templateUrl: './destinos.html',
  styleUrl: './destinos.css',
})
export class Destinos implements AfterViewInit {
  ngAfterViewInit(): void {
    // Lógica de filtrado de jQuery
    $('input[name="category"]').on('change', function () {
      const category = $(this).val() as string;

      if (category === 'all') {
        // Mostrar todas las tarjetas y filas de la tabla
        $('.destino-item').show();
        $('.destino-row').show();
      } else {
        // Ocultar todos, luego filtrar y mostrar solo la categoría seleccionada
        $('.destino-item').hide().filter('.' + category).show();
        $('.destino-row').hide().filter('.' + category).show();
      }
    });

    // Lógica de jQuery para el efecto Zoom ("clase de apoyo gestionada por jQuery")
    $('.destino-card').on('mouseenter', function () {
      $(this).addClass('zoom-active');
    }).on('mouseleave', function () {
      $(this).removeClass('zoom-active');
    });
  }
}
