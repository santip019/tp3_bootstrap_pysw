import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
declare var $: any; // Declaramos jQuery

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  toggleDarkMode() {
    // Usamos jQuery para alternar la clase en el body
    $('body').toggleClass('dark-mode');

    // Opcional: Cambiar el icono de luna a sol usando jQuery
    const icono = $('.dark-mode-btn i');
    if ($('body').hasClass('dark-mode')) {
      icono.removeClass('bi-moon').addClass('bi-sun');
    } else {
      icono.removeClass('bi-sun').addClass('bi-moon');
    }
  }
}


