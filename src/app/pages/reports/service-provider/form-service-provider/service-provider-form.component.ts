import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ServiceProvider} from "../../../../models/service-provider";
import {ServiceProviderService} from "../../../../services/service-provider.service";
import {AuthHTTPService} from "../../../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {ClientsService} from "../../../../services/clients.service";
import {Functions} from "../../functions";
import {Clients} from "../../../../models/clients";
import {ClientsBranchOffice} from "../../../../models/clients-branch-office";
import {ClientsWarehouse} from "../../../../models/clients-warehouse";
import Swal from "sweetalert2";

@Component({
    selector: 'app-items',
    templateUrl: './service-provider-form.component.html',
    styleUrls: ['./service-provider-form.component.scss']
})
export class ServiceProviderFormComponent implements OnInit {
    serviceProviderDocument: ServiceProvider[];
    branch: ClientsBranchOffice[];
    warehouse: ClientsWarehouse[];

    serviceProviderForm: FormGroup;


    functions = new Functions();

    serviceProviderId: string | null;

    edit: boolean = false;
    editing: boolean = false;
    isNew: boolean = false;
    totalRegister = 0;
    pageNo = 0;
    pageSize = 10;
    warehouseId: string | undefined | null;
    identifierGenerate: string | undefined | null;

    constructor(
        private providerService: ServiceProviderService,
        private formBuilder: FormBuilder,
        private serviceControl: ServiceProviderService,
        public authHttpService: AuthHTTPService,
        private router: Router,
        private serviceClient: ClientsService,
        private cd: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        console.log(this.functions.setTimeHour());

        if (sessionStorage.getItem('serviceReportId') && sessionStorage.getItem('isNew')) {

        }
        if (sessionStorage.getItem('serviceReportId') && !sessionStorage.getItem('isNew')) {
            this.loadReportForm();
            this.loadData();

        }
        if (!sessionStorage.getItem('serviceReportId')) {
            this.loadReportForm();
            this.firstSteps();
            this.generateIdentifier();
            this.editing = true;
            this.isNew = true;

        }
    }

    loadReportForm() {
        this.serviceProviderForm = new FormGroup({
            enabled: new FormControl(''),
            clientId: new FormControl(sessionStorage.getItem('clientId')),
            clientName: new FormControl(''),
            clientAddress: new FormControl(''),
            warehouseId: new FormControl(''),
            createAt: new FormControl(''),
            startTime: new FormControl(''),
            endTime: new FormControl(''),
            fumigationFrequency: new FormControl(''),
            identifier: new FormControl(''),
            branchIdForm: new FormControl(''),
        })
    }

    generateIdentifier() {
        let clientId: string | null = sessionStorage.getItem('clientId');
        let splitted: any
        this.serviceControl.getServiceProvider(clientId, this.pageNo + 1, 100)
            .subscribe(listSP => {
                console.log(listSP)
                if(listSP.length > 0) {
                    for (let i = 0; i < listSP.length; i++) {
                        this.identifierGenerate = listSP[i].identifier;
                        console.log(this.identifierGenerate, 'el ultimo')
                        splitted = this.identifierGenerate?.split('-', 3)
                        console.log(splitted, 'splited')
                    }
                    let a = Number.parseInt(splitted[2]) + 1;
                    this.serviceProviderForm.patchValue({
                        identifier: splitted[0] + '-' + splitted[1] + '-' + a.toString()
                    })
                    this.cd.detectChanges();
                }else {
                    let name:string | any = sessionStorage.getItem('clientName')?.toString()
                    splitted = 'SP-' + name.substring(0, 3) + '-1'
                    this.serviceProviderForm.patchValue({
                        identifier: splitted
                    })
                    this.cd.detectChanges();
                }
            })
    }

    loadData() {
        let client: Clients | null = JSON.parse(<string>sessionStorage.getItem('client'));
        let reports: ServiceProvider | null = JSON.parse(<string>sessionStorage.getItem('serviceReport'));

        this.serviceProviderId = sessionStorage.getItem('serviceReportId')
        this.warehouseId = reports?.warehouseId;
        let branchId: string | undefined | null

        this.serviceProviderForm.patchValue({
            warehouseId: reports?.warehouseId,
            clientId: client?.id,
            clientName: client?.name,
            clientAddress: client?.province + ', ' + client?.canton + ', ' + client?.district + ', ' + client?.neigh,

        })

        this.serviceProviderForm.patchValue({

            idWarehouse: reports?.warehouseId,
            createAt: reports?.createAt.slice(0, 10),
            startTime: reports?.startTime,
            endTime: reports?.endTime,
            identifier: reports?.identifier
        })

        //se busca la informacion de la bodega por el id de bodega, para obtener el id de la sucursal
        this.serviceClient.warehouseFindById(this.warehouseId).subscribe(warehouseById => {
            branchId = warehouseById.branchId

            //se busca las sucursales por el id del cliente para obtener todas las sucursales del cliente
            this.serviceClient.branchFindByClient(client?.id).subscribe(brancesByClientId => {
                this.branch = brancesByClientId as ClientsBranchOffice[];

                //se buscan todas las bodegas del cliente para colocar el la lista
                this.serviceClient.warehouseFindByBranchId(branchId).subscribe(w => {
                    this.warehouse = w as ClientsWarehouse[];

                    //se busca obtiene los datos de la sucursal seleccionada
                    this.serviceClient.branchFindById(branchId).subscribe(branchSelected => {
                        this.serviceProviderForm.patchValue({
                            branchIdForm: branchSelected.id,
                            warehouseId: warehouseById.id
                        })
                        this.cd.detectChanges();
                    })
                })
                this.cd.detectChanges();
            })


        })

    }

    firstSteps() {
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
            console.log(b, ' branch')
            this.branch = b as ClientsBranchOffice[];
            this.cd.detectChanges();
            this.serviceProviderForm.controls.branchIdForm.valueChanges.subscribe(brcn => {
                this.serviceClient.warehouseFindByBranchId(brcn.id).subscribe(w => {
                    this.warehouse = w as ClientsWarehouse[];
                    console.log(this.warehouse)
                    this.serviceProviderForm.patchValue({
                        clientName: client?.name,
                        createAt: new Date(),
                        clientAddress: this.serviceProviderForm.controls.branchIdForm.value.province + ', ' +
                            this.serviceProviderForm.controls.branchIdForm.value.canton + ', ' +
                            this.serviceProviderForm.controls.branchIdForm.value.district + ', ' +
                            this.serviceProviderForm.controls.branchIdForm.value.neighborhood + ', ' +
                            this.serviceProviderForm.controls.branchIdForm.value.addressDetails,
                        startTime: this.functions.setTimeHour(),
                        enabled: true,
                        idClients: client?.id,
                    })
                    this.cd.detectChanges();
                })
            })
        })
    }

    save() {
        this.cd.detectChanges()
        this.serviceControl.saveServiceProvider(this.serviceProviderForm.value).subscribe(res => {
            console.log(res.ServiceProvider, 'res')
            sessionStorage.setItem('serviceReportId', res.ServiceProvider.id)
            sessionStorage.setItem('serviceReport', JSON.stringify(res.ServiceProvider));
            sessionStorage.removeItem('isNew')
            this.cd.detectChanges();
            Swal.fire('Creado con éxito,', '', 'success')
            this.cd.detectChanges();
            window.location.reload();
        })
    }

    enableEdit() {

    }

    session(type: string) {

    }
}
