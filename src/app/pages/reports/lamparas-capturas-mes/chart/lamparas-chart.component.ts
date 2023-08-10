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
import {LamparasCapturasMesComponent} from "../lamparas-capturas-mes.component";

@Component({
  selector: 'app-chart',
  templateUrl: './lamparas-chart.component.html',
  styleUrls: ['./lamparas-chart.component.scss']
})

export class LamparasChartComponent {
  functions: FunctionsService = new FunctionsService();
  private chart: am4charts.XYChart;

  // @ts-ignore
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
              private service: LamparasCapturasMesService,
              private router: Router,
              private cd: ChangeDetectorRef,
  ) {
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20;

      // @ts-ignore
      chart.data = JSON.parse(sessionStorage.getItem('reports'));
      this.cd.detectChanges();

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "trampa";
      categoryAxis.title.text = "Numero de trampa";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 10;


      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Numero de capturas";

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "moscas";
      series.dataFields.categoryX = "trampa";
      series.name = "Moscas";
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.stacked = true;

      let series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = "palomillas";
      series2.dataFields.categoryX = "trampa";
      series2.name = "Palomillas";
      series2.tooltipText = "{name}: [bold]{valueY}[/]";
      series2.stacked = true;

      let series3 = chart.series.push(new am4charts.ColumnSeries());
      series3.dataFields.valueY = "otros";
      series3.dataFields.categoryX = "trampa";
      series3.name = "Otros";
      series3.tooltipText = "{name}: [bold]{valueY}[/]";
      series3.stacked = true;

      // Add cursor
      chart.cursor = new am4charts.XYCursor();

      this.cd.detectChanges();
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
    this.ngAfterViewInit();
  }
}
