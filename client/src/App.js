import React from 'react'
import { BrowserRouter,Router, Route, Routes } from 'react-router-dom';
// Import Pages
import About from './pages/About';
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';

//Import Components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:pz-[7vm] lg:px-[9vw]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/product:productId' element={<Product/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
      </Routes>
    </div>
  )
}

export default App;

