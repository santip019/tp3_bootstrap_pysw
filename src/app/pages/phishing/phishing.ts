import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

// Declaramos jQuery para que TypeScript no de error
declare var $: any;

@Component({
  selector: 'app-phishing',
  // imports: [FormsModule],
  imports: [],
  templateUrl: './phishing.html',
  styleUrl: './phishing.css',
})

export class Phishing {

  // =====Variables de Angular que se usaban con @if en el template =====
  // mensajeTarjeta: string = '';
  // mensajeExpiracion: string = '';
  // mensajecodigo: string = '';
  // mensajeNombre: string = '';

  constructor(private router: Router) { }

  //jQuery: Se ejecuta cuando el componente termina de renderizar
  ngAfterViewInit() {

    // Mensajes de advertencia: Al hacer focus (reemplaza (focus) y (blur) de Angular)
    const mensajes: { [key: string]: { id: string, texto: string } } = {
      '#numeroTarjeta': {
        id: '#msg-tarjeta',
        texto: 'No es bueno compartir el numero de tarjeta de credito! Y menos en sitios no verificados'
      },
      '#expiracion': {
        id: '#msg-expiracion',
        texto: 'Antes de introducir tus datos verifica que el sitio web sea seguro.'
      },
      '#codigo': {
        id: '#msg-codigo',
        texto: 'Ningun Banco te pedira tu contraseña, ni tu codigo de seguridad.'
      },
      '#nombre': {
        id: '#msg-nombre',
        texto: 'Si te llegan correos pidiendote tus datos personales, no compartas tu informacion. Reportalos. Ninguna institucion bancaria te pedira tus datos por correo electronico.'
      }
    };

    // jQuery: mostrar/ocultar mensajes: al focus/blur
    $.each(mensajes, (selector: string, config: { id: string, texto: string }) => {
      $(selector).on('focus', () => {
        $(config.id).text(config.texto).removeClass('d-none');
      });
      $(selector).on('blur', () => {
        $(config.id).addClass('d-none');
      });
    });

    // Validación en tiempo real jQuery (se agrega is-valid / is-invalid)
    $('#payment-form input, #payment-form select').on('input change', function(this: HTMLInputElement) { //this: HTMLInputElement es una declaracion de tipo y payment-form es un id que seleccionamos de HTML
      if (this.checkValidity()) { //checkValidity() es un metodo de HTMLInputElement que valida el input
        $(this).addClass('is-valid').removeClass('is-invalid'); //addClass() y removeClass() son metodos de jQuery que agregan y remueven clases de CSS
      } else { //si no es valido
        $(this).addClass('is-invalid').removeClass('is-valid');
      }
    });

    // Sanitización simple para evitar XSS básico
    function sanitizar(texto: string): string {
      return texto.replace(/[<>'"]/g, '');
    }

    //Envío del formulario (reemplazo (submit) de Angular)
    $('#payment-form').on('submit', (e: any) => {
      e.preventDefault(); // Evita que el form se envíe de verdad

      const form = document.getElementById('payment-form') as HTMLFormElement;

      if (form.checkValidity()) {
        // Sanitizar el email
        const email = sanitizar($('#correo').val() || '');
        console.log('Email procesado:', email);

        // Abrir modal de confirmación
        const modal = new bootstrap.Modal($('#enviar')[0]);
        modal.show();
      } else {
        // Mostrar mensaje de error
        $('#error-msg').removeClass('d-none').fadeIn();
        setTimeout(() => $('#error-msg').fadeOut(() => {
          $('#error-msg').addClass('d-none');
        }), 3000);

        // Marcar campos inválidos
        $('#payment-form input, #payment-form select').each(function(this: HTMLInputElement) {
          if (!this.checkValidity()) {
            $(this).addClass('is-invalid');
          }
        });
      }
    });

    //Botón cancelar (reemplaza (click)="cancelar()" de Angular)
    $('#btn-cancelar').on('click', () => {
      this.router.navigate(['/home']);
    });

    //Botón cancelar del modal
    $('#modal-cancelar').on('click', () => {
      this.router.navigate(['/home']);
    });

    //Botón enviar del modal (feedback de éxito)
    $('#modal-enviar').on('click', () => {
      // Cerrar el modal
      const modal = bootstrap.Modal.getInstance($('#enviar')[0]);
      if (modal) modal.hide();

      // Mostrar mensaje de éxito fadeIn/fadeOut
      $('#exito-msg').removeClass('d-none').fadeIn();
      setTimeout(() => $('#exito-msg').fadeOut(() => {
        $('#exito-msg').addClass('d-none');
      }), 3000);

      // Resetear el formulario y las clases de validación
      ($('#payment-form')[0] as HTMLFormElement).reset();
      $('#payment-form input, #payment-form select').removeClass('is-valid is-invalid');
    });
  }

  // ===== Métodos de Angular  =====
  // Los reemplazamos por jQuery en ngAfterViewInit()

  // mostrarMensajeTarjeta() {
  //   this.mensajeTarjeta = 'No es bueno compartir el numero de tarjeta de credito! Y menos en sitios no verificados';
  // }
  //
  // mostrarMensajeExpiracion() {
  //   this.mensajeExpiracion = 'Antes de introducir tus datos verifica que el sitio web sea seguro.';
  // }
  //
  // mostrarMensajecodigo() {
  //   this.mensajecodigo = 'Ningun Banco te pedira tu contraseña, ni tu codigo de seguridad.';
  // }
  //
  // mostrarMensajeNombre() {
  //   this.mensajeNombre = 'Si te llegan correos pidiendote tus datos personales, no compartas tu informacion. Reportalos. Ninguna institucion bancaria te pedira tus datos por correo electronico.';
  // }
  //
  // limpiarMensajeTarjeta() { this.mensajeTarjeta = ''; }
  // limpiarMensajeExpiracion() { this.mensajeExpiracion = ''; }
  // limpiarMensajecodigo() { this.mensajecodigo = ''; }
  // limpiarMensajeNombre() { this.mensajeNombre = ''; }
  //
  // cancelar() {
  //   this.router.navigate(['/home']);
  // }
}

//Parte de Html pero de Angular
// <input type="number" class="form-control" id="numeroTarjeta" name="numeroTarjeta" placeholder="1234 5678 9012 3456" ngModel required (focus)="mostrarMensajeTarjeta()" (blur)="limpiarMensajeTarjeta()"/> 
//                     @if (mensajeTarjeta) {
//                     <p class="alerta-roja">{{ mensajeTarjeta }}</p>
//                     }

// <input type="text" class="form-control" id="expiracion" name="expiracion" ngModel required (focus)="mostrarMensajeExpiracion()" (blur)="limpiarMensajeExpiracion()"/>
//                     @if (mensajeExpiracion) {
//                     <p class="alerta-roja">{{ mensajeExpiracion }}</p>
//                     }

// <input type="number" class="form-control" id="codigo" name="codigo" ngModel required (focus)="mostrarMensajecodigo()" (blur)="limpiarMensajecodigo()"/>
//                     @if (mensajecodigo) {
//                     <p class="alerta-roja">{{ mensajecodigo }}</p>
//                     }

// <input type="text" class="form-control" id="nombre" name="nombre" ngModel required (focus)="mostrarMensajeNombre()" (blur)="limpiarMensajeNombre()"/>
//                     @if (mensajeNombre) {
//                     <p class="alerta-roja">{{ mensajeNombre }}</p>
//                     }


// Declaramos bootstrap para usar los modals desde jQuery
declare var bootstrap: any;