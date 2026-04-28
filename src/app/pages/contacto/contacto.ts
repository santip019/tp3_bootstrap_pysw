import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as jQuery from 'jquery';
const $ = (jQuery as any).default || jQuery;

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class ContactoComponent implements AfterViewInit {
  // Estados para la UI
  public isSubmitting: boolean = false;
  public showSuccess: boolean = false;

  public plans: string[] = [
    'Cruceros de Lujo',
    'Expediciones Árticas',
    'Retiros Espirituales',
    'Gastronomía de Autor'
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Referencias a los elementos con jQuery
    const $name = $('#name');
    const $email = $('#email');
    const $message = $('#message');
    const $form = $('#contactForm');

    // 1. Validación en tiempo real (.on('input') y .val())
    $name.on('input', () => {
      const val = String($name.val() || '').trim();
      const isValid = val.length >= 3 && /^[A-Za-zÑñÁÉÍÓÚáéíóú ]+$/.test(val);
      this.toggleClasses($name, isValid);
      this.checkFormValidity();
    });

    $email.on('input', () => {
      const val = String($email.val() || '').trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      this.toggleClasses($email, isValid);
      this.checkFormValidity();
    });

    $message.on('input', () => {
      const val = String($message.val() || '').trim();
      const isValid = val.length >= 10;
      this.toggleClasses($message, isValid);
      this.checkFormValidity();
    });
  }

  // Alterna las clases de validación de Bootstrap
  private toggleClasses($el: any, isValid: boolean) {
    if (isValid) {
      $el.addClass('is-valid').removeClass('is-invalid');
    } else {
      $el.addClass('is-invalid').removeClass('is-valid');
    }
  }

  // Habilita el botón solo si todo es válido
  private checkFormValidity() {
    const allValid = $('.is-valid').length === 3;
    if (allValid) {
      $('#btnSubmit').removeAttr('disabled');
    } else {
      $('#btnSubmit').attr('disabled', 'true');
    }
  }

  // 2. Envío con Spinner y 3. Modal de Confirmación
  submitContact(event: Event) {
    event.preventDefault(); // Evita recarga de página

    this.isSubmitting = true;
    this.cdr.detectChanges(); // Fuerza a Angular a mostrar el spinner inmediatamente
    
    $('#btnSubmit').attr('disabled', 'true');

    // Simulación de envío (2 segundos de carga)
    setTimeout(() => {
      this.isSubmitting = false;
      this.showSuccess = true;
      this.cdr.detectChanges(); // Actualiza para mostrar el modal

      // Resetear el formulario y estilos
      ($('#contactForm')[0] as HTMLFormElement).reset();
      $('.form-control').removeClass('is-valid is-invalid');
      $('#btnSubmit').attr('disabled', 'true');
    }, 2000);
  }

  closeSuccess() {
    this.showSuccess = false;
  }
}