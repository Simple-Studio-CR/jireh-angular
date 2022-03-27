import {Component, OnInit} from "@angular/core";
import {Provider} from "../../models/provider";
import {ProviderService} from "../../services/provider.service";
import {AuthHTTPService} from "../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {


  title: 'Provedores';
  provider: Provider[];

  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;

  constructor(private service: ProviderService, public authHttpService: AuthHTTPService, private router: Router) {
  }

  ngOnInit(): void {
    this.rangePage();
    sessionStorage.removeItem('providerId')
  }

  private rangePage() {
    this.service.listAll(this.pageNo + 1, this.pageSize)
      .subscribe(i => {
        this.provider = i.content as Provider[];
        this.totalRegister = i.totalElements as number;
      });
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  clickEnterProvider(id: number) {
    if (id > 0) {
      sessionStorage.setItem('providerId', String(id));
    }
    this.router.navigate(['/providers/view']);
  }

}
