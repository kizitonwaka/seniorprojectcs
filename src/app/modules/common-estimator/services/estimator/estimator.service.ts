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

/*private getPreviousEstimates(est: EstimateResponse, loginID: number) {
	const estList = est.Estimates.filter(obj => obj.Account.AccountNumber === loginID);
	let myEstimates = estList.map((t) => new Estimate(t));
	this.totalEstimates = myEstimates.length;
	this.estimates$.next(myEstimates)
}*/
public all() {
	of({
		"Estimates": [
			{
				"Demographics":{
					"Age": 41
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
					"AnnualSalary": 100000,
					"SafeWithdrawalRate": 4,
					"RetirementEspense": 70000
				}
			
			},
		]
	})
	.subscribe((response : EstimateResponse) => {
		if(true/*loggedIn*/) {
			//this.getPreviousEstimates(response, loginID);
		}
		
	}, (error) => {
		console.log(error);
	})
		console.log(this.estimates$.getValue)
		return this.subject
	}
}
