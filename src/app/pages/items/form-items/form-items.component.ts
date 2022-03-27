import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Item} from "../../../models/item";
import {InvoiceTaxes} from "../../../models/invoice-taxes";
import {InvoiceIVACode} from "../../../models/invoice-ivacode";
import {Cabys} from "../../../models/cabys";
import {Currency} from "../../../models/currency";
import {IssuingBranch} from "../../../models/issuing-branch";
import {ItemService} from "../../../services/item.service";
import {InvoiceTaxesService} from "../../../services/invoice-taxes.service";
import {Router} from '@angular/router';
import {BranchAccessUsersService} from 'src/app/services/branch-access-users.service';
import {InvoiceIVACodeService} from 'src/app/services/invoice-ivacode.service';
import {AuthHTTPService} from 'src/app/modules/auth/services/auth-http';
import {ItemDepartment} from "../../../models/item-department";
import {ItemFamily} from "../../../models/item-family";
import {ItemDepartmentService} from "../../../services/item-department.service";
import {ExtrasService} from "../../../services/extras.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-form-items',
  templateUrl: './form-items.component.html',
  styleUrls: ['./form-items.component.scss']
})
export class FormItemsComponent implements OnInit {

  formsCount: number = 4;

  price: number;
  purchasePrice: number;
  utility: number;

  finalPrice: number;
  ivaPercentage: number;
  taxesAmount: number;

  weight: boolean = false;
  unit: boolean = false;

  title = 'Producto';
  productForm: FormGroup;
  productMeasuresForm: FormGroup;
  updatedProduct: Item;

  taxes: InvoiceTaxes | null | undefined | any;
  iva: InvoiceIVACode | null | undefined | any;
  cabysSelected: Cabys | null | undefined | any;
  cSelected: Cabys | null | undefined | any;
  currency: Currency | null | undefined | any;
  branchSelected: IssuingBranch | null | undefined | any;
  department: ItemDepartment | null | undefined | any;
  family: ItemFamily | null | undefined | any;
  isUpdating = false;
  isEditing = false;
  isNew = false;
  isIVA: boolean = false;

  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor(private service: ItemService,
              public authService: AuthHTTPService,
              private taxesService: InvoiceTaxesService,
              private ivaService: InvoiceIVACodeService,
              private branchService: BranchAccessUsersService,
              private departmentService: ItemDepartmentService,
              private extraService: ExtrasService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.loadForms();

    if (!(sessionStorage.getItem('itemId'))) {
      console.log('Create Item')
      this.createItem();
    }
    if (sessionStorage.getItem('itemId')) {
      console.log('Edit Item')
      this.editItems()
    }
  }

  nextStep() {
    const nextStep = this.currentStep$.value + 1;
    if (nextStep > this.formsCount) {
      return;
    }
    this.currentStep$.next(nextStep);
  }

  prevStep() {
    const prevStep = this.currentStep$.value - 1;
    if (prevStep === 0) {
      return;
    }
    this.currentStep$.next(prevStep);
  }

  onProductUpdate() {
    if (this.isEditing && this.isNew) {
      this.productForm.patchValue({
        branch: this.branchSelected,
        status: true,
        weight: this.weight,
        units: this.unit,
      })
      console.log(this.productForm.value)
      this.service.save(this.productForm.value).subscribe(newProducto => {
        console.log('new Producto', newProducto)
      })
    }
    if (this.isEditing && !this.isNew) {
      this.isUpdating = true;
      this.service.updateItem(this.productForm.value).subscribe(
        product => {
          this.updatedProduct = product;
          this.isUpdating = false;
        }
      );
    }
  }

  onProductMeasuresUpdate() {
    this.service.updateMeasures(this.productMeasuresForm.value).subscribe(measure => {
      window.location.reload();
    })
  }

  public createItem() {
    this.isNew = true;
    this.isEditing = true;
  }

  public editItems() {
    this.isNew = false;
    // get product

    this.service.findById().subscribe(items => {
      this.service.searchCabys(items[0].cabys.detail).subscribe(cabysSearch => {
        this.cabysSelected = cabysSearch;
        this.productForm.patchValue({
          'cabys': cabysSearch[0],
        })
      })
      this.productForm.setValue(items[0]);
      console.log(items)

      this.calculator();
    })

  }

  calculator() {
    this.productForm.get("taxes")?.valueChanges.subscribe(f => {
      if (f.id == 1) {
        this.isIVA = true;
      }
      this.productForm.controls.iva.valueChanges.subscribe(i => {

        this.productForm.patchValue({'ivaPercentage': i.rate})
      })
    })
  }

  loadForms() {

    this.productForm = new FormGroup({
      id: new FormControl(''),
      barcode1: new FormControl(''),
      barcode2: new FormControl(''),
      barcode3: new FormControl(''),
      cabys: new FormControl(''),
      code: new FormControl(''),
      codeFromProvider: new FormControl(''),
      branch: new FormControl(''),
      name: new FormControl(''),
      department: new FormControl(''),
      family: new FormControl(''),
      note: new FormControl(''),
      units: new FormControl(''),
      packing: new FormControl(''),
      boxes: new FormControl(''),
      status: new FormControl(''),
      finalPrice: new FormControl(''),
      ivaPercentage: new FormControl(''),
      taxesAmount: new FormControl(''),
      price: new FormControl(''),
      purchasePrice: new FormControl(''),
      roundOut: new FormControl(''),
      unit: new FormControl(''),
      utility: new FormControl(''),
      weight: new FormControl(''),
      iva: new FormControl(''),
      taxes: new FormControl(''),
      currency: new FormControl(''),
    })

    this.branchSelected = JSON.parse(<string>sessionStorage.getItem('branch'))
    // this.productForm.patchValue({'branch': this.branchSelected})
    this.departmentService.listAll(this.branchSelected).subscribe(departments => {
      this.department = departments as ItemDepartment
      this.departmentService.listAllFamilies(this.branchSelected).subscribe(families => {
        this.family = families as ItemFamily
        this.taxesService.listAll().subscribe(taxes => {
          this.taxes = taxes as InvoiceTaxes;
          this.ivaService.listAll().subscribe(iva => {
            this.iva = iva as InvoiceIVACode;
            this.productForm.patchValue({
              ivaPercentage: iva.rate
            })
            this.extraService.currenciesFindAll().subscribe(currency => {
              this.currency = currency as Currency;

              this.productForm.controls.purchasePrice.valueChanges.subscribe(purchasePrice => {
                this.ivaPercentage = (this.productForm.controls.ivaPercentage.value / 100) as number;
                this.taxesAmount = (purchasePrice * this.ivaPercentage);
                this.productForm.patchValue({
                  utility: 0,
                  taxesAmount: this.taxesAmount,
                })
              })

              this.productForm.controls.utility.valueChanges.subscribe(utility => {
                this.utility = utility / 100
                this.ivaPercentage = (this.productForm.controls.ivaPercentage.value / 100) as number;
                this.purchasePrice = this.productForm.controls.purchasePrice.value;
                this.price = (this.utility * this.purchasePrice) + this.purchasePrice;
                this.taxesAmount = this.price * this.ivaPercentage;
                this.finalPrice = this.price + this.taxesAmount;
                this.productForm.patchValue({
                  price: this.price,
                  taxesAmount: this.taxesAmount,
                  finalPrice: this.finalPrice,
                })
              })
            })
          })
        })
      })
    })
    this.calculator()
  }

  back() {
    sessionStorage.removeItem('itemId');
    this.router.navigate(['/items']);
  }


  cabysSelectedMethod(e: any) {
    this.service.searchCabys(e.target.value).subscribe(c => {
      this.cabysSelected = c;
      this.productForm.controls.cabys.valueChanges.subscribe(f => {
        this.cSelected = f;
      })
    });
  }

  goTo(number: number) {
    this.currentStep$.next(number);
  }
}
