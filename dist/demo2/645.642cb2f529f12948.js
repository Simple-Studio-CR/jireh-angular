"use strict";(self.webpackChunkdemo2=self.webpackChunkdemo2||[]).push([[645],{2645:(U,m,i)=>{i.r(m),i.d(m,{EquipmentModule:()=>T});var t=i(5e3),f=i(6798),h=i(89),v=i(4563),r=i(4521),p=i(9808),b=i(7136),c=i(6298),u=i(5057),Z=i(7232);function x(n,o){1&n&&(t.TgZ(0,"button",27),t._UZ(1,"i",28),t._uU(2," Crear "),t.qZA())}function q(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"tr")(1,"td")(2,"div",29)(3,"div",30),t._UZ(4,"img",31),t.qZA(),t.TgZ(5,"div",32)(6,"a",33),t._uU(7),t.qZA(),t._UZ(8,"span",34),t.qZA()()(),t.TgZ(9,"td")(10,"div",35)(11,"button",36),t.NdJ("click",function(){const s=t.CHM(e).$implicit,d=t.oxw();return t.KtG(d.clickEnterEquipment(s.id))}),t._UZ(12,"i",37),t.qZA()()()()}if(2&n){const e=o.$implicit;t.xp6(4),t.MGl("src","../../../assets/media/files/equipment/",e.photo,"",t.LSH),t.xp6(3),t.hij(" ",e.name," ")}}const y=function(){return[5,10,25,100]};let A=(()=>{class n{constructor(e,a,l,s,d){this.service=e,this.authService=a,this.authHttpService=l,this.router=s,this.cd=d,this.path="app/files/jireh/archivos/equipment/",this.totalRegister=0,this.pageNo=0,this.pageSize=10}ngOnInit(){this.service.listAll().subscribe(e=>{this.equipment=e,this.cd.detectChanges()})}paginator(e){this.pageNo=e.pageIndex,this.pageSize=e.pageSize,this.rangePage()}rangePage(){this.service.listAll().subscribe(e=>{this.equipment=e,this.cd.detectChanges()})}clickEnterEquipment(e){}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(f.Q),t.Y36(h.e8),t.Y36(v.U),t.Y36(r.F0),t.Y36(t.sBO))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-equipment"]],decls:37,vars:11,consts:[[1,"card","mb-10"],[1,"card-body","d-flex","align-items-center","py-8"],[1,"d-flex","h-80px","w-80px","flex-shrink-0","flex-center","position-relative"],["src","assets/media/icons/duotune/finance/fin001.svg",1,"h-40px","me-10"],[1,"ms-6"],[1,"list-unstyled","text-gray-600","fw-bold","fs-6","p-0","m-0"],["class","btn btn-primary","routerLink","/clients/form",4,"ngIf"],[1,"col-1"],["routerLink","/reports",1,"btn","btn-warning","margin-left"],["data-placement","top","data-toggle","tooltip",1,"fas","fa-arrow-left"],[1,"card","card-custom"],[1,"card-header","card-header-stretch","overflow-auto"],[1,"card-header","border-0","pt-5"],[1,"card-title","align-items-start","flex-column"],[1,"card-label","fw-bolder","fs-3","mb-1"],[1,"text-muted","mt-1","fw-bold","fs-7"],[1,"card-toolbar"],["data-kt-menu-flip","top-end","data-kt-menu-placement","bottom-end","data-kt-menu-trigger","click","type","button",1,"btn","btn-sm","btn-icon","btn-color-primary","btn-active-light-primary"],[1,"svg-icon","svg-icon-2",3,"inlineSVG"],[1,"card-body","py-3"],[1,"table-responsive"],[1,"table","table-row-dashed","table-striped","table-row-gray-300","align-middle","gs-0","gy-4"],[1,"fw-bolder","text-muted"],[1,"mb-1"],[1,"mb-1","text-end"],[4,"ngFor","ngForOf"],["aria-label","Select page","showFirstLastButtons","",1,"pagination",3,"length","pageIndex","pageSizeOptions","pageSize","page"],["routerLink","/clients/form",1,"btn","btn-primary"],["data-placement","top","data-toggle","tooltip",1,"fas","fa-plus"],[1,"d-flex","align-items-center"],[1,"symbol","symbol-45px","me-5"],[3,"src"],[1,"d-flex","justify-content-start","flex-column"],["href","#",1,"text-dark","fw-bolder","text-hover-primary","fs-6"],[1,"text-muted","fw-bold","text-muted","d-block","fs-7"],[1,"d-flex","justify-content-end","flex-shrink-0"],["type","submit",1,"btn","btn-warning",3,"click"],["data-placement","top","data-toggle","tooltip",1,"fas","fa-edit"]],template:function(e,a){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"img",3),t.qZA(),t.TgZ(4,"div",4)(5,"p",5),t._uU(6),t.ALo(7,"translate"),t.qZA(),t.YNc(8,x,3,0,"button",6),t._UZ(9,"a",7),t.TgZ(10,"button",8),t._UZ(11,"i",9),t._uU(12," Volver "),t.qZA()()()(),t.TgZ(13,"div",10)(14,"div",11)(15,"div",12)(16,"h3",13)(17,"span",14),t._uU(18,"Listado del equipo"),t.qZA(),t.TgZ(19,"span",15),t._uU(20,"Registrado en el sistema"),t.qZA()(),t.TgZ(21,"div",16)(22,"button",17),t._UZ(23,"span",18),t.qZA(),t._UZ(24,"app-dropdown-menu2"),t.qZA()(),t.TgZ(25,"div",19)(26,"div",20)(27,"table",21)(28,"thead")(29,"tr",22)(30,"th",23),t._uU(31,"Equipo"),t.qZA(),t.TgZ(32,"th",24),t._uU(33,"Acciones"),t.qZA()()(),t.TgZ(34,"tbody"),t.YNc(35,q,13,2,"tr",25),t.qZA()(),t.TgZ(36,"mat-paginator",26),t.NdJ("page",function(s){return a.paginator(s)}),t.qZA()()()()()),2&e&&(t.xp6(6),t.hij(" ",t.lcZ(7,8,"DASHBOARD.ICONS.EQUIP")," "),t.xp6(2),t.Q6J("ngIf",a.authHttpService.hasRole("ROLE_ADMIN")),t.xp6(15),t.Q6J("inlineSVG","./assets/media/icons/duotune/general/gen024.svg"),t.xp6(12),t.Q6J("ngForOf",a.equipment),t.xp6(1),t.Q6J("length",a.totalRegister)("pageIndex",a.pageNo)("pageSizeOptions",t.DdM(10,y))("pageSize",a.pageSize))},dependencies:[p.sg,p.O5,r.rH,b.w,c.d$,u.NW,Z.X$]}),n})();var g=i(8915),E=i(7292);let T=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[p.ez,r.Bz.forChild([{path:"",component:A}]),g.HB,E.q,g.QX,c.vi,u.TU]}),n})()}}]);