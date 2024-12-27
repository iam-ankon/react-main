import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
    <div className="flex-1">
      <Link to="/" className="hover:underline">
        Home
      </Link>
    </div>
    <div className="flex-0.5">
      <Link to="/home" className="hover:underline">
        AddInquiey
      </Link>
    </div>
    <div className="flex-0">
      <Link to="/inquiries/i" className="hover:underline">
        Inquiries
      </Link>
    </div>
    <div className="flex-1">
      <Link to="/orders/new" className="hover:underline">
        AddOrders
      </Link>
    </div>
    <div className="flex-1">
      <Link to="/order" className="hover:underline">
        OrdersList
      </Link>
    </div>
    {/* <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <details>
            <summary>Parent</summary>
            <ul className="bg-base-100 rounded-t-none p-2">
              <li>
                <a>Link 1</a>
              </li>
              <li>
                <a>Link 2</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div> */}

    {/* <h1 className="text-lg font-bold">Buying Management</h1>
        <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/home" className="hover:underline">AddInquiey</Link>
            <Link to="/inquiries/i" className="hover:underline">Inquiries</Link>
            <Link to="/orders/new" className="hover:underline">AddOrders</Link>
            <Link to="/order" className="hover:underline">OrdersList</Link>
            
        </div> */}
  </nav>
);

export default Navbar;
