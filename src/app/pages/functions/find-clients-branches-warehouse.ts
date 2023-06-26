// import {FormBuilder} from "@angular/forms";
// import {AuthHTTPService} from "../../modules/auth/services/auth-http";
// import {Router} from "@angular/router";
// import {ClientsService} from "../../services/clients.service";
// import {ChangeDetectorRef} from "@angular/core";
// import {ClientsBranchOffice} from "../../models/clients-branch-office";
// import {ClientsWarehouse} from "../../models/clients-warehouse";
//
// export class FindClientsBranchesWarehouse {
//   constructor(private formBuilder: FormBuilder,
//               public authHttpService: AuthHTTPService,
//               private router: Router,
//               private serviceClient: ClientsService,
//               private cd: ChangeDetectorRef) {
//   }
//
//   public loadData(clientId: any, branches: ClientsBranchOffice[], ){
//     this.serviceClient.branchFindByClient(clientId).subscribe(b => {
//       console.log(b, 'esto devuelve')
//       branches = b.content as ClientsBranchOffice[];
//       this.cd.detectChanges();
//       branchIdForm.controls.branch.valueChanges.subscribe(brcn => {
//         this.serviceClient.warehouseFindByBranchId(brcn.id, 1, 5000).subscribe(w => {
//           this.warehouse = w.content as ClientsWarehouse[];
//           this.controlReportForm.patchValue({
//             clientName: client?.name,
//             createAt: new Date().getFullYear() + '/' + month + '/' + day,
//             clientAddress: this.branchIdForm.controls.branch.value.province.province + ', ' +
//               this.branchIdForm.controls.branch.value.canton.canton + ', ' +
//               this.branchIdForm.controls.branch.value.district.district+ ', ' +
//               this.branchIdForm.controls.branch.value.neighborhood.neighborhood + ', ' +
//               this.branchIdForm.controls.branch.value.addressDetails,
//             startTime: this.functions.setTimeHour(),
//             enabled: true,
//             idClients: client?.id,
//             total: 5
//           })
//           this.cd.detectChanges();
//         })
//       })
//     })
//   }
// }
