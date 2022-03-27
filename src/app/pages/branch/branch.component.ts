import {Component, OnInit} from '@angular/core';
import {IssuingBranch} from "../../models/issuing-branch";
import {BranchAccessUsersService} from "../../services/branch-access-users.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  title: 'Sucursales';
  branch: IssuingBranch[];
  addBranch: 'Nueva Sucursal';

  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;

  constructor(private service: BranchAccessUsersService, private router: Router) {
  }

  ngOnInit(): void {
    sessionStorage.removeItem('newBranch');
    sessionStorage.removeItem('editBranch');
    this.rangePage();
  }

  private rangePage() {
    this.service.listAll(this.pageNo + 1, this.pageSize)
      .subscribe(i => {
        this.branch = i.content as IssuingBranch[];
        this.totalRegister = i.totalElements as number;
      });

  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  clickEnterIssuing(id: number, issuingBranch: IssuingBranch) {
    sessionStorage.setItem('branchId', String(id));
    sessionStorage.setItem('branch', JSON.stringify(issuingBranch));
    if (sessionStorage.getItem('branchId') != null && sessionStorage.getItem('emisorId') != null) {
      this.router.navigate(['']);
    }
  }

  editBranch(id: Number) {
    if (id >= 1) {
      sessionStorage.setItem('editBranch', String(id))
      this.router.navigate(['/issuing/branch/new'])
    } else {
      sessionStorage.setItem('newBranch', 'true')
      this.router.navigate(['/issuing/branch/new'])
    }
  }
}
