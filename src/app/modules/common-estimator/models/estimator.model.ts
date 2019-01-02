import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { forEach } from "@angular/router/src/utils/collection";
import * as Enum from "../enums/estimate.enums";
import { OnChanges } from "@angular/core";

//import { EstimateInterface } from '../interfaces/estimate-interface'

export interface EstimateResponse {
    Estimates: Array<EstimateInterface>;
}

export interface SalEstimateResponse {
    SalEstimate$: BehaviorSubject<Estimate[]>;
}

export interface EstimateInterface {
    Account?: {
        AccountNumber: number,
        FirstName: string,
        LastName: string,
        Token: string,
        Age: number
    },
    Espenses: {
        Mortgages: number,
        Rent: number,
        PropertyTaxes: number,
        StrataFeeOrCondoFee: number,
        HouseOrTenantInsurance: number,
        LoanPayment: number,
        VehicleInsurance: number,
        VehicleMaintenance: number,
        HealthExpense: number,
        BankFees: number,
        DebtPayments: number,
        EmergencyExpense: number,
        ClothingAndShoes: number,
        VetBills: number,
        Gifts: number,
        Cable: number,
        Cell: number,
        Electricity: number,
        Gas: number,
        Water: number,
        Other: number
    },
    InvestmentPortfolio: {
        Stocks: number,
        Bonds: number,
        MutualFunds: number,
        MoneyMarketFunds: number,
        ExchangeTradedFunds: number,
        Other: number
    },
    FIFactors: {
        ExpectedReturn: number,
        CurrentSavingsBalance: number,
        AnnualSalary: number,
        SafeWithdrawalRate: number,
        RetirementEspense: number;
    }
}

export class Estimate implements  EstimateInterface, OnChanges{
    ngOnChanges(){
    }
    Account?: {
        AccountNumber: number,
        FirstName: string,
        LastName: string,
        Token: string,
        Age: number
    };
    Espenses: {
        Mortgages: number,
        Rent: number,
        PropertyTaxes: number,
        StrataFeeOrCondoFee: number,
        HouseOrTenantInsurance: number,
        LoanPayment: number,
        VehicleInsurance: number,
        VehicleMaintenance: number,
        HealthExpense: number,
        BankFees: number,
        DebtPayments: number,
        EmergencyExpense: number,
        ClothingAndShoes: number,
        VetBills: number,
        Gifts: number,
        Cable: number,
        Cell: number,
        Electricity: number,
        Gas: number,
        Water: number,
        Other: number
    };
    InvestmentPortfolio: {
        Stocks: number,
        Bonds: number,
        MutualFunds: number,
        MoneyMarketFunds: number,
        ExchangeTradedFunds: number,
        Other: number
    };
    FIFactors: {
        ExpectedReturn: number; //after taxes and fees
        CurrentSavingsBalance: number;
        AnnualSalary: number;
        SafeWithdrawalRate: number;
        RetirementEspense: number;
    }

    //additional class properties
    RetirementExpense: number;
    YearlyContribution: number;

    /** notice the cleaner, more readable constructor?*/
    constructor (est: EstimateInterface) {
        this.Account = est.Account;
        this.Espenses = est.Espenses;
        this.InvestmentPortfolio = est.InvestmentPortfolio;
        this.FIFactors = est.FIFactors;
        this.YearlyContribution = this.yearlyContribution;
    } 

    private get yearlyEspenses(): number {
        let sum = 0;
        Object.values(this.Espenses).forEach((value)=> { sum += value })
        return sum;
    }

    public get FINumber() {
        if(this.FIFactors.RetirementEspense !== undefined){
            return this.FIFactors.RetirementEspense / this.FIFactors.SafeWithdrawalRate;
        }
        return this.yearlyEspenses / this.FIFactors.SafeWithdrawalRate;
    }

    public get yearlyContribution(): number {
        return this.FIFactors.AnnualSalary - this.yearlyEspenses;
    }

    public get amtSaved(): number {
        let FirstYearSavings = 0;
        Object.values(this.InvestmentPortfolio).forEach((value)=> { FirstYearSavings += value });
        return FirstYearSavings = this.yearlyContribution + (FirstYearSavings * this.FIFactors.ExpectedReturn);
    }

    /**
     * FI Number = Yearly Spending / Safe Withdrawal Rate
     * The second part of the formula uses your FI Number to
     * figure out how many years it will take you to reach FI:
     * Years to FI = (FI Number  – Amount Already Saved) / Yearly Saving
     **/
    public get yearsToFI(): number{
        if(this.yearlyContribution > 0){
            return (this.FINumber - this.amtSaved )/this.yearlyContribution;
        }
        return NaN;
    }
}

new Estimate ({
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
})