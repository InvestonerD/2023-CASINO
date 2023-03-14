import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletContextWrapper } from './context/WalletContextProvider.js';
import Home from './pages/Home';
import Crash from './pages/Crash';

function App() {

  return (

      <WalletContextWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crash" element={<Crash />} />
          </Routes>
        </Router>
      </WalletContextWrapper>

  );

}

export default App;
