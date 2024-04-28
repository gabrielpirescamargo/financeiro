import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardList from '../components/CardList';
import CardDetail from '../components/CardDetail';
import TransactionList from '../components/TransactionList';
import TransactionDetail from '../components/TransactionDetail';
import Home from '../pages/Home';
import Transaction from '../pages/Transaction';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/card/:cardId' element={<CardDetail />} /> */}
        {/* <Route path='/cards' element={<CardList />} />
        <Route path='/transactions/:cardId' element={<TransactionList />} /> */}
        <Route path='/transaction/:transactionId' element={<Transaction />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
