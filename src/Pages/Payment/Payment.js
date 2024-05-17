// import React, { useState, useEffect } from "react";
// import { Form, Button, Collapse } from "react-bootstrap";
// import "./Payment.css";
// import { firestore, app, auth } from "../../firebaseConfig";
// import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
// import { Link, useNavigate } from "react-router-dom";

// const Payment = ({ cartProducts }) => {
//   const [formFields, setFormFields] = useState({
//     name: "",
//     pincode: "",
//     address: "",
//     phoneNumber: "",
//   });
//   const [formFieldsError, setFormFieldsError] = useState({
//     nameError: "",
//     pincodeError: "",
//     addressError: "",
//     phoneNumberError: "",
//   });

//   const [showForm, setShowForm] = useState(false);
//   const navigate = useNavigate();

//   const calculateTotalPrice = (cartProducts) => {
//     let totalPrice = 0;
//     cartProducts.forEach((cartProduct) => {
//       const price = parseInt(cartProduct.data.price);
//       const count = parseInt(cartProduct.data.itemCountcustomer);
//       totalPrice += price * count;
//     });
//     return totalPrice;
//   };

//   const totalCartPrice = calculateTotalPrice(cartProducts);

//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//       console.log(user, "userid");
//     });

//     return unsubscribe;
//   }, []);

//   const handleSubmitForm = async (e) => {
//     e.preventDefault();

//     let errors = {};
//     let hasErrors = false;

//     if (!formFields.name.trim()) {
//       errors.nameError = "Name is required";
//       hasErrors = true;
//     }

//     if (!formFields.pincode.trim()) {
//       errors.pincodeError = "Pincode is required";
//       hasErrors = true;
//     } else if (!/^\d{6}$/.test(formFields.pincode.trim())) {
//       errors.pincodeError = "Invalid pincode";
//       hasErrors = true;
//     }

//     if (!formFields.address.trim()) {
//       errors.addressError = "Address is required";
//       hasErrors = true;
//     }

//     if (!formFields.phoneNumber.trim()) {
//       errors.phoneNumberError = "Phone Number is required";
//       hasErrors = true;
//     } else if (!/^\d{10}$/.test(formFields.phoneNumber.trim())) {
//       errors.phoneNumberError = "Invalid phone number";
//       hasErrors = true;
//     }

//     if (hasErrors) {
//       setFormFieldsError(errors);
//       return;
//     }

//     try {
//       const orderData = {
//         name: formFields.name,
//         pincode: formFields.pincode,
//         address: formFields.address,
//         phoneNumber: formFields.phoneNumber,
//         totalPrice: totalCartPrice,
//         cartProducts: cartProducts.map((product) => ({
//           brand: product.data.brand || "", // Handle undefined values
//           category: product.data.category || "",
//           color: product.data.color || "",
//           gender: product.data.gender || "",
//           id: product.data.id || "",
//           imageUrl: product.data.imageUrl || [],
//           itemCountcustomer: product.data.itemCountcustomer || 0, // Handle undefined values
//           name: product.data.name || "",
//           price: product.data.price || "",
//           sizecustomers: product.data.sizecustomers || "",
//         })),
//       };

//       const userDocRef = doc(collection(firestore, "users"), currentUser.uid);
//       const orderAddressRef = collection(userDocRef, "OrderAddress");
//       const orderDocRef = await addDoc(orderAddressRef, orderData);

//       // Reference to the "AllOrderList" collection
//       const newOrdersRef = doc(firestore, "AllOrderList", currentUser.uid);
//       const newOrdersList=collection(newOrdersRef, "OrderItemPlaced");

//       // Add cart items to the "new orders" collection
//       await Promise.all(
//         cartProducts.map(async (product) => {
//           const newOrderDocRef = await addDoc(newOrdersList, product.data);
//           console.log("Cart item added to new orders: ", newOrdersList.id);
//         })
//       );

//       await Promise.all(
//         cartProducts.map((product) =>
//           deleteItemFromFirestoreCartItem(product.id)
//         )
//       );

//       // const userDocRef = doc(collection(firestore, "users"), currentUser.uid);
//       // const personalDetailsRef = collection(userDocRef, "OrderAddress");

//       // const docRef = await addDoc(personalDetailsRef, {
//       //   ...orderData,
//       // });
//       // console.log("Document written with ID: ", docRef.id);

//       openRazorpay();

//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "name") {
//       if (!/^[A-Za-z\s]+$/.test(value)) {
//         setFormFieldsError((prevErrors) => ({
//           ...prevErrors,
//           nameError: "Name should contain only letters",
//         }));
//       } else {
//         setFormFieldsError((prevErrors) => ({
//           ...prevErrors,
//           nameError: "",
//         }));
//       }
//     }
//     setFormFields((prevFields) => ({
//       ...prevFields,
//       [name]: value,
//     }));
//   };

//   const openRazorpay = () => {
//     if (totalCartPrice) {
//       var options = {
//         key: "rzp_live_W0t2SeLjFxX8SB",
//         key_secret: "TO1w1yoIo0Z5HXmRitcqpEqG",
//         amount: totalCartPrice * 100,
//         currency: "INR",
//         name: "TUNi",
//         timeout: 300,
//         description: "For Testing Purpose",
//         handler: function (response) {
//           // alert(response.razorpay_payment_id);
//           // Payment Successful!
//           cartProducts.forEach((product) => {
//             deleteItemFromFirestoreCartItem(product.id);
//           });
//           navigate("/TrackOrder");
//       window.location.reload();
//         },
//         prefill: {
//           name: formFields.name,
//           email: "",
//           contact: formFields.phoneNumber,
//         },
//         notes: {
//           address: formFields.address,
//         },
//         theme: {
//           color: "#CC7833",
//         },
//       };
//       var pay = new window.Razorpay(options);
//       pay.open();
//     } else {
//       alert("Please add some products to the basket!");
//     }
//   };

//   const deleteItemFromFirestoreCartItem = async (productId) => {
//     try {
//       const userDocRef = doc(
//         collection(firestore, "users", currentUser.uid, "cartCollection"),
//         productId
//       );
//       await deleteDoc(userDocRef);
      
//       console.log("Document successfully deleted from cart!");
//     } catch (error) {
//       console.error("Error removing product from cart: ", error);
//     }
//   };

//   return (
//     <>
//       <div className="col my-2">
//         <div className="d-flex justify-content-between">
//           <div className="fs-6">
//             <h4 className="fw-bold">
//               <i className="bi bi-currency-rupee"></i>
//               {totalCartPrice}
//             </h4>
//             <p className="bluecolor">Total payable</p>
//           </div>
//           <div className="bg_color_buy_now">
//             <button
//               className="btn px-5 rounded-pill"
//               onClick={() => setShowForm(!showForm)}
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//       <Collapse in={showForm}>
//         <div>
//           <Form onSubmit={handleSubmitForm}>
//             <h5 className="fw-bold color_heading">Enter Your Details</h5>
//             <Form.Group className="mb-3" controlId="formName">
//               <Form.Label className="d-flex justify-content-start fs-6">
//                 Name
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your name"
//                 name="name"
//                 value={formFields.name}
//                 onChange={handleChange}
//               />
//               {formFieldsError.nameError && (
//                 <Form.Text className="text-danger">
//                   <div className="font_size_error_message">
//                     {formFieldsError.nameError}
//                   </div>
//                 </Form.Text>
//               )}
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPincode">
//               <Form.Label className="d-flex justify-content-start fs-6">
//                 Pincode
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your pincode"
//                 name="pincode"
//                 value={formFields.pincode}
//                 onChange={handleChange}
//               />
//               {formFieldsError.pincodeError && (
//                 <Form.Text className="text-danger font_size_error_message">
//                   <div className="font_size_error_message">
//                     {" "}
//                     {formFieldsError.pincodeError}{" "}
//                   </div>
//                 </Form.Text>
//               )}
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formAddress">
//               <Form.Label className="d-flex justify-content-start fs-6">
//                 Address
//               </Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter your address"
//                 name="address"
//                 value={formFields.address}
//                 onChange={handleChange}
//               />
//               {formFieldsError.addressError && (
//                 <Form.Text className="text-danger font_size_error_message">
//                   <div className="font_size_error_message">
//                     {formFieldsError.addressError}
//                   </div>
//                 </Form.Text>
//               )}
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPhoneNumber">
//               <Form.Label className="d-flex justify-content-start fs-6">
//                 Phone Number
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your phone number"
//                 name="phoneNumber"
//                 value={formFields.phoneNumber}
//                 onChange={handleChange}
//               />
//               {formFieldsError.phoneNumberError && (
//                 <Form.Text className="text-danger">
//                   <div className="font_size_error_message">
//                     {" "}
//                     {formFieldsError.phoneNumberError}{" "}
//                   </div>
//                 </Form.Text>
//               )}
//             </Form.Group>

//             <Button
//               variant="primary"
//               type="submit"
//               className="px-5 rounded-pill"
//             >
//               Submit and Buy Now
//             </Button>
//           </Form>
//         </div>
//       </Collapse>
//     </>
//   );
// };

// export default Payment;



























import React, { useState, useEffect } from "react";
import { Form, Button, Collapse } from "react-bootstrap";
import "./Payment.css";
import { firestore, auth } from "../../firebaseConfig";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Payment = ({ cartProducts }) => {
  const [formFields, setFormFields] = useState({
    name: "",
    pincode: "",
    address: "",
    phoneNumber: "",
  });
  const [formFieldsError, setFormFieldsError] = useState({
    nameError: "",
    pincodeError: "",
    addressError: "",
    phoneNumberError: "",
  });

  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

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

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user, "userid");
    });

    return unsubscribe;
  }, []);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    let errors = {};
    let hasErrors = false;

    if (!formFields.name.trim()) {
      errors.nameError = "Name is required";
      hasErrors = true;
    }

    if (!formFields.pincode.trim()) {
      errors.pincodeError = "Pincode is required";
      hasErrors = true;
    } else if (!/^\d{6}$/.test(formFields.pincode.trim())) {
      errors.pincodeError = "Invalid pincode";
      hasErrors = true;
    }

    if (!formFields.address.trim()) {
      errors.addressError = "Address is required";
      hasErrors = true;
    }

    if (!formFields.phoneNumber.trim()) {
      errors.phoneNumberError = "Phone Number is required";
      hasErrors = true;
    } else if (!/^\d{10}$/.test(formFields.phoneNumber.trim())) {
      errors.phoneNumberError = "Invalid phone number";
      hasErrors = true;
    }

    if (hasErrors) {
      setFormFieldsError(errors);
      return;
    }

    try {
      const orderData = {
        name: formFields.name,
        pincode: formFields.pincode,
        address: formFields.address,
        phoneNumber: formFields.phoneNumber,
        totalPrice: totalCartPrice,
        cartProducts: cartProducts.map((product) => ({
          brand: product.data.brand || "", // Handle undefined values
          category: product.data.category || "",
          color: product.data.color || "",
          gender: product.data.gender || "",
          id: product.data.id || "",
          imageUrl: product.data.imageUrl || [],
          itemCountcustomer: product.data.itemCountcustomer || 0, 
          name: product.data.name || "",
          price: product.data.price || "",
          sizecustomers: product.data.sizecustomers || "",
        })),
      };

      const userDocRef = doc(collection(firestore, "users"), currentUser.uid);
      const orderAddressRef = collection(userDocRef, "OrderAddress");
      await addDoc(orderAddressRef, orderData);

      openRazorpay(orderData);

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        setFormFieldsError((prevErrors) => ({
          ...prevErrors,
          nameError: "Name should contain only letters",
        }));
      } else {
        setFormFieldsError((prevErrors) => ({
          ...prevErrors,
          nameError: "",
        }));
      }
    }
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const openRazorpay = (orderData) => {
    if (totalCartPrice) {
      var options = {
        key: "rzp_live_W0t2SeLjFxX8SB",
        key_secret: "TO1w1yoIo0Z5HXmRitcqpEqG",
        amount: totalCartPrice * 100,
        currency: "INR",
        name: "TUNi",
        timeout: 300,
        description: "For Testing Purpose",
        handler: async function (response) {
          // Payment Successful!
          try {
            const newOrdersRef = doc(firestore, "AllOrderList", currentUser.uid);
            const newOrdersList = collection(newOrdersRef, "OrderItemPlaced");

            // Add cart items to the "new orders" collection
            await Promise.all(
              cartProducts.map(async (product) => {
                await addDoc(newOrdersList, {
                  ...product.data,
                  totalPrice: totalCartPrice,
                  orderAddress:formFields

                });            
                })
            );

            // Delete items from Firestore cart collection
            await Promise.all(
              cartProducts.map((product) =>
                deleteItemFromFirestoreCartItem(product.id)
              )
            );

            navigate("/TrackOrder");
            window.location.reload();
          } catch (error) {
            console.error("Error processing order after payment: ", error);
          }
        },
        prefill: {
          name: formFields.name,
          email: "",
          contact: formFields.phoneNumber,
        },
        notes: {
          address: formFields.address,
        },
        theme: {
          color: "#CC7833",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    } else {
      alert("Please add some products to the basket!");
    }
  };

  const deleteItemFromFirestoreCartItem = async (productId) => {
    try {
      const userDocRef = doc(
        collection(firestore, "users", currentUser.uid, "cartCollection"),
        productId
      );
      await deleteDoc(userDocRef);
      
      console.log("Document successfully deleted from cart!");
    } catch (error) {
      console.error("Error removing product from cart: ", error);
    }
  };

  return (
    <>
      <div className="col my-2">
        <div className="d-flex justify-content-between">
          <div className="fs-6">
            <h4 className="fw-bold">
              <i className="bi bi-currency-rupee"></i>
              {totalCartPrice}
            </h4>
            <p className="bluecolor">Total payable</p>
          </div>
          <div className="bg_color_buy_now">
            <button
              className="btn px-5 rounded-pill"
              onClick={() => setShowForm(!showForm)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Collapse in={showForm}>
        <div>
          <Form onSubmit={handleSubmitForm}>
            <h5 className="fw-bold color_heading">Enter Your Details</h5>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className="d-flex justify-content-start fs-6">
                Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formFields.name}
                onChange={handleChange}
              />
              {formFieldsError.nameError && (
                <Form.Text className="text-danger">
                  <div className="font_size_error_message">
                    {formFieldsError.nameError}
                  </div>
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPincode">
              <Form.Label className="d-flex justify-content-start fs-6">
                Pincode
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your pincode"
                name="pincode"
                value={formFields.pincode}
                onChange={handleChange}
              />
              {formFieldsError.pincodeError && (
                <Form.Text className="text-danger font_size_error_message">
                  <div className="font_size_error_message">
                    {formFieldsError.pincodeError}
                  </div>
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label className="d-flex justify-content-start fs-6">
                Address
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your address"
                name="address"
                value={formFields.address}
                onChange={handleChange}
              />
              {formFieldsError.addressError && (
                <Form.Text className="text-danger font_size_error_message">
                  <div className="font_size_error_message">
                    {formFieldsError.addressError}
                  </div>
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label className="d-flex justify-content-start fs-6">
                Phone Number
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={formFields.phoneNumber}
                onChange={handleChange}
              />
              {formFieldsError.phoneNumberError && (
                <Form.Text className="text-danger">
                  <div className="font_size_error_message">
                    {formFieldsError.phoneNumberError}
                  </div>
                </Form.Text>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="px-5 rounded-pill"
            >
              Submit and Buy Now
            </Button>
          </Form>
        </div>
      </Collapse>
    </>
  );
};

export default Payment;

