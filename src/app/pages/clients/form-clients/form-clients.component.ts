import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Clients} from 'src/app/models/clients';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AddressProvinceService} from "../../../services/address-province.service";
import {ClientsService} from "../../../services/clients.service";
import {Router} from "@angular/router";
import {AuthHTTPService} from "../../../modules/auth/services/auth-http";
import {IdentificationType} from "../../../models/identification-type";
import swal from "sweetalert2";
import {ClientsBranchesService} from "../../../services/clients-branches.service";
import {AddressProvince} from "../../../models/address-province";
import {AddressCanton} from "../../../models/address-canton";
import {AddressDistrict} from "../../../models/address-district";
import {AddressNeighborhood} from "../../../models/address-neighborhood";
import {PageEvent} from "@angular/material/paginator";
import {ClientsBranchOffice} from "../../../models/clients-branch-office";
import {BranchFormClientsComponent} from "./branch-clients/branch-form-clients.component";

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
  clientIdentificationType: IdentificationType[];
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
      this.editClient();
    }
    this.loadIdType()
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  private rangePage() {

  }

  setActiveTab(tabId: ClientTabsEnum) {
    this.activeTab = tabId;
  }

  onClientUpdate() {
    if (this.isEditing && !this.isNew) {
      this.isUpdating = true;
      this.service.updateClient(this.clientForm.value, sessionStorage.getItem('clientId')).subscribe(
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
      this.service.save(this.clientForm.value).subscribe(client => {
        this.editedClient = client.client;
        this.isUpdating = false;
        this.isNew = false;
        this.isEditing = true;
        sessionStorage.setItem('clientId', this.editedClient.id);
        this.cd.detectChanges()
        swal.fire('Correcto', `Se guardó el cliente ${this.editedClient.name}`, 'success');
        this.router.navigate(['/clients/view']);
      });
    }
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

  private editClient() {

    this.loadProvince()
    this.cd.detectChanges()

    let clientId = sessionStorage.getItem('clientId');
    this.service.findById(clientId).subscribe(clients => {
      this.clientForm.patchValue({
        identification: clients.identification,
        typeOfId: clients.typeOfId,
        name: clients.name,
        mail: clients.mail,
        contact: clients.contact,
        scope: clients.scope,
        province: clients.province,
        canton: clients.canton,
        district: clients.district,
        neigh: clients.neigh,
        address: clients.address,
      })
    });

    this.branchesService.findByClientId(clientId).subscribe(branches => {
      //todo listar las sucursales
      this.listBranches = branches as ClientsBranchOffice[];
      this.cd.detectChanges();
    })
  }

  private createClient() {
    this.loadProvince()
    this.isNewClient();
    this.enableEdit();
  }

  saveBranches() {

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

  createItem(id: any): FormGroup {
    return this.formBuilder.group({
      clientId: sessionStorage.getItem('clientId'),
    })

  }

  onBranchsIsUpdating() {
    //todo actualizar las sucursales
    console.log('estamos updatiando las sucurusales')
  }

  branchEnterReport(id: string | null, name: string | null) {
    if (typeof id === "string") {
      sessionStorage.setItem('branchId', id)
      this.router.navigate(['/clients/view/branch'])
    }
    if(id==null){
      this.router.navigate(['/clients/view/branch'])
    }
  }

  addBranch() {

  }
}
