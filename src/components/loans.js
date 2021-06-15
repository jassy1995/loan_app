import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Loan = () => {
  let [loans, setLoans] = useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    axios
      .get(`/loan/${user._id}`)
      .then((res) => {
        setLoans(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Table responsive className="container ">
        <thead>
          <tr>
            <th>S/N</th>
            <th>title</th>
            <th>loanTenure</th>
            <th>Amount</th>
            <th> Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loans.length > 0 &&
            loans.map((loan, index) => (
              <tr key={loan._id}>
                <td>{index + 1}</td>
                <td>{loan.title}</td>
                <td>
                  {loan.loanTenure <= 1
                    ? `${loan.loanTenure} year`
                    : `${loan.loanTenure} years`}
                </td>

                <td>${loan.amount > 0 ? loan.amount : "0"}</td>
                <td>{new Date(loan.date).toLocaleDateString()}</td>
                <td>
                  <Link
                    className={
                      loan.amount <= 0 ? "btn btn-success" : "btn btn-danger"
                    }
                    to={`/loan/${loan._id}`}
                  >
                    {loan.amount <= 0 ? "paid" : "refund"}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};
export default Loan;
