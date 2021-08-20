import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

function Home() {
  return (
    <div className="MainDiv">
      <Navbar />

      <main>
        <div
          class="slider-area slider-height"
          data-background="assets/home/img/hero/h1_hero.jpg"
        >
          <div class="slider-active">
            <div class="single-slider">
              <div class="slider-cap-wrapper ">
                <div class="hero__caption">
                  <p data-animation="fadeInLeft" data-delay=".2s">
                    Achieve your financial goal
                  </p>
                  <h1 data-animation="fadeInLeft" data-delay=".5s">
                    Small Business Loans For Daily Expenses.
                  </h1>

                  <Link
                    to={"/"}
                    class="btn hero-btn"
                    data-animation="fadeInLeft"
                    data-delay=".8s"
                  >
                    Apply for Loan
                  </Link>
                </div>
                <div class="hero__img">
                  <img src="assets/home/img/hero/hero_img.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Home;
