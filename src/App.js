import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ExpenseItemsPage from './components/ExpenseItemsPage';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <div className="flex flex-col flex-1">
          <Header /> {/* Header ditampilkan di bagian atas */}
          <main className="flex-1 p-4">
            <Routes>
              {/* Rute untuk halaman ExpenseItemsPage */}
              <Route path="/expense-items/:walletId/" element={<ExpenseItemsPage />} />
            </Routes>
          </main>
        </div>
        <Sidebar /> 
      </div>
    </Router>
  );
}

export default App;
