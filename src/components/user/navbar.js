import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { UserContext } from "../../App";
import { setUser } from "../../utils/userFunctiom";
const Navbar = () => {
  const isLoggIn = localStorage.getItem("accessToken") || "";
  const { dispatch } = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    setUser({});
    dispatch({ type: "FETCH_LOAN_SUCCESS", payload: [] });
    dispatch({ type: "FETCH_ALL_LOAN_SUCCESS", payload: [] });
    dispatch({ type: "FETCH_ALL_USER_SUCCESS", payload: [] });
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-light fixed-top navBgColor p-3">
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
              <Link
                className="nav-link active text-light"
                aria-current="page"
                to={"/home"}
              >
                Home
              </Link>
            </li>
            {isLoggIn && (
              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  aria-current="page"
                  to={"/dashboard"}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          <div className="dropdown-divider"></div>
          <form className="d-flex gap-3 justify-content-md-around">
            {!isLoggIn && (
              <Link
                className="btn btn-outline-success border-light text-light "
                id="nav_button"
                to={"/"}
              >
                login
              </Link>
            )}
            {!isLoggIn && (
              <Link
                className="btn btn-outline-success border-light text-light "
                id="nav_button"
                to={"/register"}
              >
                register
              </Link>
            )}
            {isLoggIn && (
              <Link
                onClick={logout}
                className="btn btn-outline-danger border-light text-light "
                id="nav_button"
                to={"/"}
              >
                logout
              </Link>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
