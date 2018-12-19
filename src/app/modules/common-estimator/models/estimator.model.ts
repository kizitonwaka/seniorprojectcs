import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { forEach } from "@angular/router/src/utils/collection";


//import { EstimateInterface } from '../interfaces/estimate-interface'

export interface EstimateResponse {
    Estimates: Array<EstimateInterface>;
}

export interface SalEstimateResponse {
    SalEstimate$: BehaviorSubject<Estimate[]>;
}

export interface EstimateInterface {
    Account: { AccountNumber: number , FirstName: string, LastName: string },
    Token: string,
    Age: number,
    AnnualSalary: number,
    Savings: number,

    InvestmentPortfolio: { 
        Stocks: number, Bonds: number, MutualFunds: number, MoneyMarketFunds: number,
        ExchangeTradedFunds: number 
    },

    AnnualHouseholdBudget: {
        Mortgages: number ,  Rent: number, PropertyTaxes: number, StrataFeeOrCondoFee: number,
        HouseOrTenantInsurance: number, LoanPayment: number, VehicleInsurance: number,
        VehicleMaintenance: number, HealthExpense: number, BankFees: number, DebtPayments: number,
        EmergencyExpense: number, ClothingAndShoes: number, VetBills: number, Gifts: number,
        
        UtilityBills: {
            Cable: number, Cell: number, Electricity: number, Gas: number, Water: number, other: number
        }
    },

    ExpectedReturn: number,
    YearlyContribution: number,
    SafeWithdrawalRate: number,
    RetirementExpense: number,
}

export class Estimate implements  EstimateInterface {
    Account: { AccountNumber: number , FirstName: string, LastName: string };
    Name: string;
    Token: string;
    Age: number;
    AnnualSalary: number;
    Savings: number;

    InvestmentPortfolio: { 
        Stocks: number, Bonds: number, MutualFunds: number, MoneyMarketFunds: number,
        ExchangeTradedFunds: number 
    };

    AnnualHouseholdBudget: {
        Mortgages: number ,  Rent: number, PropertyTaxes: number, StrataFeeOrCondoFee: number,
        HouseOrTenantInsurance: number, LoanPayment: number, VehicleInsurance: number,
        VehicleMaintenance: number, HealthExpense: number, BankFees: number, DebtPayments: number,
        EmergencyExpense: number, ClothingAndShoes: number, VetBills: number, Gifts: number,
        
        UtilityBills: {
            Cable: number, Cell: number, Electricity: number, Gas: number, Water: number, other: number
        }
    };

    ExpectedReturn: number;
    YearlyContribution: number;
    RetirementExpense: number;
    SafeWithdrawalRate: number;

    constructor (est: EstimateInterface) {
        this.Account = est.Account;
        this.Name = `${ est.Account.FirstName } ${est.Account.LastName }`;
        this.Age = est.Age;
        this.AnnualSalary = est.AnnualSalary;
        this.Savings = est.Savings;
        this.InvestmentPortfolio = est.InvestmentPortfolio;
        this.AnnualHouseholdBudget = est.AnnualHouseholdBudget;
        this.ExpectedReturn = est.ExpectedReturn;
        this.YearlyContribution = this.yearlyContribution;
        this.SafeWithdrawalRate = est.SafeWithdrawalRate;
        this.RetirementExpense = this.yearlyExpenses;
    }  
    public get FINumber() {
        console.log("FI Number: ",this.RetirementExpense / this.SafeWithdrawalRate)
        return this.RetirementExpense / this.SafeWithdrawalRate;
    }

    public get yearlyExpenses(): number {
        let expenses = 0;
        Object.keys(this.AnnualHouseholdBudget).forEach((key)=>{
            if((typeof this.AnnualHouseholdBudget[key] === 'object' && this.AnnualHouseholdBudget[key] !== null)){
                Object.keys(this.AnnualHouseholdBudget[key]).forEach((newKey)=> {
                    expenses += (this.AnnualHouseholdBudget[key])[newKey]
                });
            } else {
                expenses += this.AnnualHouseholdBudget[key];
            }
        });
        
        console.log("expenses: ",expenses)
        return expenses; 
    }

    public get yearlyContribution(): number {
        console.log("yearly Contribution: ",this.AnnualSalary - this.yearlyExpenses)
        return this.AnnualSalary - this.yearlyExpenses;
    }

    public get amtSaved(): number {
        let amtSaved:number = 0;
        Object.keys(this.InvestmentPortfolio).forEach((key)=> {
            amtSaved += this.InvestmentPortfolio[key];
        });
        console.log("amt saved: ",this.Savings + (amtSaved * this.ExpectedReturn));
        return amtSaved = this.Savings + (amtSaved * this.ExpectedReturn);
    }

    /**
     * FI Number = Yearly Spending / Safe Withdrawal Rate
     * The second part of the formula uses your FI Number to
     * figure out how many years it will take you to reach FI:
     * Years to FI = (FI Number  – Amount Already Saved) / Yearly Saving
     **/
    public get yearsToFI(): number{
        if(this.yearlyContribution > 0){
            console.log (( this.FINumber - this.amtSaved )/this.yearlyContribution);
            return (( this.FINumber - this.amtSaved )/this.yearlyContribution);
        }
        return NaN;
    }
}

new Estimate ({
    Account: { AccountNumber: 1 , FirstName: "Daniel", LastName: "Weigh" },
    Token: "daniel.weigh@ms.com",
    Age: 41,
    AnnualSalary: 100000,
    Savings: 100,
    InvestmentPortfolio: { 
        Stocks: 3000, Bonds: 4000, MutualFunds: 5000, MoneyMarketFunds: 6000,
        ExchangeTradedFunds: 7000 
    },
    AnnualHouseholdBudget: {
        Mortgages: 1000 ,  Rent: 1000, PropertyTaxes: 1000, StrataFeeOrCondoFee: 1000,
        HouseOrTenantInsurance: 1000, LoanPayment: 100, VehicleInsurance: 100,
        VehicleMaintenance: 100, HealthExpense: 100, BankFees: 100, DebtPayments: 100,
        EmergencyExpense: 1000, ClothingAndShoes: 100, VetBills: 100, Gifts: 100,
        UtilityBills: {
            Cable: 100, Cell: 100, Electricity: 100, Gas: 100, Water: 100, other: 100
        }
    },
    ExpectedReturn: 50, YearlyContribution: 19000, SafeWithdrawalRate: 5.3, RetirementExpense: 149.454
})