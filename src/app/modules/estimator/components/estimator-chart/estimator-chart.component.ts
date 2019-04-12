import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { Estimate, EstimateInterface } from 'src/app/modules/common-estimator/models/estimator.model';
import { EstimatorService } from '../../../common-estimator/services/estimator/estimator.service';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CurrencyUtil } from '../../../common-estimator/utils/currency/currency.util';

@Component({
    selector: 'estimator-chart',
    templateUrl: './estimator-chart.component.html',
    styleUrls: ['./estimator-chart.component.scss']
})
export class EstimatorChartComponent implements OnInit, OnDestroy{
    private estimates: EstimateInterface[];

    @Input()
    importedEstimate: Estimate = undefined;
    
    private userRetirementAge: number;
    private userSalary: number;
    private userState: string;
    private userStatus: string;
    private userHHSize: number;
    private userAge: number;
    private ngUnsubscribe = new Subject();

    private filteredByAge: Estimate[];
    private filteredBySalary: Estimate[];
    private filteredByState: Estimate[];
    private filteredByMStatus: Estimate[];
    private filteredByHHSize: Estimate[];

    private byAgeAvg: number;
    private bySalaryAvg: number;
    private byStateAvg: number;
    private byStatusAvg: number;
    private byHHSizeAvg: number;

    constructor(private estimatorService: EstimatorService) { }

    ngOnInit() {
        this.userAge = parseInt(this.importedEstimate.Demographics.Age.toString())
        this.userRetirementAge = this.userAge + parseInt(this.importedEstimate.yearsToFI.toString());
        this.userSalary = parseFloat(this.importedEstimate.Factors.AnnualSalary.toString());
        this.userState = this.importedEstimate.Demographics.State;
        this.userStatus = this.importedEstimate.Demographics.MaritalStatus;
        this.userHHSize = parseFloat(this.importedEstimate.Demographics.HouseHoldSize.toString());

        this.getPrevEstimates();
        this.filter();
        this.plotChart();
    }

    ngOnDestroy() {
        this.ngUnsubscribe;
    }

    private getPrevEstimates() {
        const subject = this.estimatorService.all();
        //get previous data
        combineLatest(
            subject.SalEstimate$
        ).pipe(
        takeUntil(this.ngUnsubscribe)
        ).subscribe(([data]) => {
            this.filteredByAge = data;
            this.filteredBySalary = data;
            this.filteredByState = data;
            this.filteredByMStatus = data;
            this.filteredByHHSize = data;
        }),
        map(([SalEstimate]) => {
        const estimateState = {
            estimatesList: SalEstimate
        }
        this.filteredByAge = estimateState.estimatesList;
            this.filteredBySalary = estimateState.estimatesList;
            this.filteredByState = estimateState.estimatesList;
            this.filteredByMStatus = estimateState.estimatesList;
            this.filteredByHHSize = estimateState.estimatesList;
        });
    }

    private filter() {
        let avg = 0;
        
        //by age
        const estList = this.filteredByAge.filter(obj => 
            obj.Demographics.Age >= this.userAge - 5 &&
            obj.Demographics.Age <= obj.Demographics.Age + 5);
        this.filteredByAge = estList;
        this.filteredByAge.forEach(est => {
            avg += parseInt(est.yearsToFI.toString()) + parseInt(est.Demographics.Age.toString());
            console.log(avg);
        })
        this.byAgeAvg = avg/this.filteredByAge.length;

        //by salary
        avg = 0;
        const estList2 = this.filteredBySalary.filter(obj =>
            obj.Factors.AnnualSalary >= this.userSalary - 5000 &&
            obj.Factors.AnnualSalary <= this.userSalary + 5000)
        this.filteredBySalary = estList2;
        this.filteredBySalary.forEach(est => {
            avg += parseInt(est.yearsToFI.toString()) + parseInt(est.Demographics.Age.toString());
            console.log(avg);
        })
        this.bySalaryAvg = avg/this.filteredBySalary.length;

        //by state
        avg = 0;
        const estList3 = this.filteredByState.filter(obj =>
            obj.Demographics.State === this.userState
        );
        this.filteredByState = estList3;
        this.filteredByState.forEach(est => {
            avg += parseInt(est.yearsToFI.toString()) + parseInt(est.Demographics.Age.toString());
            console.log(avg);
        })
        this.byStateAvg = avg/this.filteredByState.length;

        //by marital status
        avg = 0
        const estList4 = this.filteredByMStatus.filter(obj =>
            obj.Demographics.MaritalStatus === this.userStatus)
        this.filteredByMStatus = estList4
        this.filteredByMStatus.forEach(est => {
            avg += parseInt(est.yearsToFI.toString()) + parseInt(est.Demographics.Age.toString());
            console.log(avg);
        })
        this.byStatusAvg = avg/this.filteredByMStatus.length;

        //by household size
        avg = 0;
        const estList5 = this.filteredByHHSize.filter(obj => 
            obj.Demographics.HouseHoldSize >= this.userHHSize - 1 &&
            obj.Demographics.HouseHoldSize <= this.userHHSize + 1
        );
        this.filteredByHHSize = estList5;
        this.filteredByHHSize.forEach(est => {
            avg += parseInt(est.yearsToFI.toString()) + parseInt(est.Demographics.Age.toString());
            console.log(avg);
        })
        this.byHHSizeAvg = avg/this.filteredByHHSize.length;
    }

    private plotChart() {
        var ctx = document.getElementById('myChart');
        alert(this.importedEstimate.yearsToFI.toString())
        var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['You vs people '+`${this.userAge - 5}`+' - '+`${this.userAge + 5}`+' years old',
                    'You vs people earning '+`${CurrencyUtil.format(this.userSalary - 5000)}`+' - '+`${CurrencyUtil.format(this.userSalary + 5000)}`+' per year',
                    'You vs people from '+`${this.userState}`,
                    'You vs '+`${this.userStatus}`+' people',
                    'You vs people with '+`${this.userHHSize - 1}`+' - '+`${this.userHHSize + 1}` +' persons in their household'],
            datasets: [{
                label: 'You',
                data: [this.userRetirementAge, this.userRetirementAge,
                    this.userRetirementAge, this.userRetirementAge,
                    this.userRetirementAge
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 0.5
            },{
            label: 'Others',
            data: [
                this.byAgeAvg, this.bySalaryAvg,
                this.byStateAvg, this.byStatusAvg,
                this.byHHSizeAvg
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
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
