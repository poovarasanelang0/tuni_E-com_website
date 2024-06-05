import React, { useState, useEffect, useRef } from "react";import { useParams, Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./SingleProductCombo.css";
import Header from "../../../Compoment/Header/Header"
import Footer from "../../../Compoment/Footer/Footer";
import RatingReviews from "../../Rating/RatingReviews";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const SingleProductCombo = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [productDetailsCombo, setProductDetailsCombo] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const { productId } = useParams();
  const auth = getAuth();
  const firestore = getFirestore();

  const settings = {
    customPaging: function (i) {
      return <a>{/* Custom paging content, if any */}</a>;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setSelectedImageIndex(index),
  };

  const sliderRef = useRef(null);
  const handleSmallImageClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    const fetchProductDetailsCombo = async () => {
      try {
        const comboProductsRef = collection(firestore, "combo_products");
        const comboProductSnapshot = await getDocs(comboProductsRef);
        const product = comboProductSnapshot.docs.find(
          (doc) => doc.id === productId
        );
        if (product.exists()) {
          const data = { ...product.data(), id: product.id };
          setProductDetailsCombo(data);
          console.log("combo-get-single-fetch:", data);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.log("error:combo:", error);
      }
    };
    fetchProductDetailsCombo();
  }, [productId]);

  if (!productDetailsCombo) {
    return <div>Loading...</div>;
  }

  const getSizeOptions = (name) => {
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes("pant") || lowerCaseName.includes("jeans")) {
      return ["28", "30", "32", "34", "36", "38"];
    } else {
      return ["S", "M", "L", "XL", "XXL"];
    }
  };
  

  const handleAddToCombo = () => {
    const currentProduct = productDetailsCombo.combo_details[selectedImageIndex];
    if (selectedSize || currentProduct.name.toLowerCase().includes("accessory")) {
      setSelectedItems((prevItems) => [
        ...prevItems,
        { ...currentProduct, size: selectedSize },
      ]);
      setSelectedSize("");
    }
  };
console.log(selectedItems,"selectedItemsselectedItems");
  const isAddToCartEnabled = () => {
    const requiredSelections = productDetailsCombo.combo_count === "6" ? 4 : 8;
    return selectedItems.length >= requiredSelections;
  };

  const isAddToComboEnabled = () => {
    const requiredSelections = productDetailsCombo.combo_count === "6" ? 4 : 8;
    return selectedItems.length < requiredSelections;
  };

  const currentProduct = productDetailsCombo.combo_details[selectedImageIndex];
  const sizeOptions = getSizeOptions(currentProduct.name);
  const isAccessory = currentProduct.name.toLowerCase().includes("accessory");

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row my-1">
          <h5 className="py-3">Combo Pack</h5>
          <div className="col-lg-8 col-md-12 col-12">
            <div className="small-images-container mt-3">
              {productDetailsCombo.combo_details.map((detail, index) => (
                <div
                  key={index}
                  className={`small-image-box ${selectedItems.some(item => item.id === detail.id) ? 'selected' : ''}`}
                  onClick={() => handleSmallImageClick(index)}
                >
                  <img
                    src={detail.imageturls}
                    className="img-fluid"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="my-1">
              <div className="slider-container_combo1">
                <Slider {...settings} ref={sliderRef}>
                  {productDetailsCombo.combo_details.map((detail, index) => (
                    <div key={index} className="combo_single">
                      <img
                        src={detail.imageturls}
                        alt={`View ${index + 1}`}
                        className="img-fluid img-container"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <div className="mx-2 mt-5 pt-3">
              <div className="">
                <h5 className="fw-bold">{currentProduct.name}</h5>
                <p>{currentProduct.description}</p>
                {!isAccessory && (
                  <div className="size-options">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        className={`btn me-2 mb-2 ${
                          selectedSize === size
                            ? "btn-dark text-light"
                            : "btn-outline-secondary"
                        }`}
                        onClick={() => handleSizeClick(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
                <div className="accessory-select">
                  <button
                    className="btn btn-primary rounded-pill"
                    onClick={handleAddToCombo}
                    disabled={!isAddToComboEnabled()}
                  >
                    Add To Combo
                  </button>
                </div>
                <div className="price-box my-2">
                  <h3>Price:</h3>
                  <p>
                    <i className="bi bi-currency-rupee"></i>
                    {productDetailsCombo.price} (For set of 4 pieces)
                  </p>
                </div>
                <div>
                  <p className="text-muted">
                    Tax included. Shipping calculated at checkout
                  </p>
                  <p className="text-danger font_size_bought">
                    <i className="bi bi-cart-check-fill">{"\u00a0"}</i>455 people
                    bought this in last 7 days
                  </p>
                </div>
                <div className="text-center bg_color_buy_now">
                  <button
                    className="btn px-5 rounded-pill"
                    disabled={!isAddToCartEnabled()}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div>
              <RatingReviews />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProductCombo;
