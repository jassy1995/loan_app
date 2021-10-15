import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { customAxios } from "../../axiosAuth";
import { Formatter } from "../../utils/currency-formatter";
import Swal from "sweetalert2";
import { UserContext } from "../../App";
import { getUser, setUser } from "../../utils/userFunctiom";

function LoanRequest() {
  const history = useHistory();

  const { state } = useContext(UserContext);
  const user = getUser();

  useEffect(() => {
    if (Object.keys(user).length === 0) history.push("/");
  });

  const responseMessage = (message, messageIcon, duration) => {
    Swal.fire({
      position: "top-end",
      icon: messageIcon,
      title: message,
      color: "#d33",
      width: 300,
      height: 200,
      showConfirmButton: false,
      timer: duration,
    });
  };

  const grantLoan = (userId, loanId, amount, status) => {
    customAxios
      .post(`admin/user/grantLoan/${userId}/${loanId}/${amount}/${status}`)
      .then((res) => {
        if (res.data) {
          let message = res.data?.successResponse || res.data.errorResponse;
          let messageIcon = res.data?.successResponse ? "success" : "warning";
          let duration = res.data.successResponse ? 2000 : 3000;
          responseMessage(message, messageIcon, duration);
          if (res.data.user) setUser(res.data.user);
          history.push("/dashboard/loanRequest");
        }
      });
  };

  const loadingMessage = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <main>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-primary text-white mb-4">
                <div className="card-body fs-4">Main Wallet</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className=" text-white  fs-4" href="#mdmdm">
                    {Formatter(user?.wallet)}
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body fs-4">Pending Loan</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a
                    className="small text-white stretched-link fs-4"
                    href="#dd"
                  >
                    {Formatter(user?.debitWallet)}
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-success text-white mb-4">
                <div className="card-body fs-4">Earning</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white fs-4" href="dmdm#">
                    {Formatter(
                      user?.wallet >= user?.debitWallet
                        ? user?.wallet - user?.debitWallet
                        : 0
                    )}
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-danger text-white mb-4">
                <div className="card-body fs-4">Debit Amount</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white fs-4" href="mdmdm#">
                    {Formatter(user?.debitWallet)}
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {state.error ? <h3 className="text-danger">{state.error}</h3> : null}
          {state.allLoan.length > 0 ? (
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table mr-1"></i>
                loan Request
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellSpacing="0"
                  >
                    <thead className="text-center">
                      <tr>
                        <th className="text-start">fullName</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Grantor 1</th>
                        <th>Grantor 2</th>
                        <th>Actions</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tfoot className="text-center">
                      <tr>
                        <th className="text-start">fullName</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Grantor 1</th>
                        <th>Grantor 2</th>
                        <th>Actions</th>
                        <th>Actions</th>
                      </tr>
                    </tfoot>
                    <tbody className="text-center">
                      {state.allLoan.length > 0 &&
                        Array.isArray(state.allLoan) &&
                        state.allLoan.map((loan, index) => (
                          <tr key={index}>
                            <td className="text-start">
                              {loan.userId.first_name +
                                "  " +
                                loan.userId.last_name}
                            </td>
                            <td>{Formatter(loan.refundAmount)}</td>
                            <td
                              className={
                                loan.request_status === "approved"
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {loan.request_status}
                            </td>
                            <td
                              className={
                                loan.payment_status === "paid"
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {loan.payment_status}
                            </td>
                            <td>
                              <Link
                                className="btn btn-warning"
                                to={`/dashboard/grantorProfile/${loan.first_grantor}`}
                              >
                                view
                              </Link>
                            </td>
                            <td>
                              <Link
                                className="btn btn-warning"
                                to={`/dashboard/grantorProfile/${loan.second_grantor}`}
                              >
                                view
                              </Link>
                            </td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => {
                                  grantLoan(
                                    loan.userId._id,
                                    loan._id,
                                    loan.refundAmount,
                                    "accept"
                                  );
                                }}
                              >
                                accept
                              </button>
                            </td>
                            <td>
                              <button
                                type="submit"
                                className="btn btn-danger"
                                onClick={() => {
                                  grantLoan(
                                    loan.userId._id,
                                    loan._id,
                                    loan.refundAmount,
                                    "decline"
                                  );
                                }}
                              >
                                decline
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            loadingMessage()
          )}
        </div>
      </main>
    </>
  );
}
export default LoanRequest;
