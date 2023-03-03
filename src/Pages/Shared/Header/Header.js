import React, { useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch(e => console.error(e));
  };

  const menuItems = (
    <>
      <li className="font-semibold mr-2">
        {" "}
        <Link to="/">Home</Link>
      </li>

      {user?.email ? (
        <>
          <li className="font-semibold mr-2">
            {" "}
            <Link to="/orders">Orders</Link>
          </li>
          <button
            onClick={handleSignOut}
            className="btn btn-outline btn-error "
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <li>
            {" "}
            <Link className="font-semibold" to="/login">
              Login
            </Link>
            <Link className="font-semibold" to="/signup">
              Sign Up
            </Link>
          </li>
        </>
      )}

      {/* <li>
        {user?.uid ? (
          <button
            onClick={handleSignOut}
            className="btn btn-outline btn-error "
          >
            Sign Out
          </button>
        ) : (
          <>
          
          </>
        )}
      </li> */}
    </>
  );

  return (
    <div className="navbar h-20 mb-12 pt-12   bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        <label
          className="btn btn-ghost btn-circle avatar tooltip tooltip-left tooltip-info"
          data-tip={user?.displayName}
        >
          <div className="w-10 rounded-full">
            {user?.uid ? (
              <img src={user?.photoURL} alt="" />
            ) : (
              <p className="text-3xl pl-2 pt-1">
                <FaUserAlt />
              </p>
            )}
          </div>
        </label>
        <button className="btn btn-outline btn-error">Appointment</button>
      </div>
    </div>
  );
};

export default Header;
