import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import WalletsPage from './components/Wallets';
import ExpenseItemsPage from './components/ExpenseItemsPage';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <div className="flex flex-col flex-1">
          <Header />
          <Routes>
            <Route exact path="/" component={WalletsPage} />
            <Route path="/wallets/:walletId/expense-items" component={ExpenseItemsPage} />
          </Routes>
        </div>
        <Sidebar />
      </div>
    </Router>
  );
}

export default App;
