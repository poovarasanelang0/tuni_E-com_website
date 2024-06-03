import React, { useEffect, useState } from "react";
import "./MensCombo.css";
import Header from "../../../Compoment/Header/Header";
import Footer from "../../../Compoment/Footer/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";

const MensCombo = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRadioChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const comboProductsRef = collection(firestore, "combo_products");
        const combo1 = await getDocs(comboProductsRef);
        const comboproductsData = combo1.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductDetails(comboproductsData);
        setLoading(false);
      } catch (error) {
        console.log(error, "error_combo_products");
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = productDetails.filter((product) => {
    if (product.category !== "Men") {
      return false;
    }
    if (selectedCategory === "Combo1" && product.combo_count === "6 Iteam") {
      return true;
    }
    if (selectedCategory === "Combo2" && product.combo_count === "12 Iteam") {
      return true;
    }
    if (selectedCategory === "all") {
      return true;
    }
    return false;
  });

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
                    to={`/SingleProductCombo/${product.id}`}
                    className="text-decoration-none border-0"
                  >
                    <div className="card-container card_container1">
                      <div className="card text-white">
                        <div className="product_images">
                          {product.combo_details.map((comboDetail, index) => (
                            <img
                              key={index}
                              src={comboDetail.imageturls}
                              className="card-img fixed_img"
                              alt={comboDetail.name}
                            />
                          ))}
                        </div>
                        <div className="card-img-overlay">
                          <span className="badge bg-success">BEST SELLER</span>
                        </div>
                        <div className="card-img-overlay d-flex">
                          <div className="mt-auto">
                            <span className="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                              <i className="bi bi-star-fill text-warning"></i>{" "}
                              {product.rating} 4.5 | 5.0{product.reviews}
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
            <div key={product.id} className="col-lg-3 col-md-6 col-12">
              <Link
                to={`/SingleProductCombo/${product.id}`}
                className="text-decoration-none border-0"
              >
                <div className="card-container card_container2">
                  <div className="card text-white">
                    <div className="">
                      {product.combo_details.map((comboDetail, index) => (
                        <img
                          key={index}
                          src={comboDetail.imageturls}
                          className="card-img fixed_img"
                          alt={comboDetail.name}
                        />
                      ))}
                    </div>
                    <div className="card-img-overlay">
                      <span className="badge bg-success">BEST SELLER</span>
                    </div>
                    <div className="card-img-overlay d-flex">
                      <div className="mt-auto">
                        <span className="badge rounded-pill bg-light text-dark card-text py-2 px-3">
                          <i className="bi bi-star-fill text-warning"></i>{" "}
                          {product.rating} 4.5 | 5.0{product.reviews}
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
      <div className="container my-5">
        <div className="row my-1 py-1">
          <h4 className="fw-bold py-1">Mens Combos</h4>
          <div className="col-lg-12 col-md-12 col-12">
            <div className="d-flex smallscreen py-2">
              <div>
                <h6>Select Combo : </h6>
              </div>
              <div className="form-check mx-1">
                <input
                  className="form-check-input fw-bold"
                  type="radio"
                  id="all"
                  value="all"
                  checked={selectedCategory === "all"}
                  onChange={() => handleRadioChange("all")}
                />
                <label className="form-check-label fw-bold" htmlFor="all">
                  All{" "}
                </label>
              </div>
              <div className="form-check mx-1 ">
                <input
                  className="form-check-input fw-bold"
                  name="flexRadioDefault"
                  type="radio"
                  id="Combo1"
                  value="Combo1"
                  checked={selectedCategory === "Combo1"}
                  onChange={() => handleRadioChange("Combo1")}
                />
                <label className="form-check-label fw-bold" htmlFor="Combo1">
                  Combo 1{" "}
                </label>
              </div>
              <div className="form-check mx-1 ">
                <input
                  className="form-check-input fw-bold"
                  name="flexRadioDefault"
                  type="radio"
                  id="Combo2"
                  value="Combo2"
                  checked={selectedCategory === "Combo2"}
                  onChange={() => handleRadioChange("Combo2")}
                />
                <label className="form-check-label fw-bold" htmlFor="Combo2">
                  Combo 2{" "}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 my-3">
            <div></div>
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

export default MensCombo;
