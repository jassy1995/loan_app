import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getUser } from "../../utils/userFunctiom";

const FundWallet = () => {
  let [errorMessage, setErrorMessage] = useState(true);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = getUser();

  useEffect(() => {
    if (Object.keys(user).length === 0) history.push("/");
  });

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

  const submitForm = (amount) => {
    localStorage.setItem("amount", amount.amount);
    setErrorMessage(false);
    history.push("/dashboard/pay");
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
                  <div className="justify-content-center">
                    <h5 className="mb-3 fst-italic font-monospace text-center">
                      fund your wallet
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
                      type="submit"
                      className="signUpButton rounded col-sm-6 mb-3 text-center"
                    >
                      <span>
                        {!errorMessage ? (
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
export default FundWallet;
