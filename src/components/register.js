import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialState = {
  first_name: "",
  last_name: "",
  phone: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  let [state, setState] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      history.push("/dashboard");
    }
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      first_name,
      last_name,
      phone,
      address,
      email,
      password,
      confirmPassword,
    } = state;
    const newUserData = {
      first_name,
      last_name,
      phone,
      address,
      email,
      password,
      confirmPassword,
    };
    console.log(newUserData);
    axios
      .post("/register", newUserData)
      .then((res) => {
        if (res.data) {
          setState({
            first_name: "",
            last_name: "",
            phone: "",
            address: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          history.push("/");
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    first_name,
    last_name,
    phone,
    address,
    email,
    password,
    confirmPassword,
  } = state;
  return (
    <>
      <div className="container mt-sm-2 mt-md-5">
        <div className="row p-2 mx-auto text-center">
          <div className=" text-center  col-sm-12 col-md-6 mb-3">
            <img
              src={"./download.jpeg"}
              alt="not exist"
              className="img-fluid rounded  mx-auto block h-100"
            />
          </div>
          <div className=" text-center  col-sm-12 col-md-6">
            <form className="row" noValidate onSubmit={handleSubmit}>
              <div className=" col-md-6 mb-3 ">
                <input
                  type="text"
                  name="first_name"
                  className="form-control rounded-pill border-warning fs-4"
                  placeholder="first name"
                  onChange={handleChange}
                  value={first_name}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="last_name"
                  className="form-control rounded-pill border-warning fs-4"
                  placeholder="last name"
                  onChange={handleChange}
                  value={last_name}
                />
              </div>
              <div className=" mb-3 col-12">
                <input
                  type="text"
                  name="phone"
                  className="form-control rounded-pill border-warning fs-4"
                  placeholder="phone"
                  onChange={handleChange}
                  value={phone}
                />
              </div>
              <div className=" mb-3 col-12">
                <input
                  type="text"
                  name="address"
                  className="form-control rounded-pill border-warning fs-4"
                  placeholder="address"
                  onChange={handleChange}
                  value={address}
                />
              </div>
              <div className=" mb-3 col-12">
                <input
                  type="text"
                  name="email"
                  className="form-control rounded-pill border-warning fs-4"
                  placeholder="email"
                  onChange={handleChange}
                  value={email}
                />
              </div>
              <div className=" mb-3 col-12">
                <input
                  type="text"
                  name="password"
                  className="form-control rounded-pill border-warning fs-4"
                  placeholder="password"
                  onChange={handleChange}
                  value={password}
                />
              </div>
              <div className=" mb-3 col-12">
                <input
                  type="text"
                  name="confirmPassword"
                  className="form-control rounded-pill border-warning fs-4"
                  placeholder="confirm password"
                  onChange={handleChange}
                  value={confirmPassword}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-warning btn-gradient w-75 fs-4 text-light rounded-pill"
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
