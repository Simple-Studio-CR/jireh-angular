import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ServiceProviderService} from "../../../../../services/service-provider.service";
import {AuthHTTPService} from "../../../../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Equipment} from "../../../../../models/equipment";
import {EquipmentService} from "../../../../../services/equipment.service";
import {ExtrasService} from "../../../../../services/extras.service";
import {Products} from "../../../../../models/products";
import {ProductsService} from "../../../../../services/products.service";
import {ServiceProviderDetailsV1} from "src/app/models/service-provider-details-v1";
import swal from "sweetalert2";

@Component({
  selector: 'service-provider',
  templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnInit {

  details: ServiceProviderDetailsV1[];
  equipment: Equipment[];
  serviceProviderId: string | null;
  product: Products[];
  color: string;

  detailsForm: FormGroup;

  editing: boolean = false;
  addNewDetailProduct: boolean = false;
  labelColor: any;

  constructor(
    private providerService: ServiceProviderService,
    private serviceEquipment: EquipmentService,
    private extraService: ExtrasService,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    public authHttpService: AuthHTTPService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.serviceProviderId = sessionStorage.getItem('serviceReportId')
    console.log(this.serviceProviderId, 'serviceProviderId')
    if (sessionStorage.getItem('serviceReportId') && !sessionStorage.getItem('isNew')) {
      this.loadForm()
      this.loadEquipment();
      this.loadData()
      this.loadProduct()
      this.editing = true;

    }
    if (!sessionStorage.getItem('serviceReportId')) {
      console.log('es uno nuevo ')
      this.loadForm()

    }
  }

  loadEquipment() {
    this.serviceEquipment.listAll()
      .subscribe(equip => {
        this.equipment = equip as Equipment[];
        this.cd.detectChanges();
      });

  }

  loadData() {
      this.providerService.getServiceDetailsV1(this.serviceProviderId).subscribe(listDetails => {
        this.productsService.listAll(1, 200)
          .subscribe(i => {
            console.log(listDetails, 'listDetails')
            this.details = listDetails as ServiceProviderDetailsV1[];
            console.log(i, 'los productos')
            this.product = i as Products[];
            this.cd.detectChanges();
          });
      })
    this.cd.detectChanges();
  }

  loadForm() {
    this.detailsForm = new FormGroup({
      id: new FormControl(''),
      products: new FormControl(''),
      equipment: new FormControl(''),
      serviceProviderId: new FormControl(''),
      timeOff: new FormControl(''),
      activeIngredient: new FormControl({value: '', disabled: true}),
      dose: new FormControl({value: '', disabled: true}),
      sanitaryPermission: new FormControl({value: '', disabled: true}),
      labelColor: new FormControl({value: '', disabled: true}),
      applicationType: new FormControl({value: '', disabled: true}),
    });
  }

  clickEditDetail(detail: ServiceProviderDetailsV1) {

  }

  addNewDetail() {
    this.addNewDetailProduct = true
    this.detailsForm.patchValue({
      serviceProviderId:'',
      products: '',
      equipment: '',
      timeOff: '',
      activeIngredient: '',
      dose: '',
      sanitaryPermission: '',
      labelColor: '',
      applicationType: '',
    })
  }

  loadProduct(){

    this.detailsForm.controls.products.valueChanges.subscribe(value => {
      console.log(value, 'value')
      this.detailsForm.patchValue({
        activeIngredient: value.activeingredient,
        dose: value.dose,
        sanitaryPermission: value.sanitaryPermission,
      })
      this.labelColor = value.labelColor
    })
    this.detailsForm.controls.equipment.valueChanges.subscribe(value => {
      console.log(value, 'value')
      this.detailsForm.patchValue({
        applicationType: value.type,
        serviceProviderId: this.serviceProviderId,
      })
    })
  }

  saveNewDetail() {
    this.providerService.saveServiceProviderDetailsV1(this.detailsForm.value).subscribe(res => {
      console.log(res, 'res')
      this.loadData()
      swal.fire('Guardado', 'Se guardo correctamente', 'success')
      this.addNewDetailProduct = false
    })
    this.loadData()
  }
}
