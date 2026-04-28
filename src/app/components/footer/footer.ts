import { Component, AfterViewInit, ElementRef } from '@angular/core';

declare var $: any; // Declaramos jQuery

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Esperamos a que el DOM del componente esté completamente listo
    setTimeout(() => this.initEmailValidation(), 100);
  }

  private initEmailValidation(): void {
    const host = this.el.nativeElement;

    // Regex para validar formato de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

    // Usamos jQuery buscando dentro del host del componente
    const $input = $(host).find('#footerEmail');
    const $feedback = $(host).find('#emailFeedback');
    const $btn = $(host).find('#btnSubscribe');
    const $form = $(host).find('#subscribeForm');
    const $success = $(host).find('#subscribeSuccess');

    console.log('[Footer] jQuery init - input found:', $input.length);

    // ─── Validación en tiempo real con jQuery (keyup + input) ───
    $input.on('keyup input', function (this: HTMLElement) {
      const valor = $(this).val()?.toString().trim() || '';

      if (valor.length === 0) {
        // Campo vacío: limpiar feedback
        $feedback.text('').css('color', '');
        $(this).css({ 'border-color': '', 'box-shadow': '' });
        $btn.prop('disabled', false);
        return;
      }

      if (emailRegex.test(valor)) {
        // Email válido ✔
        $feedback.text('✔ Correo electrónico válido').css('color', '#4cdf7a');
        $(this).css({
          'border-color': '#4cdf7a',
          'box-shadow': '0 0 0 2px rgba(76, 223, 122, 0.25)'
        });
        $btn.prop('disabled', false);
      } else {
        // Email inválido ✘
        $feedback.text('✘ Ingresa un correo válido (ej: nombre@dominio.com)').css('color', '#ff9f43');
        $(this).css({
          'border-color': '#ff9f43',
          'box-shadow': '0 0 0 2px rgba(255, 159, 67, 0.25)'
        });
        $btn.prop('disabled', true);
      }
    });

    // ─── Manejo del envío del formulario ───
    $form.on('submit', function (this: HTMLElement, e: Event) {
      e.preventDefault();
      const valor = $input.val()?.toString().trim() || '';

      if (!emailRegex.test(valor)) {
        $input.trigger('focus');
        return;
      }

      // Mostrar mensaje de éxito con animación jQuery
      $success.slideDown(300);
      $input.val('').css({ 'border-color': '', 'box-shadow': '' });
      $feedback.text('').css('color', '');
      $btn.prop('disabled', false);

      // Ocultar el mensaje después de 4 segundos
      setTimeout(() => {
        $success.slideUp(300);
      }, 4000);
    });
  }
}
