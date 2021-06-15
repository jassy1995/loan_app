import React, { useContext } from "react";
import { Link, Route } from "react-router-dom";
import Loan from "../components/loans";
import "../styles/dashboard.css";
import Profile from "./profile";
import { StoreContext } from "../context";
import GetLoan from "./getLoan";
// import Payment from "./payment";

const Dashboard = ({ match }) => {
  const { setUser } = useContext(StoreContext);

  const handleLogOut = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <>
      <div>
        <nav className="sb-topnav navbar navbar-expand navbar-dark fixed-top mt-5">
          <div id="side_toggle_btn" className="justify-content-end">
            <button className="btn btn-link btn-sm order-1 bg-warning order-lg-0 btn-outline-warning text-light ml-2">
              <i className="fas fa-bars " id="sidebarToggle"></i>
            </button>
          </div>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              className="sb-sidenav accordion sb-sidenav-dark"
              id="sidenavAccordion"
            >
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <Link className="nav-link mb-3" to={`${match.url}`}>
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    Dashboard
                  </Link>
                  <Link className="nav-link mb-3" to={`${match.url}/profile`}>
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    Profile
                  </Link>
                  <Link className="nav-link mb-3" to={`${match.url}/loan`}>
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-store"></i>
                    </div>
                    loans
                  </Link>
                  <Link
                    className="nav-link mb-3"
                    to={"/"}
                    onClick={handleLogOut}
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-store"></i>
                    </div>
                    log out
                  </Link>
                </div>
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid">
                <div className="container mt-sm-2 mt-md-2   ">
                  <div className="row p-2 ">
                    <Route exact path={`${match.path}`} component={GetLoan} />
                    <Route
                      exact
                      path={`${match.path}/profile`}
                      component={Profile}
                    />
                    <Route exact path={`${match.path}/loan`} component={Loan} />
                    {/* <Route exact path="/loan/:loanId" component={Payment} /> */}
                  </div>
                </div>
              </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
                    Copyright &copy; Your Website 2021
                  </div>
                  <div>
                    <Link to={"/dashboard"}>Privacy Policy</Link>
                    &middot;
                    <Link to={"/dashboard"}>Terms &amp; Conditions</Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
