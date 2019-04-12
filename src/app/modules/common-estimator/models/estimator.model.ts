import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { OnChanges } from "@angular/core";

//import { EstimateInterface } from '../interfaces/estimate-interface'

export interface EstimateResponse {
    JSONEstimates: Array<EstimateInterface>;
}

export interface SalEstimateResponse {
    SalEstimate$: BehaviorSubject<Estimate[]>;
}

export interface EstimateInterface {
    Demographics: {
        Age: number,
        Sex: string,
        MaritalStatus: string,
        HouseHoldSize: number,
        State: string,
    },
    Espenses: {
        ExpenseTotal: number
    },
    Investments: {
        SumofInvestments: number
    },
    Factors: {
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
    Demographics: {
        Age: number,
        Sex: string,
        MaritalStatus: string,
        HouseHoldSize: number,
        State: string,
    };
    Espenses: {
        ExpenseTotal: number
    };
    Investments: {
        SumofInvestments: number
    };
    Factors: {
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
        this.Demographics = est.Demographics;
        this.Espenses = est.Espenses;
        this.Investments = est.Investments;
        this.Factors = est.Factors;
        this.YearlyContribution = this.yearlyContribution;
    } 

    public get yearlyEspenses(): number {
        let sum = 0;
        Object.values(this.Espenses).forEach((value)=> { sum += value })
        return sum;
    }

    public get FINumber() {
        if(this.Factors.RetirementEspense !== undefined){
            console.log('FINUMBER',this.Factors.RetirementEspense / (this.Factors.SafeWithdrawalRate/100))
            return this.Factors.RetirementEspense / (this.Factors.SafeWithdrawalRate/100);
        }
        return this.yearlyEspenses / (this.Factors.SafeWithdrawalRate/100);
    }

    public get yearlyContribution(): number {
        console.log('cont',this.Factors.AnnualSalary - this.yearlyEspenses)
        return this.Factors.AnnualSalary - this.yearlyEspenses;
    }

    public get investmentPortfolio(): number {
        let FirstYearSavings = 0;
        Object.values(this.Investments).forEach((value)=> { FirstYearSavings += value });
        console.log('porfolio ',FirstYearSavings)
        return FirstYearSavings// = this.yearlyContribution + (FirstYearSavings * this.Factors.ExpectedReturn);
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
        var expectedReturn = this.Factors.ExpectedReturn/100; //expected return 

        var error = false;
        // Require Withdrawal Rate is < Expected Return

        // calculations
        let FINumber = this.FINumber;
        let yearsToFI= this.NPER(
            expectedReturn/*rate*/,
            -1*yearlycontribution/*pmt*/,
            -1*investmentportfolio/*current value*/,
            FINumber-this.Factors.CurrentSavingsBalance/*wanted outcome*/,0
            /*payment due*/);
        return yearsToFI;
    }
}

new Estimate ({
    Demographics: {
        Age: 41,
        Sex: 'M',
        MaritalStatus: 'married',
        HouseHoldSize: 5,
        State: 'KY',
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
        AnnualSalary: 100000,
        SafeWithdrawalRate: 4,
        RetirementEspense: 40000
    }
})