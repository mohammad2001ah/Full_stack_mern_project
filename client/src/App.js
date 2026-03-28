import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';

// Import Pages
import About from './components/About';
import Collection from './components/Collection';
import Contact from './components/Contact';
import Home from './components/Home';
import Login from './components/Login';
import Footer from './components/Footer';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import SellerDashboard from './components/SellerDashboard';
import Cart from './components/Cart';

//Import Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();

  // Hide navbar on dashboard pages
  const isDashboard = ["/admin", "/seller"].includes(location.pathname);

  return (
    <div className='app-wrapper'>
      {!isDashboard && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/admin' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard/>
          </ProtectedRoute>
        }/>
        <Route path='/seller' element={
          <ProtectedRoute allowedRoles={['seller']}>
            <SellerDashboard/>
          </ProtectedRoute>
        }/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
      {!["/admin", "/seller", "/login", "/signup"].includes(location.pathname) && <Footer />}
    </div>
  )
}

export default App;

