import {ChangeDetectorRef, Component, OnInit} from "@angular/core"
import {AddressProvince} from "../../../../models/address-province"
import {AddressCanton} from "../../../../models/address-canton"
import {AddressDistrict} from "../../../../models/address-district"
import {AddressNeighborhood} from "../../../../models/address-neighborhood"
import {PageEvent} from "@angular/material/paginator"
import {ClientsWarehouse} from "../../../../models/clients-warehouse"
import {FormControl, FormGroup} from "@angular/forms"
import {AuthHTTPService} from "../../../../modules/auth/services/auth-http"
import {Router} from "@angular/router"
import {AddressProvinceService} from "../../../../services/address-province.service"
import {ClientsBranchOffice} from "../../../../models/clients-branch-office"
import {ClientsBranchesService} from "../../../../services/clients-branches.service"
import {ClientsWarehouseService} from "../../../../services/clients-warehouse.service"
import Swal from "sweetalert2"
import {ClientsService} from "../../../../services/clients.service";
import {Clients} from "../../../../models/clients";

enum ClientTabsEnum {
  BRANCHES,
  WAREHOUSE,
}

@Component({
  selector: 'app-form-clients',
  templateUrl: './branch-form-clients.component.html',
  styleUrls: ['./branch-form-clients.component.scss']
})
export class BranchFormClientsComponent implements OnInit {

  title: string = 'Sucursal - Bodegas/Oficinas'

  totalRegister = 0
  pageNo = 0
  pageSize = 10

  clientForm: FormGroup
  warehouseForm: FormGroup

  clientTabsEnum = ClientTabsEnum
  activeTab = this.clientTabsEnum.BRANCHES

  province: AddressProvince[]
  canton: AddressCanton[]
  district: AddressDistrict[]
  neigh: AddressNeighborhood[]

  editedBranch: ClientsBranchOffice
  listWareHouse: ClientsWarehouse[]
  isEditing: boolean = false
  isNew: boolean = false
  isUpdating: boolean = false
  newWarehouse: boolean = false
  isUpdateWarehouse: boolean = false

  constructor(
    private branchService: ClientsBranchesService,
    public authService: AuthHTTPService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private serviceProvince: AddressProvinceService,
    private serviceWareHouse: ClientsService,
  ) {
  }

  ngOnInit(): void {
    this.loadForm()
    this.loadProvince()
    if (sessionStorage.getItem('branchId')) {
      this.loadBranch()
    }
    if (!(sessionStorage.getItem('branchId'))) {
      this.isNew = true
      this.isEditing = true
    }
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex
    this.pageSize = event.pageSize
    this.rangePage()
  }

  private rangePage() {
    let branchId: string | null = sessionStorage.getItem('branchId')
    if (typeof branchId === 'string') {
      this.serviceWareHouse.warehouseFindByBranchId(Number.parseInt(branchId), this.pageNo + 1, this.pageSize).subscribe(warehouse => {
        this.listWareHouse = warehouse.content as ClientsWarehouse[]
        this.totalRegister = warehouse.totalElements
        this.cd.detectChanges()
      })
    }
  }

  private loadBranch() {
    this.branchService.findById(sessionStorage.getItem('branchId')).subscribe(branch => {
      console.log(branch)
      this.clientForm.patchValue({
        name: branch.name,
        province: branch.province.id,
        canton: branch.canton.id,
        district: branch.district.id,
        email: branch.email,
        phone: branch.phone,
        contact: branch.contact,
        neighborhood: branch.neighborhood.id,
        addressDetails: branch.addressDetails,
        clientId: sessionStorage.getItem('clientId'),
      })
    })
    this.cd.detectChanges()
    this.rangePage()
  }

  wareHouseEnter(id: any, name: any, isNew: boolean, isUpdate: boolean) {
    sessionStorage.removeItem('warehouseId')
    sessionStorage.setItem('warehouseId', id)
    this.newWarehouse = isNew
    this.isUpdateWarehouse = isUpdate
    this.isEditing = true
    this.warehouseForm.patchValue({
      id: id,
      name: name,
    })
  }

  onClientUpdate() {
    let id = sessionStorage.getItem('branchId')
    let branchForm: any
    // @ts-ignore
    let client: Clients = JSON.parse(sessionStorage.getItem('client'))
    this.serviceProvince.findProvinceById(this.clientForm.controls.province.value).subscribe(p => {
      this.serviceProvince.findCantonById(this.clientForm.controls.canton.value).subscribe(c => {
        this.serviceProvince.findDistrictById(this.clientForm.controls.district.value).subscribe(d => {
          this.serviceProvince.findNeightById(this.clientForm.controls.neighborhood.value).subscribe(n => {
            branchForm = {
              name: this.clientForm.controls.name.value,
              email: this.clientForm.controls.email.value,
              contact: this.clientForm.controls.contact.value,
              phone: this.clientForm.controls.phone.value,
              addressDetails: this.clientForm.controls.addressDetails.value,
              clientId: client,
              province: p,
              canton: c,
              district: d,
              neighborhood: n,
            }
            console.log(branchForm)
            this.cd.detectChanges()

            if (!this.isNew) {
              console.log('vamos a editar')
              this.branchService.editBranch(branchForm, id).subscribe(editBranch => {
                Swal.fire('La Sucursal ' + editBranch.name + ' fue editada con exito!', editBranch.name, 'success')
                this.newWarehouse = false
                this.isUpdateWarehouse = false
                this.isEditing = false
                this.isUpdating = false
                this.isNew = false
              })
            }
            if (this.isNew) {
              console.log('vamos a crear')
              this.branchService.saveBranch(branchForm).subscribe(branch => {
                Swal.fire('Nueva Sucursal ' + branch.name + ' creada con éxito', branch.name, 'success')
                sessionStorage.setItem('branchId', branch.id)
                this.isNew = false
                this.isUpdating = false
                this.isEditing = false
                this.cd.detectChanges()
              })
            }
          })
        })
      })
    })
  }

  setActiveTab(tabId: ClientTabsEnum) {
    this.activeTab = tabId
  }

  back() {
    this.router.navigate(['/clients/view'])
  }

  enableEdit() {
    this.isEditing = true
  }

  private loadForm() {
    this.clientForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      contact: new FormControl(''),
      province: new FormControl(''),
      canton: new FormControl(''),
      district: new FormControl(''),
      neighborhood: new FormControl(''),
      addressDetails: new FormControl(''),
      clientId: new FormControl(''),
    })

    // @ts-ignore
    this.warehouseForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      sketch: new FormControl(''),
      // @ts-ignore
      branchId: new FormControl(JSON.parse(sessionStorage.getItem('branch'))),
    })
  }

  public loadProvince() {
    this.serviceProvince.listAll().subscribe(province => {
      this.province = province as AddressProvince[]
      this.cd.detectChanges()
    })
    this.clientForm.controls.province.valueChanges.subscribe(f => {
      this.loadCanton(f)
      this.cd.detectChanges()
    })
  }

  public loadCanton(province: any) {
    this.serviceProvince.listCanton(province).subscribe(cantons => {
      this.canton = cantons as AddressCanton[]
      this.cd.detectChanges()

    })
    this.clientForm.controls.canton.valueChanges.subscribe(f => {
      this.loadDistrict(f)
      this.cd.detectChanges()
    })
  }

  public loadDistrict(canton: any) {
    this.serviceProvince.listDistrict(canton).subscribe(districts => {
      this.district = districts as AddressDistrict[]
      this.cd.detectChanges()
    })

    this.clientForm.controls.district.valueChanges.subscribe(f => {
      this.loadNeigh(f)
      this.cd.detectChanges()
    })
  }

  public loadNeigh(district: any) {
    this.serviceProvince.listNeigh(district).subscribe(neighs =>
      this.neigh = neighs as AddressNeighborhood[])
    this.cd.detectChanges()
  }

  onCreateWarehouse() {
    //todo hacer le metodo de crear la bodega
    if (this.newWarehouse) {
      console.log(this.warehouseForm.value)
      this.serviceWareHouse.saveWarehouse(this.warehouseForm.value).subscribe(warehouse => {
        console.log(warehouse, ' new')
        Swal.fire('Nueva Bodega ' + warehouse.name + ' creada con éxito', warehouse.name, 'success')
        this.rangePage()
        this.cd.detectChanges()
        this.loadForm()
      })
    }
    if (this.isUpdateWarehouse) {
      console.log('aqui vamos bien')
      let id: string | null = sessionStorage.getItem('warehouseId')
      console.log(this.warehouseForm.value)
      // @ts-ignore
      this.serviceWareHouse.editWarehouse(this.warehouseForm.value, Number.parseInt(id)).subscribe(warehouse => {
        console.log(warehouse, ' edit')
        Swal.fire('La Bodega ' + warehouse.name + ' fue editada con éxito', warehouse.name, 'success')
        this.rangePage()
        this.cd.detectChanges()
        this.loadForm()
      })
    }
    this.newWarehouse = false
    this.isUpdateWarehouse = false
    this.isEditing = false
  }
}
