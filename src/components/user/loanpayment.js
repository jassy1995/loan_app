import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { customAxios } from "../../axiosAuth";
import { setUser } from "../../utils/userFunctiom";

const LoanPayment = (props) => {
  const history = useHistory();
  let [LoanId, setLoanId] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  useEffect(() => {
    const {
      match: { params },
    } = props;
    setLoanId(params.loanId);
  }, []);

  const submitForm = (amount) => {
    setIsLoading(true);
    customAxios
      .post(`/user/payLoan/${LoanId}`, amount)
      .then((res) => {
        if (res.data) {
          setIsLoading(false);
          let message = res.data?.Response;
          let messageIcon =
            res.data?.Response === "payment successful" ? "success" : "warning";
          let duration =
            res.data?.Response === "payment successful" ? 2000 : 3000;
          responseMessage(message, messageIcon, duration);
          if (message === "payment successful") {
            setUser(res.data.user);
            reset();
            setTimeout(() => {
              history.push("/dashboard");
            }, 2000);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <main>
        <div className="container-fluid">
          <h1 className="d-none d-md-block">Dashboard</h1>
          <ol className="breadcrumb d-none d-md-block">
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
          <div style={{ backgroundColor: "#e4ebf1" }}>
            <div
              className="container pb-md-5  pt-md-5   p-4  mt-5  margin-top"
              style={{ backgroundColor: "#e4ebf1" }}
            >
              <div className="row">
                <form
                  className="bg-light shadow rounded pt-4 pr-2 pl-2 col-md-6"
                  onSubmit={handleSubmit(submitForm)}
                  noValidate
                  autoComplete="off"
                >
                  <div className="justify-content-center text-cent">
                    <h5 className="mb-3 fst-italic font-monospace text-center">
                      refund your loan
                    </h5>
                  </div>
                  <div>
                    {!errors.amount ? (
                      <label className="text-start">Enter Amount</label>
                    ) : (
                      errors.amount &&
                      errors.amount.type === "required" && (
                        <small className="text-danger">
                          Amount is require.
                        </small>
                      )
                    )}
                    <input
                      {...register("amount", { required: true })}
                      className="form-control  rounded pl-4 mb-4"
                      placeholder="enter your amount"
                    />
                  </div>
                  <div className="text-sm-center">
                    <button
                      to={`/dashboard/pay`}
                      type="submit"
                      className="signUpButton rounded col-sm-6 mb-3 text-center"
                    >
                      <span>
                        {isLoading ? (
                          loadingMessage()
                        ) : (
                          <span className="fs-4">Pay</span>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
                <div className="col-md-6 d-none d-md-block">
                  <img
                    src="assets/landing-page/img/illustration1.jpg"
                    alt="not exist"
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
export default LoanPayment;
