/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-cebadero_blanco',
  templateUrl: './modal-cebadero-blanco.component.html',
  styleUrls: ['./modal-cebadero-blanco.component.scss'],
})export class ModalCebaderoBlancoComponent {
  // @ts-ignore
  @Input() name;
  constructor(public activeModal: NgbActiveModal) {}
}
