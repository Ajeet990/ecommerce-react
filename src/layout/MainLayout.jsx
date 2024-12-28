// src/layout/MainLayout.jsx
import React from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom'; // The Outlet will render the nested route's content

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
