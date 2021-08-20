import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../components/navbar";
import "../styles/form.css";

const Register = () => {
  let [errorMessage, setErrorMessage] = useState(true);
  const {
    register,
    handleSubmit: submitLoginForm,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const password = watch("password");

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

  //check confirm password field if it is the same with password field
  const checkPassword = (confirmPassword) => password === confirmPassword;

  //submit the data to backend
  const submitForm = (newUserData) => {
    axios
      .post("/login", newUserData)
      .then((res) => {
        if (res.data) {
          setErrorMessage(true);
          history.push("/");
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
      <div className="container  bgColor p-5 mt-2">
        <form
          className="bg-light p-2 shadow rounded"
          onSubmit={submitLoginForm(submitForm)}
          noValidate
          autoComplete="off"
        >
          <h2 className="mb-3">Register here</h2>
          <div className="row mb-4">
            <div className="col-sm-4 ">
              {!errors.first_name ? (
                <label>first name</label>
              ) : (
                errors.first_name &&
                errors.first_name.type === "required" && (
                  <small className="text-danger">first_name is require.</small>
                )
              )}
              <input
                {...register("first_name", { required: true })}
                type="text"
                className="form-control "
                placeholder="enter your first name"
                aria-label="name"
              />
            </div>
            <div className="col-sm-4">
              {!errors.last_name ? (
                <label>last name</label>
              ) : (
                errors.last_name &&
                errors.last_name.type === "required" && (
                  <small className="text-danger">last_name is require.</small>
                )
              )}
              <input
                {...register("last_name", { required: true })}
                type="text"
                name="last_name"
                className="form-control formInput"
                placeholder="enter your last name"
                aria-label="name"
              />
            </div>
            <div className="col-sm-4">
              {!errors.phone ? (
                <label>phone number</label>
              ) : (
                errors.phone &&
                errors.phone.type === "required" && (
                  <small className="text-danger">
                    phone number is require.
                  </small>
                )
              )}
              <input
                {...register("phone", { required: true })}
                type="text"
                className="form-control formInput"
                placeholder="enter your phone number"
                aria-label="phone"
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-sm-8">
              {!errors.address ? (
                <label>residential address</label>
              ) : (
                errors.address &&
                errors.address.type === "required" && (
                  <small className="text-danger">address is require.</small>
                )
              )}
              <input
                {...register("address", { required: true })}
                type="text"
                className="form-control formInput"
                placeholder="enter your residential address"
                aria-label="address"
              />
            </div>
            <div className="col-sm-2">
              {!errors.city ? (
                <label>city</label>
              ) : (
                errors.city &&
                errors.city.type === "required" && (
                  <small className="text-danger">city is require.</small>
                )
              )}
              <input
                {...register("city", { required: true })}
                type="text"
                className="form-control formInput"
                placeholder="city name"
                aria-label="city"
              />
            </div>
            <div className="col-sm-2">
              {!errors.states ? (
                <label>state</label>
              ) : (
                errors.states &&
                errors.states.type === "required" && (
                  <small className="text-danger">your state is require.</small>
                )
              )}
              <input
                {...register("states", { required: true })}
                type="text"
                className="form-control formInput"
                placeholder="state"
                aria-label="state"
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-sm-4">
              {!errors.email ? (
                <label>email address</label>
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
                      invalid email address
                    </small>
                  )}
              <input
                {...register("email", {
                  required: true,
                  pattern: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                })}
                type="text"
                name="email"
                className="form-control formInput"
                placeholder="enter your first name"
                aria-label="name"
              />
            </div>
            <div className="col-sm-4">
              {!errors.password ? (
                <label>create password</label>
              ) : (
                errors.password &&
                errors.password.type === "required" && (
                  <small className="text-danger">password is require.</small>
                )
              )}
              <input
                {...register("password", { required: true })}
                type="password"
                className="form-control formInput"
                placeholder="enter your password"
                aria-label="password"
              />
            </div>
            <div className="col-sm-4 mb-3">
              {!errors.confirmPassword ? (
                <label>confirm password</label>
              ) : (
                errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <small className="text-danger text-center">
                    confirmPassword is require
                  </small>
                )
              )}
              {!errors.confirmPassword
                ? ""
                : errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <small className="text-danger pb-2">
                      password does not match
                    </small>
                  )}
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: checkPassword,
                })}
                type="password"
                className="form-control formInput"
                placeholder="confirm password"
                aria-label="confirmPassword"
              />
            </div>
          </div>
          <div className="text-sm-center">
            <button
              type="submit"
              className="signUpButton rounded col-sm-6 mb-3"
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
        </form>
      </div>
    </>
  );
};
export default Register;
