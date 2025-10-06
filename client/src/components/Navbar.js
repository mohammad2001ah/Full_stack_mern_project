import logo from"../images/logo.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center py-5 font-medium ">
      <img src={logo} className="w-41" alt="Logo" />

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">

        <NavLink className="flex flex-col items-center gap-1" >
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />

        </NavLink>
      </ul>
    </div>
  );
};