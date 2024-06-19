import React from 'react'

const CreateBudget = () => {
  return (
    <div className='bg-slate-300 rounded-lg shadow p-10 mb-5'>
      <h2 className='text-lg font-bold mb-4'>Create Budget</h2>

      <form className='grid grid-cols-1 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='budget-name'>
            Budget Name
          </label>
          <input id='budget-name' type='text' className='w-full border border-gray-300 rounded-lg p-2' placeholder='Budget Name' />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="budget-amount">
            Amount
          </label>
          <input
            id="budget-amount"
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter amount"
          />
        </div>
        <button className="bg-gray-800 text-white rounded-lg px-4 py-2 mt-2">
          Create Budget
        </button>
      </form>
    </div>
  )
}

export default CreateBudget