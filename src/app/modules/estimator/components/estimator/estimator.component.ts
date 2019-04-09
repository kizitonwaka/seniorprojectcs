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

	private ngUnsubscribe = new Subject();
	private estimates: Estimate[];
	private myEstimate: EstimateInterface;
	private newEstimate: Estimate;
	public dispEstimate: Object;
	private estimateEnums = EstimateEnums;
	private screenVal: any;
	private arr = new Array();

	private isLoggedIn: boolean;
	public progress: number = 0;
	public total=0;
	private i = 0;
	private j = 0;
	private lastJ = new Array();
	private myIndex=0;
	private myIndex1=0;
	private progressPerc = 1;
	public visibility = true;

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
		if(!input || input < 0){
			//alert("Invalid Entry")
			//return;
		}
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
		this.progress--;
		this.updateProgressPercentage()
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
		if(!input || input < 0){
			//alert("Invalid Entry")
			//return;
		}
		this.progress++;
		this.nextEntry(index,index2,input,true,true)
		//get years to fi and other values here
		this.visibility = false;
		this.newEstimate = new Estimate(this.myEstimate)
		this.dispEstimate = this.getDispEstimate(this.newEstimate);
		console.log(this.dispEstimate);
		console.log(this.newEstimate);
		console.log(this.myEstimate);
	}

	private getDispEstimate (est: Estimate){
		console.log("in here!")
		if(est != undefined){
			//direct addition leads to concactenation of es.yeartofi with est.demo....age
			//so we need to tell javascript that we want addition(we do this by converting to string and back to int)
			let retirementAge = parseInt(est.yearsToFI.toString()) + parseInt(est.Demographics.Age.toString());
			let dispEstimate = {
				salary: 'Annual Salary: $'+`${ est.Factors.AnnualSalary }`,
				yearlyContribution: 'Yearly Savings: $'+`${ est.yearlyContribution }`,
				retirementEspense: (est.Factors.RetirementEspense > 0)? 
									'Retirement Expenses: $'+`${ est.Factors.RetirementEspense }` : 
									'Retirement Expenses: $'+`${ est.yearlyEspenses }`,
				fiNumber: 'Projected Balance at Retirement: $'+`${ est.FINumber }`,
				yearsToFI: 'Age of financial independence: ' + retirementAge
			}
		return dispEstimate
	}
		
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
