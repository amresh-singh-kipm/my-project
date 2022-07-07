import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  let [loggedIn, setLoggedIn] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("name")) setLoggedIn(true);
  }, []);
  console.log("this is console after user is 2login", loggedIn);
  const handleClick = () => {
    localStorage.clear();
  };
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <p className="navbar-brand">Simple Blog</p>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>

            {(() => {
              if (loggedIn === true) {
                return (
                  <li>
                    <NavLink to={"/login"} onClick={handleClick}>
                      Logout
                    </NavLink>
                  </li>
                );
              } else {
                return (
                  <>
                    <li>
                      <NavLink to={"/login"}>Login</NavLink>;
                    </li>

                    <li>
                      <NavLink to={"/signup"}>Sign up</NavLink>
                    </li>
                  </>
                );
              }
            })()}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
