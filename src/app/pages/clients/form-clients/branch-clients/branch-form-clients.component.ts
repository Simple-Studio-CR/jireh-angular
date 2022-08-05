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
    private serviceWareHouse: ClientsWarehouseService,
  ) {
  }

  ngOnInit(): void {
    this.loadForm()
    this.loadProvince()
    if (sessionStorage.getItem('branchId')) {
      this.loadBranch()
    }
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex
    this.pageSize = event.pageSize
    this.rangePage()
  }

  private rangePage() {

  }

  private loadBranch() {
    this.branchService.findById(sessionStorage.getItem('branchId')).subscribe(branch => {
      console.log(branch)
      this.clientForm.patchValue({
        name: branch.name,
        province: branch.province,
        canton: branch.canton,
        district: branch.district,
        neighborhood: branch.neighborhood,
        addressDetails: branch.addressDetails,
        clientId: sessionStorage.getItem('clientId'),
      })
    })
    this.cd.detectChanges()
    this.loadWareHouse()
  }

  wareHouseEnter(id: any, name: any, isNew: boolean, isUpdate: boolean) {
    sessionStorage.removeItem('warehouseId')
    sessionStorage.setItem('warehouseId', id)
    this.newWarehouse = isNew
    this.isUpdateWarehouse = isUpdate
    this.isEditing = true
    this.warehouseForm.patchValue({
      name: name,
    })
  }

  onClientUpdate() {
    let id = sessionStorage.getItem('branchId')
    this.branchService.editBranch(this.clientForm.value, id).subscribe(editBranch =>{
      console.log(editBranch)
      Swal.fire('Nueva Bodega ' + editBranch.name + ' creada con éxito', editBranch.name, 'success')
    })
    this.newWarehouse = false
    this.isUpdateWarehouse = false
    this.isEditing = false
    this.isUpdating = false
    this.isNew = false
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
      province: new FormControl(''),
      canton: new FormControl(''),
      district: new FormControl(''),
      neighborhood: new FormControl(''),
      addressDetails: new FormControl(''),
      clientId: new FormControl(''),
    })

    this.warehouseForm = new FormGroup({
      name: new FormControl(''),
      sketch: new FormControl(''),
      branchId: new FormControl(sessionStorage.getItem('branchId')),
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

  loadWareHouse() {
    this.serviceWareHouse.findByBranchId(sessionStorage.getItem('branchId')).subscribe(warehouse => {
      this.listWareHouse = warehouse as ClientsWarehouse[]
      console.log(warehouse, ' las bodegas')
      this.cd.detectChanges()
    })
  }

  onCreateWarehouse() {
    //todo hacer le metodo de crear la bodega
    if (this.newWarehouse) {
      this.serviceWareHouse.save(this.warehouseForm.value).subscribe(warehouse => {
        console.log(warehouse, ' new')
        Swal.fire('Nueva Bodega ' + warehouse.Warehouse.name + ' creada con éxito', warehouse.name, 'success')
        this.loadWareHouse()
        this.cd.detectChanges()
        this.loadForm()
      })
    }
    if (this.isUpdateWarehouse) {
      console.log('aqui vamos bien')
      let id: string | null = sessionStorage.getItem('warehouseId')
      this.serviceWareHouse.edit(this.warehouseForm.value, id).subscribe(warehouse => {
        console.log(warehouse, ' edit')
        Swal.fire('La Bodega ' + warehouse.name + ' fue editada con éxito', warehouse.name, 'success')
        this.loadWareHouse()
        this.cd.detectChanges()
        this.loadForm()
      })
    }
    this.newWarehouse = false
    this.isUpdateWarehouse = false
    this.isEditing = false
  }
}
