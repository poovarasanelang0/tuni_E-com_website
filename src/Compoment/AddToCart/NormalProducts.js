import React from 'react';
import Product_add from '../../Pages/SingleProduct/Product_add';

const NormalProducts = ({
  cartProducts,
  handleRemoveFromCart,
  handleQuantityChange,
  totalCartPrice
}) => {
  return (
    <>
      <div>
        {cartProducts.length > 0 ? (
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
    </>
  );
};

export default NormalProducts;
