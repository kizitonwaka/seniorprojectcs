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
					"Mortgages": 3333,
					"Rent": 3333,
					"PropertyTaxes": 3333,
					"StrataFeeOrCondoFee": 3333,
					"HouseOrTenantInsurance": 3333,
					"LoanPayment": 3333,
					"VehicleInsurance": 3333,
					"VehicleMaintenance": 3333,
					"HealthExpense": 3333,
					"BankFees": 3333,
					"DebtPayments": 3333,
					"EmergencyExpense": 3333,
					"ClothingAndShoes": 3333,
					"VetBills": 3333,
					"Gifts": 3333,
					"Cable": 3333,
					"Cell": 3333,
					"Electricity": 3333,
					"Gas": 3333,
					"Water": 3333,
					"Other": 3333
				},
				"InvestmentPortfolio": {
					"Stocks": 20000,
					"Bonds": 20000,
					"MutualFunds": 20000,
					"MoneyMarketFunds": 20000,
					"ExchangeTradedFunds": 20000,
					"Other": 0
				},
				"FIFactors": {
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
			this.getPreviousEstimates(response, loginID);
		}
		
	}, (error) => {
		console.log(error);
	});
		console.log(this.estimates$.getValue)
		return this.subject
	}
}
