import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletContextWrapper } from './context/WalletContextProvider.js';
import Home from './pages/Home';
import Crash from './pages/Crash';

import { ToastContainer } from 'react-toastify';

function App() {

  return (

      <WalletContextWrapper>
                  <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
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
