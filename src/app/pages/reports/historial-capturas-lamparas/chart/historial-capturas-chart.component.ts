/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {ChangeDetectorRef, Component, Inject, NgZone, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {LamparasCapturasMesService} from "../../../../services/lamparas-capturas-mes.service";
import {FunctionsService} from "../../../common/functions.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chart-historialUV',
  templateUrl: './historial-capturas-chart.component.html',
  styleUrls: ['./historial-capturas-chart.component.scss']
})
export class HistorialCapturasChartComponent {
  functions: FunctionsService = new FunctionsService();
  private chart: am4charts.XYChart;

  // @ts-ignore
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
              private router: Router,
              private cd: ChangeDetectorRef,
  ) {
  }
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngAfterViewInit(reporte: any) {
    // Chart code goes in here
    this.browserOnly(() => {

    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  reset() {
    this.ngOnDestroy();
  }
}
