import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";

const NavLinks = ({ handleClick }) => (
  <div className="mt-0">
    {links.map((item) => (
      <NavLink className={`flex flex-row justify-start items-center my-6 text-sm font-medium text-black hover:text-[#ff5151]`} key={item.name} to={item.to} 
      onClick={() => handleClick && handleClick()}>
        {item.name}
      </NavLink>
    ))}
  </div>
)

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
    <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-white">
      <img src={logo} alt="logo" className="w-full h-40 object-contain"/>
    <NavLinks />
    </div>

   {/* Mobile sidebar */}
   <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
          ) : (
            <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
            )}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#ff5151] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-40 object-contain"/>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>

    </>
  );
};

export default Sidebar;
