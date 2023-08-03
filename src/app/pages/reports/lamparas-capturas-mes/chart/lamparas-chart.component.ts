/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {ChangeDetectorRef, Component, Inject, NgZone, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
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
  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone,
              private service: LamparasCapturasMesService,
              private router: Router,
              private cd: ChangeDetectorRef,
              ) { }

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
      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout
        })
      );

      this.service.findByDateRange(Number.parseInt(
          // @ts-ignore
          this.clientId = sessionStorage.getItem('clientId')),
        this.functions.primerDiaMes(),
        this.functions.ultimoDiaMes()).subscribe(all => {
        console.log(all, 'estamos dentro de la funcion chart');
        let data: any[] = [];
        for (let i = 0; i < all.length; i++) {
          // Define data
          console.log(all[i].trampa, 'trampa')
          data.push(
            {
              category: "Trampa " + all[i].trampa,
              Moscas: all[i].moscas,
              Palomillas: all[i].palomillas,
              Otros: all[i].otros,
              Total: all[i].total,
            },
          );
        }
        this.cd.detectChanges();


        // Create Y-axis
        let yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
          })
        );

        // Create X-Axis
        let xAxis = chart.xAxes.push(
          am5xy.CategoryAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
            categoryField: "category"
          })
        );
        xAxis.data.setAll(data);

        // Create series
        let moscas = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Moscas",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "Moscas",
            categoryXField: "category"
          })
        );
        moscas.data.setAll(data);

        let palomillas = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Palomillas",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "Palomillas",
            categoryXField: "category"
          })
        );
        palomillas.data.setAll(data);

        let otros = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Otros",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "Otros",
            categoryXField: "category"
          })
        );
        otros.data.setAll(data);

        let total = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Total",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "Total",
            categoryXField: "category"
          })
        );
        total.data.setAll(data);

        chart.set("background", am5.Rectangle.new(root, {
          stroke: am5.color(0x297373),
          strokeOpacity: 0.5,
          fill: am5.color(0x297373),
          fillOpacity: 0.2
        }));

        // Add legend
        let legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);

        // Add cursor
        chart.set("cursor", am5xy.XYCursor.new(root, {}));
        this.root = root;
      });
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

  reset() {
    this.ngOnDestroy();
    this.ngAfterViewInit();
  }
}
