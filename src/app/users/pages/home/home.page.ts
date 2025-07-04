import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [NgxChartsModule, IonContent],
})
export class HomePage {
  // Example data for ngx-charts
  barChartData = [
    { name: 'Mon', value: 1250 },
    { name: 'Tue', value: 2300 },
    { name: 'Wed', value: 1800 },
    { name: 'Thu', value: 900 },
    { name: 'Fri', value: 2200 }
  ];

  pieChartData = [
    { name: 'Product A', value: 4000 },
    { name: 'Product B', value: 2500 },
    { name: 'Product C', value: 1800 }
  ];

  lineChartData = [
    {
      name: 'Orders',
      series: [
        { name: 'Mon', value: 30 },
        { name: 'Tue', value: 50 },
        { name: 'Wed', value: 40 },
        { name: 'Thu', value: 20 },
        { name: 'Fri', value: 60 }
      ]
    }
  ];

colorScheme: Color = {
  name: 'myScheme',
  selectable: true,
  group: ScaleType.Ordinal, // <-- Use ScaleType.Ordinal or ScaleType.Linear
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
};

  constructor() {}
}
