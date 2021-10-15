import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../user/navbar";
import Swal from "sweetalert2";

const Register = () => {
  let [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit: submitLoginForm,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const password = watch("password");
  const history = useHistory();

  //request alert
  const proceedToLogin = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: "would you like to login!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No, cancel!",
        confirmButtonText: "Yes, login!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) history.push("/");
        else if (result.dismiss === Swal.DismissReason.cancel) reset();
      });
  };

  //alert response message
  const responseMessage = (message, messageIcon) => {
    Swal.fire({
      position: "top-end",
      icon: messageIcon,
      title: message,
      color: "#d33",
      width: 300,
      height: 200,
      showConfirmButton: false,
      timer: 2000,
    });
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

  //check confirm password field if it is the same with password field
  const checkPassword = (confirmPassword) => password === confirmPassword;

  //submit the data to backend
  const submitForm = (newUserData) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3001/user/register", newUserData)
      .then((res) => {
        console.log(res);
        if (res.data) {
          let message = res.data.successResponse || res.data.errorResponse;
          let messageIcon = res.data.successResponse ? "success" : "warning";
          responseMessage(message, messageIcon);
          setIsLoading(false);
          setTimeout(() => {
            if (res.data.successResponse) {
              proceedToLogin();
            }
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(newUserData);
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#e4ebf1" }} className="mb-4">
        <div
          className="container  pt-md-5 pb-5 mt-5 margin-top"
          style={{ backgroundColor: "#e4ebf1" }}
        >
          <form
            className="bg-light shadow rounded mt-md-4 pt-5 pr-2 pl-2"
            onSubmit={submitLoginForm(submitForm)}
            noValidate
            autoComplete="off"
          >
            <h2 className="mb-2 d-none d-md-block fst-italic font-monospace">
              Register here
            </h2>
            <div className="row mb-4">
              <div className="col-sm-4 ">
                {!errors.first_name ? (
                  <label>first name</label>
                ) : (
                  errors.first_name &&
                  errors.first_name.type === "required" && (
                    <small className="text-danger">
                      first_name is require.
                    </small>
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
                    <small className="text-danger">
                      your state is require.
                    </small>
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
              <div className="col-sm-4 mb-2">
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
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  {...register("role")}
                  type="checkbox"
                  className="custom-control-input formCheckBox"
                  id="role"
                />
                <label className="custom-control-label" htmlFor="role">
                  Register me as Admin
                </label>
              </div>
            </div>
            <div className="text-sm-center">
              <button
                type="submit"
                className="signUpButton rounded col-sm-6 mb-3 pt-0 mt-0"
              >
                <span>
                  {isLoading ? (
                    loadingMessage()
                  ) : (
                    <span className="fs-4">Submit</span>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <footer className="fixed-bottom mt-5 bg-default ">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-light">Copyright &copy;loan_app 2021</div>
            <div>
              <Link to={"/home"} className="text-light">
                Contact : +2348143274300
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Register;
