import { Component, AfterViewInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements AfterViewInit {
  ngAfterViewInit(): void {
    // Lógica de filtrado de jQuery
    $('input[name="category"]').on('change', function () {
      const category = $(this).val() as string;

      if (category === 'all') {
        // Mostrar todas las tarjetas
        $('.col, .blog-item').fadeIn();
      } else {
        // Ocultar todos, luego filtrar y mostrar solo la categoría seleccionada
        $('.blog-item').each(function() {
          const item = $(this);
          // Buscamos la columna padre para que no quede el hueco en el grid
          const parentCol = item.closest('.col').length ? item.closest('.col') : item;
          
          if (item.hasClass(category)) {
            parentCol.fadeIn();
            item.fadeIn();
          } else {
            parentCol.hide();
            item.hide();
          }
        });
      }
    });

    // Lógica de jQuery para el efecto Zoom
    $('.blog-card, .card, .comentario').on('mouseenter', function () {
      $(this).addClass('zoom-active');
    }).on('mouseleave', function () {
      $(this).removeClass('zoom-active');
    });
  }
}
