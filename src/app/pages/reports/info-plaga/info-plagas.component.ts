import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ClientsBranchOffice} from "../../../models/clients-branch-office";
import {ClientsWarehouse} from "../../../models/clients-warehouse";
import {Calificacion} from "../../../models/calificacion";
import {PestType} from "../../../models/pest-type";
import {FormControl, FormGroup} from "@angular/forms";
import {ExtrasService} from "../../../services/extras.service";
import {ClientsBranchesService} from "../../../services/clients-branches.service";
import {ClientsWarehouseService} from "../../../services/clients-warehouse.service";
import {InfoPlagasService} from "../../../services/info-plagas.service";
import {InfoPlagas} from "../../../models/info-plagas";
import {LamparasCapturasMes} from "../../../models/lamparas-capturas-mes";
import {FunctionsService} from "../../common/functions.service";

@Component({
  selector: 'info-plaga-component',
  templateUrl: 'info-plagas.component.html',
  styleUrls: ['info-plagas.component.scss']
})export class InfoPlagasComponent implements OnInit{

  clientId: any;
  branchId: any;
  branches: ClientsBranchOffice[];
  warehouse: ClientsWarehouse[];
  calificaciones: Calificacion[];
  pestType: PestType[];
  infoNueva: InfoPlagas[];
  form: FormGroup;
  infoPlagas: FormGroup;
  range: FormGroup;

  functions: FunctionsService = new FunctionsService();

  constructor(private service: InfoPlagasService,
              private pestTypeService: ExtrasService,
              private branchService: ClientsBranchesService,
              private wareHouseService: ClientsWarehouseService,
              private cd: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.findBranches();
    this.iniciarForms();
    this.cargarDatos();
    this._setFechaHoy();
  }

  guardar() {
    this.service.save(this.infoPlagas.value).subscribe(iF => {
    })
  }

  iniciarForms() {
    this.form = new FormGroup({})
    this.infoPlagas = new FormGroup({
      branchOffice: new FormControl(''),
      createAt: new FormControl(''),
      warehouse: new FormControl(''),
      pestType: new FormControl(''),
      clasificacion: new FormControl(''),
      comportamiento: new FormControl(''),
      cicloDesarrollo: new FormControl(''),
      promedioVida: new FormControl(''),
    })
  }

  cargarDatos() {

    let today = new Date();
    let todayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // @ts-ignore
    this.service.findByDate(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')), todayString).subscribe(all => {
      this.infoNueva = all as InfoPlagas[];
      this.cd.detectChanges();
    })

    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });

    this.range.valueChanges.subscribe(date => {
      if (date.end == null) {
        // @ts-ignore
        this.service.findByDate(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')), date.start).subscribe(all => {
          this.infoNueva = all as InfoPlagas[];
          this.cd.detectChanges();
        })
      }
      if (date.end != null && date.start != null) {
        // @ts-ignore
        this.service.findByDateRange(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')), date.start, date.end).subscribe(all => {
          this.infoNueva = all as InfoPlagas[];
          this.cd.detectChanges();
        })
      }
    })
  }

   _setFechaHoy() {
    this.form.get('createAt')?.setValue(this.functions.fechaActual());
    this.range.get('start')?.setValue(this.functions.primerDiaMes());
    this.range.get('end')?.setValue(this.functions.ultimoDiaMes());

    // @ts-ignore
    this.service.findByDateRange(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')),
      this.functions.primerDiaMes(),
      this.functions.ultimoDiaMes()).subscribe(all => {
      this.infoNueva = all as InfoPlagas[];
      this.cd.detectChanges();
    })
  }

  findBranches() {
    this.clientId = sessionStorage.getItem('clientId');
    this.branchService.findByClientId(Number.parseInt(this.clientId), 1, 200).subscribe(
      c => {
        this.branches = c.content;
        this.cd.detectChanges();
        this.infoPlagas.controls.branchOffice.valueChanges.subscribe(b => {
          this.wareHouseService.findByBranchId(Number.parseInt(b.id), 1, 200).subscribe(w => {
            this.warehouse = w.content;
            this.cd.detectChanges();
          })
        })
      })

    this.pestTypeService.getPestType().subscribe(pt => {
      this.pestType = pt
      this.cd.detectChanges();
      this.infoPlagas.controls.pestType.valueChanges.subscribe(value => {
        this.pestTypeService.getCalificaciones(value.id).subscribe(calif => {
          this.calificaciones = calif
          this.cd.detectChanges();
        })
      })
    })
  }

  editar(r: any) {

  }

  eliminar(r: any) {

  }
}
