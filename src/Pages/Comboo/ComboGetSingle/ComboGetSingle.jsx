import React, { useState } from "react";
import "./ComboGetSingle.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../Compoment/Header/Header";
import Footer from "../../../Compoment/Footer/Footer";
import AddtocartButton from "../../../Compoment/AddtocartButton";

const ComboGetSingle = () => {
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row my-2">
          <div className="col-lg-8 col-md-12 col-12">
            <div className="d-flex">
              <div className="comboimages">
                <img
                  src="https://tusokonline.com/cdn/shop/files/Slide10_a4e4f5f2-2ec7-4486-b6ee-af7c577c3ec8_576x.jpg?v=1714834044"
                  alt=""
                  className="px-2 mx-1 text-center img-fluid"
                  style={{ width: "50vh" }}
                />
              </div>
              <div className="comboimages">
                <img
                  src="https://tusokonline.com/cdn/shop/files/Slide4_61f3fde9-fe1a-4f21-bdb1-c9e57a88df11_576x.jpg?v=1714834055"
                  alt=""
                  className="px-2 mx-1 text-center img-fluid"
                  style={{ width: "50vh" }}
                />
              </div>
            </div>
            <div className="d-flex my-2">
              <div className="comboimages">
                <img
                  src="https://tusokonline.com/cdn/shop/files/Slide1_2cc55f8c-afa9-4cc8-9a58-44c657b3fd10_576x.jpg?v=1714834067"
                  alt=""
                  className="px-2 mx-1 text-center img-fluid"
                  style={{ width: "50vh" }}
                />
              </div>
              <div className="comboimages">
                <img
                  src="https://tusokonline.com/cdn/shop/files/Slide10_a4e4f5f2-2ec7-4486-b6ee-af7c577c3ec8_576x.jpg?v=1714834044"
                  alt=""
                  className="px-2 mx-1 text-center img-fluid"
                  style={{ width: "50vh" }}
                />
              </div>
            </div>
            <div className="d-flex my-2">
              <div className="comboimages">
                <img
                  src="https://tusokonline.com/cdn/shop/files/Slide10_a4e4f5f2-2ec7-4486-b6ee-af7c577c3ec8_576x.jpg?v=1714834044"
                  alt=""
                  className="px-2 mx-1 text-center img-fluid"
                  style={{ width: "50vh" }}
                />
              </div>
              <div className="comboimages">
                <img
                  src="https://tusokonline.com/cdn/shop/files/Slide3_86a1d5a5-764e-450c-b1a7-f3c26fb943a5_576x.jpg?v=1714834099"
                  alt=""
                  className="px-2 mx-1 text-center img-fluid"
                  style={{ width: "50vh" }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <div>
              <h4 className="fs-2 py-2">
                Green White Tshirt Family Matching Combo
              </h4>
              <div
                className="shadow-lg px-1 py-3 my-2"
                style={{ borderRadius: "20px" }}
              >
                {/* -------------------------------------1-------------------- */}
                <div className="d-flex">
                  <div className="">
                    <img
                      src="https://tusokonline.com/cdn/shop/files/Slide3_b7f694de-2503-4358-8df3-ed8053f02ede_300x.jpg?v=1708941945"
                      alt=""
                      style={{ width: "13vh" }}
                    />
                  </div>
                  <div>
                    <p className="fontsize text-center px-3">
                      Green White Crew Neck Men Tshirt
                    </p>
                    <div className="size-options mx-3">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeClick(size)}
                          className={`btn  ${
                            selectedSize === size ? "btn-primary" : "btn-outline-primary"
                          } mx-1 my-1`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* ----------------------------------2------------------------------ */}
                <div className="d-flex">
                  <div className="">
                    <img
                      src="https://tusokonline.com/cdn/shop/files/Slide3_b7f694de-2503-4358-8df3-ed8053f02ede_300x.jpg?v=1708941945"
                      alt=""
                      style={{ width: "13vh" }}
                    />
                  </div>
                  <div>
                    <p className="fontsize text-center px-3">
                      Green White Crew Neck Men Tshirt
                    </p>
                    <div className="size-options mx-3">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeClick(size)}
                          className={`btn  ${
                            selectedSize === size ? "btn-primary" : "btn-outline-primary"
                          } mx-1 my-1`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* -------------------------------------------------------3------------------------ */}
                <div className="d-flex">
                  <div className="">
                    <img
                      src="https://tusokonline.com/cdn/shop/files/Slide3_b7f694de-2503-4358-8df3-ed8053f02ede_300x.jpg?v=1708941945"
                      alt=""
                      style={{ width: "13vh" }}
                    />
                  </div>
                  <div>
                    <p className="fontsize text-center px-3">
                      Green White Crew Neck Men Tshirt
                    </p>
                    <div className="size-options mx-3">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeClick(size)}
                          className={`btn  ${
                            selectedSize === size ? "btn-primary" : "btn-outline-primary"
                          } mx-1 my-1`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* ---------------------------------6----------------------------------------- */}

                <div className="d-flex">
                  <div className="">
                    <img
                      src="https://tusokonline.com/cdn/shop/files/Slide3_b7f694de-2503-4358-8df3-ed8053f02ede_300x.jpg?v=1708941945"
                      alt=""
                      style={{ width: "13vh" }}
                    />
                  </div>
                  <div>
                    <p className="fontsize text-center px-3">
                      Green White Crew Neck Men Tshirt
                    </p>
                    <div className="size-options mx-3">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeClick(size)}
                          className={`btn  ${
                            selectedSize === size ? "btn-primary" : "btn-outline-primary"
                          } mx-1 my-1`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* -----------------------------------5--------- */}
                <div className="d-flex">
                  <div className="">
                    <img
                      src="https://tusokonline.com/cdn/shop/files/Slide3_b7f694de-2503-4358-8df3-ed8053f02ede_300x.jpg?v=1708941945"
                      alt=""
                      style={{ width: "13vh" }}
                    />
                  </div>
                  <div>
                    <p className="fontsize text-center px-3">
                      Green White Crew Neck Men Tshirt
                    </p>
                    <div className="size-options mx-3">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeClick(size)}
                          className={`btn  ${
                            selectedSize === size ? "btn-primary" : "btn-outline-primary"
                          } mx-1 my-1`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* -----------------------------6------------------ */}
                <div className="d-flex">
                  <div className="">
                    <img
                      src="https://tusokonline.com/cdn/shop/files/Slide3_b7f694de-2503-4358-8df3-ed8053f02ede_300x.jpg?v=1708941945"
                      alt=""
                      style={{ width: "13vh" }}
                    />
                  </div>
                  <div>
                    <p className="fontsize text-center px-3">
                      Green White Crew Neck Men Tshirt
                    </p>
                    <div className="size-options mx-3">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeClick(size)}
                          className={`btn  ${
                            selectedSize === size ? "btn-primary" : "btn-outline-primary"
                          } mx-1 my-1`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <AddtocartButton /> */}
          </div>
        </div>
      </div>


      
      <Footer />
    </>
  );
};

export default ComboGetSingle;
