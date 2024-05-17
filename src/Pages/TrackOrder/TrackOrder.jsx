import React, { useState, useEffect } from "react";
import "./TrackOrder.css";
import Header from "../../Compoment/Header/Header";
import Footer from "../../Compoment/Footer/Footer";
import { firestore, auth } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const TrackOrder = () => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [userId, setUserId] = useState(null); // State to store user ID
  const [totalPrice, setTotalPrice] = useState(0); // State to store total price

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchOrderItems(user.uid);
      } else {
        setUserId(null);
        setOrderProducts([]);
        setTotalPrice(0);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let sum = 0;
    orderProducts.forEach((product) => {
      sum += product.data.totalPrice;
    });
    setTotalPrice(sum);
  }, [orderProducts]);

  const fetchOrderItems = async (userId) => {
    try {
      const userDocItem = collection(
        firestore,
        "AllOrderList",
        userId,
        "OrderItemPlaced"
      );
      const userDocSnap = await getDocs(userDocItem);
      const orderProducts = [];
      userDocSnap.forEach((doc) => {
        orderProducts.push({ id: doc.id, data: doc.data() });
      });
      setOrderProducts(orderProducts);
    //   console.log("orderProducts",orderProducts);
    } catch (error) {
      console.error("Error fetching order products:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="h-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center h-100">
            <h5 className="px-1 py-3 fw-bold">Your Tracking Order...</h5>
            <div className="col-lg-4 col-md-12 col-12 my-1">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between pt-2 d-flex">
                    <p className="text-muted mb-0 ">
                      <span className="fw-bold me-4">Total</span>
                    </p>
                    <p className="d-flex justify-content-end text-black">
                      {totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between pt-2">
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Discount</span>
                    </p>
                    <p className="d-flex justify-content-end">20%</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">GST 18%</span>
                    </p>
                    <p className="d-flex justify-content-end">18%</p>
                  </div>
                  <div className="d-flex justify-content-between ">
                    <p className="text-muted mb-0">
                      <span className="fw-bold ">Delivery Charges</span>
                    </p>
                    <p className="d-flex justify-content-end">Free</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between ">
                    <p className="  mb-0" style={{ color: "red" }}>
                      <span className="fw-bold ">Total</span>
                    </p>
                    <p
                      className="d-flex justify-content-end"
                      style={{ color: "green" }}
                    >
                      <i className="bi bi-currency-rupee"></i>
                      {totalPrice.toFixed(2)} {/* Display total price */}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-12 col-12 my-1">
              <div className="card">
                <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">
                    Thanks for your Order,{" "}
                    {orderProducts.map((product) => (
                    <span key={product.id}  className="fw-bold" style={{ color: "#0B1383" }}>
                    {product.data.orderAddress.name}

                    </span>
                     ))}
                    !
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p
                      className="lead fw-normal mb-0"
                      style={{ color: "#0B1383" }}
                    >
                      Receipt
                    </p>
                    <p className="small text-muted mb-0">
                      Receipt Voucher : 1KAU9-84UIL
                    </p>
                  </div>
                  {orderProducts.map((product) => (
                    <div key={product.id} className="shadow-sm border mb-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-2">
                            <img
                              src={product.data.imageUrl[0]}
                              className="img-fluid"
                              alt={product.data.name}
                            />
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              {product.data.name}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              Color: {product.data.color}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              Size: {product.data.sizecustomers}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              Qty: {product.data.itemCountcustomer}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text- mb-0 small">
                              Price: <i className="bi bi-currency-rupee"></i>{" "}
                              {product.data.totalPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* progreass bar */}
              <div
                className="card card-stepper text-black my-3"
                style={{ borderRadius: "16px" }}
              >
                <div className="card-body p-5">
                  <div className="progress-bar-container">
                    <div className="progress my-3">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "25%", background: "#0B138D" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="d-lg-flex align-items-center">
                      <i
                        className="fas fa-clipboard-list me-lg-4 mb-3 mb-lg-0"
                        style={{ fontSize: "2rem" }}
                      ></i>
                      <div>
                        <p className="fw-bold mb-1 fs-6 ">Order</p>
                        <p className="fw-bold mb-0 fs-6">Processed</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <i
                        className="fas fa-box-open me-lg-4 mb-3 mb-lg-0"
                        style={{ fontSize: "2rem" }}
                      ></i>
                      <div>
                        <p className="fw-bold mb-1 fs-6">Order</p>
                        <p className="fw-bold mb-0 fs-6">Shipped</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <i
                        className="fas fa-shipping-fast me-lg-4 mb-3 mb-lg-0"
                        style={{ fontSize: "2rem" }}
                      ></i>
                      <div>
                        <p className="fw-bold mb-1 fs-6">Order</p>
                        <p className="fw-bold mb-0 fs-6">EnRoute</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <i
                        className="fas fa-home me-lg-4 mb-3 mb-lg-0"
                        style={{ fontSize: "2rem" }}
                      ></i>
                      <div>
                        <p className="fw-bold mb-1 fs-6">Order</p>
                        <p className="fw-bold mb-0 fs-6">Arrived</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*  */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TrackOrder;
