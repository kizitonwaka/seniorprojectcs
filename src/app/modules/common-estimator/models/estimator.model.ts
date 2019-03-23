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

    public get yearlyEspenses(): number {
        let sum = 0;
        Object.values(this.Espenses).forEach((value)=> { sum += value })
        return sum;
    }

    public get FINumber() {
        if(this.FIFactors.RetirementEspense !== undefined){
            console.log('FINUMBER',this.FIFactors.RetirementEspense / (this.FIFactors.SafeWithdrawalRate/100))
            return this.FIFactors.RetirementEspense / (this.FIFactors.SafeWithdrawalRate/100);
        }
        return this.yearlyEspenses / (this.FIFactors.SafeWithdrawalRate/100);
    }

    public get yearlyContribution(): number {
        console.log('cont',this.FIFactors.AnnualSalary - this.yearlyEspenses)
        return this.FIFactors.AnnualSalary - this.yearlyEspenses;
    }

    public get investmentPortfolio(): number {
        let FirstYearSavings = 0;
        Object.values(this.InvestmentPortfolio).forEach((value)=> { FirstYearSavings += value });
        console.log('porfolio ',FirstYearSavings)
        return FirstYearSavings// = this.yearlyContribution + (FirstYearSavings * this.FIFactors.ExpectedReturn);
    }

    /**
     * FI Number = Yearly Spending / Safe Withdrawal Rate
     * The second part of the formula uses your FI Number to
     * figure out how many years it will take you to reach FI:
     * Years to FI = (FI Number  – Amount Already Saved) / Yearly Saving
     **/
    public get yearsToFI(): number{
        if(this.yearlyContribution > 0){
            console.log('years to fi:',Math.ceil(this.performCalculations));
            return Math.ceil(this.performCalculations);
        }
        return NaN;
    }
    


    // calculator logic

/**Returns the number of periods for an investment based on periodic,
 * constant payments and a constant interest rate. 
 * see https://support.office.com/en-us/article/nper-function-240535b5-6653-4d2d-bfcf-b6a38151d815*/
private NPER (Rate, Pmt, PV, FV, Type) {

	FV=FV || 0; // default value of 0;
	Type=Type || 0; // default value of 0;

	var totalIncomeFromFlow;
	var sumOfPvAndPayment;
	var currentValueOfPvAndPayment;

	if (Rate == 0 && Pmt == 0) {
		console.warn("Invalid Pmt argument");
		return null;
	}
	else if (Rate == 0) {
        return (- (PV + FV) / Pmt);
    }
	else if (Rate <= -1) {
		console.warn("Invalid Pmt argument");
		return null;
	}

    totalIncomeFromFlow = (Pmt / Rate);
    
    //generally not needed as assumption is that payments are at end of year
	if (Type == 1) {
		totalIncomeFromFlow *= (1 + Rate);
	}

	sumOfPvAndPayment = (-FV + totalIncomeFromFlow);
	currentValueOfPvAndPayment = (PV + totalIncomeFromFlow);
	if ((sumOfPvAndPayment < 0) && (currentValueOfPvAndPayment < 0)) {
		sumOfPvAndPayment = -sumOfPvAndPayment;
		currentValueOfPvAndPayment = 0-currentValueOfPvAndPayment;
	}
	else if ((sumOfPvAndPayment <= 0) || (currentValueOfPvAndPayment <= 0)) {
		console.warn("NPer cannot be calculated");
		return null;
	}

	let totalInterestRate = sumOfPvAndPayment / currentValueOfPvAndPayment;
    return Math.log(totalInterestRate) / Math.log(Rate + 1);
    
    
}

    //shorter nper function
    private nper(ir, pmt, pv, fv) {
        var nbperiods;

        if (ir != 0)
            ir = ir / 100;

        nbperiods = Math.log((-fv * ir + pmt)/(pmt + ir * pv))/ Math.log(1 + ir)

        return nbperiods;
    }

    private get performCalculations(){
        var investmentportfolio = this.investmentPortfolio; //portfolio
        var yearlycontribution = this.yearlyContribution; //contributions
        var expectedReturn = this.FIFactors.ExpectedReturn/100; //expected return 

        var error = false;
        // Require Withdrawal Rate is < Expected Return

        // calculations
        let FINumber = this.FINumber;
        let yearsToFI= this.NPER(
                            expectedReturn/*rate*/,
                            -1*yearlycontribution/*pmt*/,
                            -1*investmentportfolio/*current value*/,
                            FINumber-this.FIFactors.CurrentSavingsBalance/*wanted outcome*/,0
                            /*payment due*/);

        return yearsToFI;
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