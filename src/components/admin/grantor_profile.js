import React, { useContext, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Formatter } from "../../utils/currency-formatter";
import { customAxios } from "../../axiosAuth";
import { UserContext } from "../../App";

function GrantorProfile(props) {
  const { state, dispatch } = useContext(UserContext);

  const fetchGrantorProfile = (email) => {
    customAxios
      .get(`admin/grantor/fetchGrantorProfile/${email}`)
      .then((res) => {
        dispatch({ type: "FETCH_GRANTOR_SUCCESS", payload: res.data.grantor });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_GRANTOR_ERROR", payload: err.message });
      });
  };

  useLayoutEffect(() => {
    const {
      match: { params },
    } = props;
    fetchGrantorProfile(params?.grantorEmail);
  }, []);

  return (
    <>
      <main>
        {state.error ? <h3 className="text-danger">{state.error}</h3> : null}
        {state.grantorProfile.length < 1 ? (
          <div className="m-5 p-5 text-center">
            <h3 className="">Does not have any loan record yet</h3>
            <Link to={"/dashboard/loanRequest"} className="btn btn-primary">
              back
            </Link>
          </div>
        ) : (
          <div className="container-fluid mt-3">
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4">
                  <div className="card-body fs-4">Main Wallet</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <a className=" text-white  fs-4" href="#mdmdm">
                      {state.grantorProfile.length > 0 &&
                        Array.isArray(state.grantorProfile) &&
                        Formatter(state.grantorProfile[0].userId?.wallet)}
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
                      {state.grantorProfile.length > 0 &&
                        Array.isArray(state.grantorProfile) &&
                        Formatter(state.grantorProfile[0].userId?.debitWallet)}
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
                      {state.grantorProfile.length > 0 &&
                        Array.isArray(state.grantorProfile) &&
                        Formatter(
                          state.grantorProfile[0].userId.wallet -
                            state.grantorProfile[0].userId.debitWallet
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
                      {state.grantorProfile.length > 0 &&
                        Array.isArray(state.grantorProfile) &&
                        Formatter(state.grantorProfile[0].userId?.debitWallet)}
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table mr-1"></i>
                Grantor Profile
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellSpacing="0"
                  >
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Refund Amount</th>
                        <th>Late Payment</th>
                        <th>Payment</th>
                        <th>Start date</th>
                        <th>end date</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Title</th>
                        <th>Refund Amount</th>
                        <th>Late Payment</th>
                        <th>Payment</th>
                        <th>Start date</th>
                        <th>end date</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {state.grantorProfile.length > 0 &&
                        Array.isArray(state.grantorProfile) &&
                        state.grantorProfile.map((loan, index) => (
                          <tr key={index}>
                            <td>{loan.title}</td>
                            <td>{Formatter(loan.refundAmount)}</td>
                            <td>{Formatter(loan.latePayment)}</td>
                            <td
                              className={
                                loan.payment_status === "paid"
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {loan.payment_status === "paid"
                                ? loan.payment_status
                                : "pending"}
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
            <div className="text-center">
              <Link
                to={"/dashboard/loanRequest"}
                className="btn btn-primary text-center w-50"
              >
                back
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
export default GrantorProfile;
