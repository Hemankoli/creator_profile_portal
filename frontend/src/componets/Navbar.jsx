import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 backdrop-blur-md bg-gray-800 p-4 md:px-8 shadow-lg">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-all duration-300"
        >
          <div className="w-9 h-9 rounded-md bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 
                          shadow-md flex items-center justify-center text-white font-bold text-lg">
            C
          </div>
          <span className="font-semibold text-lg md:text-xl text-gray-800 dark:text-gray-100 tracking-tight">
            Creator Portal
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/add"
            className="text-sm font-medium px-4 py-2 rounded bg-gradient-to-r from-indigo-600 to-purple-600 
                       text-white shadow hover:shadow-lg hover:scale-[1.03] transition-transform duration-300"
          >
            + Add Creator
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
