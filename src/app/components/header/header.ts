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

  /** Cierra el dropdown de Bootstrap al hacer click en un item con routerLink */
  closeDropdown(dropdownLi: HTMLElement) {
    const toggle = dropdownLi.querySelector('[data-bs-toggle="dropdown"]') as HTMLElement;
    if (toggle) {
      // Obtiene la instancia de Bootstrap Dropdown y la cierra
      const bsDropdown = (window as any).bootstrap?.Dropdown?.getInstance(toggle);
      if (bsDropdown) {
        bsDropdown.hide();
      } else {
        // Fallback: quita clases manualmente si bootstrap no está disponible como módulo
        toggle.setAttribute('aria-expanded', 'false');
        dropdownLi.querySelector('.dropdown-menu')?.classList.remove('show');
        dropdownLi.classList.remove('show');
      }
    }
  }
}

