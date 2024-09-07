import React from 'react';

const transactions = [
  { id: 1, category: 'Restaurants & Cafe', date: '20 August 2019', amount: -99 },
  { id: 2, category: 'Clothes & Shopping', date: '25 September 2019', amount: -2357 },
  { id: 3, category: 'Credit & Loans', date: '10 April 2019', amount: -4867 },
  { id: 4, category: 'Gifts Card', date: '10 October 2019', amount: -85 },
];

const Content = () => {
  return (
    <div className="flex-1 p-10">
      <div className="text-lg font-bold mb-5">January 15 2020</div>
      <div className="bg-white shadow p-5 rounded-lg">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between border-b last:border-b-0 py-3"
          >
            <div>
              <div className="font-semibold">{transaction.category}</div>
              <div className="text-gray-500">{transaction.date}</div>
            </div>
            <div className="text-red-500 font-bold">${transaction.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
