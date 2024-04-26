import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Header from "../../Compoment/Header/Header";
import Footer from "../../Compoment/Footer/Footer";
import DisImg from "./Assets/trust_banner_2.svg";
import "./SingleProduct.css";
import Addedeimg from "./Assets/NewImagesJoggers-0011.webp";
import Product_add from "./Product_add";
import Gpaypayment from "./Assets/secure-transaction.svg";
import Devlimg from "./Assets/delivery-sec.svg";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import SaleTimeRuning from "./SaleTimeRuning";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [countDown, setCountDown] = useState(''); 

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={productDetails.imageUrl[i]}
            alt={`View ${i + 1}`}
            className="img-fluid"
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleQuantityChange = (newQuantity) => {
    console.log(`Quantity changed to: ${newQuantity}`);
  };

  const [selectedSize, setSelectedSize] = useState(null);
  const [cart, setCart] = useState([]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productRef = doc(firestore, "Clothes", productId);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          const data = { ...productSnapshot.data(), id: productSnapshot.id };
          setProductDetails(data);
          console.log(data,"data");
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (selectedSize) {
      const updatedCart = [...cart, { ...productDetails, selectedSize }];
      setCart(updatedCart);
      setShowCart(true);
      // Save the updated cart to localStorage if needed
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      alert("Please select a size before adding to cart.");
    }
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    // Update localStorage after removing from cart if needed
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (!productDetails) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <Header />
      <div className="container my-5 fontfamily">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-12">
            <div className="slider-container">
              <Slider {...settings}>
                {productDetails.imageUrl.map((imageUrl, index) => (
                  <div key={index} className="single_img">
                    <img
                      src={imageUrl}
                      alt={`View ${index + 1}`}
                      className="img-fluid"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-12">
            <div className="product-details">
              <h2>{productDetails.name}</h2>
              <p>
                Description of the product goes here. You can provide all the
                details about the product, its features, specifications, etc.
              </p>
              <div className="product-price">
                <p>
                  <i className="bi bi-currency-rupee text_color_heading fs-3">
                    {productDetails.price}
                  </i>
                  {"\u00a0"}
                  {"\u00a0"}
                  {"\u00a0"}
                  <del className="text-muted fs-5">
                    {" "}
                    <i className="bi bi-currency-rupee"></i>2045
                  </del>
                  {"\u00a0"}
                  {"\u00a0"}
                  {"\u00a0"}
                  <span class="badge rounded-pill px-3 py-2 text_color_heading_back">
                    Save 10%
                  </span>
                </p>
                <div className="ms-auto">
                  <span class="badge rounded-pill bg-light text-dark card-text py-2 px-3 fs-5">
                    <i class="bi bi-star-fill text-warning"></i> 4.5 | 20
                  </span>
                </div>
                <p className="text-muted font_size_tax mt-4">
                  Tax included. Shipping calculated at checkout
                </p>
                <p className="text-danger font_size_bought">
                  <i class="bi bi-cart-check-fill">{"\u00a0"}</i>455 people
                  bought this in last 7 days
                </p>
                <div className="bg_sales_end">
                  {/* <h1 className="text-center  py-2">Sales End 21 hr</h1> */}
                  <SaleTimeRuning />
                </div>

                <h3 className="fw-bold">Select Size</h3>
                <div className="d-flex my-3">
                  {productDetails && (
                    <>
                      {productDetails.size.includes("S") && (
                        <button
                          type="button"
                          className={`btn btn-outline-primary rounded-pill mx-3 ${
                            selectedSize === "S" ? "active" : ""
                          }`}
                          onClick={() => handleSizeClick("S")}
                        >
                          S
                        </button>
                      )}
                      {productDetails.size.includes("M") && (
                        <button
                          type="button"
                          className={`btn btn-outline-primary rounded-pill mx-3 ${
                            selectedSize === "M" ? "active" : ""
                          }`}
                          onClick={() => handleSizeClick("M")}
                        >
                          M
                        </button>
                      )}
                      {productDetails.size.includes("L") && (
                        <button
                          type="button"
                          className={`btn btn-outline-primary rounded-pill mx-3 ${
                            selectedSize === "L" ? "active" : ""
                          }`}
                          onClick={() => handleSizeClick("L")}
                        >
                          L
                        </button>
                      )}
                      {productDetails.size.includes("XL") && (
                        <button
                          type="button"
                          className={`btn btn-outline-primary rounded-pill mx-3 ${
                            selectedSize === "XL" ? "active" : ""
                          }`}
                          onClick={() => handleSizeClick("XL")}
                        >
                          XL
                        </button>
                      )}
                      {productDetails.size.includes("XS") && (
                        <button
                          type="button"
                          className={`btn btn-outline-primary rounded-pill mx-3 ${
                            selectedSize === "XS" ? "active" : ""
                          }`}
                          onClick={() => handleSizeClick("XS")}
                        >
                          XS
                        </button>
                      )}
                      {productDetails.size.includes("XXL") && (
                        <button
                          type="button"
                          className={`btn btn-outline-primary rounded-pill mx-3 ${
                            selectedSize === "XXL" ? "active" : ""
                          }`}
                          onClick={() => handleSizeClick("XXL")}
                        >
                          XXL
                        </button>
                      )}
                    </>
                  )}
                </div>

                <div className="text-center my-3">
                  {selectedSize ? (
                    <button
                      className="background_color_name px-5 mx-5 py-2 border-0 rounded-pill text-white"
                      onClick={handleAddToCart}
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRightADDCARD"
                      aria-controls="offcanvasRightADDCARD"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <p className="text-danger">Please select size</p>
                  )}
                </div>

                <div className="">
                  <img src={DisImg} alt="" className="img-fluid img_size" />
                </div>
              </div>

              {/* offcanva */}

              {/* this added to cart show */}
              <div
                style={{ zIndex: "" }}
                className={`offcanvas offcanvas-end ${showCart ? "show" : ""}`}
                tabIndex="-1"
                id="offcanvasRightADDCARD"
                aria-labelledby="offcanvasRightLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="fw-bold">Shopping Cart</h5>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body overflow-y-auto">
                {showCart && (
                  <div>
                {cart.map((item ,index) => (
                    <div className="map_function" key={index}>

                  <div className="row">
                    <div className="col">
                      <div className="addecardimg text-center">
                        <img
                          src={item.imageUrl}
                          alt="Addedeimg"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col my-3 mx-3">
                    <div className="">
                      <h6 className="Success_color fw-bold">
                        {item.name}
                      </h6>
                      <i className="bi bi-currency-rupee ">
                        {item.price}
                      </i>
                      {"\u00a0"}
                      {"\u00a0"}
                      {"\u00a0"}
                      <span className="Success_color fw-bold fs-5">OFF</span>
                    </div>
                    <h6 className="fw-bold">
                      <span className="text-secondary">Color {"\u00a0"} :</span>{" "}
                      {productDetails.color}{" "}
                    </h6>
                    <h6 className="fw-bold">
                      <span className="text-secondary">
                        Size {"\u00a0"}
                        {"\u00a0"}
                        {"\u00a0"} :
                      </span>{" "}
                      {item.selectedSize}
                    </h6>
                    <p className="Success_color">
                      Lowest price in last 30 days
                    </p>
                  </div>
                  <div className="col">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted">Quantity:</p>
                        <Product_add onQuantityChange={handleQuantityChange} />
                      </div>
                      <div>
                        <a>
                          <button
                            className="border-0 fw-bold bg-secondary text-white px-3 py-1 rounded-pill  my-5"
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            Remove
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                  </div>

))}
</div>
)}
                  <div className="col">
                    <img
                      src={Gpaypayment}
                      alt="Gpaypayment"
                      className="img-fluid"
                    />
                  </div>

                  <div className="col">
                    <h4 className="fw-bold">Order Summary :</h4>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p>Total MRP</p>
                        <p>Bag Discount</p>
                        <p>Coupon Discount</p>
                        <p>Shipping Charge</p>
                      </div>

                      <div>
                        <p>
                          <i className="bi bi-currency-rupee"></i>
                          {productDetails.price}
                        </p>
                        <p>
                          -<i className="bi bi-currency-rupee"></i>200
                        </p>
                        <p>
                          <i className="bi bi-currency-rupee"></i>0.00
                        </p>
                        <p className="text-success fw-bold">Free</p>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="fw-bold">Total Payable </h5>
                      </div>
                      <div>
                        <h5 className="fw-bold">
                          <i className="bi bi-currency-rupee"></i>
                          {productDetails.price}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col my-4">
                    <img src={Devlimg} alt="Devlimg" className="img-fluid" />
                  </div>
                  {/* Sticky Footer for Shopping Cart */}
                  <div className="sticky-bottom bg-light p-3  shadow-lg rounded-pill w-100">
                    <div className="col my-2">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h4 className="fw-bold">
                            <i className="bi bi-currency-rupee"></i>
                            {productDetails.price}
                          </h4>
                          <p className="bluecolor">Total payable</p>
                        </div>
                        <div className="bg_color_buy_now ">
                          <button className="btn  px-5 rounded-pill">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
