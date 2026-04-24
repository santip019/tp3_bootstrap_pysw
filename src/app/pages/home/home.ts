import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from "@angular/router";
declare var $: any; // Declaramos jQuery

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements AfterViewInit {
  ngAfterViewInit() {
    // Animación simple con jQuery para el título al cargar
    $('.hero-title').hide().fadeIn(2000);

    $('.hero-content p').css({ opacity: 0 }).animate({
      opacity: 1,
      marginTop: '20px'
    }, 1500);

    const video = $('.hero-video').get(0);
    if (video) {
      video.muted = true; // Doble seguridad de silencio
      video.play().catch((error: any) => {
        console.log("El navegador bloqueó el autoplay, intentando de nuevo...", error);
      });
    }

    // Configuración del Carousel con jQuery
    $('#testimonialCarousel').on('slid.bs.carousel', function () {
      console.log('El testimonio ha cambiado');
    });

    // Ejemplo de hover con jQuery para resaltar la tarjeta de testimonio
    $('.testimonial-card').on('mouseenter', function (this: HTMLElement) {
      $(this).addClass('border-primary');
    }).on('mouseleave', function (this: HTMLElement) {
      $(this).removeClass('border-primary');
    });


    // contador hasta 1500 de usuarios de la pagina
    $('.counter-value').each(function (index: number, element: HTMLElement) {
      const $this = $(element);
      $this.prop('Counter', 0).animate({
        Counter: $this.data('count')
      }, {
        duration: 3000,
        easing: 'swing',
        step: function (now: number) {
          $this.text(Math.ceil(now));
        }
      });
    });
  }
}


