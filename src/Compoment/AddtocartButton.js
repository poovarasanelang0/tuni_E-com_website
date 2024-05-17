import React from "react";

const AddtocartButton = ({ selectedSize, productDetails, onAddToCart }) => {
  const handleAddToCart = () => {
    if (!selectedSize) {
      console.error("Please select a size before adding to cart");
      return;
    }
    onAddToCart();
  };

  return (
    <>
      <div className="text-center my-3">
        <button
          className="background_color_name px-5 mx-5 py-2 border-0 rounded-pill text-white"
          onClick={handleAddToCart}
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRightADDCARD"
          aria-controls="offcanvasRightADDCARD"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default AddtocartButton;
