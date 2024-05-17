import React, { useEffect, useState } from "react";
import "./HalfHandTshirt.css";
import Header from "../../../Compoment/Header/Header";
import Footer from "../../../Compoment/Footer/Footer";
import JoggerImg from "../../JoggerMen/Assets/Homeimg.webp";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";

const HalfHandTshirt = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching products based on selected category
        const plainRef = collection(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "half sleve",
          "Plain"
        );
        const printedRef = collection(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "half sleve",
          "Printed"
        );

        let productsData = [];

        if (selectedCategory === "Plain" || selectedCategory === "all") {
          const plainSnapshot = await getDocs(plainRef);
          const plainProducts = plainSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("plainProducts",plainProducts);
          productsData = [...productsData, ...plainProducts];
        }

        if (selectedCategory === "Printed" || selectedCategory === "all") {
          const printedSnapshot = await getDocs(printedRef);
          const printedProducts = printedSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("printedProducts",printedProducts);
          productsData = [...productsData, ...printedProducts];
        }

        setProducts(productsData);
        console.log(productsData,"productsALLLLL");

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
  const renderProductCards = () => {
    
    const filteredProducts = selectedCategory 
      ? products
      : products.filter(product => product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());
  
    return filteredProducts.map((product) => (
      <div key={product.id} className="col-lg-4 col-md-6 col-12">
        <Link
          to={`/SingleProducts/${product.id}`}
          className="text-decoration-none border-0"
        >
          <div className="card-container card_container1">
            <img src={product.imageUrl} alt={product.name} className="img-fluid" />
            <h2>{product.id}</h2> 
            <h4>{product.name}</h4>
            <p>{product.color}</p>
          </div>
        </Link>
      </div>
    ));



    
  };
  
  
  
  
  // const renderProductCards = () => {
  //   console.log("Selected Category in renderProductCards:", selectedCategory);
  //   // Filter products based on selected category
  //   const filteredProducts = selectedCategory === "all" 
  //     ? products 
  //     : products.filter(product => product.category === selectedCategory);
  
  //   console.log("Filtered Products:", filteredProducts);
    
  //   return filteredProducts.map((product) => (
  //     <div key={product.id} className="col-lg-4 col-md-6 col-12">
  //       <Link
  //         to={`/SingleProducts/${product.id}`}
  //         className="text-decoration-none border-0"
  //       >
  //         <div className="card-container card_container1">
  //           <img src={product.imageUrl} alt="" />
  //           <h2>{product.id}</h2> 
  //           <h4>{product.name}</h4>
  //         </div>
  //       </Link>
  //     </div>
  //   ));
  // };
  
  
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
                  All T-shirts
                </label>
              </div>

              <div className="form-check mx-1">
                <input
                  className="form-check-input"
                  type="radio"
                  id="Plain"
                  value="Plain"
                  checked={selectedCategory === "Plain"}
                  onChange={() => handleRadioChange("Plain")}
                />
                <label className="form-check-label" htmlFor="Plain">
                  Plain T-shirts
                </label>
              </div>

              <div className="form-check mx-1">
                <input
                  className="form-check-input"
                  type="radio"
                  id="Printed"
                  value="Printed"
                  checked={selectedCategory === "Printed"}
                  onChange={() => handleRadioChange("Printed")}
                />
                <label className="form-check-label" htmlFor="Printed">
                  Printed T-shirts
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <h2>Half Hand T-shirts</h2>
              {renderProductCards()}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HalfHandTshirt;





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
import { doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import SaleTimeRuning from "./SaleTimeRuning";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [countDown, setCountDown] = useState("");

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
        // Construct the document reference paths based on the category, subcategory, and product ID
        const menTshirtFullSleevePlainRef = doc(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "full sleve",
          "Plain",
          productId
        );
        const menTshirtFullSleevePrintedRef = doc(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "full sleve",
          "Printed",
          productId
        );
        const menTshirtHalfSleevePlainRef = doc(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "half sleve",
          "Plain",
          productId
        );
        const menTshirtHalfSleevePrintedRef = doc(
          firestore,
          "clothes",
          "Men",
          "Tshirt",
          "half sleve",
          "Printed",
          productId
        );
        const menSirtHalfSleevePlainRef = doc(
          firestore,
          "clothes",
          "Men",
          "Shirt",
          "half sleve",
          "Plain",
          productId
        );
        const menSirtHalfSleevePrintedRef = doc(
          firestore,
          "clothes",
          "Men",
          "Shirt",
          "half sleve",
          "Printed",
          productId
        );
        const menSirtFullSleevePlainRef = doc(
          firestore,
          "clothes",
          "Men",
          "Shirt",
          "full sleve",
          "Plain",
          productId
        );
        const menSirtFullSleevePrintedRef = doc(
          firestore,
          "clothes",
          "Men",
          "Shirt",
          "full sleve",
          "Printed",
          productId
        );
        // Fetch product details for each variation
        const menTshirtFullSleevePlainSnapshot = await getDoc(
          menTshirtFullSleevePlainRef
        );
        const menTshirtFullSleevePrintedSnapshot = await getDoc(
          menTshirtFullSleevePrintedRef
        );
        const menTshirtHalfSleevePlainSnapshot = await getDoc(
          menTshirtHalfSleevePlainRef
        );
        const menTshirtHalfSleevePrintedSnapshot = await getDoc(
          menTshirtHalfSleevePrintedRef
        );
        const menShirtHalfSleevePlainSnapshot = await getDoc(
          menSirtHalfSleevePlainRef
        );
        const menShirtHalfSleevePrintedSnapshot = await getDoc(
          menSirtHalfSleevePrintedRef
        );
        const menShirtFullSleevePlainSnapshot = await getDoc(
          menSirtFullSleevePlainRef
        );
        const menShirtFullSleevePrintedSnapshot = await getDoc(
          menSirtFullSleevePrintedRef
        );

        // Fetch snapshots for other variations as needed

        // Check if any of the snapshots exist and set the product details accordingly
        if (menTshirtFullSleevePlainSnapshot.exists()) {
          const data = {
            ...menTshirtFullSleevePlainSnapshot.data(),
            id: menTshirtFullSleevePlainSnapshot.id,
          };
          setProductDetails(data);
        } else if (menTshirtFullSleevePrintedSnapshot.exists()) {
          const data = {
            ...menTshirtFullSleevePrintedSnapshot.data(),
            id: menTshirtFullSleevePrintedSnapshot.id,
          };
          setProductDetails(data);
        } else if (menTshirtHalfSleevePlainSnapshot.exists()) {
          const data = {
            ...menTshirtHalfSleevePlainSnapshot.data(),
            id: menTshirtHalfSleevePlainSnapshot.id,
          };
          setProductDetails(data);
        } else if (menTshirtHalfSleevePrintedSnapshot.exists()) {
          const data = {
            ...menTshirtHalfSleevePrintedSnapshot.data(),
            id: menTshirtHalfSleevePrintedSnapshot.id,
          };
          setProductDetails(data);
        } else if (menShirtHalfSleevePlainSnapshot.exists()) {
          const data = {
            ...menShirtHalfSleevePlainSnapshot.data(),
            id: menShirtHalfSleevePlainSnapshot.id,
          };
          setProductDetails(data);
        } else if (menShirtFullSleevePrintedSnapshot.exists()) {
          const data = {
            ...menShirtFullSleevePrintedSnapshot.data(),
            id: menShirtFullSleevePrintedSnapshot.id,
          };
          setProductDetails(data);
        } else if (menShirtHalfSleevePrintedSnapshot.exists()) {
          const data = {
            ...menShirtHalfSleevePrintedSnapshot.data(),
            id: menShirtHalfSleevePrintedSnapshot.id,
          };
          setProductDetails(data);
        } else if (menShirtFullSleevePlainSnapshot.exists()) {
          const data = {
            ...menShirtFullSleevePlainSnapshot.data(),
            id: menShirtFullSleevePlainSnapshot.id,
          };
          setProductDetails(data);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const firestore = getFirestore();
      const cartCollectionRef = collection(firestore, "addtocart");

      const newDocRef = await addDoc(cartCollectionRef, {});

      console.log("New document added to 'addtocart' with ID: ", newDocRef.id);

      // Get the subcollection reference for the newly added document
      const subCollectionRef = collection(newDocRef, "products");

      await addDoc(subCollectionRef, productDetails);

      console.log("Product added to the new subcollection successfully!");

      // Fetch and display the updated cart products
      fetchCartProducts();
    } catch (error) {
      console.error("Error adding product to cart: ", error);
    }
  };
  // const fetchCartProducts = async () => {
  //   try {
  //     const firestore = getFirestore();
  //     const cartCollectionRef = collection(firestore, "addtocart");
  
  //     const querySnapshot = await getDocs(cartCollectionRef);
  
  //     // Use Promise.all to wait for all asynchronous operations to complete
  //     const cartProducts = await Promise.all(querySnapshot.docs.map(async (doc) => {
  //       // Get the subcollection reference for each cart document
  //       const subCollectionRef = collection(doc.ref, "products");
  
  //       // Query the subcollection to get the products
  //       const subCollectionSnapshot = await getDocs(subCollectionRef);
  
  //       // Map the subcollection documents to an array of product objects
  //       return subCollectionSnapshot.docs.map((subDoc) => ({
  //         id: subDoc.id,
  //         data: subDoc.data(),
  //       }));
  //     }));
  
  //     // Flatten the array of arrays into a single array of products
  //     const flattenedCartProducts = cartProducts.flat();
  
  //     // Display the cartProducts array or update the UI with the cart products as needed
  //     console.log("Cart Products:", flattenedCartProducts);
  
  //     // Update state with the fetched cart products
  //     setCart(flattenedCartProducts);
  //   } catch (error) {
  //     console.error("Error fetching cart products:", error);
  //   }
  // };
  
  // fetchCartProducts();
// 2ndddddd----------------------------------------
  // const fetchCartProducts = async () => {
  //   try {
  //     const firestore = getFirestore();
  //     const cartCollectionRef = collection(firestore, "addtocart");

  //     const querySnapshot = await getDocs(cartCollectionRef);

  //     const cartProducts = [];

  //     querySnapshot.forEach(async (doc) => {
  //       // Get the subcollection reference for each cart document
  //       const subCollectionRef = collection(doc.ref, "products");

  //       // Query the subcollection to get the products
  //       const subCollectionSnapshot = await getDocs(subCollectionRef);

  //       // Loop through each product in the subcollection and add it to the cartProducts array
  //       subCollectionSnapshot.forEach((subDoc) => {
  //         cartProducts.push({
  //           id: subDoc.id,
  //           data: subDoc.data(),
  //         });
  //       });
  //     });

  //     // Display the cartProducts array or update the UI with the cart products as needed
  //     console.log("Cart Products:", cartProducts);
  //   } catch (error) {
  //     console.error("Error fetching cart products:", error);
  //   }
  // };

  // fetchCartProducts();

  // 3rd -----------------------------------------
  const fetchCartProducts = async () => {
    try {
      const firestore = getFirestore();
      const cartCollectionRef = collection(firestore, "addtocart");
      const querySnapshot = await getDocs(cartCollectionRef);
  
      const promises = [];
      const cartProducts = [];
  
      querySnapshot.forEach((doc) => {
        const subCollectionRef = collection(doc.ref, "products");
        const promise = getDocs(subCollectionRef).then((subCollectionSnapshot) => {
          subCollectionSnapshot.forEach((subDoc) => {
            cartProducts.push({
              id: subDoc.id,
              data: subDoc.data(),
            });
          });
        });
        promises.push(promise);
      });
  
      await Promise.all(promises);
      console.log("Cart Products:", cartProducts);
      // Update the state with cartProducts if needed
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };
  
  fetchCartProducts();
  
  // Fetch product details using useEffect
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productRef = doc(firestore, "products", productId);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const data = { ...productSnapshot.data(), id: productSnapshot.id };
          setProductDetails(data);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);




  

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
            <div className="product-details py-1 my-4">
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
                      {cart.map((item, index) => (
                        <div className="map_function" key={index}>
                          <div className="row">
                            <div className="col">
                              <div className="addecardimg text-center">
                                <img
                                  src={item.data.imageUrl}
                                  alt="Addedeimg"
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                            <div className="col my-3 mx-3">
                              <div className="">
                                <h6 className="Success_color fw-bold">
                                  {item.data.name}
                                </h6>
                                <i className="bi bi-currency-rupee ">
                                  {item.data.price}
                                </i>
                                {"\u00a0"}
                                {"\u00a0"}
                                {"\u00a0"}
                                <span className="Success_color fw-bold fs-5">
                                  OFF
                                </span>
                              </div>
                              <h6 className="fw-bold">
                                <span className="text-secondary">
                                  Color {"\u00a0"} :
                                </span>{" "}
                                {item.data.color}{" "}
                              </h6>
                              <h6 className="fw-bold">
                                <span className="text-secondary">
                                  Size {"\u00a0"}
                                  {"\u00a0"}
                                  {"\u00a0"} :
                                </span>{" "}
                                {/* {item.data.selectedSize} */}
                              </h6>
                              <p className="Success_color">
                                Lowest price in last 30 days
                              </p>
                            </div>
                            <div className="col">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <p className="text-muted">Quantity:</p>
                                  <p>{item.data.quantity}</p>
                                </div>
                                <div>
                                  <button
                                    className="border-0 fw-bold bg-secondary text-white px-3 py-1 rounded-pill my-5"
                                    onClick={() =>
                                      handleRemoveFromCart(item.id)
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
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








// -----------------------------------------------------------------------------------------
import React, { useState } from 'react';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'; // Import your Firestore configuration

import "./SingleProduct.css";

function Product_add({ productId, initialQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity || 1); 

  // Function to update quantity in Firestore
  // const updateQuantityInFirestore = async (newQuantity) => {
  //   try {
  //     const productDocRef = doc(firestore, 'products', productId);
  //     const productDoc = await getDoc(productDocRef);
      
  //     if (productDoc.exists()) {
  //       await updateDoc(productDocRef, { quantity: newQuantity });
  //     } else {
  //       console.error('Product document not found in Firestore.');
  //     }
  //   } catch (error) {
  //     console.error('Error updating quantity in Firestore:', error);
  //   }
  // };

  // // Function to handle decrementing quantity
  // const handleDecrement = async () => {
  //   const newQuantity = Math.max(quantity - 1, 0);
  //   setQuantity(newQuantity);
  //   console.log(newQuantity,"newQuantityDECRM");
  //   await updateQuantityInFirestore(newQuantity);
  // };

  // // Function to handle incrementing quantity
  // const handleIncrement = async () => {
  //   const newQuantity = quantity + 1;
  //   setQuantity(newQuantity);
  //   console.log(newQuantity,"newQuantityINCREAMENT");
  //   await updateQuantityInFirestore(newQuantity);
  // };
  // Function to update quantity and add a new field in Firestore
const updateQuantityAndFieldInFirestore = async (newQuantity, newFieldData) => {
  try {
    const productDocRef = doc(firestore, 'products', productId);
    const productDoc = await getDoc(productDocRef);
    
    if (productDoc.exists()) {
      const dataToUpdate = {
        quantity: newQuantity,
        // Add your new field and its data here
        newField: newFieldData
      };
      await updateDoc(productDocRef, dataToUpdate);
    } else {
      console.error('Product document not found in Firestore.');
    }
  } catch (error) {
    console.error('Error updating quantity and field in Firestore:', error);
  }
};

// Modify handleDecrement and handleIncrement functions to include the new field
const handleDecrement = async () => {
  const newQuantity = Math.max(quantity - 1, 0);
  setQuantity(newQuantity);
  console.log(newQuantity, "newQuantityDECRM");
  await updateQuantityAndFieldInFirestore(newQuantity, 'newFieldValue');
};

const handleIncrement = async () => {
  const newQuantity = quantity + 1;
  setQuantity(newQuantity);
  console.log(newQuantity, "newQuantityINCREAMENT");
  await updateQuantityAndFieldInFirestore(newQuantity, 'newFieldValue');
};


  return (
    <div className="quantity-control">
      <button
        type="button"
        className="quantity-selector__button"
        aria-label="Decrease quantity"
        onClick={handleDecrement}
      >
        -
      </button>
      <input type="text" className="QuantityDisplay" value={quantity} readOnly />
      <button
        type="button"
        className="quantity-selector__button"
        aria-label="Increase quantity"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}

export default Product_add;





import React, { useState, useEffect } from "react";
import "./LoginSignup.css";

const OtpForm = ({ handleGoBack }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeRemaining, setTimeRemaining] = useState(10);

  // Function to handle OTP input
  const handleOtpChange = (index, value) => {
    // Check if value is number and within 0-9 range
    if (!isNaN(value) && value >= 0 && value <= 9) {
      // Update OTP value at specified index
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Move to next input box if available
      if (index < 5 && value !== "") {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Function to handle resend button click
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimeRemaining(10);
  };

  // Effect to update time remaining every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h4 className="text-center fw-bold my-3 py-1">Verify your Number!</h4>
      <p className="text-center text-secondary py-1">
        We have sent verification code to 6379119079{" "}
        <button  onClick={handleGoBack} className="border-0">
          <span className="badge text-bg-warning">Edit</span>
        </button>{" "}
      </p>
      <div className="otp-container text-center">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            className="otp-box"
            value={value}
            onChange={(e) => handleOtpChange(index, parseInt(e.target.value))}
          />
        ))}
      </div>
      <div className="resend my-3 py-3 text-center border_line">
        <button
          className="border-0 "
          onClick={handleResend}
          disabled={timeRemaining > 0}
        >
          <i className="bi bi-stopwatch px-1"></i>
          {timeRemaining > 0 ? `Resend in ${timeRemaining} seconds` : "Resend"}
        </button>
      </div>
      <div className="text-center my-3">
        <button className="my-4 py-1 border-0 custom-border1 px-5">
          Verify <i class="bi bi-arrow-right fs-6 fw-bold"></i>
        </button>
      </div>
    </div>
  );
};

export default OtpForm;









import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import LoginSignupImg from "./assets/small.png";
import fotterimg1 from "./assets/corousal_icon_filled.svg";
import Google from "./assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import OtpForm from "./OtpForm";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { auth, provider, firestore } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import "firebase/auth";
import toast from "react-hot-toast";
import { collection, addDoc, doc } from "firebase/firestore";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => {
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); // Initialize phoneNumber state
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const [value, setValue] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const navigate = useNavigate();



  useEffect(() => {
    const checkAuthStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        alert("Already logged in. Please log out to access this page.");
       
      }
    };
  
    checkAuthStatus();
  }, []);
  


  const isValidIndianPhoneNumber = (phoneNumber) => {
    const indianPhoneNumberRegex = /^\+91[0-9]{10}$/;
    return indianPhoneNumberRegex.test(phoneNumber);
  };

  const handleGoogleSignIn = async () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      navigate("/");
      window.location.reload();
    });
  };

  const handleGoBack = () => {
    if (previousPage === "login") {
      setShowOTPForm(false);
    }
  };
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setPhoneNumberError("");
  };

  const handleSendOTP = async (e, phoneNumber) => {
    e.preventDefault();
    try {
      if (!phoneNumber || !isValidIndianPhoneNumber(phoneNumber)) {
        if (phoneNumber && phoneNumber.length < 10) {
          setPhoneNumberError(
            "Less than 10 numbers. Please enter a correct number."
          );
        } else if (phoneNumber && phoneNumber.length > 10) {
          setPhoneNumberError(
            "More than 10 numbers. Please enter a correct number."
          );
        } else {
          setPhoneNumberError("Please enter a valid Indian phone number.");
        }
        return;
      }

      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container");

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptcha
      );
      setConfirmationResult(confirmation);
      setShowOTPForm(true);
      setPreviousPage("login");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const handleResendOTP = async () => {
    try {
      if (!phoneNumber) {
        toast.error("Please provide a phone number");
        return;
      }

      const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
      });
      setConfirmationResult(null);

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      toast.success("OTP resent successfully!");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Please try again later.");
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      const userCredential = await confirmationResult.confirm(otp);
      console.log("verify login");
      const phoneNumber = userCredential.user.phoneNumber;
      const userId = userCredential.user.uid;

      await addPhoneNumberToFirestore(userId, phoneNumber);

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const addPhoneNumberToFirestore = async (userId, phoneNumber) => {
    try {
      const userDocRef = doc(collection(firestore, "users"), userId);
      const contactInfoDocRef = await addDoc(
        collection(userDocRef, "personal_details"),
        {
          phoneNumber: phoneNumber,
        }
      );

      console.log("Phone number: ", contactInfoDocRef.id);
    } catch (err) {
      console.error("Error adding: ", err);
    }
  };

  // const handleResendOTP = async () => {
  //   try {
  //     // Ensure phoneNumber is provided
  //     if (!phoneNumber) {
  //       setError("Please provide a phone number");
  //       return;
  //     }

  //     let recaptchaVerifier = null;
  //     const recaptchaContainer = document.getElementById("recaptcha-container");
  //     if (recaptchaContainer) {
  //       recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {
  //         size: "invisible",
  //         callback: () => {
  //           // Callback function if needed
  //         },
  //       });
  //     } else {
  //       setError("Recaptcha container not found");
  //       console.log("error111");
  //       return;
  //     }

  //     // Clear any previous verification attempts
  //     setConfirmationResult(null);

  //     // Resend OTP
  //     const confirmation = await signInWithPhoneNumber(
  //       auth,
  //       phoneNumber,
  //       recaptchaVerifier
  //     );
  //     setConfirmationResult(confirmation);
  //     console.log("Resent OTP");
  //   } catch (err) {
  //     console.log(err);
  //     setError(err.message);
  //     console.log("error13333");
  //   }
  // };

  return (
    <>
      <div className="container">
        <div className="row my-1">
          <div className="col-lg-7 col-md-12 col-12">
            <div className="login_image_logo text-center">
              <img src={LoginSignupImg} alt="" className="img-fluid" />
            </div>
            <div className="my-3">
              <p className="text-white fw-bold fs-5 text-center family_font">
                Join the TUNi Family for a delightful shopping experience
              </p>
            </div>
            <div className="row my-5">
              <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
                <div className="shadow_lg d-flex flex-column w-100">
                  <div className="text-center small_image">
                    <img src={fotterimg1} alt="" className="img-fluid my-3" />
                  </div>
                  <div className="py-2 flex-grow-1">
                    <p className="text-center heading_font text-white fw-bold">
                      Premium Quality Clothes
                    </p>
                    <p className="text-center text-white para_font">
                      Quality, comfort, and style – TUNi delivers on all fronts
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
                <div className="shadow_lg d-flex flex-column w-100">
                  <div className="text-center small_image">
                    <img src={fotterimg1} alt="" className="img-fluid my-3" />
                  </div>
                  <div className="py-2 flex-grow-1">
                    <p className="text-center heading_font text-white fw-bold">
                      Great Customer Experience
                    </p>
                    <p className="text-center text-white para_font">
                      For us customer experience comes first -TUNi
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
                <div className="shadow_lg d-flex flex-column w-100">
                  <div className="text-center small_image">
                    <img src={fotterimg1} alt="" className="img-fluid my-3" />
                  </div>
                  <div className="py-2 flex-grow-1">
                    <p className="text-center heading_font text-white fw-bold">
                      Best Team Behind Your Clothes
                    </p>
                    <p className="text-center text-white para_font">
                      We have the best talents to produce clothes you love
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* otp */}
          <div
            className="col-lg-5 col-md-12 col-12"
            style={{ background: "white", borderRadius: "10px" }}
          >
            <div className="my-1">
              {showOTPForm ? (
                <OtpForm
                  handleVerifyOTP={handleVerifyOTP}
                  handleResendOTP={handleResendOTP}
                  phoneNumber={phoneNumber}
                  handleGoBack={handleGoBack}
                />
              ) : (
                <>
                  <h4 className="text-center fw-bold my-3 py-1">
                    Delighted to have you!
                  </h4>
                  <p className="text-center text-secondary py-1">
                    Enter your Email number to Login/Signup.
                  </p>
                  <div className="text-center">
                    <form>
                      <div className="custom-border my-1">
                        <PhoneInput
                          country={"us"}
                          placeholder="Enter phone number"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                        />
                      </div>
                      {phoneNumberError && (
                        <p className="text-danger">{phoneNumberError}</p>
                      )}
                      <div id="recaptcha-container"></div>
                      <div>
                        <button
                          onClick={(e) => handleSendOTP(e, phoneNumber)}
                          className="my-4 py-1 border-0 custom-border1 px-2"
                        >
                          Login with OTP{" "}
                          <i className="bi bi-arrow-right fs-6 fw-bold"></i>
                        </button>
                      </div>
                    </form>
                    <div className="text-center my-2 py-1">
                      <span className="text-muted">─────────</span>{" "}
                      <span className="mx-2">or</span>{" "}
                      <span className="text-muted">─────────</span>
                    </div>
                    <div className="img_google">
                      <button
                        className="px-5 py-2"
                        onClick={handleGoogleSignIn}
                      >
                        <img
                          src={Google}
                          alt="googleee"
                          className="img-fluid px-2"
                        />
                        Google
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="row">
              <div className="col text-center">
                <p className="my-5 text-secondary">
                  By logging in, you're agreeing to our ?{" "}
                  <a href="#" className="text-secondary">
                    Privacy Policy.
                  </a>
                  <a href="#" className="text-secondary">
                    Terms of Service
                  </a>
                </p>
              </div>
            </div>
          </div>
          {/* end otp  */}
        </div>
      </div>
    </>
  );
};

export default Login;


