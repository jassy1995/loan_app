import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Formatter } from "../../utils/currency-formatter";
import { UserContext } from "../../App";

function UserTable() {
  const { state } = useContext(UserContext);

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
        <div className="container-fluid mt-4">
          {state.error ? <h3 className="text-danger">{state.error}</h3> : null}
          {state.loans.length > 0 ? (
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table mr-1"></i>
                loan history
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
                        <th>Title</th>
                        <th>Refund Amount</th>
                        <th>Late Payment</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Start date</th>
                        <th>end date</th>
                      </tr>
                    </thead>
                    <tfoot className="text-center">
                      <tr>
                        <th>Title</th>
                        <th>Refund Amount</th>
                        <th>Late Payment</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Start date</th>
                        <th>end date</th>
                      </tr>
                    </tfoot>
                    <tbody className="text-center">
                      {state.loans?.length > 0 &&
                        Array.isArray(state.loans) &&
                        state.loans.map((loan, index) => (
                          <tr key={index}>
                            <td className="text-center">{loan.title}</td>
                            <td>{Formatter(loan.refundAmount)}</td>
                            <td>{Formatter(loan.latePayment)}</td>
                            <td
                              className={
                                loan.request_status === "approved"
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {loan.request_status}
                            </td>
                            <td>
                              <Link
                                className={
                                  loan.payment_status === "paid"
                                    ? "btn btn-success"
                                    : "btn btn-danger"
                                }
                                to={`/dashboard/loan/${loan._id}`}
                              >
                                {loan.payment_status}
                              </Link>
                            </td>
                            <td>{new Date(loan.date).toLocaleDateString()}</td>
                            <td>
                              {new Date(loan.deuDate).toLocaleDateString()}
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

export default UserTable;
