import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import './App.css';
import { Product } from './components/Product';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/product/:name' element={<Product />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
