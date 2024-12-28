import { useState } from 'react'
import './App.css'
// import Navbar from '../components/Navbar'
import MainLayout from '../layout/MainLayout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About'
import Contact from '../pages/Contact'
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Logout from '../features/auth/Logout';
import PageNotFound from '../pages/PageNotFound';
import MyProduct from '../pages/MyProduct';

function App() {

  return (
    <Router>
      <Routes>
        {/* Define the main layout for all pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contact />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/my-products" element={<MyProduct />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App
