import React, {useState} from 'react'
import { MdDelete } from "react-icons/md";
import { useBudget } from '../../contexts/BudgetContext';
import createAxiosInstance from '../../api/axiosInstance';
import Tostify from '../Tostify';

const ExpensesTable = () => {
  const axiosInstance = createAxiosInstance()
  const [error, setError] = useState(null)

  const { expensesData,setIsExpensesDeleted } = useBudget()

  const tostify_msg = (type, error)=>{
    Tostify(type, error)
  }

  const deleteExpense = async (budget_id, expense_id)=>{
    try {
      await axiosInstance.delete(`budgets/${budget_id}/expenses/${expense_id}/`)
      setError(null)
      tostify_msg("success", "Successfully Deleted Expense Details.")
      setIsExpensesDeleted(true)
    } catch (error) {
      setError(error)
      tostify_msg("error", error)

    }
  }

  if(error){
    return(<div>Error ... `${error}`</div>)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-md leading-4 font-bold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-md leading-4 font-bold text-gray-600 uppercase tracking-wider">
              Amoumt
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-md leading-4 font-bold text-gray-600 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-md leading-4 font-bold text-gray-600 uppercase tracking-wider">
              Budget
            </th>
          </tr>
        </thead>
        <tbody>
          {expensesData && expensesData.map((data) => {
            return (
              <tr className="hover:bg-gray-100" key={data.id}>
                <td className="px-6 py-4 border-b border-gray-200">
                  {data.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {data.amount}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {data.created_at}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {data.budget_name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <button onClick={()=>{deleteExpense(data.budget_id, data.id)}} ><MdDelete className='text-red-500 text-3xl' /></button>
                </td>

              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  )
}

export default ExpensesTable