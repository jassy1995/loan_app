import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { Link, Route } from "react-router-dom";
import GetLoan from "../user/getLoan";
import DashboardDefaultContent from "../user/DashboardDefaultContent";
import LoanHistory from "../user/loans";
import FundWallet from "../user/fundWallet";
import LoanPayment from "../user/loanpayment";
import Stripe from "../user/StripeContainer";
import LoanRequest from "../admin/loanRequest";
import GrantorProfile from "../admin/grantor_profile";
import { customAxios } from "../../axiosAuth";
import UserMessage from "./user_message";
import { UserContext } from "../../App";
import AllUser from "../admin/AllUser";
import { getUser, setUser } from "../../utils/userFunctiom";

function Dashboard({ match }) {
  let [messages, setMessages] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const user = getUser();
  let componentMounted = true;

  const logout = () => {
    localStorage.clear();
    setUser({});
    dispatch({ type: "FETCH_LOAN_SUCCESS", payload: [] });
    dispatch({ type: "FETCH_ALL_LOAN_SUCCESS", payload: [] });
    dispatch({ type: "FETCH_ALL_USER_SUCCESS", payload: [] });
  };

  const changeMessageStatus = async () => {
    try {
      const res = await customAxios.put("user/message/update");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    customAxios
      .get("/user/loan/fetchMyLoan")
      .then((res) => {
        if (componentMounted) {
          dispatch({
            type: "FETCH_LOAN_SUCCESS",
            payload: res.data.loans,
          });
        }
      })
      .catch((err) => {
        if (componentMounted) {
          dispatch({ type: "FETCH_LOAN_ERROR", payload: err.message });
        }
      });
    return () => {
      componentMounted = false;
    };
  }, [state]);

  useLayoutEffect(() => {
    customAxios
      .get("user/loan/fetchAllLoan")
      .then((res) => {
        if (componentMounted) {
          dispatch({
            type: "FETCH_ALL_LOAN_SUCCESS",
            payload: res.data.allLoans,
          });
        }
      })
      .catch((err) => {
        if (componentMounted) {
          dispatch({ type: "FETCH_ALL_LOAN_ERROR", payload: err.message });
        }
      });
    return () => {
      componentMounted = false;
    };
  }, [state]);

  useEffect(() => {
    customAxios
      .get("user/message")
      .then((res) => {
        if (res.data.messages) {
          if (componentMounted) {
            setMessages(res.data.messages);
          }
        }
      })
      .catch((err) => console.log(err));
    return () => {
      componentMounted = false;
    };
  }, [messages]);
  return (
    <div className="sb-nav-fixed">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="#kkk">
          {state.user?.role}
        </a>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0"
          id="sidebarToggle"
          href="#"
        >
          <i className="fas fa-bars"></i>
        </button>
        <ul className="navbar-nav ml-auto mr-0 mr-md-3 my-2 my-md-0">
          <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user?.role === "user" && (
                <Link
                  to={"/dashboard/user/message"}
                  onClick={changeMessageStatus}
                >
                  <span className="mr-3 fs-4">
                    <i className="bi bi-bell text-light"></i>
                    <sup className="text-danger">
                      {messages.length > 0 &&
                        messages.filter((val) => val.status === "unread")
                          .length > 0 &&
                        messages.filter((val) => val.status === "unread")
                          .length}
                    </sup>
                  </span>
                </Link>
              )}
              {user?.role === "admin" && (
                <span className="mr-3 fs-4">
                  <i className="bi bi-bell text-light"></i>
                  <sup className="text-danger">
                    {state.allLoan.length > 0 &&
                      state.allLoan.filter(
                        (val) => val.request_status === "pending"
                      ).length > 0 &&
                      state.allLoan.filter(
                        (val) => val.request_status === "pending"
                      ).length}
                  </sup>
                </span>
              )}
              <i className="fas fa-user fa-fw"></i>
            </div>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#fhfh">
                {user?.first_name && user?.first_name}
              </a>
              <a className="dropdown-item" href="#ndn">
                {user?.last_name && user?.last_name}
              </a>
              <div className="dropdown-divider"></div>
              <Link to={"/"} onClick={logout} className="dropdown-item">
                {Object.keys(user).length === 0 ? "Login" : "Logout"}
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Operation</div>
                {user?.role === "user" && (
                  <Link to={`${match.url}`} className="nav-link">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-tachometer-alt fs-5 text-light"></i>
                    </div>
                    Dashboard
                  </Link>
                )}
                <Link className="nav-link" to={`${match.url}/fundwallet`}>
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-cash-coin fs-4 text-light"></i>
                  </div>
                  Fund your wallet
                </Link>
                {user?.role === "admin" ? (
                  <Link className="nav-link" to={`${match.url}/loanRequest`}>
                    <div className="sb-nav-link-icon">
                      <i className="bi bi-currency-exchange fs-3 text-light"></i>
                    </div>
                    Loan Request
                  </Link>
                ) : (
                  <Link className="nav-link" to={`${match.url}/getloan`}>
                    <div className="sb-nav-link-icon">
                      <i className="bi bi-currency-exchange fs-3 text-light"></i>
                    </div>
                    Get your loan
                  </Link>
                )}

                {user?.role === "admin" && (
                  <Link className="nav-link" to={`${match.url}/users`}>
                    <div className="sb-nav-link-icon">
                      <i className="bi bi-people fs-3 text-light"></i>
                    </div>
                    Users
                  </Link>
                )}
                {user?.role === "user" && (
                  <Link className="nav-link" to={`${match?.url}/loan`}>
                    <div className="sb-nav-link-icon">
                      <i className="bi bi-clock-history fs-4 text-light"></i>
                    </div>
                    Loan history
                  </Link>
                )}
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              {user?.role}
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <Route
            exact
            path={`${match.path}`}
            component={DashboardDefaultContent}
          />
          <Route exact path={`${match.path}/pay`} component={Stripe} />
          <Route exact path={`${match.path}/loan`} component={LoanHistory} />
          <Route
            exact
            path={`${match.path}/user/message`}
            component={UserMessage}
          />
          <Route
            exact
            path={`${match.path}/grantorProfile/:grantorEmail`}
            component={GrantorProfile}
          />

          <Route
            exact
            path={`${match.path}/loanRequest`}
            component={LoanRequest}
          />
          <Route exact path={`${match.path}/users`} component={AllUser} />
          <Route
            exact
            path={`${match.path}/loan/:loanId`}
            component={LoanPayment}
          />
          <Route
            exact
            path={`${match.path}/fundwallet`}
            component={FundWallet}
          />
          <Route exact path={`${match?.path}/getloan`} component={GetLoan} />
          <Route
            exact
            path={`${match.path}/loanpayment`}
            component={LoanPayment}
          />
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy;loan_app 2021</div>
                <div>
                  <a href="#uuu">Privacy Policy</a>
                  &middot;
                  <a href="#urururu">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
