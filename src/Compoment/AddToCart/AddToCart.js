import React, { useState, useEffect } from "react";

import Product_add from "../../Pages/SingleProduct/Product_add";

const AddToCart = () => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const handleQuantityChange = (newQuantity) => {
    console.log(`Quantity changed to: ${newQuantity}`);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);

      setCart(parsedCart);
    }
  }, []);

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  return (
    <>
      {cart.map((item) => (
        <div className="map_function" key={item.id}>
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
              <h6 className="Success_color fw-bold">{item.name}</h6>
              <i className="bi bi-currency-rupee ">{item.price}</i>
              {"\u00a0"}
              {"\u00a0"}
              {"\u00a0"}
              <span className="Success_color fw-bold fs-5">OFF</span>
            </div>
            <h6 className="fw-bold">
              <span className="text-secondary">Color {"\u00a0"} :</span>{" "}
              {item.color}{" "}
            </h6>
            <h6 className="fw-bold">
              <span className="text-secondary">
                Size {"\u00a0"}
                {"\u00a0"}
                {"\u00a0"} :
              </span>{" "}
              {item.selectedSize}
            </h6>
            <p className="Success_color">Lowest price in last 30 days</p>
          </div>
          <div className="col">
            <div className="d-flex justify-content-between">
              <div>
                <p className="text-muted">Quantity:</p>
                <Product_add onQuantityChange={handleQuantityChange} />
              </div>
              <div>
                <button
                  className="border-0 fw-bold bg-secondary text-white px-3 py-1 rounded-pill  my-5"
                  onClick={() => handleRemoveFromCart(item.id)} 
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AddToCart;
