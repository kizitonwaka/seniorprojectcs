import { Component, OnInit, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';

import { Estimate, EstimateInterface } from '../../../common-estimator/models/estimator.model';
import * as EstimateEnums from '../../../common-estimator/enums/estimate.enums';
import { CurrencyUtil } from '../../../common-estimator/utils/currency/currency.util';
import { EstimatorService } from 'src/app/modules/common-estimator/services/estimator/estimator.service';


@Component({
	selector: 'app-estimator',
	templateUrl: './estimator.component.html',
	styleUrls: ['./estimator.component.scss']
})
export class EstimatorComponent implements OnInit, OnDestroy, OnChanges {
	private ngUnsubscribe = new Subject();
	private myEstimate: EstimateInterface;
	private newEstimate: Estimate;
	private newEstimate2: Estimate;
	private newEstimate3: Estimate;
	private newEstimate4: Estimate;

	@Output()
	outputEstimate : EventEmitter <Estimate> = new EventEmitter <Estimate>(undefined)

	/**
	 * notice we are using plain objects
	 * we don't want to show our user our data model
	 */
	public dispEstimate = new Array();
	public dispEstimate2 = new Array(); //5% more
	public dispEstimate3 = new Array(); //7% more
	public dispEstimate4 = new Array(); //10% more
	private estimateEnums = EstimateEnums;
	private screenVal: any;
	private arr = new Array();
	private exportEstimate: Estimate;

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
	decreasedYFI = new Array();

	constructor(private estimatorService: EstimatorService) { }

	ngOnInit() {
		this.getEntries();
	}

	ngOnChanges() {
	}

	ngOnDestroy() {
		this.ngUnsubscribe
	}

	private updateProgressPercentage() {
		this.progressPerc=Math.ceil((this.progress/this.total)*100)
	}

	private nextEntry(index, index2, input, islast?, submit?) {
		if(!input || input ==''){
			alert("Invalid Entry")
			return;
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
	public myEmitter() {
		this.outputEstimate.emit(this.exportEstimate);
	}
	private getYearstoFI(index, index2, input){
		if(!input || input == ''){
			alert("Invalid Entry")
			return;
		}
		this.progress++;
		this.nextEntry(index,index2,input,true,true)
		
		//add estimate interface to MongoDB
		//this.estimatorService.addEstimate(this.myEstimate)
		this.visibility = false;
		//get years to fi and other values here
		//initial
		this.newEstimate = new Estimate(this.myEstimate);
		var myEstimate2 = JSON.parse(JSON.stringify(this.myEstimate))
		this.exportEstimate = new Estimate(myEstimate2);
		this.dispEstimate = this.getDispEstimate(this.newEstimate);

		//5% more
		this.myEstimate.Expenses.ExpenseTotal 
			= ((this.myEstimate.Expenses.ExpenseTotal / 
			this.myEstimate.Factors.AnnualSalary)-0.05 )*this.myEstimate.Factors.AnnualSalary;
		this.newEstimate2 = new Estimate(this.myEstimate);
		this.dispEstimate2 = this.getDispEstimateIncrease(this.newEstimate,5);
		
		//7% more
		this.myEstimate.Expenses.ExpenseTotal 
			= ((this.myEstimate.Expenses.ExpenseTotal / 
			this.myEstimate.Factors.AnnualSalary)-0.07 )*this.myEstimate.Factors.AnnualSalary;
		this.newEstimate3 = new Estimate(this.myEstimate);
		this.dispEstimate3 = this.getDispEstimateIncrease(this.newEstimate,7);
		
		//10% more
		this.myEstimate.Expenses.ExpenseTotal 
			= ((this.myEstimate.Expenses.ExpenseTotal / 
			this.myEstimate.Factors.AnnualSalary)-0.1 )*this.myEstimate.Factors.AnnualSalary;
		this.newEstimate4 = new Estimate(this.myEstimate);
		this.dispEstimate4 = this.getDispEstimateIncrease(this.newEstimate,10);
		this.decreasedYFI.push(this.dispEstimate2, this.dispEstimate3, this.dispEstimate4);
	}

	private getDispEstimate (est: Estimate){
		if(est != undefined){
			/**direct addition leads to concactenation of es.yeartofi with est.demo....age
			**so we need to tell javascript that we want addition(we do this by converting to string and back to int)
			**/
			let retirementAge = parseInt(est.yearsToFI.toString()) + parseInt(est.Demographics.Age.toString());
			let dispEstimate = new Array();
			let temp1: any = ['Annual Salary', CurrencyUtil.format(est.Factors.AnnualSalary)];
			let temp2: any = ['Yearly Savings', CurrencyUtil.format(est.yearlyContribution)];
			let temp3: any = ['Retirement Expenses',CurrencyUtil.format(est.Factors.RetirementExpense)];
			let temp4: any = ['Projected Balance at Retirement', CurrencyUtil.format(est.FINumber)];
			let temp5: any = ['Age of financial independence',retirementAge];
			dispEstimate.push(temp1,temp2,temp3,temp4,temp5)
		return dispEstimate
		}	
	}

	private getDispEstimateIncrease (est: Estimate, perc){
		if(est != undefined){
			/**direct addition leads to concactenation of es.yeartofi with est.demo....age
			**so we need to tell javascript that we want addition(we do this by converting to string and back to int)
			**/
			let newAge = parseInt(est.yearsToFI.toString())
						+ parseInt(est.Demographics.Age.toString());
			let desc = 'Save '+perc+'% more and retire at age';
			let info: any = [desc, newAge];
			return info;
		}	
	}
	private getEntries() {
		this.myEstimate = {
			Demographics: {
				Age: 41,
				Sex: 'M',
				MaritalStatus: 'married',
				HouseHoldSize: 5,
				State: 'KY',
			},
			Expenses: {
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
				RetirementExpense: 40000
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
}
