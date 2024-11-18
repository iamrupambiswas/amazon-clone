import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import './App.css';
import { Product } from './components/Product2';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {

  const location = useLocation();
  const noHeaderFooterRoutes = ["/signin", "/signup"]
  // console.log(process.env);

  return (
    <div className='App'>
      
      {!noHeaderFooterRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/product/:name' element={<Product />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>

      {!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
