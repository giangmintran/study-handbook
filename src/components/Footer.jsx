import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-4 px-6 text-center text-gray-500 text-sm">
      <p>
        &copy; {new Date().getFullYear()} Study HandBook. All rights reserved.
      </p>
      <div className="mt-2 space-x-4">
        <Link 
          to="/privacy" 
          className="hover:text-blue-600 transition-colors"
        >
          Privacy Policy
        </Link>
        <span className="text-gray-300">|</span>
        <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
      </div>
    </footer>
  );
};

export default Footer;