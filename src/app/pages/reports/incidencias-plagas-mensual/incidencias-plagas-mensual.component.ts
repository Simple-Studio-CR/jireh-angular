import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {IncidenciaPlagaMensualService} from "../../../services/incidencia-plaga-mensual.service";
import {ClientsBranchesService} from "../../../services/clients-branches.service";
import {ClientsWarehouseService} from "../../../services/clients-warehouse.service";
import {ClientsBranchOffice} from "../../../models/clients-branch-office";
import {ClientsWarehouse} from "../../../models/clients-warehouse";
import {FormControl, FormGroup} from "@angular/forms";
import {IncidenciasPlagasMensual} from "../../../models/incidencias-plagas-mensual";
import {PestType} from "../../../models/pest-type";
import {ExtrasService} from "../../../services/extras.service";
import {Calificacion} from "../../../models/calificacion";
import {LamparasCapturasMes} from "../../../models/lamparas-capturas-mes";
import {FunctionsService} from "../../common/functions.service";

@Component({
  selector: 'incidencias-plagas-mensuales-component',
  templateUrl: 'incidencias-plagas-mensual.component.html',
  styleUrls: ['incidencias-plagas-mensual.component.scss'],
})
export class IncidenciasPlagasMensualComponent implements OnInit {

  clientId: any;
  branchId: any;
  branches: ClientsBranchOffice[];
  warehouse: ClientsWarehouse[];
  calificaciones: Calificacion[];
  pestType: PestType[];

  incidenciasNueva: IncidenciasPlagasMensual[];
  form: FormGroup;
  inicidenciasForm: FormGroup;
  range: FormGroup;
  functions: FunctionsService = new FunctionsService();

  constructor(
    private service: IncidenciaPlagaMensualService,
    private pestTypeService: ExtrasService,
    private branchService: ClientsBranchesService,
    private wareHouseService: ClientsWarehouseService,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.findBranches();
    this.iniciarForms();
    this.cargarDatos();
    this.setFechaHoy();
  }

  guardar() {
    this.service.save(this.inicidenciasForm.value).subscribe(iF => {
      console.log(iF)
    })

  }

  iniciarForms() {
    this.form = new FormGroup({})
    this.inicidenciasForm = new FormGroup({
      branchOffice: new FormControl(''),
      createAt: new FormControl(''),
      warehouse: new FormControl(''),
      pestType: new FormControl(''),
      cuantificacion: new FormControl(''),
      calificacion: new FormControl(''),
      observaciones: new FormControl(''),
    })
  }

  cargarDatos() {

    let today = new Date();
    let todayString = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay();

    // @ts-ignore
    this.service.findByDate(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')), todayString).subscribe(all => {
      this.incidenciasNueva = all as IncidenciasPlagasMensual[];
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
          this.incidenciasNueva = all as IncidenciasPlagasMensual[];
          console.log(date, 'fecha')
          this.cd.detectChanges();
        })
      }
      if (date.end != null && date.start != null) {
        // @ts-ignore
        this.service.findByDateRange(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')), date.start, date.end).subscribe(all => {
          this.incidenciasNueva = all as IncidenciasPlagasMensual[];
          this.cd.detectChanges();
        })
      }
    })


  }

  private setFechaHoy() {
    this.inicidenciasForm.get('createAt')?.setValue(this.functions.fechaActual());
    this.range.get('start')?.setValue(this.functions.primerDiaMes());
    this.range.get('end')?.setValue(this.functions.ultimoDiaMes());

    // @ts-ignore
    this.service.findByDateRange(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')),
      this.functions.primerDiaMes(),
      this.functions.ultimoDiaMes()).subscribe(all => {
      this.incidenciasNueva = all as IncidenciasPlagasMensual[];
      console.log(this.incidenciasNueva)
      this.cd.detectChanges();
    })
  }

  findBranches() {
    this.clientId = sessionStorage.getItem('clientId');
    this.branchService.findByClientId(Number.parseInt(this.clientId), 1, 200).subscribe(
      c => {
        this.branches = c.content;
        this.cd.detectChanges();
        this.inicidenciasForm.controls.branchOffice.valueChanges.subscribe(b => {
          this.wareHouseService.findByBranchId(Number.parseInt(b.id), 1, 200).subscribe(w => {
            this.warehouse = w.content;
            this.cd.detectChanges();
          })
        })
      })

    this.pestTypeService.getPestType().subscribe(pt => {
      this.pestType = pt
      this.cd.detectChanges();
      console.log(pt)
      this.inicidenciasForm.controls.pestType.valueChanges.subscribe(value => {
        this.pestTypeService.getCalificaciones(value.id).subscribe(calif => {
          this.calificaciones = calif
          this.cd.detectChanges();
        })
      })
    })
  }
}
