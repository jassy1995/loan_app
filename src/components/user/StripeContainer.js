import React from "react";
import { usePaystackPayment } from "react-paystack";
import { Link, useHistory } from "react-router-dom";
import { customAxios } from "../../axiosAuth";
import Swal from "sweetalert2";
import { getUser, setUser } from "../../utils/userFunctiom";

const Stripe = () => {
  const history = useHistory();
  const user = getUser();

  let amount = Number(localStorage.getItem("amount"));
  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: amount * 100,
    publicKey: "pk_test_55d926cc2bc8f1ab5aa62bda652a5083d4a102e5",
  };

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

  const fundUserWallet = () => {
    let paymentInfo = { amount: amount };
    customAxios
      .post("user/myWallet", paymentInfo)
      .then((res) => {
        if (res.data.successResponse) {
          responseMessage(res.data.successResponse, "success");
          setUser(res.data.user);
          localStorage.removeItem("amount");
          setTimeout(() => {
            if (user.role === "user") {
              history.push("/dashboard");
            } else {
              history.push("/dashboard/loanRequest");
            }
          }, 2000);
        } else {
          responseMessage(res.data.errorResponse, "warning");
          localStorage.removeItem("amount");
          setTimeout(() => {
            history.push("/dashboard/fundwallet");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSuccess = (reference) => {
    console.log(reference);
    fundUserWallet();
  };

  const onClose = () => {
    if (user.role === "user") {
      history.push("/dashboard");
    } else {
      history.push("/dashboard/loanRequest");
    }

    localStorage.removeItem("amount");
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <main>
      <div className="container-fluid">
        <h1 className="mt-4">Dashboard</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
        <div style={{ backgroundColor: "#e4ebf1" }}>
          <div
            className="container  pt-5 pb-5 mt-5 margin-top"
            style={{ backgroundColor: "#e4ebf1" }}
          >
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => {
                  initializePayment(onSuccess, onClose);
                }}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3 d-block d-lg-none">
          <div className="col-sm-12">
            <Link to={"/dashboard"} className="btn btn-danger w-100">
              Back To Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Stripe;
