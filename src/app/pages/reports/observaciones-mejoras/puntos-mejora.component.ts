import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ClientsBranchOffice} from "../../../models/clients-branch-office";
import {ClientsWarehouse} from "../../../models/clients-warehouse";
import {Calificacion} from "../../../models/calificacion";
import {PestType} from "../../../models/pest-type";
import {FormControl, FormGroup} from "@angular/forms";
import {ClientsBranchesService} from "../../../services/clients-branches.service";
import {ClientsWarehouseService} from "../../../services/clients-warehouse.service";
import {PuntosMejora} from "../../../models/puntos-mejora";
import {PuntosMejoraService} from "../../../services/puntos-mejora.service";
import {FunctionsService} from "../../common/functions.service";
import {IncidenciasPlagasMensual} from "../../../models/incidencias-plagas-mensual";
import swal from "sweetalert2";

@Component({
  selector: 'app-puntos-mejora',
  templateUrl: './puntos-mejora.component.html',
  styleUrls: ['./puntos-mejora.component.scss']
})
export class PuntosMejoraComponent implements OnInit{

  clientId: any;
  branchId: any;
  branches: ClientsBranchOffice[];
  warehouse: ClientsWarehouse[];
  calificaciones: Calificacion[];
  pestType: PestType[];
  puntoMejoraNuevo: PuntosMejora[];
  puntoMejoraLista: PuntosMejora[];
  form: FormGroup;
  puntosMejora: FormGroup;
  range: FormGroup;

  functions: FunctionsService = new FunctionsService();


  constructor(private service: PuntosMejoraService,
              private branchService: ClientsBranchesService,
              private wareHouseService: ClientsWarehouseService,
              private cd: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.findBranches();
    this.iniciarForms();
    this.setFechaHoy();
  }

  guardar() {
    this.service.save(this.puntosMejora.value).subscribe(iF => {
      swal.fire({
        title: 'Punto de mejora registrado' + ` ${iF.puntosDeMejora}`,
        text: 'Se ha registrado el punto de mejora',
        icon: 'success',
        confirmButtonText: 'Listo'
      }).then((result) => {
        if (result.isConfirmed) {
          this.puntosMejora.reset();
          this.setFechaHoy();
        }
      })
    })
  }

  iniciarForms() {
    this.range = new FormGroup({
      month: new FormControl(''),
      branch: new FormControl(''),
    });
    this.puntosMejora = new FormGroup({
      branchOffice: new FormControl(''),
      createAt: new FormControl(''),
      warehouse: new FormControl(''),
      puntosDeMejora: new FormControl(''),
      observaciones: new FormControl(''),
      otrasLabores: new FormControl(''),
    })
  }

  cargarDatos() {
    let month = this.range.get('month')?.value;
    let branchId = this.range.get('branch')?.value;
    this.puntoMejoraLista = [];
    if(month == 0){
      this.service.findByYear(branchId.id, this.functions.anioActual()).subscribe(all => {
        this.puntoMejoraLista = all as PuntosMejora[];
        this.cd.detectChanges();
      })
    }
    if(month != 0){
      this.service.findByDate(branchId.id, month).subscribe(all => {
        this.puntoMejoraLista = all as PuntosMejora[];
        this.cd.detectChanges();
      })
    }
  }

  findBranches() {
    this.clientId = sessionStorage.getItem('clientId');
    this.branchService.findByClientId(Number.parseInt(this.clientId), 1, 200).subscribe(
      c => {
        this.branches = c.content;
        this.cd.detectChanges();
        this.puntosMejora.controls.branchOffice.valueChanges.subscribe(b => {
          this.wareHouseService.findByBranchId(Number.parseInt(b.id), 1, 200).subscribe(w => {
            this.warehouse = w.content;
            this.cd.detectChanges();
          })
        })
      })
  }

  private setFechaHoy() {
    this.puntosMejora.get('createAt')?.setValue(this.functions.fechaActual());
    this.range.get('start')?.setValue(this.functions.primerDiaMes());
    this.range.get('end')?.setValue(this.functions.ultimoDiaMes());

    // @ts-ignore
    this.service.findByDateRange(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')),
      this.functions.primerDiaMes(),
      this.functions.ultimoDiaMes()).subscribe(all => {
      this.puntoMejoraNuevo = all as PuntosMejora[];
      this.cd.detectChanges();
    })
  }

  eliminar(iM: any) {

  }

  editar(iM: any) {

  }
}
