import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { customAxios } from "../../axiosAuth";
import Swal from "sweetalert2";
import "../../styles/form.css";
const GetLoan = () => {
  let [state, setState] = useState({
    title: "",
    amount: "",
    first_grantor: "",
    second_grantor: "",
  });
  let [interest, setInterest] = useState(0);
  let [warning1, setWarning1] = useState("");
  let [warning2, setWarning2] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const calculateInterest = (amount) => {
    let convertMount = Number(amount);
    setInterest(0.1 * convertMount + convertMount);
  };

  const warningMessage1 = () => {
    setWarning1("email should be from one of our registered customer");
  };
  const warningMessage2 = () => {
    setWarning2("email should be from one of our registered customer");
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, [name]: value });
    let amount = e.target.name === "amount" ? value : "";
    calculateInterest(amount);
    if (e.target.name === "first_grantor") warningMessage1();
    if (e.target.name === "second_grantor") warningMessage2();
  };

  //loading spinner
  const loadingMessage = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };
  //alert response message
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, amount, first_grantor, second_grantor } = state;
    const newUserData = {
      title,
      amount,
      first_grantor,
      second_grantor,
    };

    setIsLoading(true);
    customAxios
      .post("user/loan/getLoan", newUserData)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          let message = res.data.successResponse || res.data.errorResponse;
          let messageIcon = res.data.successResponse ? "success" : "warning";
          let duration = res.data.successResponse ? 2000 : 4000;
          responseMessage(message, messageIcon, duration);
          setIsLoading(false);
          if (res.data.successResponse) {
            setState({
              title: "",
              amount: "",
              first_grantor: "",
              second_grantor: "",
            });
            setTimeout(() => {
              history.push("/dashboard");
            }, 3000);
          }
        }
      })
      .catch((err) => console.log(err));
  };
  const { title, amount, first_grantor, second_grantor } = state;
  return (
    <>
      <main>
        <div className="container-fluid">
          <div style={{ backgroundColor: "#e4ebf1" }}>
            <div
              className="container pt-md-4   p-4  mt-4  margin-top"
              style={{ backgroundColor: "#e4ebf1" }}
            >
              <div className="row">
                <form
                  className="bg-light shadow rounded pt-4 pr-2 pl-2 col-md-6"
                  onSubmit={handleSubmit}
                  noValidate
                  autoComplete="off"
                >
                  <div className="justify-content-center text-cent">
                    <h5 className="mb-3 fst-italic font-monospace text-center">
                      Apply for your loan here
                    </h5>
                    <label className="ml-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control formInput mb-2s"
                      placeholder="enter title for your loan"
                      onChange={handleChange}
                      value={title}
                    />
                    {warning1 ? (
                      <div className="mb-1">
                        <span className="text-muted">please note </span>
                        <strong className="ml-2 my-2">
                          {warning1 ? warning1 : ""}
                        </strong>
                      </div>
                    ) : (
                      <label className="ml-2">first grantor email</label>
                    )}
                    <input
                      type="text"
                      name="first_grantor"
                      className="form-control formInput mb-4"
                      placeholder="enter your first grantor email"
                      onChange={handleChange}
                      value={first_grantor}
                    />
                    {warning2 ? (
                      <div className="mb-1">
                        <span className="text-muted">please note </span>
                        <strong className="ml-2 my-2">
                          {warning2 ? warning2 : ""}
                        </strong>
                      </div>
                    ) : (
                      <label className="ml-2">second grantor email</label>
                    )}
                    <input
                      type="text"
                      name="second_grantor"
                      min="0"
                      className="form-control formInput mb-3"
                      placeholder="enter your second grantor"
                      onChange={handleChange}
                      value={second_grantor}
                    />
                  </div>
                  {interest > 0 ? (
                    <div className="mb-1 text-center">
                      <span className="text-muted">Amount to pay </span>
                      <strong className="ml-2 my-2">
                        <img
                          src="assets/landing-page/img/download.jfif"
                          alt="not exist"
                          width="12"
                          height="12"
                          className="mr-1 mb-1"
                        />
                        {interest > 0 ? interest : ""}
                        <span className="text-muted float-end mr-2">
                          duration 6 months
                        </span>
                      </strong>
                    </div>
                  ) : (
                    <label className="ml-2">Amount</label>
                  )}
                  <input
                    type="number"
                    name="amount"
                    min="0"
                    className="form-control formInput mb-4"
                    placeholder="enter amount your want"
                    onChange={handleChange}
                    value={amount}
                  />

                  <div className="text-sm-center">
                    <button
                      type="submit"
                      className="signUpButton rounded col-sm-6 mb-2 "
                    >
                      <span>
                        {isLoading ? (
                          loadingMessage()
                        ) : (
                          <span className="fs-4">Apply</span>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
                <div className="col-md-6 d-none d-md-block">
                  <img
                    src="assets/landing-page/img/illustration.jpg"
                    alt="not exist"
                    style={{ height: "500px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default GetLoan;
