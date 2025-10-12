import React from 'react'
import { BrowserRouter,Router, Route, Routes,useLocation } from 'react-router-dom';

// Import Pages
import About from './components/About';
import Cart from './pages/Cart';
import Collection from './components/Collection';
import Contact from './components/Contact';
import Home from './components/Home';
import Login from './components/Login';
import Orders from './pages/Orders';
import Footer from './components/Footer';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';

//Import Components
import Navbar from './components/Navbar';

function App() {
  const location=useLocation();
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
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      {/* <Footer/> */}
      {location.pathname !== "/admin" && <Footer />}

    </div>
  )
}

export default App;

