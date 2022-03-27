import { Component, OnInit } from '@angular/core';
import {Provider} from "../../../models/provider";
import {FormControl, FormGroup} from "@angular/forms";
import {AddressProvince} from "../../../models/address-province";
import {AddressDistrict} from "../../../models/address-district";
import {AddressCanton} from "../../../models/address-canton";
import {AddressNeighborhood} from "../../../models/address-neighborhood";
import {IssuingBranch} from "../../../models/issuing-branch";
import {IdentificationType} from "../../../models/identification-type";
import {AddressProvinceService} from "../../../services/address-province.service";
import { BehaviorSubject } from 'rxjs';
import {IdentificationTypeService} from "../../../services/identification-type.service";
import {ProviderService} from "../../../services/provider.service";
import {ExtrasService} from "../../../services/extras.service";
import {AuthHTTPService} from "../../../modules/auth/services/auth-http";
import {BranchAccessUsersService} from "../../../services/branch-access-users.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {IssuingsAccessUsersService} from "../../../services/issuings-access-users.service";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-form-providers',
  templateUrl: './form-providers.component.html',
  styleUrls: ['./form-providers.component.scss']
})
export class FormProvidersComponent implements OnInit {
  title: 'Provedores';
  formsCount: number;

  editProvider: Provider;

  providerForm: FormGroup;
  identificationTypeForm: FormGroup;

  province: AddressProvince[] | null | undefined | any;
  canton: AddressCanton[] | null | undefined | any;
  district: AddressDistrict[] | null | undefined | any;
  neigh: AddressNeighborhood[] | null | undefined | any;
  identificationType: IdentificationType[] | null | undefined | any;
  branchSelected: IssuingBranch | null | undefined | any;

  isUpdating = false;
  isEditing = false;
  isNew = false;
  idTypeLength: any;

  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  creditFlag: boolean = true;

  constructor(private serviceProvince: AddressProvinceService,
              private serviceIdType: IdentificationTypeService,
              private serviceExtras: ExtrasService,
              private serviceAuth: IssuingsAccessUsersService,
              private serviceUser: UsersService,
              private service: ProviderService,
              public authService: AuthHTTPService,
              private branchService: BranchAccessUsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.formsCount = 2;
    this.isNew = true;
    this.loadForm();

    if(sessionStorage.getItem('providerId')){
      console.log('Edit Provider')
      this.loadProvider();
    }
    if(!sessionStorage.getItem('providerId')){
      console.log('New Provider')
      this.isNew = true;
      this.isEditing = true;
      this.searchIdentification();
    }

  }

  onProviderUpdate() {
    console.log(this.providerForm.value)
    this.service.save(this.providerForm.value).subscribe(provider=>{
      this.router.navigate(['/provider'])
    })
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

  searchIdentification() {
    this.loadIdType();
    this.providerForm.controls.identification.valueChanges.subscribe(value => {
      if (value.length >= 9) {
        this.serviceExtras.searchIdentification(value).subscribe(i => {
          let idType: IdentificationType;
          this.serviceIdType.findIdType(Number.parseInt(i.tipoIdentificacion)).subscribe(identificationById => {
            idType = identificationById[0];
            console.log('idType: ', i);
            this.identificationTypeForm.patchValue({
              identType: idType.id
            })
            this.providerForm.patchValue({
              socialReasonName: i.nombre,
              identificationType: idType,
              description: i.situacion.administracionTributaria
            })
            let branchId = Number.parseInt(<string>sessionStorage.getItem('branchId'));
            this.branchService.findById(branchId).subscribe(branch => {
              this.branchSelected = branch
              this.providerForm.patchValue({'branch': this.branchSelected})
            });
          });
        });
      }
    })
    this.providerForm.controls.payMethod.valueChanges.subscribe(value => {
      console.log(value)
      if (value == 'Credito') {
        this.creditFlag = false
      }else{
        this.creditFlag = true
        this.providerForm.patchValue({
          creditDays: '0'
        })
      }
    })
  }

  public loadIdType() {
    this.serviceIdType.findAll().subscribe(idTypes => this.identificationType = idTypes);
  }

  loadForm() {
    this.providerForm = new FormGroup({
      id: new FormControl(''),
      identificationType: new FormControl(''),
      socialReasonName: new FormControl(''),
      identification: new FormControl(''),
      commercialName: new FormControl(''),
      email: new FormControl(''),
      email2: new FormControl(''),
      fe: new FormControl(''),
      creditDays: new FormControl(''),
      description: new FormControl(''),
      idProvedor: new FormControl(''),
      note: new FormControl(''),
      payMethod: new FormControl(''),
      phone: new FormControl(''),
      phone2: new FormControl(''),
      providerCode: new FormControl(''),
      providerType: new FormControl(''),
      status: new FormControl(true),
      branch: new FormControl(''),
      billRegister: new FormControl(''),
    })
    this.identificationTypeForm = new FormGroup({
      identType: new FormControl(''),
    })
  }

  private loadProvider() {
    this.serviceIdType.findAll().subscribe(ident=>{
      this.identificationType = ident
    })
    this.service.findById(Number.parseInt(<string>sessionStorage.getItem('providerId')))
      .subscribe(providerDb=>{
        console.log(providerDb)
        this.providerForm.setValue(providerDb[0]);
        this.identificationTypeForm.patchValue({
          identType: providerDb[0].identificationType.id
        })
      })
  }

  enabledEdit() {
    this.isNew = false;
    this.isEditing = true;
  }

  goTo(number: number) {
    this.currentStep$.next(number);
  }
}
