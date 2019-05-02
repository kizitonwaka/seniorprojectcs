/*make all changes to model here as well. Browsers console will return a lot of undefined if changes 
are not matched here. Since this is the part used in the actual UI to collect data. Our enums are self-explanatory
since the property values explain themselve
*/
export enum Demographics {
    Age = "age",
    Sex = "sex (M or F)",
    MaritalStatus = "marital status (e.g single, married, divorced, separated, widowed)",
    HouseHoldSize = "number of persons in your household",
    State = "state of residence (enter MS for Mississippi etc.)",
};

export enum Expenses {
    ExpenseTotal = "total of expenses per year"
};

export enum Investments {
    SumofInvestments = "sum of investments portfolio"
};

export enum Factors {
    ExpectedReturn = "expected return on investments (e.g. enter 5 for 5%)",
    CurrentSavingsBalance = "current balance in savings account",
    AnnualSalary = "yearly salary",
    SafeWithdrawalRate = "safe withdrawal rate (at retirement. typically 4% or 5%)",
    RetirementExpense = "retirement expense (expense per year during retirement)",
};
