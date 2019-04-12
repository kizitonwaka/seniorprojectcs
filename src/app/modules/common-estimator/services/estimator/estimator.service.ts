import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject } from 'rxjs';
import { Estimate } from '../../models/estimator.model';
import { EstimateInterface, SalEstimateResponse, EstimateResponse } from '../../models/estimator.model';

@Injectable({
	providedIn: 'root'
})
export class EstimatorService {
private estimates$ = new BehaviorSubject<Estimate[]>(undefined);

private subject: SalEstimateResponse = {
	SalEstimate$: this.estimates$
}

constructor() { }

private getFilteredEstimates(est: EstimateResponse) {
	const estList = est.JSONEstimates//.filter(obj => obj.Demographics[filter.toString()] === filterValue);
	let myEstimates = estList.map((obj) => new Estimate(obj));
	this.estimates$.next(myEstimates)
}
public all() {
	of({
		"JSONEstimates": [
			{
				"Demographics":{
					"Age": 26,
					"Sex": "M",
					"MaritalStatus": "single",
					"HouseHoldSize": 3,
					"State": "KY"
				},
				"Espenses": {
					"ExpenseTotal": 40000
				},
				"Investments": {
					"SumofInvestments": 0
				},
				"Factors": {
					"ExpectedReturn": 0,
					"CurrentSavingsBalance": 30000,
					"AnnualSalary": 105000,
					"SafeWithdrawalRate": 4,
					"RetirementEspense": 45000
				}
			
			},
			{
				"Demographics":{
					"Age": 22,
					"Sex": "M",
					"MaritalStatus": "single",
					"HouseHoldSize": 1,
					"State": "KY"

				},
				"Espenses": {
					"ExpenseTotal": 40000
				},
				"Investments": {
					"SumofInvestments": 35000
				},
				"Factors": {
					"ExpectedReturn": 5,
					"CurrentSavingsBalance": 30000,
					"AnnualSalary": 95000,
					"SafeWithdrawalRate": 4,
					"RetirementEspense": 40000
				}
			
			}
		]
	})
	.subscribe((response : EstimateResponse) => {
		if(true/*loggedIn*/) {
			this.getFilteredEstimates(response);
		}
		
	}, (error) => {
		console.log(error);
	})
		console.log(this.estimates$.getValue)
		return this.subject
	}
}
