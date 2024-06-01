import React from "react";
import "./MensCombo.css";
import Img12 from "../../Home/HomeProduct/Assets/OrderimgCarsoual1.webp";
import Header from "../../../Compoment/Header/Header";
import Footer from "../../../Compoment/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";

const MensCombo = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row my-2 py-2">
          <h4 className="fw-bold py-1">Mens Combos</h4>
          <div className="col-lg-12 col-md-12 col-12">
            <div className="d-flex  smallscreen py-2">
              <div>
                <h6>Select Combo : </h6>
              </div>
              <div className="form-check mx-1">
                <input
                  className="form-check-input fw-bold"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault11"
                  defaultChecked
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="flexRadioDefault11"
                >
                  All{" "}
                </label>
              </div>
              <div className="form-check mx-1 ">
                <input
                  className="form-check-input fw-bold"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault12"
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="flexRadioDefault12"
                >
                  Combo 1{" "}
                </label>
              </div>
              <div className="form-check mx-1 ">
                <input
                  className="form-check-input fw-bold"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault13"
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="flexRadioDefault13"
                >
                  Combo 2{" "}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-6 col-12 my-3">
            <Link to="/SingleProductCombo">
              <div className="card-container card_container">
                <div className="card text-white">
                  <div className="product_images">
                    <img
                      src={Img12}
                      className="card-img fixed-img"
                      alt="Product 1"
                    />
                  </div>
                  <div className="card-img-overlay">
                    <span className="badge bg-success ">BEST SELLER</span>
                  </div>
                  <div className="card-img-overlay d-flex ">
                    <div className="mt-auto">
                      <span class="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                        <i class="bi bi-star-fill text-warning"></i> 4.5 | 20
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-black prices_details">
                  <h5 className="mt-3">Sapphire Luxury Co-ord</h5>
                  <h6 className="fw-bold">
                    <i class="bi bi-currency-rupee"></i>949 &nbsp;
                    <del>
                      <i class="bi bi-currency-rupee"></i>1,877
                    </del>{" "}
                    OFF
                  </h6>
                  <p className="price_msg_success">
                    Lowest price in last 30 days
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-12 my-3">
            <div className="card-container card_container">
              <div className="card text-white">
                <div className="product_images">
                  <img
                    src={Img12}
                    className="card-img fixed-img"
                    alt="Product 1"
                  />
                </div>
                <div className="card-img-overlay">
                  <span className="badge bg-success ">BEST SELLER</span>
                </div>
                <div className="card-img-overlay d-flex ">
                  <div className="mt-auto">
                    <span class="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                      <i class="bi bi-star-fill text-warning"></i> 4.5 | 20
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-black prices_details">
                <h5 className="mt-3">Sapphire Luxury Co-ord</h5>
                <h6 className="fw-bold">
                  <i class="bi bi-currency-rupee"></i>949 &nbsp;
                  <del>
                    <i class="bi bi-currency-rupee"></i>1,877
                  </del>{" "}
                  OFF
                </h6>
                <p className="price_msg_success">
                  Lowest price in last 30 days
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 my-3">
            <div className="card-container card_container">
              <div className="card text-white">
                <div className="product_images">
                  <img
                    src={Img12}
                    className="card-img fixed-img"
                    alt="Product 1"
                  />
                </div>
                <div className="card-img-overlay">
                  <span className="badge bg-success ">BEST SELLER</span>
                </div>
                <div className="card-img-overlay d-flex ">
                  <div className="mt-auto">
                    <span class="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                      <i class="bi bi-star-fill text-warning"></i> 4.5 | 20
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-black prices_details">
                <h5 className="mt-3">Sapphire Luxury Co-ord</h5>
                <h6 className="fw-bold">
                  <i class="bi bi-currency-rupee"></i>949 &nbsp;
                  <del>
                    <i class="bi bi-currency-rupee"></i>1,877
                  </del>{" "}
                  OFF
                </h6>
                <p className="price_msg_success">
                  Lowest price in last 30 days
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 my-3">
            <div className="card-container card_container">
              <div className="card text-white">
                <div className="product_images">
                  <img
                    src={Img12}
                    className="card-img fixed-img"
                    alt="Product 1"
                  />
                </div>
                <div className="card-img-overlay">
                  <span className="badge bg-success ">BEST SELLER</span>
                </div>
                <div className="card-img-overlay d-flex ">
                  <div className="mt-auto">
                    <span class="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                      <i class="bi bi-star-fill text-warning"></i> 4.5 | 20
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-black prices_details">
                <h5 className="mt-3">Sapphire Luxury Co-ord</h5>
                <h6 className="fw-bold">
                  <i class="bi bi-currency-rupee"></i>949 &nbsp;
                  <del>
                    <i class="bi bi-currency-rupee"></i>1,877
                  </del>{" "}
                  OFF
                </h6>
                <p className="price_msg_success">
                  Lowest price in last 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default MensCombo;
