import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExpenseItemsByWallet, createExpenseItem, updateExpenseItem, deleteExpenseItem } from '../services/apiServices';

const ExpenseItemsPage = () => {
  const { walletId } = useParams(); // Get wallet ID from URL params
  const [expenseItems, setExpenseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [flowType, setFlowType] = useState('income');
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const fetchExpenseItems = async () => {
      try {
        const data = await getExpenseItemsByWallet(walletId);
        setExpenseItems(data.data); // Assuming the response contains expenseItems in `data`
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseItems();
  }, [walletId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseItem = { title, amount: Number(amount), flowType, wallet: walletId };

    try {
      if (editMode && currentItem) {
        await updateExpenseItem(currentItem._id, expenseItem);
        setExpenseItems(expenseItems.map(item => item._id === currentItem._id ? expenseItem : item));
      } else {
        const newItem = await createExpenseItem(expenseItem);
        setExpenseItems([...expenseItems, newItem]);
      }
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentItem(item);
    setTitle(item.title);
    setAmount(item.amount);
    setFlowType(item.flowType);
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteExpenseItem(itemId);
      setExpenseItems(expenseItems.filter(item => item._id !== itemId));
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setFlowType('income');
    setEditMode(false);
    setCurrentItem(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Expense Items for Wallet {walletId}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Flow Type</label>
          <select value={flowType} onChange={(e) => setFlowType(e.target.value)}>
            <option value="income">Income</option>
            <option value="outcome">Outcome</option>
          </select>
        </div>
        <button type="submit">{editMode ? 'Update' : 'Create'} Expense Item</button>
      </form>

      <h2>Expense Items</h2>
      <ul>
        {expenseItems.map(item => (
          <li key={item._id}>
            {item.title} - {item.amount} - {item.flowType}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseItemsPage;
