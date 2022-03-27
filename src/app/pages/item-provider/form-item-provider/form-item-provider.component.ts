import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ICreateAccount, inits} from "../../../modules/wizards/create-account.helper";
import {FormControl, FormGroup} from "@angular/forms";
import {ItemProvider} from "../../../models/item-provider";
import {DatePipe} from "@angular/common";
import {IssuingBranch} from "../../../models/issuing-branch";
import {ItemDepartment} from "../../../models/item-department";
import {ItemFamily} from "../../../models/item-family";
import {InvoiceIVACode} from "../../../models/invoice-ivacode";
import {Provider} from "../../../models/provider";
import {ProviderService} from "../../../services/provider.service";
import {ItemDepartmentService} from "../../../services/item-department.service";
import {Item} from "../../../models/item";
import {ItemService} from "../../../services/item.service";
import {InvoiceIVACodeService} from "../../../services/invoice-ivacode.service";
import {ItemProviderService} from "../../../services/item-provider.service";
import swal from 'sweetalert2';
import {Router} from "@angular/router";


@Component({
  selector: 'app-form-item-provider',
  templateUrl: './form-item-provider.component.html',
  styleUrls: ['./form-item-provider.component.scss']
})
export class FormItemProviderComponent implements OnInit {

  itemProviderForm: FormGroup;
  editItemProvider: ItemProvider;

  branchSelected: IssuingBranch | null | undefined | any;
  department: ItemDepartment | null | undefined | any;
  family: ItemFamily | null | undefined | any;
  iva: InvoiceIVACode | null | undefined | any;
  provider: Provider | null | undefined | any;
  item: Item | null | undefined | any;
  itemSelected: Item | null | undefined | any;

  isNew: boolean = false;
  isEditing: boolean = false;

  currDate: string | null;

  formsCount = 1;
  account$: BehaviorSubject<ICreateAccount> =
    new BehaviorSubject<ICreateAccount>(inits);
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private dp: DatePipe,
              private serviceProvider: ProviderService,
              private serviceDepartment: ItemDepartmentService,
              private serviceIva: InvoiceIVACodeService,
              private serviceItem: ItemService,
              private service: ItemProviderService,
              private datePipe: DatePipe,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadForm();
    this.loadDetails();
    this.branchSelected = JSON.parse(<string>sessionStorage.getItem('branch'));

    let item: ItemProvider | null = JSON.parse(<string>sessionStorage.getItem('itemProvider'));

    if (!item) {
      console.log('is new ')
      this.isNew = true;
      this.isEditing = true;
    }
    if (item) {
      console.log('is edit ')
      this.itemProviderForm.setValue(item);
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

  loadForm() {
    this.itemProviderForm = new FormGroup({
      id: new FormControl(''),
      item: new FormControl(''),
      barcode: new FormControl(''),
      codeFromProvider: new FormControl(''),
      description: new FormControl(''),
      department: new FormControl(''),
      family: new FormControl(''),
      brand: new FormControl(''),
      provider: new FormControl(this.provider),
      iva: new FormControl(''),
      ivaPercentage: new FormControl(''),
      price: new FormControl(''),
      discountPercentage: new FormControl(''),
      discount: new FormControl(''),
      activateDiscount: new FormControl(''),
      note: new FormControl(''),
      providerCode: new FormControl(''),
      date: new FormControl(this.currDate = this.dp.transform(new Date(), 'dd-MM-yyyy')),
      branch: new FormControl(''),
      ivEspecial: new FormControl(''),
    })

    this.currDate = this.dp.transform(new Date(), 'dd-MM-yyyy');

    this.itemProviderForm.patchValue({
      date: this.currDate,
    })
  }

  onUpdate() {
    if (this.isNew) {
      console.log(this.itemProviderForm.value)
      this.service.save(this.itemProviderForm.value).subscribe(newIp => {
        swal.fire('Exito', `Hola ${newIp.description} se agregó correctamente al proveedor ${newIp.provider.socialReasonName}`, `info`);
        this.router.navigate(['/item-provider'])
      })
    }
    if (!this.isNew) {

    }
  }

  loadDetails() {
    this.itemProviderForm.controls.providerCode.valueChanges.subscribe(value => {
      this.serviceProvider.findProviderCode(value, this.branchSelected).subscribe(provider => {
        this.provider = provider as Provider;
        console.log(provider)

        this.itemProviderForm.patchValue({
          provider: this.provider.socialReasonName,
        })

        this.serviceDepartment.listAll(this.branchSelected).subscribe(department => {
          this.department = department as ItemDepartment[];
        })

        this.serviceDepartment.listAllFamilies(this.branchSelected).subscribe(family => {
          this.family = family as ItemFamily[];
        })

        this.serviceIva.listAll().subscribe(taxes => {
          this.iva = taxes as InvoiceIVACode;
        })

        let code: string;
        this.itemProviderForm.controls.barcode.valueChanges.subscribe(value => {
          code = value;
          this.serviceItem.findByCodes(code).subscribe(itemSelect => {
            console.log(itemSelect)
            this.itemSelected = itemSelect as Item;
            this.itemProviderForm.patchValue({
              description: this.itemSelected[0].name,
              department: this.itemSelected[0].department,
              family: this.itemSelected[0].family,
              iva: this.itemSelected[0].iva,
              ivaPercentage: this.itemSelected[0].ivaPercentage,
              price: this.itemSelected[0].purchasePrice,
              branch: this.branchSelected,
              item: itemSelect[0],
              provider: this.provider,
              discountPercentage: 0,
              ivEspecial: 0,

            })
          })
        })
      })
    })
    this.serviceItem.listAll(1, 1000000).subscribe(item => {
      this.item = item.content as Item;
    })
  }

  goTo(pageNumber: number) {
    this.currentStep$.next(pageNumber);
  }

  clearPreference() {


  }

  enableEdit() {
    this.isEditing = true;
  }
}
