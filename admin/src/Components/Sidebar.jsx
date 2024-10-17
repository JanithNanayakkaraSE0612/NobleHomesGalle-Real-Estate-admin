// Sidebar.js
import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { LiaUserTieSolid } from "react-icons/lia";
import { FaRegMessage } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

const Sidebar = ({ sidebarToggle, onSelectPage }) => {
  const sidebarItems = [
    { label: 'Overview', icon: <IoHomeOutline className="inline-block w-6 h-6 -mt-1" /> },
    { label: 'Property', icon: <BsBuildings className="inline-block w-6 h-6 -mt-1" /> },
    { label: 'Customers', icon: <FiUsers className="inline-block w-6 h-6 -mt-1" /> },
    { label: 'Agents', icon: <LiaUserTieSolid className="inline-block w-6 h-6 -mt-1" /> },
    { label: 'Messages', icon: <FaRegMessage className="inline-block w-6 h-6 -mt-1" /> },
    { label: 'Log Out', icon: <BiLogOut className="inline-block w-6 h-6 -mt-1" /> },
  ];

  return (
    <div className={`${sidebarToggle ? "hidden" : "block"} w-64 bg-gray-100 fixed h-full px-4 py-2`}>
      <div className="my-2 mb-4">
        <h1 className="text-2xl text-black text-center bg-[#EBF5F5] font-bold">Homescape</h1>
        <h1 className="text-2xl text-black text-center bg-[#EBF5F5] font-bold">Haven</h1>
      </div>

      <hr />
      <ul className="mt-3 font-bold">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className="mb-2 rounded hover:shadow hover:bg-white py-3 transition duration-200 flex items-center"
            onClick={() => onSelectPage(item.label)} 
          >
            <div className="flex items-center px-3 text-[#5C5C5C] hover:text-black cursor-pointer">
              {item.icon}
              <span className="ml-2 text-[#5C5C5C] hover:text-black">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
