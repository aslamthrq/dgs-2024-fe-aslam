import React from 'react';
import { Avatar } from "flowbite-react";
import Categories from './Categories';
import Wallets from './Wallets';

const Sidebar = () => {
  return (
    <div className="w-96 h-screen bg-white border-r p-5">
      <div className="text-2xl font-bold mb-10">
            <div className="flex flex-wrap gap-2">
                <Avatar className='object-cover' img="https://dsnicmqkyoqmcnpnaijc.supabase.co/storage/v1/object/public/tms/foto_profile/foto_profile_ulpsb1ix.webp" />
            </div>
      </div>
      <div className="mb-5">
        <div className="text-xl font-semibold mb-2">Wallets</div>
        <Wallets />
        {/* <ul>
          <li className="flex items-center justify-between mb-4">
            <div>Home Wallet</div>
            <div>$235,000</div>
          </li>
          <li className="flex items-center justify-between mb-4">
            <div>Investment</div>
            <div>$875,000</div>
          </li>
        </ul> */}
      </div>
      <div>
        <div className="text-xl font-semibold mb-2">Categories</div>
        <Categories />
      </div>
    </div>
  );
};

export default Sidebar;
