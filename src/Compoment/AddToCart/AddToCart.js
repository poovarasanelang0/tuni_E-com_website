import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";

import Product_add from "../../Pages/SingleProduct/Product_add";
import Gpaypayment from "../../Pages/SingleProduct/Assets/secure-transaction.svg";
import Devlimg from "../../Pages/SingleProduct/Assets/delivery-sec.svg";
import Payment from "../../Pages/Payment/Payment";
import { firestore, auth } from "../../firebaseConfig";

const AddToCart = () => {
  const [userId, setUserId] = useState(null); // State to store user ID
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchCartProducts(user.uid);
      } else {
        setUserId(null);
        setCartProducts([]); // Clear cart products
      }
    });

    // Cleanup function to unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const fetchCartProducts = async (userId) => {
    try {
      const userDocRef = collection(
        getFirestore(),
        "users",
        userId,
        "cartCollection"
      );
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

  // useEffect(() => {
  //   fetchCartProducts();
  // }, [userId]);

  // const fetchCartProducts = async () => {
  //   if (!userId) return; // Exit if no user ID
  //   try {
  //     const userDocRef = collection(firestore, "users", userId, "cartCollection");
  //     const querySnapshot = await getDocs(userDocRef);

  //     const cartProducts = [];
  //     querySnapshot.forEach((doc) => {
  //       cartProducts.push({ id: doc.id, data: doc.data() });
  //     });

  //     setCartProducts(cartProducts);
  //     console.log(cartProducts, "cartProducts ADDTOCART");
  //   } catch (error) {
  //     console.error("Error fetching cart products:", error);
  //   }
  // };

  const handleQuantityChange = (productId, newQuantity) => {
    // Update the quantity locally in the state immediately
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

    // Update the quantity in Firestore
    updateQuantityInFirestore(productId, newQuantity);
  };

  const updateQuantityInFirestore = async (productId, newQuantity) => {
    try {
      const userDocRef = doc(
        collection(firestore, "users", userId, "cartCollection"),
        productId
      );
      await updateDoc(userDocRef, { itemCountcustomer: newQuantity });
      console.log("Item count updated successfully!");
    } catch (error) {
      console.error("Error updating item count:", error);
      // If there's an error, revert the local state back to the previous state
      fetchCartProducts();
    }
  };

  // const handleQuantityChange = async (productId, newQuantity) => {
  //   try {
  //     const userDocRef = doc(
  //       collection(firestore, "users", userId, "cartCollection"),
  //       productId
  //     );
  //     await updateDoc(userDocRef, { itemCountcustomer: newQuantity });
  //     console.log("Item count updated successfully!");

  //     // Fetch and update the cart products
  //     fetchCartProducts();
  //   } catch (error) {
  //     console.error("Error updating item count:", error);
  //   }
  // };
  //
  const handleRemoveFromCart = (productId) => {
    const updatedCartProducts = cartProducts.filter(
      (cartProduct) => cartProduct.id !== productId
    );
    setCartProducts(updatedCartProducts);
    deleteItemFromFirestore(productId);
  };

  const deleteItemFromFirestore = async (productId) => {
    try {
      const userDocRef = doc(
        collection(firestore, "users", userId, "cartCollection"),
        productId
      );
      await deleteDoc(userDocRef);
      console.log("Document successfully deleted from cart!");
    } catch (error) {
      console.error("Error removing product from cart: ", error);
      // If there's an error, revert the local state back to the previous state
      fetchCartProducts();
    }
  };

  const calculateTotalPrice = (cartProducts) => {
    let totalPrice = 0;
    cartProducts.forEach((cartProduct) => {
      const price = parseInt(cartProduct.data.price);
      const count = parseInt(cartProduct.data.itemCountcustomer);
      totalPrice += price * count;
    });
    return totalPrice;
  };

  const totalCartPrice = calculateTotalPrice(cartProducts);

  return (
    <>
      <div className="conta">
        <div>
          {cartProducts.length > 0 ? (
            cartProducts &&
            cartProducts.map((cartProduct) => (
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
            ))
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

        <div className="sticky-bottom bg-light p-3   w-100">
          <Payment cartProducts={cartProducts}  userId={userId} />
        </div>
      </div>
    </>
  );
};

export default AddToCart;
