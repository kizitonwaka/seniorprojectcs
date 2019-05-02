import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { Estimate } from 'src/app/modules/common-estimator/models/estimator.model';
import { EstimatorService } from '../../../common-estimator/services/estimator/estimator.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'estimator-chart',
    templateUrl: './estimator-chart.component.html',
    styleUrls: ['./estimator-chart.component.scss']
})
export class EstimatorChartComponent implements OnInit, OnDestroy{
  
    //data received from EstimatorComponent
    @Input()
    importedEstimate: Estimate = undefined;
    
    private userRetirementAge: number;
    private userState: string;
    private userAge: number;
    private userSex: string;
    private ngUnsubscribe = new Subject();

    private bySexAvg: number;
    private byStateAvg: number;

    private avgUSMale = 59.62; //In 2017, 22,295,155 retired men lived in the United States
    private avgUSFemale = 60.11; //In 2017, 26,965,901 retired women lived in the United States
  
    //retiremeng averages from all US states and territories
    stateAverages = {
        AK: 61, WV: 61,
        AL: 62, AR: 62, KY: 62, LA: 62, MI: 62, NM: 62, OK: 62,
        AZ: 63, DE: 63, GA: 63, IN: 63, ME: 63, MS: 63, MO: 63, NV: 63, NC: 63, OH: 63, OR: 63, SC: 63,
        CA: 64, FL: 64, ID: 64, IL: 64, MT: 64, NY: 64, PA: 64, TN: 64, WA: 64, WI: 64, WY: 64,
        CO: 65, CT: 65, IO: 65, KS: 65, MD: 65, MN: 65, NE: 65, NH: 65, NJ: 65, ND: 65, RI: 65, TX: 65, UT: 65, VT: 65, VA: 65,
        HI: 66, MA: 66, SD: 66,
        DC: 67
    }

    constructor(private estimatorService: EstimatorService) { }

    ngOnInit() {
        this.userSex = this.importedEstimate.Demographics.Sex
        this.userAge = parseInt(this.importedEstimate.Demographics.Age.toString())
        this.userRetirementAge = this.userAge + parseInt(this.importedEstimate.yearsToFI.toString());
        this.userState = this.importedEstimate.Demographics.State;

        const stateAbbreviations = [
            'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
            'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
            'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
            'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
            'VT','VI','VA','WA','WV','WI','WY'
        ];
        var state = this.userState.toUpperCase()
        var state = stateAbbreviations.find(el => 
            state == el);
        if(this.userSex.toLocaleLowerCase() == 'm' ||
        this.userSex.toLocaleLowerCase() == 'f' ||
        this.userSex.toLocaleLowerCase() == 'x' && 
        state != undefined){
            this.byStateAvg = this.stateAverages[this.userState.toString().toLocaleUpperCase()];
            this.plotChart();
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe;
    }

    private plotChart() {
        var ctx = document.getElementById('myChart');
        var sex: string;
        if (this.userSex.toLocaleUpperCase() === "M") {
            sex = "Men";
            this.bySexAvg = this.avgUSMale
        } else if (this.userSex.toLocaleUpperCase() === "F") {
            sex = "Women";
            this.bySexAvg = this.avgUSFemale
        } else if (this.userSex.toLocaleUpperCase() === "X") {
            sex = "X sex"
        }
        var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['You vs other '+`${sex}`,
                    'You vs people from '+`${this.userState}`
                ],
            datasets: [{
                label: 'You',
                data: [this.userRetirementAge,
                    this.userRetirementAge
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 0.5
            },{
            label: 'Others',
            data: [
                this.bySexAvg, this.byStateAvg
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 0.5
        }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    }

    public getEstimate(event){
        this.importedEstimate = event;
    }
}
