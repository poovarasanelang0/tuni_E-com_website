import React, { useEffect, useState } from "react";

import "./VNeck.css";
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

const VNeck = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };
  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching products based on selected category
        const plainRef = collection(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "v-neck",
          "Plain"
        );
        const printedRef = collection(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "v-neck",
          "Printed"
        );
        const CheckRef = collection(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "v-neck",
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

  const filteredProducts = products.filter((product) => {
    const isPriceMatch =
      priceRange === "all" ||
      (priceRange === "less500" && product.price < 500) ||
      (priceRange === "500to1000" &&
        product.price >= 500 &&
        product.price <= 1000) ||
      (priceRange === "1000to1500" &&
        product.price >= 1000 &&
        product.price <= 1500) ||
      (priceRange === "1500to2000" &&
        product.price >= 1500 &&
        product.price <= 2000) ||
      (priceRange === "more2000" && product.price > 2000);

    const isColorMatch =
      selectedColors.length === 0 || selectedColors.includes(product.color);

    const isSizeMatch =
      selectedSizes.length === 0 ||
      selectedSizes.some(
        (size) => product.sizes && product.sizes.includes(size)
      );

    return isPriceMatch && isColorMatch && isSizeMatch;
  })
  .sort((a, b) => {
    if (selectedFilter === "lowToHigh") {
      return a.price - b.price;
    } else if (selectedFilter === "highToLow") {
      return b.price - a.price;
    } else {
      return 0; // No sorting
    }
  });
  
  const [selectedRadio, setSelectedRadio] = useState("exampleRadios1");

  const handleNextButtonClick = () => {
    if (selectedRadio === "exampleRadios1") {
      setSelectedRadio("flexRadioDefault2");
    } else if (selectedRadio === "flexRadioDefault2") {
      setSelectedRadio("flexRadioDefault3");
    }
    // Add more conditions if you have more radio buttons
  };


  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#008000" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Brown", hex: "#964B00" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "DarkBlue", hex: "#00008B" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Purple", hex: "##800080" },
    { name: "	Silver", hex: "#C0C0C0" },

    { name: "Maroon", hex: "#800000" },
    { name: "LightBlue", hex: "#ADD8E6" },
    { name: "	Gray", hex: "#808080" },
  ];




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
                      src={product.imageUrl[0]}
                      className="card-img front-img fixed_img"
                      alt={product.name}
                    />
                    <img
                      src={product.imageUrl[1]}
                      className="card-img back-img fixed_img"
                      alt={product.name}
                    />
                  </div>
                  <div className="card-img-overlay">
                    <span className="badge bg-success">BEST SELLER</span>
                  </div>
                  <div className="card-img-overlay d-flex">
                    <div className="mt-auto">
                      <span className="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                      <i className="bi bi-star-fill text-warning"></i> {product.rating} 4.5 | 5.0{product.reviews}
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
         
            <div key={product.id}  className="col-lg-4 col-md-6 col-12">
            <Link
              to={`/SingleProducts/${product.id}`}
              className="text-decoration-none border-0"
            >
              <div className="card-container card_container1">
                <div className="card text-white">
                  <div className="product_images">
                    <img
                      src={product.imageUrl[0]}
                      className="card-img front-img fixed_img"
                      alt={product.name}
                    />
                    <img
                      src={product.imageUrl[1]}
                      className="card-img back-img fixed_img"
                      alt={product.name}
                    />
                  </div>
                  <div className="card-img-overlay">
                    <span className="badge bg-success">BEST SELLER</span>
                  </div>
                  <div className="card-img-overlay d-flex">
                    <div className="mt-auto">
                      <span className="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                        <i className="bi bi-star-fill text-warning"></i> {product.rating} 4.5 | 5.0{product.reviews}
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
      <div className="container-fluid mt-5">
        <div className="row ">
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
              <option value="small">Featured</option>
              {/* <option value="medium" className="py-1">
                New Arrivals
              </option> */}
              <option value="lowToHigh" className="py-1">
                Price Low to High
              </option>
              <option value="highToLow" className="py-1">
                Price High to Low
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
        <div className="col-lg-12 col-md-12 col-12">
          <div className="d-flex justify-content-center flex-wrap">

              <div className="smallscreenRadio">
              <div className="form-check d-inline-block">
                <input
                  className="form-check-input"
                  type="radio"
                  id="all"
                  value="all"
                  checked={selectedCategory === "all"}
                  onChange={() => handleRadioChange("all")}
                />
                <label className="form-check-label mx-1" htmlFor="all">
                  All V-Neck T-shirt
                </label>
              </div>

              <div className="form-check mx-1 d-inline-block" onClick={handleNextButtonClick}>
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
                  Plain V-Neck T-shirt{" "}
                </label>
              </div>
              <div className="form-check mx-1 d-inline-block" onClick={handleNextButtonClick}>
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
                  Printed V-Neck T-shirt{" "}
                </label>
              </div>
              <div className="form-check mx-1 d-inline-block" onClick={handleNextButtonClick}>
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
                Check V-NeckT-shirt{" "}
                </label>
              </div>
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
                <div className="accordion-container">
                  {/* Price Filter */}
                  <div className="accordion-item">
                    <MuiAccordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Price</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                          {[
                            "all",
                            "less500",
                            "500to1000",
                            "1000to1500",
                            "1500to2000",
                            "more2000",
                          ].map((range) => (
                            <div className="form-check mx-5 my-3" key={range}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="priceRange"
                                id={range}
                                value={range}
                                checked={priceRange === range}
                                onChange={handlePriceChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={range}
                              >
                                {range === "all"
                                  ? "All"
                                  : range === "less500"
                                  ? "Less than ₹500"
                                  : range === "500to1000"
                                  ? "₹500 - ₹1000"
                                  : range === "1000to1500"
                                  ? "₹1000 - ₹1500"
                                  : range === "1500to2000"
                                  ? "₹1500 - ₹2000"
                                  : "More than ₹2000"}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionDetails>
                    </MuiAccordion>
                  </div>

                  {/* Color Filter */}
                  <div className="accordion-item">
                    <MuiAccordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Color</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                      <div>
                          {colors.map((color) => (
                            <div
                              className="form-check mx-5 my-3"
                              key={color.name}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={color.name}
                                checked={selectedColors.includes(color.name)}
                                onChange={() => handleColorChange(color.name)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={color.name}
                              >
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: color.hex,
                                    marginRight: "10px",
                                    border: "1px solid #000",
                                    borderRadius: "50%",
                                  }}
                                ></span>
                                {color.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionDetails>
                    </MuiAccordion>
                  </div>

                  {/* Size Filter */}
                  {/* <div className="accordion-item">
          <MuiAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Size</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <div className="form-check mx-5 my-3" key={size}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={size}
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                    />
                    <label className="form-check-label" htmlFor={size}>
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </MuiAccordion>
        </div> */}
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

export default VNeck;
