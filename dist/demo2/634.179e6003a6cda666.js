"use strict";(self.webpackChunkdemo2=self.webpackChunkdemo2||[]).push([[634],{7634:(Oe,E,l)=>{l.r(E),l.d(E,{ReportsModule:()=>Fe});var A=l(9808),g=l(4521),j=l(7850),S=l(6298),U=l(5802),c=l(3075),R=l(1592),z=l(7292),$=l(5226),G=l.n($),t=l(5e3),V=l(4563),q=l(3057),K=l(7232);let W=(()=>{class n{constructor(e,a){this.authHttpService=e,this.router=a,this.cliente=sessionStorage.getItem("clientName")}ngOnInit(){sessionStorage.getItem("clientName")||(G().fire({text:"Se debe seleccionar primero un cliente",icon:"success",buttonsStyling:!1,confirmButtonText:"Ok",customClass:{confirmButton:"btn btn-primary"}}),this.router.navigate(["/clients"]))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(V.U),t.Y36(g.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-buy"]],decls:32,vars:5,consts:[[1,"card"],[1,"card-header","border-0","pt-6"],[1,"card-title"],[1,"d-flex","align-items-center","position-relative","my-1"],[1,"ki-duotone","ki-magnifier","fs-3","position-absolute","ms-5"],[1,"path1",3,"inlineSVG"],[1,"form-control","form-control-solid","w-250px","ps-13"],[1,"dataTables_wrapper","dt-bootstrap4","no-footer"],[1,"table-responsive"],[1,"row","g-5","g-xl-8"],[1,"col-xl-3"],["svgIcon","assets/media/icons/duotune/general/gen035.svg","color","success","iconColor","white","description","","routerLink","/reports/incidencias-plaga-mensual","title","Incidencias de Plagas Encontradas",1,"card","bg-success","hoverable","card-xl-stretch","mb-xl-8"],["svgIcon","assets/media/icons/duotune/general/gen035.svg","color","success","iconColor","white","title","Informaci\xf3n de Plagas","description","","routerLink","/reports/service-provider",1,"card","bg-success","hoverable","card-xl-stretch","mb-xl-8"],["svgIcon","assets/media/icons/duotune/general/gen035.svg","color","success","iconColor","white","description","","routerLink","/buys/view","title","Observaciones y mejoras",1,"card","bg-success","hoverable","card-xl-stretch","mb-xl-8"],["svgIcon","assets/media/icons/duotune/general/gen035.svg","color","success","iconColor","white","description","","routerLink","/buys/view","title","L\xe1mparas UV. Capturas por mes",1,"card","bg-success","hoverable","card-xl-stretch","mb-xl-8"],["svgIcon","assets/media/icons/duotune/general/gen035.svg","color","success","iconColor","white","description","","routerLink","/buys/view","title","Historial Capturas por L\xe1mparas UV",1,"card","bg-success","hoverable","card-xl-stretch","mb-xl-8"],["svgIcon","assets/media/icons/duotune/general/gen035.svg","color","success","iconColor","white","description","","routerLink","/buys/view","title","Incidencia en Trampas Internas",1,"card","bg-success","hoverable","card-xl-stretch","mb-xl-8"],["svgIcon","assets/media/icons/duotune/general/gen035.svg","color","success","iconColor","white","description","","routerLink","/buys/view","title","Consumo cebaderos mensual",1,"card","bg-success","hoverable","card-xl-stretch","mb-xl-8"],["svgIcon","assets/media/icons/duotune/general/gen035.svg","color","success","iconColor","white","description","","routerLink","/buys/view","title","Insecticidas Aplicados",1,"card","bg-success","hoverable","card-xl-stretch","mb-xl-8"],["svgIcon","assets/media/icons/duotune/general/gen035.svg","color","success","iconColor","white","description","","routerLink","/buys/view","title","Mapeo de Trampas",1,"card","bg-success","hoverable","card-xl-stretch","mb-xl-8"],["svgIcon","assets/media/icons/duotune/arrows/arr079.svg","color","success","iconColor","white","routerLink","/dashboard","description","",1,"card","bg-dark","hoverable","card-xl-stretch","mb-5","mb-xl-8",3,"title"]],template:function(e,a){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"i",4),t._UZ(5,"span",5),t.qZA(),t.TgZ(6,"label",6),t._uU(7),t.qZA()()()(),t.TgZ(8,"div",7)(9,"div",8)(10,"div",9)(11,"div",10),t._UZ(12,"app-stats-widget5",11),t.qZA(),t.TgZ(13,"div",10),t._UZ(14,"app-stats-widget5",12),t.qZA(),t.TgZ(15,"div",10),t._UZ(16,"app-stats-widget5",13),t.qZA(),t.TgZ(17,"div",10),t._UZ(18,"app-stats-widget5",14),t.qZA(),t.TgZ(19,"div",10),t._UZ(20,"app-stats-widget5",15),t.qZA(),t.TgZ(21,"div",10),t._UZ(22,"app-stats-widget5",16),t.qZA(),t.TgZ(23,"div",10),t._UZ(24,"app-stats-widget5",17),t.qZA(),t.TgZ(25,"div",10),t._UZ(26,"app-stats-widget5",18),t.qZA(),t.TgZ(27,"div",10),t._UZ(28,"app-stats-widget5",19),t.qZA(),t.TgZ(29,"div",10),t._UZ(30,"app-stats-widget5",20),t.ALo(31,"translate"),t.qZA()()()()()),2&e&&(t.xp6(5),t.Q6J("inlineSVG","./assets/media/icons/duotune/general/gen022.svg"),t.xp6(2),t.Oqu(a.cliente),t.xp6(23),t.s9C("title",t.lcZ(31,3,"BUYS.ICONS.BACK")))},dependencies:[g.rH,q.T,S.d$,K.X$]}),n})();var u=l(2843),p=l(262),x=l(520),T=l(89),w=l(7560);let Q=(()=>{class n{constructor(e,a,i,s){this.http=e,this.authService=a,this.router=i,this.variables=s}notAllowed(e){return 401==e.status||403==e.status}save(e){return this.http.post(this.variables.getServicingEndpoint()+"/incidencia-mensual/save",e,{headers:this.variables.getAuthHeader()}).pipe((0,p.K)(a=>(this.notAllowed(a),(0,u._)(a))))}update(e){return this.http.put(this.variables.getServicingEndpoint()+"/incidencia-mensual/edit/",e,{headers:this.variables.getAuthHeader()}).pipe((0,p.K)(a=>(this.notAllowed(a),(0,u._)(a))))}findByDateRange(e,a,i){return this.http.get(this.variables.getServicingEndpoint()+"/incidencia-mensual/get-by-date-range/"+e+"/"+a+"/"+i,{headers:this.variables.getAuthHeader()}).pipe((0,p.K)(s=>(this.notAllowed(s),(0,u._)(s))))}findByDate(e,a){return this.http.get(this.variables.getServicingEndpoint()+"/incidencia-mensual/get-by-date/"+e+"/"+a+"/",{headers:this.variables.getAuthHeader()}).pipe((0,p.K)(i=>(this.notAllowed(i),(0,u._)(i))))}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(x.eN),t.LFG(T.e8),t.LFG(g.F0),t.LFG(w.E))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var X=l(9012);let J=(()=>{class n{constructor(e,a,i,s){this.http=e,this.authService=a,this.router=i,this.variables=s}notAllowed(e){return 401==e.status||403==e.status}getPestType(){return this.http.get(this.variables.getServicingEndpoint()+"/extras/get-pest",{headers:this.variables.getAuthHeader()}).pipe((0,p.K)(e=>(this.notAllowed(e),(0,u._)(e))))}getCalificaciones(e){return this.http.get(this.variables.getServicingEndpoint()+"/extras/get-calificaciones/"+e,{headers:this.variables.getAuthHeader()}).pipe((0,p.K)(a=>(this.notAllowed(a),(0,u._)(a))))}getRecommendations(){return this.http.get(this.variables.getServiceEndpoint()+"/extras/get-recommendation",{}).pipe((0,p.K)(e=>(this.notAllowed(e),(0,u._)(e))))}findRecommendationsByType(e){return this.http.get(this.variables.getServiceEndpoint()+"/extras/get-recommendation-type/"+e,{}).pipe((0,p.K)(a=>(this.notAllowed(a),(0,u._)(a))))}findRecommendationsById(e){return this.http.get(this.variables.getServiceEndpoint()+"/extras/get-recommendation/"+e,{}).pipe((0,p.K)(a=>(this.notAllowed(a),(0,u._)(a))))}saveRecommendations(e){return this.http.post(this.variables.getServiceEndpoint()+"/extras/save-recommendations",e,{}).pipe((0,p.K)(a=>(this.notAllowed(a),(0,u._)(a))))}savePestType(e){return this.http.post(this.variables.getServiceEndpoint()+"/extras/save-pest",e,{}).pipe((0,p.K)(a=>(this.notAllowed(a),(0,u._)(a))))}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(x.eN),t.LFG(T.e8),t.LFG(g.F0),t.LFG(w.E))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var ee=l(4291);let te=(()=>{class n{constructor(e,a,i,s){this.http=e,this.authService=a,this.router=i,this.variables=s}notAllowed(e){return 401==e.status||403==e.status}findByBranchId(e,a,i){return this.http.get(this.variables.getServicingEndpoint()+"/clients/warehouse/branch/"+e+"/"+a+"/"+i,{headers:this.variables.getAuthHeader()}).pipe((0,p.K)(s=>(this.notAllowed(s),(0,u._)(s))))}save(e){return this.http.post(this.variables.getServicingEndpoint()+"/clients/warehouse/",e,{}).pipe((0,p.K)(a=>(this.notAllowed(a),(0,u._)(a))))}edit(e,a){return this.http.put(this.variables.getServicingEndpoint()+"/clients/edit-warehouse/"+a,e,{}).pipe((0,p.K)(i=>(this.notAllowed(i),(0,u._)(i))))}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(x.eN),t.LFG(V.U),t.LFG(g.F0),t.LFG(w.E))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var _=l(508),f=l(7322);let F=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({}),n})(),D=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[_.rD],imports:[F,f.lN,_.BQ,F,f.lN]}),n})();function ne(n,r){if(1&n&&(t.TgZ(0,"option",42),t._uU(1),t.qZA()),2&n){const e=r.$implicit;t.Q6J("ngValue",e),t.xp6(1),t.Oqu(e.name)}}function re(n,r){if(1&n&&(t.TgZ(0,"option",42),t._uU(1),t.qZA()),2&n){const e=r.$implicit;t.Q6J("ngValue",e),t.xp6(1),t.Oqu(e.name)}}function se(n,r){if(1&n&&(t.TgZ(0,"option",42),t._uU(1),t.qZA()),2&n){const e=r.$implicit;t.Q6J("ngValue",e),t.xp6(1),t.Oqu(e.name)}}function oe(n,r){if(1&n&&(t.TgZ(0,"option",42),t._uU(1),t.qZA()),2&n){const e=r.$implicit;t.Q6J("ngValue",e),t.xp6(1),t.Oqu(e.calificaciones)}}function le(n,r){if(1&n&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.qZA(),t._UZ(13,"td"),t.qZA()),2&n){const e=r.$implicit;t.xp6(2),t.Oqu(e.warehouse.name),t.xp6(2),t.Oqu(e.createAt),t.xp6(2),t.Oqu(e.pestType.name),t.xp6(2),t.Oqu(e.cuantificacion),t.xp6(2),t.Oqu(e.calificacion.calificaciones),t.xp6(2),t.Oqu(e.observaciones)}}let de=(()=>{class n{constructor(e,a,i,s,o,d,m){this.service=e,this.clientService=a,this.pestTypeService=i,this.branchService=s,this.wareHouseService=o,this.matInput=d,this.cd=m}ngOnInit(){this.findBranches(),this.iniciarForms(),this.cargarDatos()}guardar(){this.service.save(this.inicidenciasForm.value).subscribe(e=>{console.log(e)})}iniciarForms(){this.form=new c.cw({}),this.inicidenciasForm=new c.cw({branchOffice:new c.NI(""),createAt:new c.NI(""),warehouse:new c.NI(""),pestType:new c.NI(""),cuantificacion:new c.NI(""),calificacion:new c.NI(""),observaciones:new c.NI("")})}cargarDatos(){let e=new Date,a=e.getFullYear()+"-"+e.getMonth()+"-"+e.getDay();this.service.findByDate(Number.parseInt(this.clientId=sessionStorage.getItem("clientId")),a).subscribe(i=>{this.incidenciasNueva=i,console.log(i),this.cd.detectChanges()}),this.range=new c.cw({start:new c.NI(null),end:new c.NI(null)}),this.range.valueChanges.subscribe(i=>{null==i.end&&this.service.findByDate(Number.parseInt(this.clientId=sessionStorage.getItem("clientId")),i.start).subscribe(s=>{this.incidenciasNueva=s,console.log(i,"fecha"),this.cd.detectChanges()}),null!=i.end&&null!=i.start&&this.service.findByDateRange(Number.parseInt(this.clientId=sessionStorage.getItem("clientId")),i.start,i.end).subscribe(s=>{this.incidenciasNueva=s,this.cd.detectChanges()})})}findBranches(){this.clientId=sessionStorage.getItem("clientId"),this.branchService.findByClientId(Number.parseInt(this.clientId),1,200).subscribe(e=>{this.branches=e.content,this.cd.detectChanges(),this.inicidenciasForm.controls.branchOffice.valueChanges.subscribe(a=>{this.wareHouseService.findByBranchId(Number.parseInt(a.id),1,200).subscribe(i=>{this.warehouse=i.content,this.cd.detectChanges()})})}),this.pestTypeService.getPestType().subscribe(e=>{this.pestType=e,this.cd.detectChanges(),console.log(e),this.inicidenciasForm.controls.pestType.valueChanges.subscribe(a=>{this.pestTypeService.getCalificaciones(a.id).subscribe(i=>{this.calificaciones=i,this.cd.detectChanges()})})})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(Q),t.Y36(X.a),t.Y36(J),t.Y36(ee.I),t.Y36(te),t.Y36(D),t.Y36(t.sBO))},n.\u0275cmp=t.Xpm({type:n,selectors:[["incidencias-plagas-mensuales-component"]],decls:103,vars:7,consts:[[1,"card"],[1,"card-header","border-0","pt-5","pb-5"],[1,"anchor","fw-bold","mb-5"],["id","inicidenciasForm",3,"formGroup"],[1,"row","p-t-20","col-md-12"],[1,"col-md-6"],["for","clientBranch",1,"form-label"],["formControlName","branchOffice","id","clientBranch",1,"form-select"],[3,"ngValue",4,"ngFor","ngForOf"],["for","warehouse",1,"form-label"],["formControlName","warehouse","id","warehouse",1,"form-select"],[1,"col-md-3","pt-2"],[1,"form-label"],["formControlName","createAt","type","date",1,"form-control"],[1,"col-md-3"],["formControlName","pestType",1,"form-select"],["for","cuantificacion",1,"form-label"],["formControlName","cuantificacion","id","cuantificacion",1,"form-select"],["for","calificacion",1,"form-label"],["formControlName","calificacion","id","calificacion",1,"form-select"],[1,"col-md-8"],["for","observaciones",1,"form-label"],["formControlName","observaciones","id","observaciones","placeholder","Ingrese",1,"form-control"],[1,"col-md-2","pt-6"],[1,"btn","btn-success","margin-left",3,"click"],["data-placement","top","data-toggle","tooltip",1,"fas","fa-save"],["routerLink","/reports",1,"btn","btn-warning","margin-left"],["data-placement","top","data-toggle","tooltip",1,"fas","fa-arrow-left"],[1,"separator","my-10"],[1,"card-body","py-3"],[1,"table-responsive"],[1,"card","card-flush"],[1,"card-header","align-items-center","py-5","gap-2","gap-md-5"],[1,"card-title"],[1,"card-toolbar","flex-row-fluid","justify-content-end","gap-5"],["id","range",3,"formGroup"],["formControlName","start","type","date",1,"form-control"],["formControlName","end","type","date",1,"form-control"],[1,"table","table-striped","table-rounded","border","border-gray-300","table-row-bordered","table-row-gray-300","gy-7","gs-7"],[1,"fw-semibold","fs-4","text-gray-800"],[1,"min-w-200px"],[4,"ngFor","ngForOf"],[3,"ngValue"]],template:function(e,a){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),t._uU(3,"Ingresar Nueva Incidencias de Plagas Mensual"),t.qZA(),t.TgZ(4,"form",3)(5,"div",4)(6,"div",5)(7,"label",6),t._uU(8,"Sucursal"),t.qZA(),t.TgZ(9,"select",7)(10,"option"),t._uU(11,"Seleccione Sucursal"),t.qZA(),t.YNc(12,ne,2,2,"option",8),t.qZA()(),t.TgZ(13,"div",5)(14,"label",9),t._uU(15,"Bodega"),t.qZA(),t.TgZ(16,"select",10)(17,"option"),t._uU(18,"Seleccione Bodega/Oficina"),t.qZA(),t.YNc(19,re,2,2,"option",8),t.qZA()(),t.TgZ(20,"div",11)(21,"label",12),t._uU(22,"Fecha"),t.qZA(),t._UZ(23,"input",13),t.qZA(),t.TgZ(24,"div",14)(25,"label",12),t._uU(26,"Plaga encontrada"),t.qZA(),t.TgZ(27,"select",15)(28,"option"),t._uU(29,"Seleccione Plaga"),t.qZA(),t.YNc(30,se,2,2,"option",8),t.qZA()(),t.TgZ(31,"div",14)(32,"label",16),t._uU(33,"Cuantificacion"),t.qZA(),t.TgZ(34,"select",17)(35,"option"),t._uU(36,"Seleccione Cantidad"),t.qZA(),t.TgZ(37,"option"),t._uU(38,"Nulo"),t.qZA(),t.TgZ(39,"option"),t._uU(40,"Bajo"),t.qZA(),t.TgZ(41,"option"),t._uU(42,"Medio"),t.qZA(),t.TgZ(43,"option"),t._uU(44,"Alto"),t.qZA()()(),t.TgZ(45,"div",14)(46,"label",18),t._uU(47,"Calificacion"),t.qZA(),t.TgZ(48,"select",19)(49,"option"),t._uU(50,"Seleccione Calificacion"),t.qZA(),t.YNc(51,oe,2,2,"option",8),t.qZA()(),t.TgZ(52,"div",20)(53,"label",21),t._uU(54,"Observaciones"),t.qZA(),t._UZ(55,"textarea",22),t.qZA(),t.TgZ(56,"div",23)(57,"button",24),t.NdJ("click",function(){return a.guardar()}),t._UZ(58,"i",25),t._uU(59," Guardar "),t.qZA()(),t.TgZ(60,"div",23)(61,"button",26),t._UZ(62,"i",27),t._uU(63," Volver "),t.qZA()()()()(),t._UZ(64,"div",28),t.TgZ(65,"div",29)(66,"div",30)(67,"div",31)(68,"div",32)(69,"div",33)(70,"h1",2),t._uU(71,"Registro de Incidencias de Plagas Mensual"),t.qZA(),t._UZ(72,"div"),t.qZA(),t.TgZ(73,"div",34)(74,"form",35)(75,"div",4)(76,"div",5)(77,"label",12),t._uU(78,"De:"),t.qZA(),t._UZ(79,"input",36),t.qZA(),t.TgZ(80,"div",5)(81,"label",12),t._uU(82,"Para:"),t.qZA(),t._UZ(83,"input",37),t.qZA()()()()(),t.TgZ(84,"table",38)(85,"thead")(86,"tr",39)(87,"th",40),t._uU(88,"Bodega"),t.qZA(),t.TgZ(89,"th",40),t._uU(90,"Fecha"),t.qZA(),t.TgZ(91,"th",40),t._uU(92,"Plaga"),t.qZA(),t.TgZ(93,"th",40),t._uU(94,"Cuantificacion"),t.qZA(),t.TgZ(95,"th",40),t._uU(96,"Calificacion"),t.qZA(),t.TgZ(97,"th",40),t._uU(98,"Observaciones"),t.qZA(),t.TgZ(99,"th",40),t._uU(100,"Acciones"),t.qZA()()(),t.TgZ(101,"tbody"),t.YNc(102,le,14,6,"tr",41),t.qZA()()()()()()),2&e&&(t.xp6(4),t.Q6J("formGroup",a.inicidenciasForm),t.xp6(8),t.Q6J("ngForOf",a.branches),t.xp6(7),t.Q6J("ngForOf",a.warehouse),t.xp6(11),t.Q6J("ngForOf",a.pestType),t.xp6(21),t.Q6J("ngForOf",a.calificaciones),t.xp6(23),t.Q6J("formGroup",a.range),t.xp6(28),t.Q6J("ngForOf",a.incidenciasNueva))},dependencies:[A.sg,g.rH,c._Y,c.YN,c.Kr,c.Fj,c.EJ,c.JJ,c.JL,c.sg,c.u]}),n})();var ce=l(5664),P=l(9776),he=l(7429),ue=l(7423),pe=l(495),k=l(7579);l(727),l(1159),l(3191),l(1777);let xe=(()=>{class n{constructor(){this.changes=new k.x,this.calendarLabel="Calendar",this.openCalendarLabel="Open calendar",this.closeCalendarLabel="Close calendar",this.prevMonthLabel="Previous month",this.nextMonthLabel="Next month",this.prevYearLabel="Previous year",this.nextYearLabel="Next year",this.prevMultiYearLabel="Previous 24 years",this.nextMultiYearLabel="Next 24 years",this.switchToMonthViewLabel="Choose date",this.switchToMultiYearViewLabel="Choose month and year"}formatYearRange(e,a){return`${e} \u2013 ${a}`}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();const Ie={provide:new t.OlP("mat-datepicker-scroll-strategy"),deps:[P.aV],useFactory:function ke(n){return()=>n.scrollStrategies.reposition()}};let Te=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[xe,Ie],imports:[A.ez,ue.ot,P.U8,ce.rt,he.eL,_.BQ,pe.ZD]}),n})();var B=l(4102);let Fe=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[A.ez,g.Bz.forChild([{path:"",component:W},{path:"incidencias-plaga-mensual",component:de}]),R.HB,z.q,j.TU,S.vi,R.QX,U.IJ,c.u5,c.UX,f.lN,Te,_.XK,B.LD,D,B.LD,f.lN,D,D,D]}),n})()}}]);