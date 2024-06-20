import React, { useState } from 'react';
import createAxiosInstance from '../../api/axiosInstance';
import Tostify from '../Tostify';

import { useBudget } from '../../contexts/BudgetContext';
import { useAuth } from '../../contexts/AuthContext';

const CreateBudget = () => {
  const [error, setError] = useState(null);
  const [budgetData, setBudgetData] = useState({
    budget_name: '',
    amount: '',
  });

  const {setIsBudgetAdded } = useBudget();
  const axiosInstance = createAxiosInstance();
  const {authToken} = useAuth()

  const tostify_msg = (type, message) => {
    Tostify(type, message)
  };

  const handleBudgetData = (e) => {
    const { name, value } = e.target;
    setBudgetData({
      ...budgetData,
      [name]: value,
    });
  };

  const addBudget = async (event) => {
    event.preventDefault();

    try {
      if (!(budgetData.budget_name === '' || budgetData.amount === '')) {
        const response = await axiosInstance.post('budgets/', budgetData);
        tostify_msg('success', 'Successfully Created Budget.');
        setBudgetData({
          budget_name: '',
          amount: '',
        });
        setIsBudgetAdded(true)
      }
      else{
        setError(error);
        tostify_msg("error", "Please provide all the budget details")
      }
    } 
    catch (error) {
      tostify_msg("error", error)
    }
  };
  return (
    <div className="bg-slate-300 rounded-lg shadow p-10 mb-5">
      <h2 className="text-lg font-bold mb-4">Create Budget</h2>
      <form className="grid grid-cols-1 gap-4" onSubmit={addBudget}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="budget-name">
            Budget Name
          </label>
          <input
            id="budget-name"
            type="text"
            name="budget_name"
            value={budgetData.budget_name}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Budget Name"
            onChange={handleBudgetData}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="budget-amount">
            Amount
          </label>
          <input
            id="budget-amount"
            type="text"
            name="amount"
            value={budgetData.amount}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter amount"
            onChange={handleBudgetData}
          />
        </div>
        <button className="bg-gray-800 text-white rounded-lg px-4 py-2 mt-2">
          Create Budget
        </button>
      </form>
    </div>
  );
};

export default CreateBudget;
