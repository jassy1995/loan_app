import React from "react";
import UserTable from "../user/UserTable";
import { Formatter } from "../../utils/currency-formatter";
import { getUser } from "../../utils/userFunctiom";

function DashboardDefaultContent() {
  const user = getUser();

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
                    {Formatter(0)}
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
          <UserTable />
        </div>
      </main>
    </>
  );
}
export default DashboardDefaultContent;
