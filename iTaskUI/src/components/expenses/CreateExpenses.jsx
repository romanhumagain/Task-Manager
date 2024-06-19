import React from 'react'

const CreateExpenses = () => {
  return (
    <div className='bg-slate-300 p-10 mb-5 rounded-lg shadow'>
      <h2 className='font-bold text-lg mb-4'>Add New Expenses</h2>
      <form className='grid grid-cols-1 gap-4'>
      <div className='md:flex md:gap-5 flex-wrap'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='expense-name'>
            Expense Name
          </label>
          <input id='expense-name' className='border border-gray-300 rounded-lg p-2 w-full ' />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='amount'>
            Amount
          </label>
          <input id='amount' className='border border-gray-300 rounded-lg p-2 w-full' />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value="" disabled selected>
            Select a category
          </option>
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="others">Others</option>
        </select>
      </div>
      <button className="bg-gray-800 text-white rounded-lg px-4 py-2 mt-2">
          Add Expenses
        </button>
      </form>

    </div>
  )
}

export default CreateExpenses