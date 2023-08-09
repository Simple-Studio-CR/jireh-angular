import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Clients} from 'src/app/models/clients';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AddressProvinceService} from "../../../services/address-province.service";
import {ClientsService} from "../../../services/clients.service";
import {Router} from "@angular/router";
import {AuthHTTPService} from "../../../modules/auth/services/auth-http";
import swal from "sweetalert2";
import {ClientsBranchesService} from "../../../services/clients-branches.service";
import {AddressProvince} from "../../../models/address-province";
import {AddressCanton} from "../../../models/address-canton";
import {AddressDistrict} from "../../../models/address-district";
import {AddressNeighborhood} from "../../../models/address-neighborhood";
import {PageEvent} from "@angular/material/paginator";
import {ClientsBranchOffice} from "../../../models/clients-branch-office";

enum ClientTabsEnum {
  CLIENT,
  BRANCHES,
}

@Component({
  selector: 'app-form-clients',
  templateUrl: './form-clients.component.html',
  styleUrls: ['./form-clients.component.scss']
})
export class FormClientsComponent implements OnInit {

  title = 'Nuevo Cliente';

  editedClient: Clients;
  listBranches: ClientsBranchOffice[];
  clientForm: FormGroup;

  clientTabsEnum = ClientTabsEnum;
  activeTab = this.clientTabsEnum.CLIENT;
  isUpdating = false;
  isEditing = false;
  isNew = false;
  idTypeLength: any;

  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;

  province: AddressProvince[];
  canton: AddressCanton[];
  district: AddressDistrict[];
  neigh: AddressNeighborhood[];


  constructor(private serviceProvince: AddressProvinceService,
              private service: ClientsService,
              private formBuilder: FormBuilder,
              public authService: AuthHTTPService,
              private branchesService: ClientsBranchesService,
              private addressService: AddressProvinceService,
              private router: Router,
              private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    sessionStorage.removeItem('branchId')
    sessionStorage.removeItem('branchName')
    sessionStorage.removeItem('branch')

    this.clientForm = new FormGroup({
      identification: new FormControl(''),
      typeOfId: new FormControl(''),
      name: new FormControl(''),
      mail: new FormControl(''),
      contact: new FormControl(''),
      scope: new FormControl(''),
      province: new FormControl(''),
      canton: new FormControl(''),
      district: new FormControl(''),
      neigh: new FormControl(''),
      address: new FormControl(''),
    })

    if (!(sessionStorage.getItem('clientId'))) {
      this.createClient();
    }

    if (sessionStorage.getItem('clientId')) {
      this.loadClient();
    }
    this.rangePage();
    this.loadIdType()
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  private rangePage() {
    let clientId = sessionStorage.getItem('clientId');
    this.branchesService.findByClientId(clientId, this.pageNo + 1, this.pageSize + 0).subscribe(branches => {
      this.listBranches = branches.content as ClientsBranchOffice[];
      this.totalRegister = branches.totalElements
      this.cd.detectChanges();
    })
  }

  setActiveTab(tabId: ClientTabsEnum) {
    this.activeTab = tabId;
  }

  onClientUpdate() {
    let clientForm: any
    // @ts-ignore
    let client: Clients = JSON.parse(sessionStorage.getItem('client'))
    this.serviceProvince.findProvinceById(this.clientForm.controls.province.value).subscribe(p => {
      this.serviceProvince.findCantonById(this.clientForm.controls.canton.value).subscribe(c => {
        this.serviceProvince.findDistrictById(this.clientForm.controls.district.value).subscribe(d => {
          this.serviceProvince.findNeightById(this.clientForm.controls.neigh.value).subscribe(n => {
            clientForm = {
              name: this.clientForm.controls.name.value,
              identification: this.clientForm.controls.identification.value,
              typeOfId: this.clientForm.controls.typeOfId.value,
              mail: this.clientForm.controls.mail.value,
              contact: this.clientForm.controls.contact.value,
              scope: this.clientForm.controls.scope.value,
              address: this.clientForm.controls.address.value,
              province: p,
              canton: c,
              district: d,
              neigh: n,
            }

            if (this.isEditing && !this.isNew) {
              this.isUpdating = true;
              this.service.updateClient(clientForm, sessionStorage.getItem('clientId')).subscribe(
                client => {
                  this.editedClient = client;
                  this.isUpdating = false;
                  swal.fire('Cliente Actualizado', 'El cliente se actualizó correctamente', 'success');
                  this.isNew = false;
                  this.isEditing = false;
                }
              );
            }
            if (this.isEditing && this.isNew) {
              this.service.save(clientForm).subscribe(client => {
                this.editedClient = client;
                this.isUpdating = false;
                this.isNew = false;
                this.isEditing = true;
                sessionStorage.setItem('clientId', this.editedClient.id.toString());
                this.cd.detectChanges()
                swal.fire('Correcto', `Se guardó el cliente ${this.editedClient.name}`, 'success');
                this.router.navigate(['/clients/view']);
              });
            }
          })
        })
      })
    })
  }

  public loadProvince() {
    this.serviceProvince.listAll().subscribe(province => {
      this.province = province as AddressProvince[]
      this.cd.detectChanges()
    })
    this.clientForm.controls.province.valueChanges.subscribe(f => {
      this.loadCanton(f);
      this.cd.detectChanges()
    })
  }

  public loadCanton(province: any) {
    this.serviceProvince.listCanton(province).subscribe(cantons => {
      this.canton = cantons as AddressCanton[]
      this.cd.detectChanges()

    })
    this.clientForm.controls.canton.valueChanges.subscribe(f => {
      this.loadDistrict(f);
      this.cd.detectChanges()
    })
  }

  public loadDistrict(canton: any) {
    this.serviceProvince.listDistrict(canton).subscribe(districts => {
      this.district = districts as AddressDistrict[]
      this.cd.detectChanges()
    })

    this.clientForm.controls.district.valueChanges.subscribe(f => {
      this.loadNeigh(f);
      this.cd.detectChanges()
    })
  }

  public loadNeigh(district: any) {
    this.serviceProvince.listNeigh(district).subscribe(neighs =>
      this.neigh = neighs as AddressNeighborhood[]);
    this.cd.detectChanges()
  }

  enableEdit() {
    this.isEditing = true;
  }

  isNewClient() {
    this.isNew = true;
  }

  public loadIdType() {
    this.clientForm.get("typeOfId")?.valueChanges
      .subscribe(f => {
        if (f == 1) {
          this.idTypeLength = 9;
        }
        if (f == 2 || f == 4) {
          this.idTypeLength = 10;
        }
        if (f == 3 || f == 5) {
          this.idTypeLength = 12;
        }
      })
  }

  back() {
    sessionStorage.removeItem('clientId');
    this.router.navigate(['/clients']);
  }

  private loadClient() {

    this.loadProvince()
    this.cd.detectChanges()

    let clientId = sessionStorage.getItem('clientId');
    // @ts-ignore
    this.service.findById(Number.parseInt(clientId)).subscribe(clients => {
      this.clientForm.patchValue({
        identification: clients.identification,
        typeOfId: clients.typeOfId,
        name: clients.name,
        mail: clients.mail,
        contact: clients.contact,
        scope: clients.scope,
        province: clients.province.id,
        canton: clients.canton.id,
        district: clients.district.id,
        neigh: clients.neigh.id,
        address: clients.address,
      })
    });
  }

  private createClient() {
    this.loadProvince()
    this.isNewClient();
    this.enableEdit();
  }

  loadBranch(id: any, name: any, province: any, canton: any, district: any, neigh: any, address: any): FormGroup {
    return this.formBuilder.group({
      clientId: sessionStorage.getItem('clientId'),
      id: id,
      name: name,
      branchProvince: province,
      branchCanton: canton,
      branchDistrict: district,
      branchNeigh: neigh,
      address: address,
    })
  }

  branchEnterReport(id: number | null, name: string | null, branch: ClientsBranchOffice | null) {
    if (typeof id === "number") {
      sessionStorage.setItem('branchId', String(id))
      sessionStorage.setItem('branch', JSON.stringify(branch));
      this.router.navigate(['/clients/view/branch'])
    }
    if (id == null) {
      this.router.navigate(['/clients/view/branch'])
    }
  }

  addBranch() {

  }
}
