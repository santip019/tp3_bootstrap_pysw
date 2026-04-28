import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import * as jQuery from 'jquery';
const $ = (jQuery as any).default || jQuery;

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto implements AfterViewInit {
  protected readonly plans = [
    'Cruceros de Lujo',
    'Expediciones Árticas',
    'Retiros Espirituales',
    'Gastronomía de Autor',
  ];

  protected name = '';
  protected email = '';
  protected plan = this.plans[0];
  protected message = '';
  protected submitted = false;
  protected showSuccess = false;

  ngAfterViewInit() {
    const nameInput = $('#name');
    const emailInput = $('#email');
    const messageInput = $('#message');

    nameInput.on('input', () => this.validateName(nameInput));
    emailInput.on('input', () => this.validateEmail(emailInput));
    messageInput.on('input', () => this.validateMessage(messageInput));
  }

  protected submitContact(form: NgForm) {
    this.submitted = true;

    if (form.invalid) {
      return;
    }

    const contactData = {
      name: this.sanitize(this.name),
      email: this.sanitize(this.email),
      plan: this.sanitize(this.plan),
      message: this.sanitize(this.message),
    };

    console.log('Contacto enviado:', contactData);
    this.showSuccess = true;
    this.submitted = false;
    form.resetForm({ plan: this.plans[0] });
    this.name = '';
    this.email = '';
    this.message = '';
    $('.form-control').removeClass('is-valid is-invalid');
  }

  protected closeSuccess() {
    this.showSuccess = false;
  }

  private sanitize(value: string) {
    return value.replace(/<[^>]*>/g, '').trim();
  }

  private validateName($element: any) {
    const value = String($element.val() ?? '').trim();
    this.name = this.sanitize(value);
    const valid = value.length >= 3 && /^[A-Za-zÑñÁÉÍÓÚáéíóú ]+$/.test(value);
    this.updateFieldState($element, valid);
  }

  private validateEmail($element: any) {
    const value = String($element.val() ?? '').trim();
    this.email = this.sanitize(value);
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    this.updateFieldState($element, valid);
  }

  private validateMessage($element: any) {
    const value = String($element.val() ?? '').trim();
    this.message = this.sanitize(value);
    const valid = value.length >= 10;
    this.updateFieldState($element, valid);
  }

  private updateFieldState($element: any, valid: boolean) {
    $element.toggleClass('is-valid', valid);
    $element.toggleClass('is-invalid', !valid);
  }
}

