const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Estimate
let Estimate = new Schema({
  Demographics: {
    Age: {
      type: Number
    },
    Sex: {
      type: String
    },
    MaritalStatus: {
      type: String
    },
    HouseHoldSize:{
      type: Number
    },
    State: {
      type: String
    },
},
Expenses: {
    ExpenseTotal:{
      type: Number
    }
},
Investments: {
    SumofInvestments:{
      type: Number
    }
},
Factors: {
    ExpectedReturn:{      
      type: Number
    },
    CurrentSavingsBalance:{       
      type: Number
    },
    AnnualSalary:{
      type: Number
    },
    SafeWithdrawalRate:{
      type: Number
    },
    RetirementExpense:{
      type: Number
    },
}
},{
    collection: 'Estimate'
});

module.exports = mongoose.model('Estimate', Estimate);