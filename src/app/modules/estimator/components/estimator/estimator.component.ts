import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { Subject, combineLatest } from 'rxjs';
import { map, tap, takeUntil, filter } from 'rxjs/operators';

import { Estimate, EstimateInterface } from '../../../common-estimator/models/estimator.model';
import { EstimatorService } from '../../../common-estimator/services/estimator/estimator.service';
import * as EstimateEnums from '../../../common-estimator/enums/estimate.enums'


@Component({
	selector: 'app-estimator',
	templateUrl: './estimator.component.html',
	styleUrls: ['./estimator.component.scss']
})
export class EstimatorComponent implements OnInit, OnDestroy, OnChanges {

	public ngUnsubscribe = new Subject();
	private estimates: Estimate[];
	private myEstimate: EstimateInterface;
	
	private progress: number = 0;
	private isLoggedIn: boolean;
	private estimateEnums = EstimateEnums;
	private screenVal: string;
	private arr = new Array();
	private total=0;
	private i = 0;
	private j = 0;
	private lastJ = new Array();
	private myIndex=0;
	private myIndex1=0;
	private progressPerc = 1;
	private newEstimate: Estimate;
	private dispEstimate: Object;
	private visibility = true;

	constructor(private estimatorService: EstimatorService) { }

	ngOnInit() {
		this.initEstimates();
	}

	ngOnChanges() {
		alert("ngOnChanges")
		if(this.estimates)
			this.estimates = this.estimates.splice(0);
		console.log('onchages: ', this.estimates)
		console.log(this.estimates)
	}

	ngOnDestroy() {
		this.ngUnsubscribe
	}

	private updateProgressPercentage() {
		this.progressPerc=Math.ceil((this.progress/this.total)*100)
	}

	private nextEntry(index, index2, input, islast?, submit?) {
		if(!input || input < 0)
			return
		this.myEstimate[index][index2] = input;
		if(submit) {
			return;
		}
		if(this.progress < this.total){
			this.progress++;
			this.updateProgressPercentage()
		}
		if(islast) {
			this.lastJ.push(this.j);
			this.j = 0;
			this.i++;
			return;
		}
		this.j++;
	}
	private prevEntry(isFirst1) {
		if(this.progress !== 1){
			this.progress--;
			this.updateProgressPercentage()
		}
		if(isFirst1) {
			this.i--;
			this.j = this.lastJ.pop();
			return;
		}
		this.j--;
	}
	private customCompare(a, b) {
		//this is needed to keep order of elements in markup since keys are complex types
		return 0;
	}
	private getYearstoFI(index, index2, input){
		if(!input || input < 0)
			return
		this.nextEntry(index,index2,input,true,true)
		//get years to fi and other values here
		this.newEstimate = new Estimate(this.myEstimate);
		this.visibility = false;
		this.dispEstimate = this.getDispEstimate(this.newEstimate)
		console.log(this.dispEstimate);
	}

	private getDispEstimate (est: Estimate){
		console.log("in here!")
		let dispEstimate = {
			salary: 'Annual Salary: $'+`${ est.Factors.AnnualSalary }`,
			expenses: 'Expenses: $'+`${ est.yearlyEspenses }`,
			yearlyContribution: 'Yearly Savings: $'+`${ est.yearlyContribution }`,
			retirementEspense: (est.Factors.RetirementEspense > 0)? 
								'Retirement Expenses: $'+`${ est.Factors.RetirementEspense }` : 
								'Retirement Expenses: $'+`${ est.yearlyEspenses }`,
			fiNumber: 'Projected Balance at Retirement: $'+`${ est.FINumber }`,
			yearsToFI: 'Projected Years to Independence: ' + `${ est.yearsToFI }`
		}
		return dispEstimate;
	}
	private getEntries() {
		this.myEstimate = {
			Demographics: {
				Age: 41
			},
			Espenses: {
				ExpenseTotal: 35000
			},
			Investments: {
				SumofInvestments: 50000
			},
			Factors: {
				ExpectedReturn: 5,
				CurrentSavingsBalance: 100000,
				AnnualSalary: 100,
				SafeWithdrawalRate: 4,
				RetirementEspense: 40000
			}
		};
		Object.entries(this.estimateEnums).forEach(([key,value]) => {
			Object.entries(value).forEach(([key2,value2]) => {
				this.screenVal = JSON.stringify(this.myEstimate[key.toString()][key2.toString()]);
				//console.log((this.estimateEnums[key.toString()])[key2.toString()])
				this.arr.push(this.screenVal);
				this.total++;
			});
		});
		this.progressPerc = 1/this.total
	}

	private makeVisible() {//rename later
		this.visibility = true;
	}
	private waits(ms){
		var start = new Date().getTime();
		var end = start;
		while(end < start + ms) {
		  end = new Date().getTime();
	   }
	 }
	private initEstimates() {
			const subject = this.estimatorService.all();
			//get previous data
			combineLatest(
				subject.SalEstimate$
			).pipe(
			takeUntil(this.ngUnsubscribe)
			).subscribe(([data]) => {
				this.estimates = data;
			}),
			map(([SalEstimate]) => {
			const estimateState = {
				estimatesList: SalEstimate
			}
			this.estimates = estimateState.estimatesList
			});

			//collect new data
			this.getEntries();
	}	

}
