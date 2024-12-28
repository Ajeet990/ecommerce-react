// src/components/Footer.jsx
import React from 'react';
import { APP_NAME } from '../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <p>© 2024 {APP_NAME} Website</p>
    </footer>
  );
};

export default Footer;
