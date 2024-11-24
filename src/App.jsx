import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import './App.css';
import { Product } from './components/Product2';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Cart from './components/Cart';

function App() {
  const location = useLocation();
  
  // Define routes without Header and Footer
  const noHeaderFooterRoutes = ["/signin", "/signup"];
  
  // Define routes without Footer
  const noFooterRoutes = ["/cart"];

  return (
    <div className='App'>
      {/* Conditionally render Header */}
      {!noHeaderFooterRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:name" element={<Product />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!noHeaderFooterRoutes.includes(location.pathname) &&
        !noFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
