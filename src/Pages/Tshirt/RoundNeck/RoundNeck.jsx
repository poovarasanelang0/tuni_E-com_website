
import React, { useEffect, useState } from "react";

import "./RoundNeck.css";
import Header from "../../../Compoment/Header/Header";
import Footer from "../../../Compoment/Footer/Footer";
import Tshirt from "../Assets/Collection_Page_Banners_37.webp";

import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";

const RoundNeck = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plainRef = collection(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "round neck",
          "Plain"
        );
        const printedRef = collection(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "round neck",
          "Printed"
        );
        const CheckRef = collection(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "round neck",
          "check"
        );

        let productsData = [];

        if (selectedCategory === "Plain" || selectedCategory === "all") {
          const plainSnapshot = await getDocs(plainRef);
          const plainProducts = plainSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log("plainProducts", plainProducts);
          productsData = [...productsData, ...plainProducts];
        }

        if (selectedCategory === "Printed" || selectedCategory === "all") {
          const printedSnapshot = await getDocs(printedRef);
          const printedProducts = printedSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log("printedProducts", printedProducts);
          productsData = [...productsData, ...printedProducts];
        }
        if (selectedCategory === "check" || selectedCategory === "all") {
          const CheckSnapshot = await getDocs(CheckRef);
          const CheckProducts = CheckSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          productsData = [...productsData, ...CheckProducts];
        }

        setProducts(productsData);
        setLoading(false);

        // console.log(productsData, "productsALLLLL");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleRadioChange = (category) => {
    console.log("Selected Category:", category);
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products
    : products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  const [selectedRadio, setSelectedRadio] = useState("exampleRadios1");

  const handleNextButtonClick = () => {
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
  const renderProductCardsSmallScreen = () => {
    const numberOfSlides = Math.ceil(filteredProducts.length / 10);

    return (
      <>
        {Array.from({ length: numberOfSlides }).map((_, index) => (
          <Slider
            key={index}
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {filteredProducts
              .slice(index * 10, (index + 1) * 10)
              .map((product) => (
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
                        <div className="card-img-overlay">
                          <span className="badge bg-success">BEST SELLER</span>
                        </div>
                        <div className="card-img-overlay d-flex">
                          <div className="mt-auto">
                            <span className="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                              <i className="bi bi-star-fill text-warning"></i>{" "}
                              4.5 | 20
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
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-center text-danger mx-5">
            There are no products available in this category.
          </p>
        )}
      </>
    );
  };

  const renderProductCardsLargeScreen = () => {
    return (
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
                      <span className="badge bg-success">BEST SELLER</span>
                    </div>
                    <div className="card-img-overlay d-flex">
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
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-danger">
              There are no products available in this category.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col my-3">
            <img src={Tshirt} alt="JoggerImg" className="img-fluid" />
          </div>
        </div>
      </div>

      <div className="container my-2">
        <div className="row d-flex align-items-center justify-content-between">
          <div className="col-auto">
            <h5 className="fw-bold">Men's Half Hand</h5>
            <p className="text-secondary px-1">
              {filteredProducts.length} Items
            </p>
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
                <label className="form-check-label mx-1" htmlFor="all">
                  All RoundNeck T-shirt
                </label>
              </div>

              <div className="form-check mx-1" onClick={handleNextButtonClick}>
                <input
                  className="form-check-input"
                  name="flexRadioDefault"
                  type="radio"
                  id="Plain"
                  value="Plain"
                  checked={selectedCategory === "Plain"}
                  onChange={() => handleRadioChange("Plain")}
                />
                <label className="form-check-label" htmlFor="Plain">
                  Plain RoundNeck T-shirt{" "}
                </label>
              </div>
              <div className="form-check mx-1" onClick={handleNextButtonClick}>
                <input
                  className="form-check-input"
                  name="flexRadioDefault"
                  type="radio"
                  id="Printed"
                  value="Printed"
                  checked={selectedCategory === "Printed"}
                  onChange={() => handleRadioChange("Printed")}
                />
                <label className="form-check-label" htmlFor="Printed">
                  Printed RoundNeck T-shirt{" "}
                </label>
              </div>
              <div className="form-check mx-1" onClick={handleNextButtonClick}>
                <input
                  className="form-check-input"
                  name="flexRadioDefault"
                  type="radio"
                  id="check"
                  value="check"
                  checked={selectedCategory === "check"}
                  onChange={() => handleRadioChange("check")}
                />
                <label className="form-check-label" htmlFor="check">
                  Check RoundNeck T-shirt{" "}
                </label>
              </div>
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
            {loading ? (
              <div className="text-center">
                <p>Loading...</p>
              </div>
            ) : (
              <>
                {isSmallScreen()
                  ? renderProductCardsSmallScreen()
                  : renderProductCardsLargeScreen()}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RoundNeck;
