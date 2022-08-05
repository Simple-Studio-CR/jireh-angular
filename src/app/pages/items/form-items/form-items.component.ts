import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthHTTPService} from 'src/app/modules/auth/services/auth-http';
import {Products} from "../../../models/products";
import {ProductsService} from "../../../services/products.service";
import swal from "sweetalert2";

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
  productForm: FormGroup;

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
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      sanitaryPermission: new FormControl(''),
      features: new FormControl(''),
      activeingredient: new FormControl(''),
      labelColor: new FormControl(''),
      dose: new FormControl(''),
    })

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
      console.log('client update', this.productForm.value)
      this.service.updateClient(this.productForm.value).subscribe(
        product => {
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
        this.editedProduct = product.product;
        console.log(this.editedProduct)
        this.isUpdating = false;
        this.isNew = false;
        this.isEditing = false;
        sessionStorage.setItem('productId', this.editedProduct.id);
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
      console.log('clients', product);
      this.productForm.setValue(product);
    });
  }

  private createProduct() {
    this.isNewProduct();
    this.enableEdit();
  }

  colorLabel():any {
    this.productForm.controls.labelColor.valueChanges.subscribe(c => {
      this.color = c
      this.cd.detectChanges()
      console.log(this.color)
      return this.color
    })
    return  this.color
  }
}
