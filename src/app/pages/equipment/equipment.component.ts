import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {EquipmentService} from "../../services/equipment.service";
import {AuthService} from "../../modules/auth";
import {Router} from "@angular/router";
import {Equipment} from "../../models/equipment";
import {PageEvent} from "@angular/material/paginator";
import {Clients} from "../../models/clients";
import {AuthHTTPService} from "../../modules/auth/services/auth-http";

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  equipment: Equipment[];
  path: string = 'app/files/jireh/archivos/equipment/'

  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;

  constructor(
    private service: EquipmentService,
    public authService: AuthService,
    public authHttpService: AuthHTTPService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.service.listAll().subscribe(eq=>{
      this.equipment = eq as Equipment[];
      this.cd.detectChanges();
    })
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  private rangePage() {
    this.service.listAll()
      .subscribe(i => {
        this.equipment = i as Equipment[];
        this.cd.detectChanges();
      });
  }

  clickEnterEquipment(id: string) {

  }
}
