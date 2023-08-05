import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {AuthHTTPService} from "../../modules/auth/services/auth-http";

@Component({
  selector: 'app-buy',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  cliente = sessionStorage.getItem('clientName')

  constructor(public authHttpService: AuthHTTPService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.removeItem('fecha');
    if(!(sessionStorage.getItem('clientName'))){
      Swal.fire({
        text: "Se debe seleccionar primero un cliente",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: "btn btn-primary"
        }
      });
      this.router.navigate(['/clients'])
    }
  }

}
