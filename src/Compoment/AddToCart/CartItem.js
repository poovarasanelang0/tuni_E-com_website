import React from "react";
import Product_add from "../../Pages/SingleProduct/Product_add";
import Payment from "../../Pages/Payment/Payment";
import Gpaypayment from "../../Pages/SingleProduct/Assets/secure-transaction.svg";
import Devlimg from "../../Pages/SingleProduct/Assets/delivery-sec.svg";
import Combosproducts from "./Combosproducts";

const CartItem = ({
  cartProducts,
  handleRemoveFromCart,
  handleQuantityChange,
  totalCartPrice,
}) => {
  return (
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
                  <div>
                    <h6 className="fw-bold">{cartProduct.data.name}</h6>
                    <div className="d-flex ">
                      <i className="bi bi-currency-rupee fw-bold">
                        {cartProduct.data.price}
                      </i>{" "}
                      {"\u00a0"}
                      {"\u00a0"}
                      <span className="Success_color fw-bold fs-5">OFF</span>
                    </div>
                    <h6 className="fw-bold">
                      <span className="text-secondary">Color :</span>{" "}
                      {cartProduct.data.color}
                    </h6>
                    <h6 className="fw-bold">
                      <span className="text-secondary">Size :</span>{" "}
                      {cartProduct.data.sizecustomers}
                    </h6>
                    <p className="Success_color">
                      Lowest price in last 30 days
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div style={{ marginTop: "-16px" }}>
                        <p className="text-muted">Quantity:</p>
                        <Product_add
                          initialQuantity={cartProduct.data.itemCountcustomer}
                          onQuantityChange={(newQuantity) =>
                            handleQuantityChange(cartProduct.id, newQuantity)
                          }
                        />
                      </div>
                      <div className="font_size" style={{ marginTop: "10px" }}>
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
      {/* Sticky Footer for Shopping Cart */}
      <div className="sticky-bottom bg-light p-3 w-100">
        <Payment cartProducts={cartProducts} />
      </div>
    </div>
  );
};

export default CartItem;
