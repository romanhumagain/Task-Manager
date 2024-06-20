import React from 'react';
import CreateBudget from '../../components/expenses/CreateBudget';
import CreateExpenses from '../../components/expenses/CreateExpenses';
import ExistingBudget from '../../components/expenses/ExistingBudget';
import ExpensesTable from '../../components/expenses/ExpensesTable';

import { useBudget } from '../../contexts/BudgetContext';


const ExpenseTracker = () => {
  const {budgetData} = useBudget()

  return (
    <div className="md:m-20 m-10">
      <h1 className='text-3xl font-bold text-slate-700 mb-3 -mt-6 text-center'>Track Your Expenses</h1>
      {/* Container for creating budget and expenses */}
      <div className="bg-slate-200 rounded-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <CreateBudget />
        <CreateExpenses />
      </div>
      
      <h1 className='text-3xl font-bold text-slate-700 mb-3 -mt-6 text-center'>Your Existing Budget</h1>

      <div className="bg-slate-200 rounded-lg p-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {budgetData && budgetData.map((data)=>{
          return(
            <div key={data.id}>
                <ExistingBudget data={data}/>
            </div>
          )
        })}

      </div>
      {/* Container for recent expenses table */}
      <h1 className='text-3xl font-bold text-slate-700 mb-3 mt-1 text-center'> Your Recent Expenses</h1>

      <div className="m-20 bg-slate-300 rounded-lg shadow p-10">
        <ExpensesTable/>
      </div>
    </div>
  );
};

export default ExpenseTracker;
