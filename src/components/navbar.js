import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { StoreContext } from "../context";
const Navbar = () => {
  // let [userStatus, setUserStatus] = useState("");
  let [isLoggIn, setIsLoggIn] = useState(false);
  const { setUser, currentUser } = useContext(StoreContext);

  // console.log(currentUser);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggIn(false);
  };
  useEffect(() => {
    if (currentUser) {
      setIsLoggIn(true);
    }
  }, []);

  let userStatus;
  let userDashboardLink;
  if (isLoggIn) {
    userStatus = (
      <Link
        onClick={logout}
        className="btn btn-outline-danger border-warning text-warning "
        id="nav_button"
        to={"/"}
      >
        logout
      </Link>
    );
    userDashboardLink = (
      <Link
        className="nav-link active text-warning"
        aria-current="page"
        to={"/dashboard"}
      >
        Dashboard
      </Link>
    );

    // register = null;
  } else {
    userStatus = (
      <form className="d-flex gap-3 justify-content-md-around">
        <Link
          className="btn btn-outline-success border-warning text-warning "
          id="nav_button"
          to={"/"}
        >
          login
        </Link>
        <Link
          className="btn btn-outline-success border-warning text-warning "
          id="nav_button"
          to={"/register"}
        >
          register
        </Link>
      </form>
    );
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light mb-5  ">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active text-warning"
                aria-current="page"
                href="#djjddj"
              >
                Home
              </a>
            </li>
            <li className="nav-item">{userDashboardLink}</li>
          </ul>
          <div className="dropdown-divider"></div>
          {userStatus}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
