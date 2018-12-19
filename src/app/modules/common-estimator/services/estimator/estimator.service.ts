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
				"Account": { "AccountNumber": 2 , "FirstName": "Daniel", "LastName": "Weigh" },
				"Token": "daniel.weigh@ms.com",
				"Age": 41,
				"AnnualSalary": 100000,
				"Savings": 10000,
				"InvestmentPortfolio": { 
					"Stocks": 3000, "Bonds": 4000, "MutualFunds": 5000, "MoneyMarketFunds": 6000,
					"ExchangeTradedFunds": 7000 
				},
				"AnnualHouseholdBudget": {
					"Mortgages": 1000 ,  "Rent": 1000, "PropertyTaxes": 1000, "StrataFeeOrCondoFee": 1000,
					"HouseOrTenantInsurance": 1000, "LoanPayment": 100, "VehicleInsurance": 100,
					"VehicleMaintenance": 100, "HealthExpense": 100, "BankFees": 100, "DebtPayments": 100,
					"EmergencyExpense": 1000, "ClothingAndShoes": 100, "VetBills": 100, "Gifts": 100,
					"UtilityBills": {
						"Cable": 100, "Cell": 100, "Electricity": 100, "Gas": 100, "Water": 100, "other": 100
					}
				},
				"ExpectedReturn": 0.15, "YearlyContribution": undefined, "SafeWithdrawalRate": 5.3, "RetirementExpense": undefined
			},
			{
				"Account": { "AccountNumber": 2 , "FirstName": "Daniel", "LastName": "Weigh" },
				"Name": "Daniel Weigh",
				"Token": "daniel.weigh@ms.com",
				"Age": 41,
				"AnnualSalary": 100000, 
				"Savings": 10000,
				"InvestmentPortfolio": { 
					"Stocks": 3000, "Bonds": 4000, "MutualFunds": 5000, "MoneyMarketFunds": 6000,
					"ExchangeTradedFunds": 7000 
				},
				"AnnualHouseholdBudget": {
					"Mortgages": 1000 ,  "Rent": 1000, "PropertyTaxes": 1000, "StrataFeeOrCondoFee": 1000,
					"HouseOrTenantInsurance": 1000, "LoanPayment": 100, "VehicleInsurance": 100,
					"VehicleMaintenance": 100, "HealthExpense": 100, "BankFees": 100, "DebtPayments": 100,
					"EmergencyExpense": 1000, "ClothingAndShoes": 100, "VetBills": 100, "Gifts": 100,
					"UtilityBills": {
						"Cable": 100, "Cell": 100, "Electricity": 100, "Gas": 100, "Water": 100, "other": 100
					}
				},
				"ExpectedReturn": 0.15, "YearlyContribution": undefined, "SafeWithdrawalRate": 5.3, "RetirementExpense": undefined
			},
			{
				"Account": { "AccountNumber": 3 , "FirstName": "Daniel", "LastName": "Weigh" },
				"Name": "Daniel Weigh",
				"Token": "daniel.weigh@ms.com",
				"Age": 41,
				"AnnualSalary": 100000,
				"Savings": 10000,
				"InvestmentPortfolio": { 
					"Stocks": 3000, "Bonds": 4000, "MutualFunds": 5000, "MoneyMarketFunds": 6000,
					"ExchangeTradedFunds": 7000 
				},
				"AnnualHouseholdBudget": {
					"Mortgages": 1000 ,  "Rent": 1000, "PropertyTaxes": 1000, "StrataFeeOrCondoFee": 1000,
					"HouseOrTenantInsurance": 1000, "LoanPayment": 100, "VehicleInsurance": 100,
					"VehicleMaintenance": 100, "HealthExpense": 100, "BankFees": 100, "DebtPayments": 100,
					"EmergencyExpense": 1000, "ClothingAndShoes": 100, "VetBills": 100, "Gifts": 100,
					"UtilityBills": {
						"Cable": 100, "Cell": 100, "Electricity": 100, "Gas": 100, "Water": 100, "other": 100
					}
				},
				"ExpectedReturn": 0.15, "YearlyContribution": undefined, "SafeWithdrawalRate": 5.3, "RetirementExpense": undefined
			},
			{
				"Account": { "AccountNumber": 2 , "FirstName": "Daniel", "LastName": "Weigh" },
				"Name": "Daniel Weigh",
				"Token": "daniel.weigh@ms.com",
				"Age": 41,
				"AnnualSalary": 100000,
				"Savings": 10000,
				"InvestmentPortfolio": { 
					"Stocks": 3000, "Bonds": 4000, "MutualFunds": 5000, "MoneyMarketFunds": 6000,
					"ExchangeTradedFunds": 7000 
				},
				"AnnualHouseholdBudget": {
					"Mortgages": 1000 ,  "Rent": 1000, "PropertyTaxes": 1000, "StrataFeeOrCondoFee": 1000,
					"HouseOrTenantInsurance": 1000, "LoanPayment": 100, "VehicleInsurance": 100,
					"VehicleMaintenance": 100, "HealthExpense": 100, "BankFees": 100, "DebtPayments": 100,
					"EmergencyExpense": 1000, "ClothingAndShoes": 100, "VetBills": 100, "Gifts": 100,
					"UtilityBills": {
						"Cable": 100, "Cell": 100, "Electricity": 100, "Gas": 100, "Water": 100, "other": 100
					}
				},
				"ExpectedReturn": 0.15, "YearlyContribution": undefined, "SafeWithdrawalRate": 5.3, "RetirementExpense": undefined
			},
			{
				"Account": { "AccountNumber": 1 , "FirstName": "Daniel", "LastName": "Weigh" },
				"Name": "Daniel Weigh",
				"Token": "daniel.weigh@ms.com",
				"Age": 41,
				"AnnualSalary": 100000,
				"Savings": 30000,
				"InvestmentPortfolio": { 
					"Stocks": 0, "Bonds": 6000, "MutualFunds": 6000, "MoneyMarketFunds": 6000,
					"ExchangeTradedFunds": 6000 
				},
				"AnnualHouseholdBudget": {
					"Mortgages": 3810 ,  "Rent": 3810, "PropertyTaxes": 3810, "StrataFeeOrCondoFee": 3810,
					"HouseOrTenantInsurance": 3810, "LoanPayment": 3810, "VehicleInsurance": 3810,
					"VehicleMaintenance": 3810, "HealthExpense": 3810, "BankFees": 3810, "DebtPayments": 3810,
					"EmergencyExpense": 3810, "ClothingAndShoes": 3810, "VetBills": 3810, "Gifts": 3810,
					"UtilityBills": {
						"Cable": 3810, "Cell": 3810, "Electricity": 3810, "Gas": 3810, "Water": 3810, "other": 3810
					}
				},
				"ExpectedReturn": 0.06, "YearlyContribution": undefined, "SafeWithdrawalRate": 0.04, "RetirementExpense": undefined
			}
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
