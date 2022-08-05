import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ControlReport} from "../../../models/control-report";
import {ControlReportService} from "../../../services/control-report.service";
import {AuthHTTPService} from "../../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {Provider} from "../../../models/provider";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-items',
  templateUrl: './cebadero.component.html',
  styleUrls: ['./cebadero.component.scss']
})
export class CebaderoComponent implements OnInit {

  tittle = 'Cebaderos';
  controlReport: ControlReport[];
  warehouse:string;


  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;

  constructor(private service:ControlReportService,
              public authHttpService: AuthHTTPService,
              private router: Router,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.rangePage();
    sessionStorage.removeItem('reportId')
    sessionStorage.removeItem('reports')
    sessionStorage.removeItem('isNew')
  }

  private rangePage() {
    let clientId:string | null = sessionStorage.getItem('clientId');
    this.service.findControlByClient(clientId,true,this.pageNo + 1, this.pageSize)
      .subscribe(i => {
        console.log(i.length)
        this.controlReport = i as ControlReport[];
        this.cd.detectChanges();
      });
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }


  clickEnterReport(id: string, reports: any) {
    sessionStorage.setItem('reportId', id);
    sessionStorage.setItem('reports', JSON.stringify(reports));
    this.router.navigate(['/reports/cebadero/form'])
  }
}
