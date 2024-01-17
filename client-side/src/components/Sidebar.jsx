import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";

const NavLinks = () => (
  <div className="mt-0">
    {links.map((item) => (
      <NavLink className={`flex flex-row justify-start items-center my-6 text-sm font-medium text-black hover:text-[#ff5151]`} key={item.name} to={item.to}>
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

    <div className="absolute md:hidden block top-6 right-3">
        {/* {mobileMenuOpen ? (
          <RiCloseLine/>
        )} */}
    </div>
    </>
  )
}

export default Sidebar;
