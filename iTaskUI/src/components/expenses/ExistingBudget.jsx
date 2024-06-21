import React from 'react';
import clsx from 'clsx';

const ExistingBudget = ({ color, data }) => {
  const totalAmount = data.amount;
  const spentAmount = data.spent_budget;
  const remainingAmount = data.remaining_budget;
  const progressPercentage = (spentAmount / totalAmount) * 100;

  return (
    <div className={clsx(`bg-slate-300 rounded-lg shadow p-10 mb-5 grid grid-cols-1 gap-4`, `border-${color}-300 border-1 border-opacity-30`)}>
      <div className='flex justify-between'>
        <p className={clsx(`text-${color}-500 font-semibold text-lg`)}>{data.budget_name}</p>
        <p className={clsx(`text-${color}-500 font-semibold text-lg`)}>${data.amount}</p>
      </div>

      <div>
        {/* Progress bar */}
        <div className='w-full bg-red-100 rounded-full h-4 mb-4'>
          <div
            className={clsx(`bg-${color}-500 h-4 rounded-full`)}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className='flex justify-between '>
          <p className={clsx(`text-${color}-400 font-semibold text-sm`)}>${data.spent_budget} Spent</p>
          <p className={clsx(`text-${color}-400 font-semibold text-sm`)}>${data.remaining_budget} Remaining</p>
        </div>
      </div>

      <button type='button' className={clsx(`p-2 rounded-lg bg-${color}-500 text-white font-semibold`)}>View Details</button>
    </div>
  );
};

export default ExistingBudget;
