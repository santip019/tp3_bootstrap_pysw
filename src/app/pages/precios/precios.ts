import { Component, AfterViewInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-precios',
  imports: [],
  templateUrl: './precios.html',
  styleUrl: './precios.css',
})
export class Precios implements AfterViewInit {
  ngAfterViewInit(): void {
    // Inicializar tooltips de Bootstrap usando jQuery
    ($('[data-bs-toggle="tooltip"]') as any).tooltip();
  }
}
