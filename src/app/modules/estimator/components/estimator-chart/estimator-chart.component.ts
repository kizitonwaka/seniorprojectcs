import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'estimator-chart',
  templateUrl: './estimator-chart.component.html',
  styleUrls: ['./estimator-chart.component.scss']
})
export class EstimatorChartComponent implements OnInit {
  constructor() { }
  private LineChart=[];
  ngOnInit() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
    data: {
     labels: ["Jan", "Feb", "March", "April", "May", "June","July","Aug","Sep","Oct","Nov","Dec"],
     datasets: [{
         label: 'others',
         data: [9,7 , 3, 5, 2, 10,15,16,19,3,1,9],
         fill:true,
         lineTension:0.5,
         borderColor:"red",
         borderWidth: 2
     },{
      label: 'you',
      data: [3,8 , 0, 5, 2, 5,5,16,8,3,1,3],
      fill:true,
      lineTension:0.5,
      borderColor:"green",
      borderWidth: 2
  }]
    }, 
    options: {
     title:{
         text:"Comparison",
         display:true
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:true
             }
         }]
     }
    }
    });
  }
}
