import React, { useState } from "react";

import MenImg1 from "../Assets/Collectio_Icon_copy.webp";
import MenImg2 from "../Assets/New.webp";
import MenImg3 from "../Assets/7.avif";
import MenImg4 from "../Assets/8.avif";
import MenImg5 from "../Assets/9.avif";
import TshirtHalf from "./Assets/tshirt.gif";
import TshirtHalf1 from "./Assets/tshirt (1).gif";
import TshirtHalf2 from "./Assets/charity.gif";

import Shirt1 from "./Assets/shirt.gif";
import Shirt2 from "./Assets/long-sleeves.gif";

import { Link } from "react-router-dom";

import "../Header.css";

const Men = () => {
  const [activeTab, setActiveTab] = useState("");

  const handleTabHover = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ul
              className="nav nav-pills mb-3 d-flex justify-content-between"
              id="pills-tab"
              role="tablist"
            >
              <li
                className="nav-item"
                role="presentation"
                onMouseEnter={() => handleTabHover("TShirt")}
              >
                <div
                  className={`nav-link active btn-custom bg-transparent text-black ${
                    activeTab === "TShirt" ? "active" : ""
                  }`}
                >
                  <div className="menu_img">
                    <img src={MenImg2} alt="im1" className="img-fluid" />
                  </div>
                  T-Shirt
                </div>
              </li>
              <li
                className="nav-item"
                role="presentation"
                onMouseEnter={() => handleTabHover("Pant")}
              >
                <div
                  className={`nav-link btn-custom bg-transparent text-black ${
                    activeTab === "Pant" ? "active" : ""
                  }`}
                >
                  <div className="menu_img ">
                    <img src={MenImg1} alt="im1" className="img-fluid" />
                  </div>
                  Pant
                </div>
              </li>
              <li
                className="nav-item"
                role="presentation"
                onMouseEnter={() => handleTabHover("Shirt")}
              >
                <div
                  className={`nav-link bg-transparent text-black ${
                    activeTab === "Shirt" ? "active" : ""
                  }`}
                >
                  <div className="menu_img">
                    <img src={MenImg3} alt="im1" className="img-fluid" />
                  </div>
                  Shirt
                </div>
              </li>
              <li
                className="nav-item"
                role="presentation"
                onMouseEnter={() => handleTabHover("Shorts")}
              >
                <div
                  className={`nav-link bg-transparent text-black ${
                    activeTab === "Shorts" ? "active" : ""
                  }`}
                >
                  <div className="menu_img ">
                    <img src={MenImg4} alt="im1" className="img-fluid" />
                  </div>
                  Shorts
                </div>
              </li>
            </ul>
          </div>
{/* ------------------------------------------------------------------------------ */}
          <hr />
          <div className="col-lg-8 col-md-6 col-12">
            <div className="tab-content" id="pills-tabContent">
              <div
                className={`tab-pane fade  navbaratagmen ${
                  activeTab === "TShirt" ? "show active" : ""
                }`}
                id="TShirt"
                role="tabpanel"
                aria-labelledby="pills-HomeLoan-tab"
              >
                <ul className="fs-6 list-unstyled mx-5 img_size_red">
                  <li className="">
                    <Link to="/HalfHandTshirt">
                      <div className="d-flex">
                        <img
                          src={TshirtHalf}
                          alt="TshirtHalf"
                          className="img-fluid mx-2"
                        ></img>{" "}
                        <span>Half Hand T-Shirt</span>
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link to="/FullHandTshirt">
                      <div className="d-flex">
                        <img
                          src={TshirtHalf1}
                          alt="TshirtHalf"
                          className="img-fluid mx-2"
                        ></img>{" "}
                        <span>Full Hand T-Shirt</span>
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link to="/CollarTshirt">
                      <div className="d-flex">
                        <img
                          src={TshirtHalf2}
                          alt="TshirtHalf"
                          className="img-fluid mx-2"
                        ></img>{" "}
                        <span>Collar T-Shirt</span>
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link to="/RoundNeck">
                      <div className="d-flex">
                        <img
                          src={TshirtHalf2}
                          alt="TshirtHalf"
                          className="img-fluid mx-2"
                        ></img>{" "}
                        <span>Round Neck T-Shirt</span>
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link to="/VNeck">
                      <div className="d-flex">
                        <img
                          src={TshirtHalf2}
                          alt="TshirtHalf"
                          className="img-fluid mx-2"
                        ></img>{" "}
                        <span>V-Neck T-Shirt</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "Pant" ? "show active" : ""
                }`}
                id="Pant"
                role="tabpanel"
                aria-labelledby="pills-HomeLoan-tab"
              >
                <ul className="fs-6 list-unstyled mx-5">
                  <li className="my-2">Joggers Pant</li>
                  <li className="my-2">Six Pocket Pant</li>
                </ul>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "Shirt" ? "show active" : ""
                }`}
                id="Shirt"
                role="tabpanel"
                aria-labelledby="pills-PersonalLoan-tab"
              >
                <ul className="fs-6 list-unstyled mx-5 img_size_red">
                <li className="my-2">
                    <Link to="/HalfHandShirt">
                      <div className="d-flex">
                        <img
                          src={Shirt1}
                          alt="TshirtHalf"
                          className="img-fluid mx-2"
                        ></img>{" "}
                        <span>Half Hand Shirt</span>
                      </div>
                    </Link>
                  </li>
                  <li className="my-2">
                    <Link to="/FullHandShirt">
                      <div className="d-flex">
                        <img
                          src={Shirt2}
                          alt="TshirtHalf"
                          className="img-fluid mx-2"
                        ></img>{" "}
                        <span>Full Hand Shirt</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "Shorts" ? "show active" : ""
                }`}
                id="Shorts"
                role="tabpanel"
                aria-labelledby="pills-EducationLoan-tab"
              >
                <ul className="fs-6  mx-5  border-1  list-unstyled">
                  <li className="my-1">Short</li>
                  {/* <li className="my-1">Half Hand</li>
                  <li className="my-1">Collar</li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Men;
