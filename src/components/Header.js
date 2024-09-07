import React from 'react';
import { Navbar } from "flowbite-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow p-5">
      <div className="flex w-full justify-around items-center"> 
        <div className="text-xl font-semibold">Home Wallet</div>
        
        <input
          type="text"
          placeholder="Search"
          className="border rounded-lg px-4 py-2"
        />
        
          <a
            href="#"
            className="text-white bg-blue-700 rounded px-3 py-2 md:bg-transparent md:text-blue-700"
            aria-current="page"
          >
            Overview
          </a>
          <a
            href="#"
            className="text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
          >
            Finance
          </a>
          <a
            href="#"
            className="text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
          >
            Calendar
          </a>
          <a
            href="#"
            className="text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
          >
            Events
          </a>
      </div>
    </div>
  );
};

export default Header;
