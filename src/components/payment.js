import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const initialize = {
  amount: "",
};
const Payment = (props) => {
  let [amount, setAmount] = useState(initialize);
  let [LoanId, setLoanId] = useState("");
  let [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const {
      match: { params },
    } = props;
    setLoanId(params.loanId);
  }, []);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUser(user);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const repayAmount = { amount: amount };
    console.log(repayAmount);
    axios
      .post(`/loan/${LoanId}/${user._id}`, repayAmount)
      .then((res) => {
        if (res.data) {
          history.push("/dashboard/loan");
        }
      })
      .catch((err) => console.log(err));
    console.log(LoanId);
  };
  // "products/" + localStorage.getItem("userId"), this.config;
  return (
    <>
      <div className="container-fluid">
        <div className=" justify-content-center mx-auto text-center col-sm-12 col-md-5 card p-5 shadow ">
          <h3 className="pb-3">Refund your loan here</h3>
          <form className="row" noValidate onSubmit={handleSubmit}>
            <div className=" mb-4 col-12">
              <input
                type="number"
                name="amount"
                className="form-control rounded-pill border-warning fs-4 text-center"
                placeholder="enter amount"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-warning btn-gradient w-75  text-light rounded-pill"
              >
                Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Payment;
