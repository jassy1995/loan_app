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
        className="btn btn-outline-danger border-light text-light "
        id="nav_button"
        to={"/"}
      >
        logout
      </Link>
    );
    userDashboardLink = (
      <Link
        className="nav-link active text-light"
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
          className="btn btn-outline-success border-light text-light "
          id="nav_button"
          to={"/"}
        >
          login
        </Link>
        <Link
          className="btn btn-outline-success border-light text-light "
          id="nav_button"
          to={"/register"}
        >
          register
        </Link>
      </form>
    );
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light fixed-top navBgColor p-4">
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
                className="nav-link active text-light"
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

// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <>
//       <div id="preloader-active">
//         <div class="preloader d-flex align-items-center justify-content-center">
//           <div class="preloader-inner position-relative">
//             <div class="preloader-circle"></div>
//             <div class="preloader-img pere-text">
//               <img src="assets/home/img/logo/logo.png" alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <header>
//         <div class="header-area header-transparent">
//           <div class="main-header  header-sticky">
//             <div class="container-fluid">
//               <div class="row align-items-center">
//                 <div class="col-xl-2 col-lg-2 col-md-1">
//                   <div class="logo">
//                     <a href="#">
//                       <img src="assets/home/img/logo/logo.png" alt="" />
//                     </a>
//                   </div>
//                 </div>
//                 <div class="col-xl-10 col-lg-10 col-md-10">
//                   <div class="menu-main d-flex align-items-center justify-content-end">
//                     <div class="main-menu f-right d-none d-lg-block">
//                       <nav>
//                         <ul id="navigation">
//                           <li class="active">
//                             <Link to={"/home"}>Home</Link>
//                           </li>
//                           <li>
//                             <Link to={"/"}>Login</Link>
//                           </li>
//                           <li>
//                             <Link to={"/register"}>Sign Up</Link>
//                           </li>
//                         </ul>
//                       </nav>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="col-12">
//                   <div class="mobile_menu d-block d-lg-none"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
// </>
// <nav
//   className="navbar navbar-expand-lg navbar fixed-top  navbar-light"
//   style={{ backgroundColor: "#F4567A" }}
// >
//   <a className="navbar-brand text-light" href="#Welcome">
//     <img
//       src="assets/images/logo.png"
//       width="50"
//       height="50"
//       className="d-inline-block text-light"
//       alt=""
//     />{" "}
//     Prestige Shop
//   </a>
//   <button
//     className="navbar-toggler"
//     type="button"
//     data-toggle="collapse"
//     data-target="#navbarText"
//     aria-controls="navbarText"
//     aria-expanded="false"
//     aria-label="Toggle navigation"
//   >
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarText">
//     <ul className="navbar-nav ml-auto">
//       <li className="nav-item">
//         <Link className="nav-link text-light" to={"/"}>
//           Home
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link className="nav-link text-light" to={"/login"}>
//           login
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link className="nav-link text-light" to={"/register"}>
//           signUp
//         </Link>
//       </li>
//     </ul>
//   </div>
// </nav>
//   );
// }

// export default Navbar;
