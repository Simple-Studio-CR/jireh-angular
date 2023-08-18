/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {Cebadero} from "../../../../../models/cebadero";
import {ClientsBranchOffice} from "../../../../../models/clients-branch-office";
import {ClientsWarehouse} from "../../../../../models/clients-warehouse";
import {CebaderosService} from "../../../../../services/cebadero.service";
import {ClientsBranchesService} from "../../../../../services/clients-branches.service";
import {ClientsWarehouseService} from "../../../../../services/clients-warehouse.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-solo-uno',
  templateUrl: './modal-solo-uno.component.html',
  styleUrls: ['./modal-solo-uno.component.scss']
})
export class ModalSoloUnoComponent implements OnInit {

  nuevoCebaderoForm: FormGroup;
  clientId: any;
  branchId: any;
  branches: ClientsBranchOffice[];
  warehouse: ClientsWarehouse[];

  // @ts-ignore
  @Input() name;
  @Input() date: String;
  @Input() cebadero: number;
  @Output() cebaderoCreated: EventEmitter<Cebadero> = new EventEmitter<Cebadero>();


  constructor(public activeModal: NgbActiveModal,
              private service: CebaderosService,
              private branchService: ClientsBranchesService,
              private wareHouseService: ClientsWarehouseService,
              private cd: ChangeDetectorRef,) {
  }

  ngOnInit(): void {
    this.initForm();
    this.findBranches();
    this.initDate();
    console.log(this.date, ' en el modal ');
  }

  initForm() {
    this.nuevoCebaderoForm = new FormGroup({
      branchOffice: new FormControl(''),
      warehouse: new FormControl(''),
      cebadero: new FormControl(''),
      consumo: new FormControl(''),
      createAt: new FormControl(''),
    });
  }

  initDate(){
    this.nuevoCebaderoForm.get('createAt')?.setValue(this.date);
    this.nuevoCebaderoForm.get('cebadero')?.setValue(this.cebadero);
    this.cd.detectChanges();
  }

  handleCebaderoCreated(cebadero: Cebadero) {
    console.log('Cebadero creado:', cebadero);
    // Aquí puedes agregar la lógica que quieras para manejar el nuevo Cebadero
  }


  guardar() {
    console.log(this.nuevoCebaderoForm.value);
    this.service.saveCebadero(this.nuevoCebaderoForm.value).subscribe( c => {
      this.cebaderoCreated.emit(c);
      this.activeModal.close();
      swal.fire('Cebadero creado', `Cebadero ${c.cebadero} creado con exito`, 'success');
    })
  }

  findBranches() {
    this.clientId = sessionStorage.getItem('clientId');
    this.branchService.findByClientId(Number.parseInt(this.clientId), 1, 200).subscribe(
      c => {
        this.branches = c.content;
        this.cd.detectChanges();
        this.nuevoCebaderoForm.controls.branchOffice.valueChanges.subscribe(b => {
          this.wareHouseService.findByBranchId(Number.parseInt(b.id), 1, 200).subscribe(w => {
            this.warehouse = w.content;
            this.cd.detectChanges();
          })
        });
      });
  }
}
