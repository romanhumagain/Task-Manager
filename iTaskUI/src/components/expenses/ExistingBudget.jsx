import React from 'react'

const ExistingBudget = () => {
  const totalAmount = 129090;
  const spentAmount = 9.56;
  const remainingAmount = totalAmount - spentAmount;
  const progressPercentage = (spentAmount / totalAmount) * 100;

  console.log(progressPercentage)
  return (
    <div className='bg-slate-300 rounded-lg shadow p-10 mb-5 grid grid-cols-1 gap-4 border-red-300 border-1 border-opacity-30'>
      <div className='flex justify-between'>
        <p className='text-red-500 font-semibold text-lg'>Groceries</p>
        <p className='text-red-500 font-semibold text-lg'>${totalAmount.toLocaleString()}</p>
      </div>

      <div>
        {/* Progress bar */}
        <div className='w-full bg-red-100 rounded-full h-4 mb-4'>
          <div
            className='bg-red-500 h-4 rounded-full'
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className='flex justify-between '>
          <p className='text-red-400 font-semibold text-sm'>${spentAmount.toFixed(2)} Spent</p>
          <p className='text-red-400 font-semibold text-sm'>${remainingAmount.toLocaleString()} Remaining</p>
        </div>
      </div>

      <button type='button' className='p-2 rounded-lg bg-red-500 text-white font-semibold'>View Details</button>
    </div>
  )
}

export default ExistingBudget
