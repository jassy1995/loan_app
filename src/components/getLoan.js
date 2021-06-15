import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";

const initialState = {
  title: "",
  amount: "",
  loanTenure: "",
};

const GetLoan = () => {
  let [state, setState] = useState(initialState);
  let [userInfo, setUserInfo] = useState({});
  const history = useHistory();

  // const { currentUser } = useContext(StoreContext);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserInfo(user);
      getCurrentNewUserDetail();
    } else {
      history.push("/");
    }
  }, []);

  const successMessage = (product) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your loan has been submitted successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const getCurrentNewUserDetail = () => {
    axios
      .get(`/user/${userInfo._id}`)
      .then((res) => {
        setUserInfo(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, amount, loanTenure } = state;
    const newUserData = {
      title,
      amount,
      loanTenure,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      phone: userInfo.phone,
      address: userInfo.address,
      email: userInfo.email,
      user_id: userInfo._id,
    };

    axios
      .post("/loan", newUserData)
      .then((res) => {
        if (res.data) {
          getCurrentNewUserDetail();
          successMessage();
          console.log(res.data);
          setState({ title: "", amount: "", loanTenure: "" });
        }
      })
      .catch((err) => console.log(err));
  };
  const { title, amount, loanTenure } = state;
  return (
    <div>
      <div className=" text-center  col-sm-12 col-md-5 rounded-3 mb-5 mx-auto">
        <Card className="rounded-top">
          <Card.Header className="text-capitalize bg-warning text-light ">
            {userInfo.first_name} {userInfo.last_name}
          </Card.Header>
          <Card.Body>
            <Card.Title>Account Status</Card.Title>
            <Card.Text>
              Your balance is <b>${userInfo.wallet}</b>.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className=" justify-content-center mx-auto text-center col-sm-12 col-md-7 card p-4">
        <h3 className="mb-3 fst-italic font-monospace">
          Apply for your loan here
        </h3>
        <form className="row" noValidate onSubmit={handleSubmit}>
          <div className=" mb-4 col-12">
            <input
              type="text"
              name="title"
              className="form-control rounded-pill border-warning fs-4"
              placeholder="enter title"
              onChange={handleChange}
              value={title}
            />
          </div>
          <div className=" mb-4 col-12">
            <input
              type="text"
              name="amount"
              className="form-control rounded-pill border-warning fs-4"
              placeholder="enter amount"
              onChange={handleChange}
              value={amount}
            />
          </div>
          <div className=" mb-3 col-12">
            <input
              type="text"
              name="loanTenure"
              className="form-control rounded-pill border-warning fs-4"
              placeholder="enter no of year to refund  "
              onChange={handleChange}
              value={loanTenure}
            />
          </div>

          <div className="text-center">
            <button className="btn btn-warning btn-gradient w-75  text-light rounded-pill">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default GetLoan;
