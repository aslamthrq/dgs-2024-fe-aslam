import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getExpenseItemsByWallet,
  createExpenseItem,
  updateExpenseItem,
  deleteExpenseItem
} from '../services/apiServices';

const ExpenseItemsPage = () => {
  const { walletId } = useParams();
  const [expenseItems, setExpenseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ title: '', amount: '', category: '', flowType: 'outcome' });

  useEffect(() => {
    const fetchExpenseItems = async () => {
      try {
        const data = await getExpenseItemsByWallet(walletId);
        setExpenseItems(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseItems();
  }, [walletId]);

  const handleCreate = async () => {
    try {
      const item = { ...newItem, wallet: walletId };
      const data = await createExpenseItem(item);
      setExpenseItems([...expenseItems, data.data]);
      setNewItem({ title: '', amount: '', category: '', flowType: 'outcome' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (itemId) => {
    const updates = { amount: 100 }; // Contoh pembaruan, sesuaikan dengan kebutuhan

    try {
      const data = await updateExpenseItem(itemId, updates);
      setExpenseItems(expenseItems.map(item => (item._id === itemId ? data.data : item)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteExpenseItem(itemId);
      setExpenseItems(expenseItems.filter(item => item._id !== itemId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Expense Items for Wallet</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Add New Expense Item</h2>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Category ID"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <select
            value={newItem.flowType}
            onChange={(e) => setNewItem({ ...newItem, flowType: e.target.value })}
            className="border p-2 mb-2 w-full"
          >
            <option value="outcome">Outcome</option>
            <option value="income">Income</option>
          </select>
          <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
        </div>
      </div>
      <ul>
        {expenseItems.map(item => (
          <li key={item._id} className="border-b py-2">
            <div className="flex justify-between">
              <div className="font-semibold">{item.title}</div>
              <div className={`text-${item.flowType === 'income' ? 'green' : 'red'}-500`}>
                {item.flowType === 'income' ? '+' : '-'} {item.amount}
              </div>
            </div>
            <div className="text-gray-500 text-sm">{item.category ? item.category.name : 'No category'}</div>
            <button onClick={() => handleUpdate(item._id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
            <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseItemsPage;
