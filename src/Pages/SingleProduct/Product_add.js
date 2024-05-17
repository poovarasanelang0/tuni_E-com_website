import React, { useState, useEffect } from "react";

const Product_add = ({ initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    // Update the quantity whenever initialQuantity changes
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity); // Pass the updated quantity to onQuantityChange
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity); // Pass the updated quantity to onQuantityChange
    }
  };

  return (
    <div className="product-quantity" style={{ marginTop: "-10px" }}>
      <button className="quantity-selector__button" onClick={handleDecrease}>-</button>
      <span className="px-2 fs-6">{quantity}</span>
      <button className="quantity-selector__button " onClick={handleIncrease}>+</button>
    </div>
  );
};

export default Product_add;
