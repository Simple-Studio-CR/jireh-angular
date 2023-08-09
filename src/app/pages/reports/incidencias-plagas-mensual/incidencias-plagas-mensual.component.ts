import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
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
import {FunctionsService} from "../../common/functions.service";
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from "@angular/cdk/a11y";


@Component({
  selector: 'incidencias-plagas-mensuales-component',
  templateUrl: 'incidencias-plagas-mensual.component.html',
  styleUrls: ['incidencias-plagas-mensual.component.scss'],
})
export class IncidenciasPlagasMensualComponent implements OnInit, AfterViewInit {

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
  displayedColumns: string[] = ['warehouse', 'createAt', 'pestType', 'cuantificacion', 'calificacion', 'observaciones', 'acciones'];
  dataSource: MatTableDataSource<IncidenciasPlagasMensual>;

  constructor(
    private service: IncidenciaPlagaMensualService,
    private pestTypeService: ExtrasService,
    private branchService: ClientsBranchesService,
    private wareHouseService: ClientsWarehouseService,
    private cd: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }


  ngOnInit(): void {
    this.findBranches();
    this.iniciarForms();
    this.cargarDatos();
  }

  guardar() {
    this.service.save(this.inicidenciasForm.value).subscribe(iF => {
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

    // @ts-ignore
    this.service.findByDate(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')), this.functions.anioActual()).subscribe(all => {
      this.incidenciasNueva = all as IncidenciasPlagasMensual[];
      this.dataSource = new MatTableDataSource(this.incidenciasNueva);
      this.dataSource.sort = this.sort;
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
      this.inicidenciasForm.controls.pestType.valueChanges.subscribe(value => {
        this.pestTypeService.getCalificaciones(value.id).subscribe(calif => {
          this.calificaciones = calif
          this.cd.detectChanges();
        })
      })
    })
  }

  openDialog(iM: any) {

  }

  delete(iM: any) {

  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      this.cd.detectChanges();
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
