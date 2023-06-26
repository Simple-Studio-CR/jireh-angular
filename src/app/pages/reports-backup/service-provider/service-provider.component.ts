import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ServiceProviderService} from "../../../services/service-provider.service";
import {AuthHTTPService} from "../../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {ServiceProvider} from "../../../models/service-provider";

@Component({
  selector: 'service-provider-component',
  templateUrl: 'service-provider.component.html',
  styleUrls: ['service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {
  tittle = 'Servicios Prestados';
  serviceProvider: ServiceProvider[];

  warehouse: string;

  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;

  constructor(
    private service: ServiceProviderService,
    public authHttpService: AuthHTTPService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    sessionStorage.removeItem('serviceReportId')
    sessionStorage.removeItem('serviceReport')
    sessionStorage.removeItem('isNew')
    this.rangePage();
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  private rangePage() {
    let clientId: string | null = sessionStorage.getItem('clientId');
    // @ts-ignore
    this.service.getServiceProvider(Number.parseInt(clientId), this.pageNo + 1, this.pageSize)
      .subscribe(i => {
        console.log(i, 'aqui estamos con esto ')
        this.serviceProvider = i as ServiceProvider[];
        this.cd.detectChanges();
      })
  }

  clickEnterReport(id: string, service: ServiceProvider) {
    sessionStorage.setItem('serviceReportId', id);
    sessionStorage.setItem('serviceReport', JSON.stringify(service));
    this.router.navigate(['/reports/service-provider/form'])
  }

  createNew() {
    sessionStorage.setItem('isNew', 'true');
    this.router.navigate(['/reports/service-provider/form'])
  }
}
