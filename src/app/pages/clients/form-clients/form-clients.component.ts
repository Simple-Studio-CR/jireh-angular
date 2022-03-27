import {Component, OnInit} from '@angular/core';
import {Clients} from 'src/app/models/clients';
import {FormControl, FormGroup} from "@angular/forms";
import {AddressProvinceService} from "../../../services/address-province.service";
import {IdentificationTypeService} from "../../../services/identification-type.service";
import {ExtrasService} from "../../../services/extras.service";
import {BranchAccessUsersService} from "../../../services/branch-access-users.service";
import {ClientsService} from "../../../services/clients.service";
import {Router} from "@angular/router";
import {AuthHTTPService} from "../../../modules/auth/services/auth-http";
import {ICreateAccount, inits} from "../../../modules/wizards/create-account.helper";
import {BehaviorSubject, Subscription} from "rxjs";
import {IdentificationType} from "../../../models/identification-type";
import {ClientsType} from "../../../models/clients-type";
import {ClientsCreditType} from "../../../models/clients-credit-type";
import {InvoiceDocumentTypeExoneration} from "../../../models/invoice-document-type-exoneration";
import {NgbDate, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {IssuingBranch} from "../../../models/issuing-branch";
import {AddressProvince} from "../../../models/address-province";
import {AddressCanton} from "../../../models/address-canton";
import {AddressDistrict} from "../../../models/address-district";
import {AddressNeighborhood} from "../../../models/address-neighborhood";

@Component({
  selector: 'app-form-clients',
  templateUrl: './form-clients.component.html',
  styleUrls: ['./form-clients.component.scss']
})
export class FormClientsComponent implements OnInit {

  formsCount = 4;
  account$: BehaviorSubject<ICreateAccount> =
    new BehaviorSubject<ICreateAccount>(inits);
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  title = 'Cliente';

  isUpdating = false;
  isEditing = false;
  isNew = false;

  clientForm: FormGroup;
  addressForm: FormGroup;
  identificationTypeForm: FormGroup;
  editedClient: Clients;
  province: AddressProvince | null | undefined | any;
  canton: AddressCanton | null | undefined | any;
  district: AddressDistrict | null | undefined | any;
  neigh: AddressNeighborhood | null | undefined | any;
  clientsTypes: ClientsType | null | undefined | any;
  branch: IssuingBranch | null | undefined | any;
  clientCreditType: ClientsCreditType | null | undefined | any;
  clientIdentificationType: IdentificationType | null | undefined | any;
  exonerationType: InvoiceDocumentTypeExoneration | null | undefined | any;
  idTypeLength: any;
  dateStart: NgbDateStruct;
  dateEnd: NgbDateStruct;
  dateCreditEnd: NgbDateStruct;

  private unsubscribe: Subscription[] = [];

  constructor(private serviceProvince: AddressProvinceService,
              private serviceIdType: IdentificationTypeService,
              private serviceExtras: ExtrasService,
              private serviceBranch: BranchAccessUsersService,
              private service: ClientsService,
              public authService: AuthHTTPService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {

    if (!(sessionStorage.getItem('clientId'))) {
      this.createClient();
      this.searchIdentification();
    }

    if (sessionStorage.getItem('clientId')) {
      this.editClient();

    }
    this.loadProvince();

    this.loadIdType();
  }

  updateAccount = (part: Partial<ICreateAccount>, isFormValid: boolean) => {
    const currentAccount = this.account$.value;
    const updatedAccount = {...currentAccount, ...part};
    this.account$.next(updatedAccount);
    this.isCurrentFormValid$.next(isFormValid);
  };

  nextStep() {
    const nextStep = this.currentStep$.value + 1;
    if (nextStep > this.formsCount) {
      return;
    }
    this.currentStep$.next(nextStep);
    console.log(this.clientForm.value)
  }

  prevStep() {
    const prevStep = this.currentStep$.value - 1;
    if (prevStep === 0) {
      return;
    }
    this.currentStep$.next(prevStep);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  onClientUpdate() {

    if (this.isEditing && !this.isNew) {
      this.isUpdating = true;
      console.log('client update', this.clientForm.value)
      this.service.updateClient(this.clientForm.value).subscribe(
        client => {
          this.editedClient = client;
          this.isUpdating = false;
        }
      );
    }
    if (this.isEditing && this.isNew) {
      this.getDateStart();
      this.serviceBranch.findById(Number.parseInt(<string>sessionStorage.getItem('branchId'))).subscribe(is => {
        this.branch = is
        console.log('el branch ', this.branch)
        this.clientForm.patchValue({
          'branch': this.branch
        })
        console.log('new client ', this.clientForm.value);
        this.service.save(this.clientForm.value).subscribe(client => {
          this.editedClient = client;
          this.isUpdating = false;
          this.isNew = false;
          this.isEditing = false;
          sessionStorage.setItem('clientId', client.id);
          this.router.navigate(['/client']);

        });
      });
    }

  }

  loadForm() {
    this.clientForm = new FormGroup({
      id: new FormControl(''),
      status: new FormControl(true),
      branch: new FormControl(''),
      identificationType: new FormControl(''),
      identification: new FormControl(''),
      socialReasonName: new FormControl(''),
      commercialName: new FormControl(''),
      type: new FormControl(''),
      discount: new FormControl(''),
      email: new FormControl(''),
      email2: new FormControl(''),
      phone: new FormControl(''),
      phone2: new FormControl(''),
      description: new FormControl(''),
      note: new FormControl(''),
      neighborhood: new FormControl(''),
      creditType: new FormControl(''),
      creditEnd: new FormControl(''),
      creditPeriod: new FormControl(''),
      creditDays: new FormControl(''),
      enabledCredit: new FormControl(''),
      creditGrace: new FormControl(''),
      debt: new FormControl(''),
      exonerationType: new FormControl(''),
      law: new FormControl(''),
      documentNumber: new FormControl(''),
      institutionNumber: new FormControl(''),
      exoneration: new FormControl(''),
      exonerationDateStart: new FormControl(''),
      exonerationDateEnd: new FormControl(''),
    })
  }

  searchIdentification() {
    this.clientForm.get('identification')?.valueChanges.subscribe(identificationTyped => {
        if (identificationTyped.length >= 9) {
          this.serviceExtras.searchIdentification(identificationTyped).subscribe(identificationFromHacineda => {
            console.log(Number.parseInt(identificationFromHacineda.tipoIdentificacion))
            let idType: IdentificationType;
            this.serviceIdType.findIdType(Number.parseInt(identificationFromHacineda.tipoIdentificacion)).subscribe(typeIdObject => {
              idType = typeIdObject[0]
              console.log(idType)
              this.identificationTypeForm.patchValue({
                identType: idType.id
              })
              this.clientForm.patchValue({
                socialReasonName: identificationFromHacineda.nombre,
                identificationType: idType,
              })
            })
          })
        }
      }
    )
    this.clientForm.get('documentNumber')?.valueChanges.subscribe(documentTyped => {
      if (documentTyped.length >= 14)
        this.serviceExtras.searchExoneration(documentTyped).subscribe(responseHacienda => {
          let documentTypeTyped: InvoiceDocumentTypeExoneration;
          this.serviceExtras.findExonerationById(Number.parseInt(responseHacienda.tipoDocumento.codigo)).subscribe(document => {
            documentTypeTyped = document[0];
            console.log(documentTypeTyped)
            this.clientForm.patchValue({
              exonerationType: documentTypeTyped,
              institutionNumber: responseHacienda.nombreInstitucion,
              exoneration: responseHacienda.porcentajeExoneracion,
              exonerationDateStart: responseHacienda.fechaEmision,
              exonerationDateEnd: responseHacienda.fechaVencimiento,
            })
            console.log(responseHacienda)
          })
        })
    })
  }

  public loadIdType() {
    this.serviceIdType.findAll().subscribe(idTypes => this.clientIdentificationType = idTypes);
    this.clientForm.get("identificationType")?.valueChanges
      .subscribe(f => {
        if (f.id == 1) {
          this.idTypeLength = 9;
        }
        if (f.id == 2 || f.id == 4) {
          this.idTypeLength = 10;
        }
        if (f.id == 3 || f.id == 5) {
          this.idTypeLength = 12;
        }
        console.log(f);
      })
    this.service.findTypeAll().subscribe(types => this.clientsTypes = types);
    this.service.findCreditTypeAll().subscribe(credits => this.clientCreditType = credits);
    this.serviceExtras.findExonerationTypeAll().subscribe(exoneration => this.exonerationType = exoneration)
  }

  public getDateStart() {
    let creditDate = (this.dateCreditEnd.day.toString() + "/" + this.dateCreditEnd.month.toString() + "/" + this.dateCreditEnd.year.toString());

    this.clientForm.controls.creditEnd.setValue(creditDate);
  }

  private createClient() {
    this.isNew = true;
    this.isEditing = true;

    this.identificationTypeForm = new FormGroup({
      identType: new FormControl(''),
    })

    this.addressForm = new FormGroup({
      clientProvince: new FormControl(''),
      clientCanton: new FormControl(''),
      clientDistrict: new FormControl(''),
      dateStartExo: new FormControl(''),
      dateEndExo: new FormControl(''),
      dateCredit: new FormControl(''),
    });

    this.clientForm = new FormGroup({
      status: new FormControl(true),
      branch: new FormControl(''),
      identificationType: new FormControl(''),
      identification: new FormControl(''),
      socialReasonName: new FormControl(''),
      commercialName: new FormControl(''),
      type: new FormControl(''),
      discount: new FormControl(''),
      email: new FormControl(''),
      email2: new FormControl(''),
      phone: new FormControl(''),
      phone2: new FormControl(''),
      description: new FormControl(''),
      note: new FormControl(''),
      neighborhood: new FormControl(''),
      creditType: new FormControl(''),
      creditEnd: new FormControl(''),
      creditPeriod: new FormControl(''),
      creditDays: new FormControl(''),
      enabledCredit: new FormControl(''),
      creditGrace: new FormControl(''),
      debt: new FormControl(''),
      exonerationType: new FormControl(''),
      law: new FormControl(''),
      documentNumber: new FormControl(''),
      institutionNumber: new FormControl(''),
      exoneration: new FormControl(''),
      exonerationDateStart: new FormControl(''),
      exonerationDateEnd: new FormControl(''),
    })
  }

  private editClient() {

    this.addressForm = new FormGroup({
      clientProvince: new FormControl(''),
      clientCanton: new FormControl(''),
      clientDistrict: new FormControl(''),
      dateStartExo: new FormControl(''),
      dateEndExo: new FormControl(''),
      dateCredit: new FormControl(''),
    });

    this.loadForm();

    this.service.findById().subscribe(clients => {
      console.log('clients', clients);
      let exonerationDateEndS: string = clients[0].exonerationDateEnd;
      let exonerationDateStart: string = clients[0].exonerationDateStart;
      let creditDateEnd: string = (clients[0].creditEnd);

      let dayEnd: number = Number.parseInt(exonerationDateEndS.substring(0, 2));
      let monthEnd: number = Number.parseInt(exonerationDateEndS.substring(3, 6));
      let yearEnd: number = Number.parseInt(exonerationDateEndS.substring(6, 10));
      let dayStart: number = Number.parseInt(exonerationDateStart.substring(0, 2));
      let monthStart: number = Number.parseInt(exonerationDateStart.substring(3, 6));
      let yearStart: number = Number.parseInt(exonerationDateStart.substring(6, 10));
      let dayCredit: number = Number.parseInt(creditDateEnd.substring(0, 2));
      let monthCredit: number = Number.parseInt(creditDateEnd.substring(3, 6));
      let yearCredit: number = Number.parseInt(creditDateEnd.substring(6, 10));

      console.log('Date End -- day', dayEnd, 'month', monthEnd, 'year', yearEnd)
      console.log('Date Start -- day', dayStart, 'month', monthStart, 'year', yearStart)
      console.log('Date Credit -- day', dayCredit, 'month', monthCredit, 'year', yearCredit)

      let dateEnd = new NgbDate(yearEnd, monthEnd, dayEnd);
      let dateStart = new NgbDate(yearStart, monthStart, dayStart);
      let dateCredit = new NgbDate(yearCredit, monthCredit, dayCredit);


      this.addressForm.patchValue({
        clientProvince: clients[0].neighborhood.district.canton.province.id,
        clientCanton: clients[0].neighborhood.district.canton.id,
        clientDistrict: clients[0].neighborhood.district.id,
        dateEndExo: dateEnd,
        dateStartExo: dateStart,
        dateCredit: dateCredit,
      })

      this.clientForm.setValue(clients[0])

      this.clientForm.patchValue({
        identificationType: clients[0].identificationType.id,
        neighborhood: clients[0].neighborhood.id,
        type: clients[0].type.id,
        creditType: clients[0].creditType.id,
        enabledCredit: clients[0].enabledCredit,
        exonerationType: clients[0].exonerationType.id,
      })
    })
  }

  private loadProvince() {
    this.serviceProvince.listAll().subscribe(province => this.province = province);
    this.addressForm.get("clientProvince")?.valueChanges
      .subscribe(f => {
        this.loadCanton(f.id);
      })
  }

  public loadCanton(province: number) {
    this.serviceProvince.listCanton(province).subscribe(cantons => this.canton = cantons);
    this.addressForm.get("clientCanton")?.valueChanges
      .subscribe(f => {
        this.loadDistrict(f.id);
      })
  }

  public loadDistrict(canton: number) {
    this.serviceProvince.listDistrict(canton).subscribe(districts => this.district = districts);
    this.addressForm.get("clientDistrict")?.valueChanges
      .subscribe(f => {
        this.loadNeigh(f.id);
      })
  }

  public loadNeigh(district: number) {
    this.serviceProvince.listNeigh(district).subscribe(neighs => this.neigh = neighs);
  }

}
