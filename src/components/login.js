import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import "../styles/form.css";

const Login = () => {
  let [errorMessage, setErrorMessage] = useState(true);
  const {
    register: login,
    handleSubmit: submitLoginForm,
    formState: { errors },
    reset,
  } = useForm();
  const history = useHistory();

  //direct the user to dashboard once is still loggedIn
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      history.push("/dashboard");
    }
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

  //submit the data to backend
  const submitForm = (newUserData) => {
    axios
      .post("/login", newUserData)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("userToken", res.data.token.split(" ")[1]);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setErrorMessage(true);
          history.push({
            pathname: "/dashboard",
            state: { user: res.data.user },
          });
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setErrorMessage(false);
    console.log(newUserData);
  };

  return (
    <>
      <Navbar />
      <div
        className="container  p-5 mt-2"
        style={{ backgroundColor: "#e4ebf1" }}
      >
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="wrap d-md-flex">
              <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last shadow">
                <div className="text w-100">
                  <h2>Welcome to login</h2>
                  <p className="text-light">Don't have an account?</p>
                  <Link to={"/register"} className="signUpButton">
                    Sign Up
                  </Link>
                </div>
              </div>
              <div className="login-wrap p-4 p-lg-5">
                <form
                  onSubmit={submitLoginForm(submitForm)}
                  noValidate
                  autoComplete="off"
                >
                  <h3 className="text-center mb-4">Login here</h3>
                  <div className="form-group mb-4 text-center">
                    {!errors.email ? (
                      <label>Email Address</label>
                    ) : (
                      errors.email &&
                      errors.email.type === "required" && (
                        <small className="text-danger text-center">
                          Email is require
                        </small>
                      )
                    )}
                    {!errors.email
                      ? ""
                      : errors.email &&
                        errors.email.type === "pattern" && (
                          <small className="text-danger pb-2">
                            Invalid email
                          </small>
                        )}
                    <input
                      {...login("email", {
                        required: true,
                        pattern: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                      })}
                      className="form-control  rounded-pill  pl-4"
                      placeholder="enter your email address"
                    />
                  </div>
                  <div className="form-group mb-4 text-center">
                    {!errors.password ? (
                      <label>password</label>
                    ) : (
                      errors.password &&
                      errors.password.type === "required" && (
                        <small className="text-danger">
                          Password is require.
                        </small>
                      )
                    )}
                    <input
                      {...login("password", { required: true })}
                      className="form-control  rounded-pill pl-4"
                      placeholder="enter your password"
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="rounded-pill  loginButton w-100 px-3"
                    >
                      <span>
                        {!errorMessage ? (
                          loadingMessage()
                        ) : (
                          <span className="fs-4">Submit</span>
                        )}
                      </span>
                    </button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input formCheckBox"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="w-50 text-md-right">
                      <Link to={"password"}>Forgot Password</Link>
                    </div>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
