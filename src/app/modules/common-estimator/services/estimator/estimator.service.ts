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
private loginID: number;
private totalEstimates: number;

private subject: SalEstimateResponse = {
	SalEstimate$: this.estimates$
}

constructor() { }

private getPreviousEstimates(est: EstimateResponse, loginID: number) {
	const estList = est.Estimates.filter(obj => obj.Account.AccountNumber === loginID);
	let myEstimates = estList.map((t) => new Estimate(t));
	this.totalEstimates = myEstimates.length;
	return this.estimates$.next(myEstimates)
}
public all(loginID?: number) {
	of({
		"Estimates": [
			{
				"Account":{
					"AccountNumber": 1,
					"FirstName": "Daniel",
					"LastName": "Weigh",
					"Token": "dway@ms.com",
					"Age": 41
				},
				"Espenses": {
					"Mortgages": 100,
					"Rent": 100,
					"PropertyTaxes": 100,
					"StrataFeeOrCondoFee": 100,
					"HouseOrTenantInsurance": 100,
					"LoanPayment": 1000,
					"VehicleInsurance": 100,
					"VehicleMaintenance": 100,
					"HealthExpense": 100,
					"BankFees": 100,
					"DebtPayments": 100,
					"EmergencyExpense": 100,
					"ClothingAndShoes": 100,
					"VetBills": 100,
					"Gifts": 100,
					"Cable": 100,
					"Cell": 100,
					"Electricity": 100,
					"Gas": 100,
					"Water": 100,
					"Other": 100
				},
				"InvestmentPortfolio": {
					"Stocks": 100,
					"Bonds": 100,
					"MutualFunds": 100,
					"MoneyMarketFunds": 100,
					"ExchangeTradedFunds": 100,
					"Other": 100
				},
				"FIFactors": {
					"ExpectedReturn": 0.05,
					"CurrentSavingsBalance": 100,
					"AnnualSalary": 5000,
					"SafeWithdrawalRate": 0.04,
					"RetirementEspense": 3000
				}
			},
		]
	})
	.subscribe((response : EstimateResponse) => {
		if(true/*loggedIn*/) {
			this.getPreviousEstimates(response, loginID);
		}
		
	}, (error) => {
		console.log(error);
	});
		console.log(this.estimates$.getValue)
		return this.subject
	}
}
