import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletContextWrapper } from './context/WalletContextProvider.js';
import Home from './pages/Home';

function App() {
  return (

    <WalletContextWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </WalletContextWrapper>

  );
}

export default App;
