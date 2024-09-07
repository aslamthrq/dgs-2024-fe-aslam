import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom
import { getWallets, createWallet, updateWallet, deleteWallet } from '../services/apiServices';

const WalletsPage = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletName, setWalletName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(null);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await getWallets();
        setWallets(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const updatedWallet = await updateWallet(currentWallet._id, { name: walletName });
        setWallets(wallets.map((wallet) =>
          wallet._id === currentWallet._id ? updatedWallet.data : wallet
        ));
        setEditMode(false);
      } else {
        const newWallet = await createWallet({ name: walletName });
        setWallets([...wallets, newWallet.data]);
      }
      setWalletName('');
    } catch (err) {
      console.error('Error creating/updating wallet:', err);
      setError(err.message);
    }
  };

  const calculateTotalAmount = (expenseItems) => {
    return expenseItems.reduce((total, item) => {
      if (item.flowType === 'income') {
        return total + item.amount;
      } else if (item.flowType === 'outcome') {
        return total - item.amount;
      }
      return total;
    }, 0);
  };

  const handleEdit = (wallet) => {
    setWalletName(wallet.name);
    setCurrentWallet(wallet);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteWallet(id);
      setWallets(wallets.filter((wallet) => wallet._id !== id));
    } catch (err) {
      console.error('Error deleting wallet:', err);
      setError(err.message);
    }
  };

  if (loading) return <p>Loading wallets...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-1">
                <label htmlFor="text" className="mb-2 text-sm font-medium text-gray-900">Tambah Wallet</label>
                <input  
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)} 
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                placeholder="Nama wallet" 
                required />
            </div>
            <button type="submit" className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-2 py-2 text-center">{editMode ? 'Update Wallet' : 'Create Wallet'}</button>
            
            {editMode && <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-2 py-2 text-center" onClick={() => { setEditMode(false); setWalletName(''); }}>Cancel Edit</button>}
        </form>
        <ul>
            {wallets.map((wallet) => (
            <li key={wallet._id}>
                <div className="flex my-2 items-center text-gray-900 whitespace-nowrap bg-slate-100 rounded-lg p-2 gap-2">
                    <svg className="w-6 h-6 text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z" clipRule="evenodd"/>
                    </svg>
                    <div className="ps-3">
                        <div className="text-base font-semibold">{wallet.name}</div>
                        <div className="font-normal text-gray-500">{calculateTotalAmount(wallet.expenseItems)}</div>
                    </div>
                    <Link to={`/expense-items/${wallet._id}`} className="ml-auto text-blue-500 hover:underline">View Details</Link>
                    <button onClick={() => handleEdit(wallet)}>Edit</button>
                    <button onClick={() => handleDelete(wallet._id)}>Delete</button>
                </div>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default WalletsPage;
