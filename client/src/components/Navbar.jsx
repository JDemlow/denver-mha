import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-emerald-500">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/">
          <img className="w-16" src="src/assets/image.png" alt="" />
        </Link>
        <div className="space-x-10">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/about" className="text-white">
            About
          </Link>
          <Link to="/contact" className="text-white">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
