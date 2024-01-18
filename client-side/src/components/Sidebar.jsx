import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";

const links = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-lg font-lg text-black hover:text-[#ff5151]"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");

    navigate("/login");
  };

  return (
    <>
      <div className="md:flex hidden flex-col w-[200px] py-10 px-4 bg-gradient-to-br from-white to-[#ff5151]">
        <img src={logo} alt="logo" className="w-full h-52 object-contain" />
        <NavLinks />
       
        <div className="flex flex-col items-center justify-center mt-4 gap-2 animate-bounce">
          <p className="text-white text-sm mt-20">© 2024 WinSpo Music Player</p>
        </div>

        <button
          onClick={handleLogout}
          className="ml-4 bg-[#ff5151] text-white p-3 text-sm rounded-lg outline-none cursor-pointer mr-2 hover:bg-white hover:text-[#ff5151] transition duration-300 animate-bounce"
        >
          Logout
        </button>
      </div>

      <button
        className="md:hidden fixed bottom-6 right-6 bg-[#ff5151] text-white rounded-full p-3"
        onClick={toggleMobileMenu}
      >
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6" />
        ) : (
          <HiOutlineMenu className="w-6 h-6" />
        )}
      </button>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
        <button onClick={handleLogout} className="mt-8 text-white">
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
