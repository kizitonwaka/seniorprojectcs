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
	
	private progress: number = 1;
	private isLoggedIn: boolean;
	private estimateEnums = EstimateEnums;
	private screenVal: string;
	private arr = new Array();
	private total = 0;
	private i = 0;
	private j = 0;
	private lastJ = new Array();
	private myIndex=0;
	private myIndex1=0;
	private progressPerc = 1;// = 1/this.total;
	private newEstimate: Estimate;
	private visibility = true;
	private dispEstimate;

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
		//this is needed to keep order of elements in marlup since keys are complex types
		return 0;
	}
	private getYearstoFI(index, index2, input){
		this.nextEntry(index,index2,input,true,true)
		//get years to fi and other values here
		this.newEstimate = new Estimate(this.myEstimate);
		this.visibility = false;
	}

	private getEntries() {
		this.myEstimate = {
			Account: {
				AccountNumber: 1,
				FirstName: "Daniel",
				LastName: "Weigh",
				Token: "dway@ms.com",
				Age: 41
			},
			Espenses: {
				Mortgages: 100,
				Rent: 100,
				PropertyTaxes: 100,
				StrataFeeOrCondoFee: 100,
				HouseOrTenantInsurance: 100,
				LoanPayment: 1000,
				VehicleInsurance: 100,
				VehicleMaintenance: 100,
				HealthExpense: 100,
				BankFees: 100,
				DebtPayments: 100,
				EmergencyExpense: 100,
				ClothingAndShoes: 100,
				VetBills: 100,
				Gifts: 100,
				Cable: 100,
				Cell: 100,
				Electricity: 100,
				Gas: 100,
				Water: 100,
				Other: 100
			},
			InvestmentPortfolio: {
				Stocks: 100,
				Bonds: 100,
				MutualFunds: 100,
				MoneyMarketFunds: 100,
				ExchangeTradedFunds: 100,
				Other: 100
			},
			FIFactors: {
				ExpectedReturn: 100,
				CurrentSavingsBalance: 100,
				AnnualSalary: 100,
				SafeWithdrawalRate: 100,
				RetirementEspense: 100
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
		this.waits(10);
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
		if(this.isLoggedIn){
			const subject = this.estimatorService.all(1);
			combineLatest(
				subject.SalEstimate$
				).pipe(
				takeUntil(this.ngUnsubscribe),
				tap(([s]) => {
				})).subscribe(([estimates]) => {
					this.estimates = estimates;
				}),
				filter(([s]) => !!s ),
				map(([SalEstimate]) => {
				const estimateState = {
					estimatesList: SalEstimate
				}
				this.estimates = estimateState.estimatesList
				})
			} else {
				this.getEntries();
			}
	}	

}
