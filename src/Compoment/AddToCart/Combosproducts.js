
// import React from 'react'
// import Payment from '../../Pages/Payment/Payment'
// import Product_add from '../../Pages/SingleProduct/Product_add'

// const Combosproducts = ( cartProducts,
//   handleRemoveFromCart,
//   handleQuantityChange,
//   totalCartPrice,
//   handleRemoveFromCartCombos,
//   productDetailsComboSingle) => {
//   return (
//     <>
//     <div className="conta">
//       <div>

//       {(cartProducts?.length > 0 || productDetailsComboSingle?.length > 0) ? (
//           <>
          
//             {/* {cartProducts.length > 0 &&
//               cartProducts.map((cartProduct) => ( */}
//                     {cartProducts?.length > 0 && cartProducts.map((cartProduct) => (

//                 <div className="map_function" key={cartProduct.id}>
//                   <div className="row align-items-center">
//                     <div className="col-md-4">
//                       <div className="addecardimg text-center">
//                         <img
//                           src={cartProduct.data.imageUrl}
//                           alt="Addedeimg"
//                           className="img-fluid"
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-8">
//                       <div className="">
//                         <h6 className="fw-bold d-flex justify-content-start ">
//                           {cartProduct.data.name}
//                         </h6>
//                         <div className="d-flex ">
//                           <i className="bi bi-currency-rupee fw-bold">
//                             {cartProduct.data.price}
//                           </i>{" "}
//                           {"\u00a0"}
//                           {"\u00a0"}
//                           <span className="Success_color fw-bold fs-5">
//                             OFF
//                           </span>
//                         </div>
//                         <h6 className="fw-bold d-flex justify-content-start">
//                           <span className="text-secondary">Color :</span>{" "}
//                           {cartProduct.data.color}
//                         </h6>
//                         <h6 className="fw-bold d-flex justify-content-start">
//                           <span className="text-secondary">Size :</span>{" "}
//                           {cartProduct.data.sizecustomers}
//                         </h6>
//                         <p className="Success_color fs-6">
//                           Lowest price in last 30 days
//                         </p>
//                         <div className="d-flex justify-content-between align-items-center">
//                           <div style={{ marginTop: "-16px" }}>
//                             <p className="text-muted fs-6">Quantity:</p>
//                             <Product_add
//                               initialQuantity={
//                                 cartProduct.data.itemCountcustomer
//                               }
//                               onQuantityChange={(newQuantity) =>
//                                 handleQuantityChange(
//                                   cartProduct.id,
//                                   newQuantity
//                                 )
//                               }
//                             />
//                           </div>
//                           <div
//                             className="font_size"
//                             style={{ marginTop: "10px" }}
//                           >
//                             <button
//                               className="btn btn-link border-0 fw-bold px-3 py-1 rounded-pill"
//                               onClick={() =>
//                                 handleRemoveFromCart(cartProduct.id)
//                               }
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <hr />
//                 </div>
//               ))}
//       {productDetailsComboSingle?.length > 0 && productDetailsComboSingle.map((comboProduct) => (

//                 <div key={comboProduct.id}>
//                   <div className="row">
//                     <div className="col-md-4">
//                       <img
//                         src={comboProduct.data.productDetailsCombo.tumbnail}
//                         alt="C"
//                         className="img-fluid py-1"
//                         style={{
//                           height: "10vh",
//                           width: "7vh",
//                           borderRadius: "5px",
//                         }}
//                       />
//                     </div>
//                     <div className="col-md-8">
//                       <div className=" d-flex align-items-center">
//                         <p style={{ fontSize: "20px", marginTop: "10px" }}>
//                           {comboProduct.data.productDetailsCombo.price}
//                         </p>
//                         <div className="ms-auto">
//                           <button
//                             className="btn btn-link border-0 fw-bold rounded-pill"
//                             onClick={() =>
//                               handleRemoveFromCartCombos(comboProduct.id)
//                             }
//                             style={{ marginTop: "-14px", fontSize: "14px" }}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </>
//         ) : (
//           <p className="fs-6 text-danger">No items in the cart</p>
//         )}
//       </div>

    
      
      
//       <div className="col">
//         {/* <img src={Gpaypayment} alt="Gpaypayment" className="img-fluid" /> */}
//       </div>

//       <div className="col">
//         <h4 className="fw-bold">Order Summary :</h4>
//         <div className="d-flex justify-content-between">
//           <div>
//             <p>Total MRP</p>
//             <p>Bag Discount</p>
//             <p>Coupon Discount</p>
//             <p>Shipping Charge</p>
//           </div>

//           <div>
//             <p>
//               <i className="bi bi-currency-rupee"></i>
//               {totalCartPrice}
//             </p>
//             <p>
//               -<i className="bi bi-currency-rupee"></i>100
//             </p>
//             <p>
//               <i className="bi bi-currency-rupee"></i>0.00
//             </p>
//             <p className="text-success fw-bold">Free</p>
//           </div>
//         </div>
//         <hr />
//         <div className="d-flex justify-content-between">
//           <div>
//             <h5 className="fw-bold">Total Payable </h5>
//           </div>
//           <div>
//             <h5 className="fw-bold">
//               <i className="bi bi-currency-rupee"></i>
//               {totalCartPrice}
//             </h5>
//           </div>
//         </div>
//       </div>
//       <div className="col my-4">
//         {/* <img src={Devlimg} alt="Devlimg" className="img-fluid" /> */}
//       </div>
//       <div className="sticky-bottom bg-light p-3 w-100">
//         <Payment
//           cartProducts={cartProducts}
//           productDetailsCombo={productDetailsComboSingle}
//         />
//       </div>
      
      
//     </div>
      
//     </>
//   )
// }

// export default Combosproducts
