import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ServiceProviderService} from "../../../../../services/service-provider.service";
import {AuthHTTPService} from "../../../../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {Recommendations} from "../../../../../models/recommendations";
import {ServiceProviderRecommendations} from "../../../../../models/service-provider-recommendations";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ExtrasService} from "../../../../../services/extras.service";

@Component({
  selector: 'service-provider',
  templateUrl: 'recommendations.component.html'
})
export class RecommendationsComponent implements OnInit {
  recommendationList: Recommendations[];
  serviceProviderId: string | null;

  editing: boolean = false;
  false: boolean = false;

  serviceProviderRecommendationsDetails: ServiceProviderRecommendations[];

  recommendationsListForm: FormGroup;
  serviceProviderRecommendationsFormsBefore: FormArray;
  serviceProviderRecommendationsFormsAfter: FormArray;
  serviceProviderRecommendationsFormsDuring: FormArray;

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
      this.firstStep();
    }
  }

  loadForm() {
    this.recommendationsListForm = new FormGroup({
      serviceProviderRecommendationsFormsBefore: new FormArray([]),
      serviceProviderRecommendationsFormsAfter: new FormArray([]),
      serviceProviderRecommendationsFormsDuring: new FormArray([]),
    })
  }

  firstStep() {
    this.extraService.findRecommendationsByType('1').subscribe(allRecommendationsBefore => {
      for (let i = 0; i < allRecommendationsBefore.length; i++) {
        this.serviceProviderRecommendationsFormsBefore = this.recommendationsListForm.get('serviceProviderRecommendationsFormsBefore') as FormArray;
        this.serviceProviderRecommendationsFormsBefore.push(
          this.formBuilder.group({
            recommendationId: allRecommendationsBefore[i].id,
            apply: [],
            serviceProviderId: [],
            name: allRecommendationsBefore[i].detail,
          })
        )
      }
      this.cd.detectChanges();
    })

    this.extraService.findRecommendationsByType('2').subscribe(allRecommendationsDuring => {

      for (let i = 0; i < allRecommendationsDuring.length; i++) {
        this.serviceProviderRecommendationsFormsDuring = this.recommendationsListForm.get('serviceProviderRecommendationsFormsDuring') as FormArray;
        this.serviceProviderRecommendationsFormsDuring.push(
          this.formBuilder.group({
            recommendationId: allRecommendationsDuring[i].id,
            apply: [],
            serviceProviderId: [],
            name: allRecommendationsDuring[i].detail,
          })
        )
      }
      this.cd.detectChanges();
    })

    this.extraService.findRecommendationsByType('3').subscribe(allRecommendationsAfter => {

      for (let i = 0; i < allRecommendationsAfter.length; i++) {
        this.serviceProviderRecommendationsFormsDuring = this.recommendationsListForm.get('serviceProviderRecommendationsFormsAfter') as FormArray;
        this.serviceProviderRecommendationsFormsDuring.push(
          this.formBuilder.group({
            recommendationId: allRecommendationsAfter[i].id,
            apply: [],
            serviceProviderId: [],
            name: allRecommendationsAfter[i].detail,
          })
        )
      }
      this.cd.detectChanges();
    })
  }

  save(){
    console.log(this.recommendationsListForm.controls.serviceProviderRecommendationsFormsBefore.value)
  }

  loadData() {
    this.serviceProviderId = sessionStorage.getItem('serviceReportId');
    this.providerService.getServiceRecommendationsDetails(this.serviceProviderId).subscribe(listDetails => {

      this.extraService.findRecommendationsByType('1').subscribe(allRecommendationsBefore => {

        for (let i = 0; i < allRecommendationsBefore.length; i++) {
          this.serviceProviderRecommendationsFormsBefore = this.recommendationsListForm.get('serviceProviderRecommendationsFormsBefore') as FormArray;
          this.serviceProviderRecommendationsFormsBefore.push(
            this.formBuilder.group({
              recommendationId: allRecommendationsBefore[i].id,
              apply: listDetails[i].apply,
              serviceProviderId: listDetails[i].serviceProviderId,
              name: allRecommendationsBefore[i].detail,
            })
          )
        }
        this.cd.detectChanges();
      })

      this.extraService.findRecommendationsByType('2').subscribe(allRecommendationsDuring => {

        for (let i = 0; i < allRecommendationsDuring.length; i++) {
          this.serviceProviderRecommendationsFormsDuring = this.recommendationsListForm.get('serviceProviderRecommendationsFormsDuring') as FormArray;
          this.serviceProviderRecommendationsFormsDuring.push(
            this.formBuilder.group({
              recommendationId: allRecommendationsDuring[i].id,
              apply: listDetails[i].apply,
              serviceProviderId: listDetails[i].serviceProviderId,
              name: allRecommendationsDuring[i].detail,
            })
          )
        }
        this.cd.detectChanges();
      })

      this.extraService.findRecommendationsByType('3').subscribe(allRecommendationsAfter => {

        for (let i = 0; i < allRecommendationsAfter.length; i++) {
          this.serviceProviderRecommendationsFormsDuring = this.recommendationsListForm.get('serviceProviderRecommendationsFormsAfter') as FormArray;
          this.serviceProviderRecommendationsFormsDuring.push(
            this.formBuilder.group({
              recommendationId: allRecommendationsAfter[i].id,
              apply: listDetails[i].apply,
              serviceProviderId: listDetails[i].serviceProviderId,
              name: allRecommendationsAfter[i].detail,
            })
          )
        }
        this.cd.detectChanges();
      })

    })
  }

  getArrayAfter() {
    return this.recommendationsListForm.get('serviceProviderRecommendationsFormsAfter') as FormArray;
  }

  getArrayDuring() {
    return this.recommendationsListForm.get('serviceProviderRecommendationsFormsDuring') as FormArray;
  }

  getArrayBefore() {
    return this.recommendationsListForm.get('serviceProviderRecommendationsFormsBefore') as FormArray;
  }
}
