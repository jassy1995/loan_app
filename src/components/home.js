import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/home.css";
import bgImage from "../assets/img/4.jpg";
import Navbar from "./navbar";

const Home = () => {
  const history = useHistory();
  const applyForLoan = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user !== null && user !== "") history.push("/dashboard");
    else history.push("/");
  };

  let listIcon = (
    <div className="icons">
      <i className="fab fa-facebook-square"></i>
      <i className="fab fa-twitter-square"></i>
      <i className="fab fa-google-plus"></i>
      <i className="fab fa-linkedin"></i>
    </div>
  );
  let listLone = (
    <>
      <h5 className="card-title">$3000-$10000</h5>
      <div className="border-top mt-3 mb-3 "></div>
      <div className="card-text">
        <ul>
          <li className="pt-3 bp-3">Borrow $350 over 3 months</li>
          <li className="pt-3 bp-3">Interest rate-292% pa fixed</li>
          <li className="pt-3 bp-3">Total amount payable-$525</li>
        </ul>
        <button onClick={applyForLoan} className="apply-button">
          Apply Now
        </button>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <section
        id="home"
        className="mt-5"
        style={{
          background: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className="layer">
          <div className="centerall">
            <h1 className="p-3 text-light">Easy Loan</h1>
            <p className="text-monospace" style={{ fontSize: "27px" }}>
              Get Loan for your Business growth or startup
            </p>
            <div className="row">
              <div className="col text-center">
                <button
                  type="button"
                  className="btn btn-danger pl-3 pr-3"
                  style={{ fontSize: "27px" }}
                  onClick={applyForLoan}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="service">
        <h1>What we offer for you</h1>
        <p className="font10 text-muted">
          we provide online instant cash loans with quick approval that suite
          your term.
        </p>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100 pb-3 mx-auto bgColor">
                <div className="card-body">
                  <img
                    src="assets/landing-page/img/home.png"
                    className="card-img-top icon-image text-center mb-3"
                    alt="not exist"
                  />
                  <h4 className="text-center mb-3 text-light">Home Loan</h4>
                  {listLone}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 pb-3 text-center bgColor">
                <div className="card-body">
                  <img
                    src="assets/landing-page/img/car.png"
                    className="card-img-top icon-image mb-3"
                    alt="not exist"
                  />
                  <h4 className="text-center mb-3 text-light">Car Loan</h4>
                  {listLone}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 pb-3 text-center bgColor">
                <div className="card-body">
                  <img
                    src="assets/landing-page/img/education.png"
                    className="card-img-top icon-image mb-3"
                    alt="not exist"
                  />
                  <h4 className="text-center mb-3 text-light">
                    Education Loan
                  </h4>
                  {listLone}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 pb-3 text-center bgColor">
                <div className="card-body">
                  <img
                    src="assets/landing-page/img/personal.png"
                    className="card-img-top icon-image mb-3"
                    alt="not exist"
                  />
                  <h4 className="text-center mb-3 text-light">Business Loan</h4>
                  {listLone}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 pb-3 text-center bgColor">
                <div className="card-body">
                  <img
                    src="assets/landing-page/img/insurance.png"
                    className="card-img-top icon-image mb-3"
                    alt="not exist"
                  />
                  <h4 className="text-center mb-3 text-light">
                    Insurance Loan
                  </h4>
                  {listLone}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 pb-3 text-center bgColor">
                <div className="card-body">
                  <img
                    src="assets/landing-page/img/budget.png"
                    className="card-img-top icon-image mb-3"
                    alt="not exist"
                  />
                  <h4 className="text-center mb-3 text-light">Budget Loan</h4>
                  {listLone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="team">
        <h1>Team</h1>
        {/* <hr /> */}
        <p className="font10">
          Here are the developer that work on this platform.
        </p>
        <div className="container">
          <div className="row pt-4">
            <div className="col-md-4">
              <img
                src="assets/landing-page/img/1.jpg"
                className="img-responsive"
                alt="not exist"
              />
              <div className="content">
                <p>John Smith</p>
                {listIcon}
              </div>
            </div>
            <div className="col-md-4">
              <img
                src="assets/landing-page/img/1.jpg"
                className="img-responsive"
                alt="not exist"
              />
              <div className="content">
                <p>John Smith</p>
                {listIcon}
              </div>
            </div>
            <div className="col-md-4">
              <img
                src="assets/landing-page/img/1.jpg"
                className="img-responsive"
                alt="not exist"
              />
              <div className="content">
                <p>John Smith</p>
                {listIcon}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonial">
        <h1>Testimonial</h1>
        <p className="font10">Below are the comment from our user.</p>
        <div className="container">
          <div className="row pt-4">
            <div className="col-md-6 p-0">
              <img
                src="assets/landing-page/img/2.jpg"
                className="img-responsive"
                alt="not exist"
              />
            </div>
            <div className="col-md-6 p-0">
              <div className="bg-customcolor">
                <h4 className="text-center text-light">Mark Zuckerberg</h4>
                <p className="text-center pl-3 pr-3">
                  What's an awesome platform,easy to use,fast navigation,bud
                  free and quick approval of loan request.Dear friend,you are
                  missing something if you are yet to use this platform.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row pt-4">
            <div className="col-md-6 p-0">
              <img
                src="assets/landing-page/img/7.jpg"
                className="img-responsive"
                alt="not exist"
              />
            </div>
            <div className="col-md-6 p-0">
              <div className="bg-customcolor">
                <h4 className="text-center text-light">Bill Gate</h4>
                <p className="text-center pl-3 pr-3">
                  Hey friends,i have never use this kind of platform before,it
                  is descriptive,loading fast,good network available on it and a
                  most quick response from server whenever i request for loan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h6 className="text-left pt-3 text-light">© Copyrights 2021</h6>
            </div>
            <div className="col-md-4 float-right text-right">
              <h6 className="text-left pt-3 text-light">
                Contact : +1248143274300
              </h6>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Home;
