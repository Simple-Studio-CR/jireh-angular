import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthHTTPService} from 'src/app/modules/auth/services/auth-http';
import {Products} from "../../../models/products";
import {ProductsService} from "../../../services/products.service";
import swal from "sweetalert2";
import {ActiveIngredient} from "../../../models/active-ingredient";
import {ListProducts} from "../../../models/list-products";

enum ProductTabsEnum {
  PRODUCT,
}

@Component({
  selector: 'app-form-items',
  templateUrl: './form-items.component.html',
  styleUrls: ['./form-items.component.scss']
})
export class FormItemsComponent implements OnInit {

  title = 'Nuevo Producto';

  editedProduct: Products;
  activeIngredientList: ActiveIngredient[]
  listProduct: ListProducts[]

  productForm: FormGroup;
  newActiveIngredientForm: FormGroup;
  listProducts: FormArray;
  detailsForm: FormGroup;
  detailsFormArray: FormArray;

  productTabsEnum = ProductTabsEnum;
  activeTab = this.productTabsEnum.PRODUCT;
  isUpdating = false;
  isEditing = false;
  isNew = false;
  idTypeLength: any;
  color: string;


  constructor(private service: ProductsService,
              public authService: AuthHTTPService,
              private router: Router,
              private formBuilder: FormBuilder,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      sanitaryPermission: new FormControl(''),
      features: new FormControl(''),
      labelColor: new FormControl(''),
      dose: new FormControl(''),
      reEntryTime: new FormControl(''),
      control: new FormControl(''),
      isActive: new FormControl(''),
      listProducts: new FormArray([]),
    })

    this.newActiveIngredientForm = new FormGroup({
      listOfIngredients: new FormControl(''),
      quantity: new FormControl(''),
      isActive: new FormControl(true),
    })

    this.detailsForm = new FormGroup({
      detailsFormArray: new FormArray([])
    })


    this.loadActiveIngredientList();

    if (!(sessionStorage.getItem('productId'))) {
      this.createProduct();
    }

    if (sessionStorage.getItem('productId')) {
      this.editProduct();
    }
  }

  setActiveTab(tabId: ProductTabsEnum) {
    this.activeTab = tabId;
  }

  onProductUpdate() {
    if (this.isEditing && !this.isNew) {
      this.isUpdating = true;
      console.log(this.productForm.value, 'el valor del form')
      this.service.updateClient(this.productForm.value).subscribe(
        product => {
          console.log('lo que response al guardar', product)
          this.editedProduct = product;
          this.isUpdating = false;
          swal.fire('Correcto', `Se guardó el producto ${this.editedProduct.name}`, 'success');
          this.isEditing = false;
          this.cd.detectChanges()

        }
      );

    }
    if (this.isEditing && this.isNew) {
      this.service.save(this.productForm.value).subscribe(product => {
        this.editedProduct = product;
        this.isUpdating = false;
        this.isNew = false;
        this.isEditing = false;
        sessionStorage.setItem('productId', String(this.editedProduct.id));
        swal.fire('Correcto', `Se guardó el producto ${this.editedProduct.name}`, 'success');
        this.router.navigate(['/items/view']);
      });
    }
  }

  enableEdit() {
    this.isEditing = true;
  }

  isNewProduct() {
    this.isNew = true;
  }

  back() {
    sessionStorage.removeItem('productId');
    this.router.navigate(['/items']);
  }

  private editProduct() {

    let productId = sessionStorage.getItem('productId');
    this.service.findById(productId).subscribe(product => {
      this.productForm.patchValue({
        id: product.id,
        name: product.name,
        sanitaryPermission: product.sanitaryPermission,
        features: product.features,
        labelColor: product.labelColor,
        dose: product.dose,
        reEntryTime: product.reEntryTime,
        control: product.control,
        isActive: product.isActive,
      })
      this.cd.detectChanges()
      for (let i = 0; i < product.listProducts.length; i++) {
        this.listProducts = this.productForm.get('listProducts') as FormArray;
        this.detailsFormArray = this.detailsForm.get('detailsFormArray') as FormArray;
        this.listProducts.push(
          this.formBuilder.group({
            activeIngredient: product.listProducts[i].activeIngredient,
            // @ts-ignore
            // productId: Number.parseInt(sessionStorage.getItem('productId')),
            id: product.listProducts[i].id,
            quantity: product.listProducts[i].quantity,
            isActive: true,
          })
        )
        this.detailsFormArray.push(
          this.formBuilder.group({
            nameDetails: product.listProducts[i].activeIngredient.name,
            chemicalDetails: product.listProducts[i].activeIngredient.chemicalGroup,
            actionSiteDetails: product.listProducts[i].activeIngredient.actionSite,
            porcentaje: product.listProducts[i].quantity,
          })
        )
        this.cd.detectChanges()
      }
      this.cd.detectChanges()
    });
  }

  private createProduct() {
    this.isNewProduct();
    this.enableEdit();
  }

  colorLabel(): any {
    this.productForm.controls.labelColor.valueChanges.subscribe(c => {
      this.color = c
      this.cd.detectChanges()
      return this.color
    })
    return this.color
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      // productId: this.productForm.controls.id.value,
      activeIngredient: this.newActiveIngredientForm.controls.listOfIngredients.value,
      quantity: this.newActiveIngredientForm.controls.quantity.value,
      isActive: true
    })
  }

  addActiveIngredient(): void {
    this.listProducts = this.productForm.get('listProducts') as FormArray;
    this.detailsFormArray = this.detailsForm.get('detailsFormArray') as FormArray;

    this.listProducts.push(this.createItem())

    this.cd.detectChanges()

    let newLSP = this.newActiveIngredientForm.controls.listOfIngredients.value;

    this.detailsFormArray.push(
      this.formBuilder.group({
        nameDetails: newLSP.name,
        chemicalDetails: newLSP.chemicalGroup,
        actionSiteDetails: newLSP.actionSite,
        porcentaje: this.newActiveIngredientForm.controls.quantity.value,
      })
    )
  }

  getArrayDetails() {
    return this.detailsForm.get('detailsFormArray') as FormArray;
  }

  getArray() {
    return this.productForm.get('listProducts') as FormArray;
  }

  private loadActiveIngredientList() {
    this.service.findIngredientsList().subscribe(ail => {
      this.activeIngredientList = ail as ActiveIngredient[];
    })
  }

  deleteActiveIngredient(index: any) {
    const add = this.getArrayDetails()
    const add2 = this.getArray()
    add.removeAt(index);
    add2.removeAt(index);
    console.log(index)
  }
}
