import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ServiceProviderService} from "../../../../../services/service-provider.service";
import {AuthHTTPService} from "../../../../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {PestType} from "../../../../../models/pest-type";
import {ExtrasService} from "../../../../../services/extras.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ServiceProviderPestTypeDetail} from "../../../../../models/service-provider-pest-type-detail";

@Component({
  selector: 'service-provider',
  templateUrl: 'pest.component.html',
})
export class PestComponent implements OnInit {
  pestList: PestType[];
  serviceProviderId: string | null;
  pestTypeListForm: FormGroup;
  editing: boolean = false;
  false: boolean = false;
  theLastOne: boolean = false;
  serviceProviderPestTypeDetail: ServiceProviderPestTypeDetail[];
  serviceProviderPestTypeDetailForm: FormArray;

  constructor(
    private providerService: ServiceProviderService,
    public authHttpService: AuthHTTPService,
    private extraService: ExtrasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('serviceReportId') && sessionStorage.getItem('isNew')) {

    }
    if (sessionStorage.getItem('serviceReportId') && !sessionStorage.getItem('isNew')) {
      this.loadForm();
      this.loadData();

    }
    if (!sessionStorage.getItem('serviceReportId')) {
      this.editing = true;
      this.loadForm()
      this.firstSteps()
    }
  }

  loadForm() {
    this.pestTypeListForm = new FormGroup({
      serviceProviderPestTypeDetailForm: new FormArray([])
    })
  }

  loadData() {
    this.serviceProviderId = sessionStorage.getItem('serviceReportId');
    this.providerService.getServiceProviderPestTypeDetails(this.serviceProviderId).subscribe(listDetails => {

      this.extraService.getPestType().subscribe(allPestTypes => {


        this.serviceProviderPestTypeDetail = listDetails as ServiceProviderPestTypeDetail[];
        this.pestList = allPestTypes as PestType[];

        for (let i = 0; i < listDetails.length; i++) {
          this.serviceProviderPestTypeDetailForm = this.pestTypeListForm.get('serviceProviderPestTypeDetailForm') as FormArray;
          this.serviceProviderPestTypeDetailForm.push(
            this.formBuilder.group({
              serviceProviderId: listDetails[i].serviceProviderId,
              pestTypeId: allPestTypes[i].pestTypeId,
              apply: listDetails[i].apply,
              level: listDetails[i].level,
              name: allPestTypes[i].name
            })
          )
          this.cd.detectChanges();
        }

      })
    })
  }

  getArray() {
    return this.pestTypeListForm.get('serviceProviderPestTypeDetailForm') as FormArray;
  }

  private firstSteps() {
    this.extraService.getPestType().subscribe(allPestTypes => {
      for (let i = 0; i < allPestTypes.length; i++) {
        this.serviceProviderPestTypeDetailForm = this.pestTypeListForm.get('serviceProviderPestTypeDetailForm') as FormArray;
        this.serviceProviderPestTypeDetailForm.push(
          this.formBuilder.group({
            serviceProviderId: [],
            pestTypeId: allPestTypes[i].pestTypeId,
            apply: false,
            level: 0,
            name: allPestTypes[i].name
          })
        )
        this.cd.detectChanges();
      }
    })
  }
}
