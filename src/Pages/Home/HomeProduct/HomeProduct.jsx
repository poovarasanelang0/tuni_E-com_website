import React from "react";
import "./HomeProduct.css";
import Slider from "react-slick";

import ProductImg1 from "./Assets/OrderimgCarsoual1.webp";
import ProductImg2 from "./Assets/OrderimgCarsoual2.webp";
import ProductImg3 from "./Assets/OrderimgCarsoual3.webp";
import ProductImg4 from "./Assets/OrderimgCarsoual4.webp";

import ProductImg5 from "./Assets/OrderimgCarsoual5.webp";
import ProductImg6 from "./Assets/OrderimgCarsoual6.webp";
import ProductImg7 from "./Assets/OrderimgCarsoual7.webp";
import ProductImg8 from "./Assets/OrderimgCarsoual8.webp";

import TravelH from "./Assets/TRAVEL_HOODIE_2000_x_521_px.webp";
import CashGif from "./Assets/Mobikwik_Banner_SEP.gif";
import Verfiy from "./Assets/verified.webp";
import {Link} from "react-router-dom"


const HomeProduct = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          centerMode: true, 
          centerPadding: "20px",
        },
      },
    ],
  };

  
  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          <h3 className="text-center heading_color_see">See the latest</h3>
          <p className="text-center">Handpicked for you</p>
          <div className="col my-4">
            <div className="slider-container">
              <Slider {...settings}>
                <div className="card-container card_container">
                  <div className="card text-white">
                    <div className="product_images">
                      <img
                        src={ProductImg1}
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
                {/* 2nd  */}
                <div className="card-container card_container">
                  <div className="card text-white">
                    <div className="product_images">
                      <img
                        src={ProductImg2}
                        className="card-img fixed-img"
                        alt="Product 1"
                      />
                    </div>
                    <div className="card-img-overlay">
                      {/* <span className="badge bg-success ">BEST SELLER</span> */}
                    </div>
                    <div className="card-img-overlay d-flex ">
                      <div className="mt-auto">
                        <span class="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                          <i class="bi bi-star-fill text-warning"></i> 4.0 | 10
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-black prices_details">
                    <h5 className="mt-3">Grey Melange Hermes</h5>
                    <h6 className="fw-bold">
                      <i class="bi bi-currency-rupee"></i>699 &nbsp;
                      <del>
                        <i class="bi bi-currency-rupee"></i>1,279
                      </del>{" "}
                      OFF
                    </h6>
                    <p className="price_msg_success">
                      Lowest price in last 30 days
                    </p>
                  </div>
                </div>
                {/* 3rd */}
                <div className="card-container card_container">
                  <div className="card text-white">
                    <div className="product_images">
                      <img
                        src={ProductImg3}
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
                          <i class="bi bi-star-fill text-warning"></i> 4.7 | 26
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-black prices_details">
                    <h5 className="mt-3">Oversized T-Shirt</h5>
                    <h6 className="fw-bold">
                      <i class="bi bi-currency-rupee"></i>599 &nbsp;
                      <del>
                        <i class="bi bi-currency-rupee"></i>899
                      </del>{" "}
                      OFF
                    </h6>
                    <p className="price_msg_success">
                      Lowest price in last 30 days
                    </p>
                  </div>
                </div>
                {/* 4th */}
                <div className="card-container card_container">
                  <div className="card text-white">
                    <div className="product_images">
                      <img
                        src={ProductImg4}
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
                          {/* <i class="bi bi-star-fill text-warning"></i> 4.5 | 20 */}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-black prices_details">
                    <h5 className="mt-3">Solid Joggers - Women</h5>
                    <h6 className="fw-bold">
                      <i class="bi bi-currency-rupee"></i>699 &nbsp;
                      <del>
                        <i class="bi bi-currency-rupee"></i>1,299
                      </del>{" "}
                      OFF
                    </h6>
                    <p className="price_msg_success">
                      Lowest price in last 30 days
                    </p>
                  </div>
                </div>

                {/* 5th */}

                <div className="card-container card_container">
                  <div className="card text-white">
                    <div className="product_images">
                      <img
                        src={ProductImg5}
                        className="card-img fixed-img"
                        alt="Product 1"
                      />
                    </div>
                    <div className="card-img-overlay">
                      {/* <span className="badge bg-success ">BEST SELLER</span> */}
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
                    <h5 className="mt-3">Rebecca Women's Coord</h5>
                    <h6 className="fw-bold">
                      <i class="bi bi-currency-rupee"></i>849 &nbsp;
                      <del>
                        <i class="bi bi-currency-rupee"></i>1,599
                      </del>{" "}
                      OFF
                    </h6>
                    <p className="price_msg_success">
                      Lowest price in last 30 days
                    </p>
                  </div>
                </div>
                {/* 6nd  */}
                <div className="card-container card_container">
                  <div className="card text-white">
                    <div className="product_images">
                      <img
                        src={ProductImg6}
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
                          <i class="bi bi-star-fill text-warning"></i> 4.7 | 50
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-black prices_details">
                    <h5 className="mt-3">Oversized Cargo Joggers</h5>
                    <h6 className="fw-bold">
                      <i class="bi bi-currency-rupee"></i>999 &nbsp;
                      <del>
                        <i class="bi bi-currency-rupee"></i>1,999
                      </del>{" "}
                      OFF
                    </h6>
                    <p className="price_msg_success">
                      Lowest price in last 30 days
                    </p>
                  </div>
                </div>
                {/* 7rd */}
                <div className="card-container card_container">
                  <div className="card text-white">
                    <div className="product_images">
                      <img
                        src={ProductImg7}
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
                          {/* <i class="bi bi-star-fill text-warning"></i> 4.5 | 20 */}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-black prices_details">
                    <h5 className="mt-3">Hwak Men's Co-ord Sets</h5>
                    <h6 className="fw-bold">
                      <i class="bi bi-currency-rupee"></i>1,499 &nbsp;
                      <del>
                        <i class="bi bi-currency-rupee"></i>2,999
                      </del>{" "}
                      OFF
                    </h6>
                    <p className="price_msg_success">
                      Lowest price in last 30 days
                    </p>
                  </div>
                </div>
                {/* 8th */}
                <div className="card-container card_container">
                  <div className="card text-white">
                    <div className="product_images">
                      <img
                        src={ProductImg8}
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
                          <i class="bi bi-star-fill text-warning"></i> 4.8 | 40
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-black prices_details">
                    <h5 className="mt-3">Discover Oversized T-Shirt</h5>
                    <h6 className="fw-bold">
                      <i class="bi bi-currency-rupee"></i>499 &nbsp;
                      <del>
                        <i class="bi bi-currency-rupee"></i>899
                      </del>{" "}
                      OFF
                    </h6>
                    <p className="price_msg_success">
                      Lowest price in last 30 days
                    </p>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-center my-3">
          <Link to="/FullHandTshirt" className="text-decoration-none border-0 text-black">      <button
              type="button"
              className="btn btn-outline-primary text-center rounded-pill px-5"
            >
              Shop All Products
            </button></Link>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col ">
            <img src={TravelH} alt="TravelH" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="container my-4">
        <div className="row">
          <div className="col">
            <img src={Verfiy} alt="Verfiy" className="img-fluid" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <img src={CashGif} alt="Verfiy" className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeProduct;
