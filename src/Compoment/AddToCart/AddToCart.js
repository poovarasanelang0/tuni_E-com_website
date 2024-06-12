
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import Product_add from "../../Pages/SingleProduct/Product_add";
import Gpaypayment from "../../Pages/SingleProduct/Assets/secure-transaction.svg";
import Devlimg from "../../Pages/SingleProduct/Assets/delivery-sec.svg";
import Payment from "../../Pages/Payment/Payment";
import { firestore, auth } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCart = () => {
  const [userId, setUserId] = useState(null); // State to store user ID
  const [cartProducts, setCartProducts] = useState([]);
  const [productDetailsCombo, setProductDetailsCombo] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchCartProducts(user.uid);
        fetchCartProductsCombos(user.uid);
      } else {
        setUserId(null);
        setCartProducts([]); // Clear cart products
        setProductDetailsCombo([]); // Clear combo products
      }
    });

    // Cleanup function to unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const fetchCartProducts = async (userId) => {
    try {
      const userDocRef = collection(getFirestore(), "users", userId, "cartCollection");
      const querySnapshot = await getDocs(userDocRef);

      const cartProducts = [];
      querySnapshot.forEach((doc) => {
        cartProducts.push({ id: doc.id, data: doc.data() });
      });

      setCartProducts(cartProducts);
      console.log(cartProducts, "cartProducts ADDTOCART");
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  const fetchCartProductsCombos = async (userId) => {
    if (!userId) return;
  
    try {
      const firestore = getFirestore(); 
      const userDocRef = collection(firestore, "users", userId, "cartCollection_Combos");
      const querySnapshot = await getDocs(userDocRef);
  
      const cartProducts = [];
      querySnapshot.forEach((doc) => {
        cartProducts.push({ id: doc.id, data: doc.data() });
      });
  
      setProductDetailsCombo(cartProducts);
      console.log(cartProducts, "addtocartpages +++cartProducts+++combos");
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  const handleQuantityChange = (productId, newQuantity, isCombo = false) => {
    if (isCombo) {
      const updatedCombos = productDetailsCombo.map((comboProduct) => {
        if (comboProduct.id === productId) {
          return {
            ...comboProduct,
            data: { ...comboProduct.data, itemCountcustomer: newQuantity },
          };
        }
        return comboProduct;
      });
      setProductDetailsCombo(updatedCombos);
    } else {
      const updatedCartProducts = cartProducts.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            data: { ...cartProduct.data, itemCountcustomer: newQuantity },
          };
        }
        return cartProduct;
      });
      setCartProducts(updatedCartProducts);
    }

    updateQuantityInFirestore(productId, newQuantity, isCombo);
  };

  const updateQuantityInFirestore = async (productId, newQuantity, isCombo = false) => {
    try {
      const collectionName = isCombo ? "cartCollection_Combos" : "cartCollection";
      const userDocRef = doc(collection(firestore, "users", userId, collectionName), productId);
      await updateDoc(userDocRef, { itemCountcustomer: newQuantity });
      console.log("Item count updated successfully!");
    } catch (error) {
      console.error("Error updating item count:", error);
      // If there's an error, revert the local state back to the previous state
      if (isCombo) {
        fetchCartProductsCombos(userId);
      } else {
        fetchCartProducts(userId);
      }
    }
  };

  const handleRemoveFromCart = (productId, isCombo = false) => {
    if (isCombo) {
      const updatedCombos = productDetailsCombo.filter((comboProduct) => comboProduct.id !== productId);
      setProductDetailsCombo(updatedCombos);
      toast.success("Successfully Cleared Combo Item");
    } else {
      const updatedCartProducts = cartProducts.filter((cartProduct) => cartProduct.id !== productId);
      setCartProducts(updatedCartProducts);
      toast.success("Successfully Cleared Cart Item");
    }
    
    deleteItemFromFirestore(productId, isCombo);
  };

  const deleteItemFromFirestore = async (productId, isCombo = false) => {
    try {
      const collectionName = isCombo ? "cartCollection_Combos" : "cartCollection";
      const userDocRef = doc(collection(firestore, "users", userId, collectionName), productId);
      await deleteDoc(userDocRef);
      console.log("Document successfully deleted from cart!");
    } catch (error) {
      console.error("Error removing product from cart: ", error);
      // If there's an error, revert the local state back to the previous state
      if (isCombo) {
        fetchCartProductsCombos(userId);
      } else {
        fetchCartProducts(userId);
      }
    }
  };

  const calculateTotalPrice = (cartProducts, productDetailsCombo) => {
    let totalPrice = 0;
    cartProducts.forEach((cartProduct) => {
      const price = parseInt(cartProduct.data.price);
      const count = parseInt(cartProduct.data.itemCountcustomer);
      totalPrice += price * count;
    });
    productDetailsCombo.forEach((comboProduct) => {
      const price = parseInt(comboProduct.data.productDetailsCombo.price);
      const count = parseInt(comboProduct.data.itemCountcustomer);
      totalPrice += price * count;
    });
    console.log(totalPrice,"totalPricetotalPrice");

    return totalPrice;
  };

  const totalCartPrice = calculateTotalPrice(cartProducts, productDetailsCombo);

  return (
    <>
      <div className="conta">
        <div>
          {cartProducts.length > 0 || productDetailsCombo.length > 0 ? (
            <>
              {cartProducts.length > 0 && cartProducts.map((cartProduct) => (
                <div className="map_function" key={cartProduct.id}>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <div className="addecardimg text-center">
                        <img
                          src={cartProduct.data.imageUrl}
                          alt="Addedeimg"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="">
                        <h6 className="fw-bold d-flex justify-content-start ">
                          {cartProduct.data.name}
                        </h6>
                        <div className="d-flex ">
                          <i className="bi bi-currency-rupee fw-bold">
                            {cartProduct.data.price}
                          </i>{" "}
                          {"\u00a0"}
                          {"\u00a0"}
                          <span className="Success_color fw-bold fs-5">OFF</span>
                        </div>
                        <h6 className="fw-bold d-flex justify-content-start">
                          <span className="text-secondary">Color :</span>{" "}
                          {cartProduct.data.color}
                        </h6>
                        <h6 className="fw-bold d-flex justify-content-start">
                          <span className="text-secondary">Size :</span>{" "}
                          {cartProduct.data.sizecustomers}
                        </h6>
                        <p className="Success_color fs-6">
                          Lowest price in last 30 days
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div style={{ marginTop: "-16px" }}>
                            <p className="text-muted fs-6">Quantity:</p>
                            <Product_add
                              initialQuantity={cartProduct.data.itemCountcustomer}
                              onQuantityChange={(newQuantity) =>
                                handleQuantityChange(cartProduct.id, newQuantity)
                              }
                            />
                          </div>
                          <div
                            className="font_size"
                            style={{ marginTop: "10px" }}
                          >
                            <button
                              className="btn btn-link border-0 fw-bold px-3 py-1 rounded-pill"
                              onClick={() => handleRemoveFromCart(cartProduct.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))} 
              {productDetailsCombo.length > 0 && productDetailsCombo.map((comboProduct) => (
                <div key={comboProduct.id}>
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={comboProduct.data.productDetailsCombo.tumbnail}
                        alt="C"
                        className="img-fluid py-1"
                        style={{
                          height: "10vh",
                          width: "7vh",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className=" d-flex align-items-center">
                        <p style={{ fontSize: "20px", marginTop: "10px" }}>
                        <i class="bi bi-currency-rupee"></i> {comboProduct.data.productDetailsCombo.price}
                        </p>
                        <span className="mx-2">
                          <Product_add 
                            initialQuantity={comboProduct.data.itemCountcustomer}
                            onQuantityChange={(newQuantity) =>
                              handleQuantityChange(comboProduct.id, newQuantity, true)
                            }
                          />
                        </span>
                       
                        <div className="ms-auto">
                          <button
                            className="btn btn-link border-0 fw-bold rounded-pill"
                            onClick={() => handleRemoveFromCart(comboProduct.id, true)}
                            style={{ marginTop: "-14px", fontSize: "14px" }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="fs-6 text-danger">No items in the cart</p>
          )}
        </div>

        <div className="col">
          <img src={Gpaypayment} alt="Gpaypayment" className="img-fluid" />
        </div>

        <div className="col">
          <h4 className="fw-bold fs-5">Order Summary :</h4>
          <div className="d-flex justify-content-between">
            <div className="fs-6">
              <p>Total MRP</p>
              <p>Bag Discount</p>
              <p>Coupon Discount</p>
              <p>Shipping Charge</p>
            </div>

            <div className="fs-6">
              <p>
                <i className="bi bi-currency-rupee"></i>
                {totalCartPrice}
              </p>
              <p>
                -<i className="bi bi-currency-rupee"></i>100
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
                {totalCartPrice}
              </h5>
            </div>
          </div>
        </div>
        <div className="col my-4">
          <img src={Devlimg} alt="Devlimg" className="img-fluid" />
        </div>

        <div className="sticky-bottom bg-light p-3 w-100">
          <Payment cartProducts={cartProducts} productDetailsCombo={productDetailsCombo} userId={userId} />
        </div>
      </div>
    </>
  );
};

export default AddToCart;

