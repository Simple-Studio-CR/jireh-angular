import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Feedlots} from "../../../../models/feedlots";
import {AuthHTTPService} from "../../../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {FeedlotService} from "../../../../services/feedlot.service";
import {PageEvent} from "@angular/material/paginator";
import {Clients} from "../../../../models/clients";
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ControlReport} from "../../../../models/control-report";
import {ClientsService} from "../../../../services/clients.service";
import {ClientsBranchOffice} from "../../../../models/clients-branch-office";
import {ClientsWarehouse} from "../../../../models/clients-warehouse";
import {ControlReportService} from "../../../../services/control-report.service";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/utils";
import Swal from "sweetalert2";
import {Functions} from "../../functions";

@Component({
  selector: 'app-items',
  templateUrl: './cebadero-form.component.html',
  styleUrls: ['./cebadero-form.component.scss']
})
export class CebaderoFormComponent implements OnInit {
  feedlots: Feedlots[];
  controlReportForm: FormGroup;

  functions = new Functions();

  branch: ClientsBranchOffice[];
  warehouse: ClientsWarehouse[];

  form: FormGroup;
  branchIdForm: FormGroup;
  fl: FormArray;

  edit: boolean = false;
  editing: boolean = false;
  isNew: boolean = false;

  reportId: string | null;
  numberOfFeedLots: number;

  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;
  private idWarehouse: ClientsWarehouse | undefined | null;
  private crProv: JsonObject;

  constructor(
    private service: FeedlotService,
    private serviceControl: ControlReportService,
    private formBuilder: FormBuilder,
    public authHttpService: AuthHTTPService,
    private router: Router,
    private serviceClient: ClientsService,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('reportId') && sessionStorage.getItem('isNew')) {

      this.loadReportForm();
      this.editing = true;

      this.loadData();
    }
    if (sessionStorage.getItem('reportId') && !sessionStorage.getItem('isNew')) {

      this.loadReportForm();
      this.loadData();
    }

    if (!sessionStorage.getItem('reportId')) {
      this.isNew = true;
      this.editing = true;
      this.loadReportForm();
      this.firstStepsForNew();
    }

  }

  loadReportForm() {
    this.controlReportForm = new FormGroup({
      id: new FormControl(''),
      enabled: new FormControl(''),
      clients: new FormControl(''),
      clientName: new FormControl(''),
      clientAddress: new FormControl(''),
      warehouse: new FormControl(''),
      createAt: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      total: new FormControl(''),
    })
    this.branchIdForm = new FormGroup({
      branch: new FormControl('')
    })

    this.form = new FormGroup({
      fl: new FormArray([])
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      numberFeedlot: this.numberOfFeedLots + 1,
      idControlReport: this.reportId,
      idWarehouse: this.idWarehouse,
      eats: false,
      status: true,
      observations: ''
    })
  }

  addNewAddressGroup(): void {
    this.fl = this.form.get('fl') as FormArray;
    this.service.saveFeedlot(this.createItem().value).subscribe(newFl=>{
      this.numberOfFeedLots = this.numberOfFeedLots + 1
      this.cd.detectChanges();
    })
    this.crProv = {
      "id": this.reportId,
      "total": this.numberOfFeedLots + 1,
      "startTime": this.controlReportForm.controls.startTime.value
    }
    this.serviceControl.editControlReport(this.crProv).subscribe( updateCR=>{
      this.controlReportForm.patchValue({
        'total':this.numberOfFeedLots
      })
      this.cd.detectChanges();
    })
    this.fl.push(this.createItem());

  }

  getFlArray() {
    return this.form.get('fl') as FormArray;
  }

  firstStepsForNew() {
    let client: Clients | null = JSON.parse(<string>sessionStorage.getItem('client'));

    let day: string = new Date().getDay().toString()
    if (Number.parseInt(day) < 10) {
      day = '0' + day;
    }

    let month: string = new Date().getMonth().toString()
    if (Number.parseInt(month) < 10) {
      month = '0' + month;
    }

    this.serviceClient.branchFindByClient(client?.id).subscribe(b => {
      console.log(b, 'esto devuelve')
      this.branch = b.content as ClientsBranchOffice[];
      this.cd.detectChanges();
      this.branchIdForm.controls.branch.valueChanges.subscribe(brcn => {
        this.serviceClient.warehouseFindByBranchId(brcn.id, 1, 5000).subscribe(w => {
          this.warehouse = w.content as ClientsWarehouse[];
          this.controlReportForm.patchValue({
            clientName: client?.name,
            createAt: new Date().getFullYear() + '/' + month + '/' + day,
            clientAddress: this.branchIdForm.controls.branch.value.province.province + ', ' +
              this.branchIdForm.controls.branch.value.canton.canton + ', ' +
              this.branchIdForm.controls.branch.value.district.district+ ', ' +
              this.branchIdForm.controls.branch.value.neighborhood.neighborhood + ', ' +
              this.branchIdForm.controls.branch.value.addressDetails,
            startTime: this.functions.setTimeHour(),
            enabled: true,
            idClients: client?.id,
            total: 5
          })
          this.cd.detectChanges();
        })
      })
    })


  }

  deleteAddressGroup(index: number) {
    const add = this.form.get('fl') as FormArray;
    add.removeAt(index);
  }

  private rangePage() {
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  loadData() {
    let client: Clients | null = JSON.parse(<string>sessionStorage.getItem('client'));
    let reports: ControlReport | null = JSON.parse(<string>sessionStorage.getItem('reports'));
    this.reportId = sessionStorage.getItem('reportId')
    this.idWarehouse = reports?.warehouse;
    let branchId: number | undefined | null
    console.log(reports)

    this.branchIdForm.patchValue({
      branch: reports?.warehouse.branchId.name
    })
    this.cd.detectChanges()

    this.controlReportForm.patchValue({
      idClients: client?.id,
      clientName: reports?.clientName,
      clientAddress:  reports?.clientAddress
    })

    this.controlReportForm.patchValue({
      id: reports?.id,
      warehouse: reports?.warehouse.name,
      createAt: reports?.createAt.slice(0, 10),
      startTime: reports?.startTime,
      endTime: reports?.endTime,
      total: reports?.total
    })


    // @ts-ignore
    this.service.findByControlReport(reports?.id).subscribe(feed => {
      this.feedlots = feed as Feedlots[];
      this.numberOfFeedLots = feed.length;
      for (let i = 0; i < this.numberOfFeedLots; i++) {
        this.fl = this.form.get('fl') as FormArray;
        this.fl.push(
          this.formBuilder.group({
            id: feed[i].id,
            numberFeedlot: feed[i].numberFeedlot,
            eats: feed[i].eats,
            status: feed[i].status,
            observations: feed[i].observations
          })
        )
        this.cd.detectChanges();
      }

    })

  }

  enableEdit() {
    this.editing = true;
  }

  save() {
    this.controlReportForm.patchValue({
      // @ts-ignore
      clients: JSON.parse(sessionStorage.getItem('client'))
    })
    let crForm = this.controlReportForm.value;
    let feedLotProv: JsonObject;
    console.log(crForm, 'form del header')
    this.serviceControl.saveControlReport(crForm).subscribe(cr => {
      this.cd.detectChanges();
      console.log(cr, 'lo que responde el back')
      for (let i = 0; i < crForm.total; i++) {
        feedLotProv = {
          "controlReport": cr,
          "warehouse": crForm.warehouse,
          "numberFeedlot": i + 1,
          "type": crForm.type,
          "eats": 'X',
          "status": 'X',
          "observations": ""
        }
        console.log(feedLotProv, ' feedlot')
        this.service.saveFeedlot(feedLotProv).subscribe(newFL => {
          this.cd.detectChanges();
        })
        sessionStorage.setItem('reports', JSON.stringify(cr))
        sessionStorage.setItem('reportId', cr.id)
        this.cd.detectChanges();
      }
    })

    this.edit = false;
    this.cd.detectChanges();
    this.router.navigate(['reports/cebadero/form'])
    sessionStorage.setItem('isNew', 'true');

    Swal.fire({
      title: 'Se creo correctamente el reporte',
      timerProgressBar: true,
      confirmButtonText: 'Ok',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        window.location.reload()
      }
    })
  }

  saveFeedLots() {

    this.crProv = {
      "id": this.reportId,
      "total": this.numberOfFeedLots,
      "startTime": this.controlReportForm.controls.startTime.value,
      "endTime": this.functions.setTimeHour(),
    }

    for (let i = 1; i <= this.numberOfFeedLots; i++) {
      this.service.editFeedlot(this.form.controls.fl.value[i - 1]).subscribe();
    }
    this.serviceControl.editControlReport(this.crProv).subscribe(crEdit =>{
      this.cd.detectChanges()
    })

    sessionStorage.removeItem('isNew')

    Swal.fire({
      title: 'Se editaron correctamente los cebaderos',
      timerProgressBar: true,
      confirmButtonText: 'Ok',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        window.location.reload()
      }
    })
  }

  generatePDF() {
    let id: any = this.controlReportForm.controls.id.value
    this.service.genereatePDF(id).subscribe(pdf=>{
      console.log(pdf)
      }
    )
  }
}
