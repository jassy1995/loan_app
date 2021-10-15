import React, { useContext } from "react";
import UserTable from "../user/UserTable";
import { UserContext } from "../../App";

function LoanHistory() {
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
      {state.loans.length > 0 ? (
        <UserTable />
      ) : (
        <div className="container mt-5">{loadingMessage()}</div>
      )}
    </>
  );
}
export default LoanHistory;
