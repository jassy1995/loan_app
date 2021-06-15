import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  errors: {},
};

const Login = () => {
  let [state, setState] = useState(initialState);
  let [errorMessage, setErrorMessage] = useState(true);

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

  const loadingMessage = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = state;
    const newUserData = {
      email,
      password,
    };
    console.log(newUserData);
    axios
      .post("/login", newUserData)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("userToken", res.data.token.split(" ")[1]);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          console.log(res.data.user);
          console.log(res);
          setErrorMessage(true);
          history.push({
            pathname: "/dashboard",
            state: { user: res.data.user },
          });
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setErrorMessage(false);
  };

  const { email, password } = state;

  return (
    <>
      <div className="container mt-sm-2 mt-md-5  ">
        <div className="row p-2 ">
          <div className=" text-center  col-sm-12 col-md-5 mb-3">
            <img
              src={"./download.jpeg"}
              alt="not exist"
              className="img-fluid rounded  mx-auto block h-100"
            />
          </div>
          <div className=" justify-content-end  col-sm-12 col-md-5">
            <form className="row" noValidate onSubmit={handleSubmit}>
              <div className=" mb-4 col-12">
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
              <Link
                className=" text-warning  text-end mb-2 text-decoration-none "
                to={"#"}
              >
                Forgot password?
              </Link>

              <div className="text-center">
                <button className="btn btn-warning btn-gradient w-75  text-light rounded-pill">
                  <span>
                    {!errorMessage ? (
                      loadingMessage()
                    ) : (
                      <span className="fs-4">Submit</span>
                    )}
                  </span>
                </button>
                <p className="text-warning">
                  Don't have an account?
                  <Link className="text-decoration-none" to={"/register"}>
                    Sign Up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
