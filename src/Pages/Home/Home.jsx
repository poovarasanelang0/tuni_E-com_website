import React, { useState, useEffect } from "react";
import "./Home.css";

import Carsoual from "./Carsoual/Carsoual";
import SlickCard1 from "./SlickCard1"; // Import the SlickCard1 component

import Card1 from "./Assets/card1.webp";
import Card2 from "./Assets/card2.webp";
import Card3 from "./Assets/card3.webp";
import Card4 from "./Assets/card4.webp";

import Men1 from "./Assets/men1.webp";
import Men2 from "./Assets/men2.webp";
import Men3 from "./Assets/men3.webp";
import Men4 from "./Assets/men4.avif";
import Men5 from "./Assets/men5.webp";
import Men6 from "./Assets/men6.avif";


import Women1 from "./Assets/women1.avif"
import Women2 from "./Assets/women2.avif"
import Women3 from "./Assets/women3.avif"
import Women4 from "./Assets/women4.avif"
import Women5 from "./Assets/women5.avif"
import Women6 from "./Assets/women6.avif"

import OurStory from "./Assets/BRAND_STORY_2000_x_521_px_5.webp"
import {Link} from "react-router-dom"

import Air from "./Assets/aircraft.gif";
import Flag from "./Assets/flag.jpg";
import Support from "./Assets/24-hours-support.gif";
import Payment from "./Assets/credit-card.gif";

import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);



  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>

      <div className="container-fluid my-5">
        <div className="row my-1">
          <div className="col-lg-12 col-md-12 col-12">
            <Carsoual />
          </div>
        </div>
      </div>
      <div className="container-fluid my-4">
        <div className="row my-2">
          <h3 className="text-center fw-bold colore_text my-1 py-1">
            Most Popular
          </h3>
          <p className="text-center">Check Out Now →</p>

          {isSmallScreen ? null : (
            <div className="col-lg-3 col-md-6 col-12 my-3">
              <img src={Card1} alt="card1" className="img-fluid" data-aos="flip-right" data-aos-duration="2000" />
            </div>
          )}

          {isSmallScreen ? null : (
            <div className="col-lg-3 col-md-6 col-12 my-3">
              <img src={Card2} alt="card2" className="img-fluid"  data-aos="flip-right" data-aos-duration="2000" />
            </div>
          )}

          {isSmallScreen ? null : (
            <div className="col-lg-3 col-md-6 col-12 my-3">
              <img src={Card3} alt="card3" className="img-fluid" data-aos="flip-right" data-aos-duration="2000"  />
            </div>
          )}

          {isSmallScreen ? null : (
            <div className="col-lg-3 col-md-6 col-12 my-3">
              <img src={Card4} alt="card4" className="img-fluid" data-aos="flip-right" data-aos-duration="2000"  />
            </div>
          )}
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            {isSmallScreen ? <SlickCard1 /> : null}
          </div>
        </div>
      </div>

      <div className="container">
        {/* men */}
        <div className="row">
          <h3 className="text-center fw-bold colore_text my-1 py-2">
            Shop For Men
          </h3>

          <div className=" col-lg-2 col-md-6 col-6 my-4">
            <div className="mens_image_row">
            <Link to="/FullHandTshirt" className="text-decoration-none border-0 text-black">  <img src={Men1} alt="Men1" className="img-fluid" data-aos="flip-right" data-aos-duration="1500" />
              <h6 className="text-center py-2 fw-bold">Full Hand T-Shirt</h6></Link>
            </div>
          </div>
          <div className=" col-lg-2 col-md-6 col-6 my-4 ">
            <div className="mens_image_row">
            <Link to="/HalfHandTshirt" className="text-decoration-none border-0 text-black">       <img src={Men2} alt="Men2" className="img-fluid" data-aos="flip-left" data-aos-duration="1500" />
              <h6 className="text-center py-2 fw-bold">Half Hand T-Shirt</h6></Link>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-6 my-4 ">
            <div className="mens_image_row">
              <img src={Men3} alt="Men3" className="img-fluid" data-aos="flip-right" data-aos-duration="1500" />
              <h6 className="text-center py-2 fw-bold">Joggers</h6>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-6 my-4">
            <div className="mens_image_row">
              <img src={Men4} alt="Men4" className="img-fluid" data-aos="flip-up" data-aos-duration="1500" />
              <h6 className="text-center py-2 fw-bold">Co-Ord Sets</h6>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-6 my-4 ">
            <div className="mens_image_row">
              <img src={Men5} alt="Men6" className="img-fluid" data-aos="flip-right" data-aos-duration="1500"/>
              <h6 className="text-center py-2 fw-bold">Hoodies</h6>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-6 my-4 ">
            <div className="mens_image_row">
              <img src={Men6} alt="Men5" className="img-fluid" data-aos="flip-up" data-aos-duration="1500" />
              <h6 className="text-center py-2 fw-bold">Short</h6>
            </div>
          </div>
        </div>

        {/* women */}
        <div className="row my-3">
          <h3 className="text-center fw-bold colore_text my-2 py-1">
            Shop For Women
          </h3>

          <div className=" col-lg-2 col-md-6 col-6 my-4">
            <div className="mens_image_row">
              <img src={Women1} alt="Women1" className="img-fluid" data-aos="flip-left" data-aos-duration="1500"/>
              <h6 className="text-center py-2 fw-bold">Oversized T-Shirts</h6>
            </div>
          </div>
          <div className=" col-lg-2 col-md-6 col-6 my-4 ">
            <div className="mens_image_row">
              <img src={Women2} alt="Women2" className="img-fluid"  data-aos="zoom-in-up" data-aos-duration="1500" />
              <h6 className="text-center py-2 fw-bold">Co-ord Sets</h6>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-6 my-4 ">
            <div className="mens_image_row">
              <img src={Women3} alt="Women3" className="img-fluid" data-aos="flip-right" data-aos-duration="1500" />
              <h6 className="text-center py-2 fw-bold">Joggers</h6>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-6 my-4">
            <div className="mens_image_row">
              <img src={Women4} alt="Women4" className="img-fluid" data-aos="flip-down" data-aos-duration="1500" />
              <h6 className="text-center py-2 fw-bold">T-Shirts</h6>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-6 my-4 ">
            <div className="mens_image_row">
              <img src={Women5} alt="Women5" className="img-fluid"  data-aos="flip-left" data-aos-duration="1500"/>
              <h6 className="text-center py-2 fw-bold">Shorts</h6>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-6 my-4 ">
            <div className="mens_image_row">
              <img src={Women6} alt="Women6" className="img-fluid" data-aos="flip-left" data-aos-duration="1500" />
              <h6 className="text-center py-2 fw-bold">T-Shirts Dresses</h6>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container-fluid py-4">
        <div className="row">
          <div className="col">
            <img src={OurStory} alt="ourstory" className="img-fluid" />
          </div>
        </div>

      </div> */}
 <div className="container">
        <div class="row">
          <h4 className="d-flex justify-content-center text-center mb-3">
            Why Choose Us?
          </h4>
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div
              class="card border-0"
            >
              <div class="card-body  img_size_air">
                <div className="d-flex justify-content-center text-center">
                  <img src={Air} alt="air" data-aos="fade-left"
                    data-aos-duration="1500"></img>
                </div>
                <br />
                <h4 className="fw-bold d-flex justify-content-center text-center">
                  FAST SHIPPING
                </h4>
                <div className="flag_img">
                  <span className=" d-flex justify-content-center text-center">
                    Free and Fast Shipping across India {"\u00a0"}
                    {"\u00a0"}
                    <img src={Flag} alt="flag_img"></img>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card border-0">
              <div class="card-body  img_size_air">
                <div className="d-flex justify-content-center text-center">
                  <img src={Support} alt="air" data-aos="fade-left"
                    data-aos-duration="1500"></img>
                </div>
                <br />
                <h4 className="fw-bold d-flex justify-content-center text-center">
                  SUPPORT 24/7
                </h4>
                <div className="flag_img">
                  <span className=" d-flex justify-content-center text-center">
                    You will speak with one of our courteous representatives
                    within 24 hours..
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div
              class="card border-0"
            >
              <div class="card-body  img_size_air">
                <div className="d-flex justify-content-center text-center">
                  <img src={Payment} alt="air" data-aos="fade-right"
                    data-aos-duration="1500"></img>
                </div>
                <br />
                <h4 className="fw-bold d-flex justify-content-center text-center">
                  SECURE PAYMENT
                </h4>
                <div className="flag_img">
                  <span className=" d-flex justify-content-center text-center">
                    Your safety is our priority. All payments are 100% secure.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <br />
        <br />
      </div>

    </>
  );
};

export default Home;
