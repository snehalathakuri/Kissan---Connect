import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import CropUpload from './pages/CropUpload';
import MarketPlace from './pages/MarketPlace';
import MarketPrices from './pages/MarketPrices';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <LanguageSelector />
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/farmer" element={<FarmerDashboard user={user} />} />
          <Route path="/buyer" element={<BuyerDashboard user={user} />} />
          <Route path="/upload" element={<CropUpload user={user} />} />
          <Route path="/market" element={<MarketPlace user={user} />} />
          <Route path="/market-prices" element={<MarketPrices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;