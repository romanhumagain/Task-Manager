import React, { useState } from 'react';
import createAxiosInstance from '../../api/axiosInstance';
import { useBudget } from '../../contexts/BudgetContext';
import { ToastContainer } from 'react-toastify';
import Tostify from '../Tostify';


const CreateExpenses = () => {
  const { budgetData, loading, setIsExpenseAdded } = useBudget();

  const axiosInstance = createAxiosInstance()
  
  const [expensesData, setExpensesData] = useState({
    name: '',
    amount: '',
    budget: ''
  });

  const tostify_msg =(type, message)=>{
    Tostify(type, message)
  }

  const handleExpenesData = (event) => {
    const { name, value } = event.target;
    setExpensesData({
      ...expensesData,
      [name]: value
    });
  };

  const addExpenses = async (event) => {
    event.preventDefault();
    if(!(expensesData.amount ==='' || expensesData.amount === ''|| expensesData.budget === '')){
    const response = await axiosInstance.post(`budgets/${expensesData.budget}/expenses/`, expensesData)
    tostify_msg("success", "Successfully added expenses!")
    setExpensesData({
      name:'',
      amount:'',
      budget:''
    })
    setIsExpenseAdded(true)
    }
    else{
      tostify_msg("error", "Please provide all the expense details")
    }
  };

  return (
    <div className='bg-slate-300 p-10 mb-5 rounded-lg shadow'>
      <h2 className='font-bold text-lg mb-4'>Add New Expenses</h2>
      <form className='grid grid-cols-1 gap-4' onSubmit={addExpenses}>
        <div className='md:flex md:gap-5 flex-wrap'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='expense-name'>
              Expense Name
            </label>
            <input
              id='expense-name'
              name='name'
              value={expensesData.name}
              className='border border-gray-300 rounded-lg p-2 w-full'
              onChange={handleExpenesData}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='amount'>
              Amount
            </label>
            <input
              id='amount'
              name='amount'
              value={expensesData.amount}
              className='border border-gray-300 rounded-lg p-2 w-full'
              onChange={handleExpenesData}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name='budget'
            className="border border-gray-300 rounded-lg p-2 w-full"
            onChange={handleExpenesData}
            value={expensesData.budget}
          >
            <option value="" disabled>
              Select a category
            </option>
            {budgetData && budgetData.map((data) => (
              <option key={data.id} value={data.id}>
                {data.budget_name}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-gray-800 text-white rounded-lg px-4 py-2 mt-2">
          Add Expenses
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default CreateExpenses;
