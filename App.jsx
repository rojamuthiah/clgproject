import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/navbar';
import Checkout from './pages/checkout';
import Customize from './pages/customize';
import Payment from './pages/payment';
import Recommend from './pages/Recommend';
import Shop from './pages/shop';
import Home from './pages/Home';
// Sample Home page directly in App.jsx (you can create a separate file if needed)


function App() {
  return (
    <div style={{ backgroundColor:"white" }}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
