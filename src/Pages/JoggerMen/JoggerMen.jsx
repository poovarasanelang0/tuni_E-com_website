import React, { useEffect, useState } from "react";

import "./JoggerMen.css";
import Header from "../../Compoment/Header/Header";
import Footer from "../../Compoment/Footer/Footer";
import JoggerImg from "./Assets/Homeimg.webp";

import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MenProductImg1 from "../Home/HomeProduct/Assets/OrderimgCarsoual1.webp";
import MenProductImg2 from "../Home/HomeProduct/Assets/OrderimgCarsoual2.webp";
import MenProductImg3 from "../Home/HomeProduct/Assets/OrderimgCarsoual3.webp";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'firebase/firestore';
import { firestore } from "../../firebaseConfig"
import { collection, getDocs, query, where } from "firebase/firestore";

const JoggerMen = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // dd



  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRef = collection(
          firestore,
          "clothes",
          "Men",
          "Shirt",
          "full sleve",
          "Plain"
        );
        const snapshot = await getDocs(productRef);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleRadioChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);








  const [selectedRadio, setSelectedRadio] = useState("exampleRadios1");

  const handleNextButtonClick = () => {
    // Assuming 'exampleRadios1' is the ID of the default radio button
    if (selectedRadio === "exampleRadios1") {
      setSelectedRadio("flexRadioDefault2");
    } else if (selectedRadio === "flexRadioDefault2") {
      setSelectedRadio("flexRadioDefault3");
    }
    // Add more conditions if you have more radio buttons
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const isSmallScreen = () => {
    return window.innerWidth < 768;
  };

  // Function to render product cards for small screens
  const renderProductCardsSmallScreen = () => {
    return (
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {filteredProducts.map((product)  => (
          <div key={product.id} className="">
            <Link
              to={`/SingleProducts/${product.id}`}
              className="text-decoration-none border-0"
            >
              <div className="card-container card_container1">
                <div className="card text-white">
                  <div className="product_images">
                    <img
                      src={product.imageUrl}
                      className="card-img fixed_img"
                      alt={product.name}
                    />
                  </div>
                  <div clexampleRadios1assName="card-img-overlay">
                    <span className="badge bg-success ">BEST SELLER</span>
                  </div>
                  <div className="card-img-overlay d-flex ">
                    <div className="mt-auto">
                      <span className="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                        <i className="bi bi-star-fill text-warning"></i> 4.5 |
                        20
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-black prices_details">
                  <h5 className="mt-3">{product.name}</h5>
                  <h4>{product.category}</h4>
                  <h6 className="fw-bold">
                    <i className="bi bi-currency-rupee"></i>
                    {product.price} &nbsp;
                    <del>
                      <i className="bi bi-currency-rupee"></i>1,877
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
        ))}
      </Slider>
    );
  };

  // Function to render product cards for large screens
  const renderProductCardsLargeScreen = () => {
    return (
      <div className="row">
        {filteredProducts.map((product)  => (
          <div key={product.id} className="col-lg-4 col-md-6 col-12">
            <Link
              to={`/SingleProducts/${product.id}`}
              className="text-decoration-none border-0"
            >
              <div className="card-container card_container1">
                <div className="card text-white">
                  <div className="product_images">
                    <img
                      src={product.imageUrl}
                      className="card-img fixed_img"
                      alt={product.name}
                    />
                  </div>
                  <div className="card-img-overlay">
                    <span className="badge bg-success ">BEST SELLER</span>
                  </div>
                  <div className="card-img-overlay d-flex ">
                    <div className="mt-auto">
                      <span className="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                        <i className="bi bi-star-fill text-warning"></i> 4.5 |
                        20
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-black prices_details">
                  <h5 className="mt-3">{product.name}</h5>
                  <h4>{product.category}</h4>
                  <h6 className="fw-bold">
                    <i className="bi bi-currency-rupee"></i>
                    {product.price} &nbsp;
                    <del>
                      <i className="bi bi-currency-rupee"></i>1,877
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
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col my-3">
            <img src={JoggerImg} alt="JoggerImg" className="img-fluid" />
          </div>
        </div>
      </div>

      <div className="container my-2">
        <div className="row d-flex align-items-center justify-content-between">
          <div className="col-auto">
            <h5 className="fw-bold">Men's Joggers</h5>
            <p className="text-secondary px-1">57 Item</p>
          </div>
          <div className="col-auto">
            <select
              className="form-select"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option value="all" className="fw-bold">
                {" "}
                Sort : Featured
              </option>
              <option value="small">Featured</option>
              <option value="medium" className="py-1">
                New Arrivals
              </option>
              <option value="large" className="py-1">
                Best Selling
              </option>
              <option value="small" className="py-1">
                Price Low to High
              </option>
              <option value="medium" className="py-1">
                Price High to Low
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="all"
                  value="all"
                  checked={selectedCategory === "all"}
                  onChange={() => handleRadioChange("all")}
                />
                <label className="form-check-label" htmlFor="all">
                  All T-shirt
                </label>
              </div>

              <div className="form-check mx-1">
                <input
                  className="form-check-input"
                  type="radio"
                  id="plain"
                  value="plain"
                  checked={selectedCategory === "plain"}
                  onChange={() => handleRadioChange("plain")}
                />
                <label className="form-check-label" htmlFor="plain">
Plain T-shirt            </label>
              </div>
              <div className="form-check mx-1" onClick={handleNextButtonClick}>
                <input
                  className="form-check-input"
                  name="flexRadioDefault"
                  type="radio"
                  id="printed"
                  value="printed"
                  checked={selectedCategory === "printed"}
                  onChange={() => handleRadioChange("printed")}
                />
                <label className="form-check-label" htmlFor="printed">
Printed T-shirt                </label>
              </div>

              {/* <button >Next</button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="row">
          <div className="col-lg-4">
            <div className="row d-flex align-items-center justify-content-between">
              <div className="col-auto">
                <h5 className="fw-bold py-2">Filter</h5>
              </div>
              <div className="col-auto">
                <h5
                  className="fw-bold py-2 "
                  style={{ color: "rgb(153,127,38)" }}
                >
                  Clear
                </h5>
              </div>
              <hr />
            </div>

            <div
              className="media_qu"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {/* defaultExpanded */}
              <div className="accordion-container">
                <div className="accordion-item">
                  <MuiAccordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>Price</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className="">
                          <div className="form-check mx-5">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault500"
                              defaultChecked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault500"
                            >
                              Less than ₹500
                            </label>
                          </div>
                          <div className="form-check mx-5 my-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1000"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1000"
                            >
                              ₹500 - ₹1000
                            </label>
                          </div>
                          <div className="form-check mx-5 my-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1500"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1500"
                            >
                              ₹1000 - ₹1500
                            </label>
                          </div>
                          <div className="form-check mx-5 my-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2000"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2000"
                            >
                              ₹1500 - ₹2000
                            </label>
                          </div>
                          <div className="form-check mx-5 my-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2100"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2100"
                            >
                              More than ₹2000
                            </label>
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </MuiAccordion>
                </div>
                {/* 2nd */}
                <div className="accordion-item">
                  <MuiAccordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <Typography>Color</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography></Typography>
                    </AccordionDetails>
                  </MuiAccordion>
                </div>
                {/* 3nd */}
                <div className="accordion-item">
                  <MuiAccordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>Size</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div>
                          <div className="form-check mx-5 my-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckCheckedS"
                              defaultChecked
                            />
                            <label
                              className="form-check-label mx-1"
                              htmlFor="flexCheckCheckedS"
                            >
                              S
                            </label>
                          </div>
                          <div className="form-check mx-5 my-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefaultm"
                            />
                            <label
                              className="form-check-label mx-1"
                              htmlFor="flexCheckDefaultm"
                            >
                              M
                            </label>
                          </div>
                          <div className="form-check mx-5 my-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefaultl"
                            />
                            <label
                              className="form-check-label mx-1 "
                              htmlFor="flexCheckDefaultl"
                            >
                              L
                            </label>
                          </div>
                          <div className="form-check mx-5 my-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefaultxl"
                            />
                            <label
                              className="form-check-label mx-1"
                              htmlFor="flexCheckDefaultxl"
                            >
                              XL
                            </label>
                          </div>
                          <div className="form-check mx-5 my-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefaultxxl"
                            />
                            <label
                              className="form-check-label mx-1"
                              htmlFor="flexCheckDefaultxxl"
                            >
                              XXL
                            </label>
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </MuiAccordion>
                </div>
                {/* 4nd */}
                <div className="accordion-item">
                  <MuiAccordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>Availability</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault1"
                            >
                              In stock
                            </label>
                            <p className="ms-auto mx-4">(9)</p>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault2"
                            >
                              Out of stock
                            </label>
                            <p className="ms-auto mx-4">(1)</p>
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </MuiAccordion>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            {isSmallScreen()
              ? renderProductCardsSmallScreen()
              : renderProductCardsLargeScreen()}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default JoggerMen;
