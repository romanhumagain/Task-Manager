import React from 'react'
import { MdDelete } from "react-icons/md";

const ExpensesTable = () => {
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
          <tr className="hover:bg-gray-100">
            <td className="px-6 py-4 border-b border-gray-200">
              "Name"
            </td>
            <td className="px-6 py-4 border-b border-gray-200">
              "Amount"
            </td>
            <td className="px-6 py-4 border-b border-gray-200">
              "Date"
            </td>
            <td className="px-6 py-4 border-b border-gray-200">
              "Budget"
            </td>

            <td className="px-6 py-4 border-b border-gray-200">
              <button><MdDelete className='text-red-500 text-3xl' /></button>
            
            </td>

          </tr>
      </tbody>
    </table>
  </div>
  )
}

export default ExpensesTable