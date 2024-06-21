import { createContext, useContext, useEffect, useState } from "react";
import createAxiosInstance from '../api/axiosInstance';

const budgetContext = createContext();

export const useBudget = () => {
  return useContext(budgetContext);
};

export const BudgetContextProvider = ({ children }) => {
  const [budgetData, setBudgetData] = useState(null);
  const [expensesData, setExpensesData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBudgetAdded, setIsBudgetAdded] = useState(false);
  const [isExpenseAdded, setIsExpenseAdded] = useState(false);
  const [isExpenseDeleted, setIsExpensesDeleted] = useState(false);


  
  const axiosInstance = createAxiosInstance();

  useEffect(()=>{
    fetchBudget();
    fetchExpenses();
  },[])

  useEffect(()=>{
    if(isBudgetAdded){
      fetchBudget()
      setIsBudgetAdded(false)
    }
    else if(isExpenseAdded){
      fetchBudget();
      fetchExpenses();
      setIsExpenseAdded(false)
    }
    else if(isExpenseDeleted){
      fetchBudget();
      fetchExpenses();
      setIsExpensesDeleted(false)
    }
  },[isBudgetAdded,isExpenseAdded,isExpenseDeleted])


  const fetchBudget = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.get('/budgets');
      setBudgetData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.get('/expenses');
      setExpensesData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const context = {
    budgetData: budgetData,
    expensesData:expensesData,
    setIsBudgetAdded:setIsBudgetAdded,
    setIsExpenseAdded:setIsExpenseAdded,
    setIsExpensesDeleted,
    loading:loading,
    error:error
  };

  return (
    <budgetContext.Provider value={context}>
      {children}
    </budgetContext.Provider>
  );
};
