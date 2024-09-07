// src/components/WalletsPage.js
import React, { useEffect, useState } from 'react';
import { getWallets, createWallet, updateWallet, deleteWallet } from '../services/apiServices';

const WalletsPage = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletName, setWalletName] = useState('');
  const [editMode, setEditMode] = useState(false); // State untuk menentukan mode edit
  const [currentWallet, setCurrentWallet] = useState(null); // Wallet yang sedang di-edit

  // Fetch wallets saat komponen dimuat
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await getWallets();
        setWallets(data.data); // Asumsi data wallet di dalam `data`
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  // Handle submit form untuk membuat atau mengedit wallet
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Jika dalam mode edit, update wallet
        const updatedWallet = await updateWallet(currentWallet._id, { name: walletName });
        setWallets(wallets.map((wallet) =>
          wallet._id === currentWallet._id ? updatedWallet.data : wallet
        ));
        setEditMode(false); // Keluar dari mode edit setelah berhasil
      } else {
        // Jika tidak dalam mode edit, buat wallet baru
        const newWallet = await createWallet({ name: walletName });
        setWallets([...wallets, newWallet.data]);
      }
      setWalletName(''); // Reset input field
    } catch (err) {
      console.error('Error creating/updating wallet:', err);
      setError(err.message);
    }
  };

  // Fungsi untuk menghitung total amount dari setiap wallet
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

  // Masuk mode edit dan siapkan wallet untuk diedit
  const handleEdit = (wallet) => {
    setWalletName(wallet.name);
    setCurrentWallet(wallet);
    setEditMode(true); // Set ke mode edit
  };

  // Handle hapus wallet
  const handleDelete = async (id) => {
    try {
      await deleteWallet(id);
      setWallets(wallets.filter((wallet) => wallet._id !== id)); // Hapus wallet dari state
    } catch (err) {
      console.error('Error deleting wallet:', err);
      setError(err.message);
    }
  };

  if (loading) return <p>Loading wallets...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <form  onSubmit={handleSubmit} class="max-w-sm mx-auto">
            <div class="mb-5">
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tambah Wallet</label>
                <input  
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)} 
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Nama wallet" 
                required />
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{editMode ? 'Update Wallet' : 'Create Wallet'}</button>
            {editMode && <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => { setEditMode(false); setWalletName(''); }}>Cancel Edit</button>}
        </form>
        <ul>
            {wallets.map((wallet) => (
            <li key={wallet._id}>
                <div className="flex items-center text-gray-900 whitespace-nowrap">
                    <svg class="w-6 h-6 text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z" clip-rule="evenodd"/>
                    </svg>
                    <div className="ps-3">
                        <div className="text-base font-semibold">{wallet.name}</div>
                        <div className="font-normal text-gray-500">{calculateTotalAmount(wallet.expenseItems)}</div>
                    </div>  
                </div>
                <button onClick={() => handleEdit(wallet)}>Edit</button>
                <button onClick={() => handleDelete(wallet._id)}>Delete</button>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default WalletsPage;
