import React, { useState, useEffect } from "react";
import { Form, Button, Collapse, ListGroup } from "react-bootstrap";
import "./Payment.css";
import { firestore, auth } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from "uuid";

const Payment = ({ cartProducts, productDetailsCombo }) => {
  const [formFields, setFormFields] = useState({
    username: "",
    phoneNumber: "",
    address_Line1: "",
    address_Line2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [formFieldsError, setFormFieldsError] = useState({
    usernameError: "",
    phoneNumberError: "",
    address_Line1Error: "",
    address_Line2Error: "",
    cityError: "",
    stateError: "",
    pincodeError: "",
  });
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showOldAddress, setShowOldAddress] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

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
    console.log(totalPrice, "totalPricetotalPrice");

    return totalPrice;
  };

  const totalCartPrice = calculateTotalPrice(cartProducts, productDetailsCombo);

  const [currentUser, setCurrentUser] = useState(null);
  const [oldAddresses, setOldAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        fetchOldAddresses(user.uid);
      }
    });

    return unsubscribe;
  }, []);



  const fetchOldAddresses = async (userId) => {
    try {
      // Fetch addresses from the 1st collection
      const addressesRef = collection(
        firestore,
        "AllOrderList",
        userId,
        "OrderAddress_History"
      );
      const addressesSnapshot = await getDocs(addressesRef);
      const addressesList = addressesSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      // Fetch addresses from the 2nd collection
      const addressesRefCombos = collection(
        firestore,
        "AllOrderList",
        userId,
        "OrderAddress_History_Combos"
      );
      const addressesSnapshotCombos = await getDocs(addressesRefCombos);
      const addressesListCombos = addressesSnapshotCombos.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      //two lists of addresses  join
      const allAddresses = [...addressesList, ...addressesListCombos];
      setOldAddresses(allAddresses);
    } catch (error) {
      console.error("Error fetching old addresses:", error);
    }
  };

  const handleSelectOldAddress = (address) => {
    if (oldAddresses.length > 0) {
      setSelectedAddress(address);
      setFormFields({
        username: address.data.orderAddress.username || "",
        phoneNumber: address.data.orderAddress.phoneNumber || "",
        address_Line1: address.data.orderAddress.address_Line1 || "",
        address_Line2: address.data.orderAddress.address_Line2 || "",
        city: address.data.orderAddress.city || "",
        state: address.data.orderAddress.state || "",
        pincode: address.data.orderAddress.pincode || "",
      });
    } else {
      // Handle the case where there are no old addresses (optional)
      console.warn("No old addresses found.");
    }
  };

  const handleToggleAddressForm = () => {
    setShowNewAddressForm(!showNewAddressForm);
    setShowOldAddress(false);
    setSelectedAddress(null);
    setFormFields({
      username: "",
      phoneNumber: "",
      address_Line1: "",
      address_Line2: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  // const handleSubmitForm = async (e) => {
  //   e.preventDefault();
  //   // Validate all fields before submission
  //   const {
  //     username,
  //     pincode,
  //     phoneNumber,
  //     address_Line1,
  //     address_Line2,
  //     city,
  //     state,
  //   } = formFields;
  //   const errors = {};

  //   if (!username.trim()) {
  //     errors.usernameError = "Name is required";
  //   } else if (!/^[A-Za-z\s]+$/.test(username.trim())) {
  //     errors.usernameError = "Name should contain only letters";
  //   }

  //   if (!pincode.trim()) {
  //     errors.pincodeError = "Pincode is required";
  //   } else if (!/^\d{6}$/.test(pincode.trim())) {
  //     errors.pincodeError = "Invalid pincode";
  //   }

  //   if (!address_Line1.trim()) {
  //     errors.address_Line1Error = "Address is required";
  //   }
  //   if (!address_Line2.trim()) {
  //     errors.address_Line2Error = "Address is required";
  //   }
  //   if (!city.trim()) {
  //     errors.cityError = "City is required";
  //   } else if (!/^[A-Za-z\s]+$/.test(city.trim())) {
  //     errors.cityError = "City should contain only letters";
  //   }
  //   if (!state.trim()) {
  //     errors.stateError = "State is required";
  //   } else if (!/^[A-Za-z\s]+$/.test(state.trim())) {
  //     errors.stateError = "State should contain only letters";
  //   }

  //   if (!phoneNumber.trim()) {
  //     errors.phoneNumberError = "Phone Number is required";
  //   } else if (!/^\d{10}$/.test(phoneNumber.trim())) {
  //     errors.phoneNumberError = "Invalid phone number";
  //   }

  //   setFormFieldsError(errors);

  //   const hasErrors = Object.values(errors).some((error) => error !== "");

  //   // Check if either an old address is selected or a new address is entered
  //   const addressSelected = selectedAddress || showNewAddressForm;

  //   if (!hasErrors && addressSelected) {
  //     const orderAddressData = selectedAddress
  //       ? selectedAddress.data.orderAddress
  //       : formFields;

  //     const orderData = {
  //       username: orderAddressData.username,
  //       pincode: orderAddressData.pincode,
  //       address_Line1: orderAddressData.address_Line1,
  //       address_Line2: orderAddressData.address_Line2,
  //       phoneNumber: orderAddressData.phoneNumber,
  //       city: orderAddressData.city,
  //       state: orderAddressData.state,
  //       totalPrice: totalCartPrice,
  //       cartProducts: cartProducts.map((product) => ({
  //         brand: product.data.brand || "",
  //         category: product.data.category || "",
  //         color: product.data.color || "",
  //         gender: product.data.gender || "",
  //         id: product.data.id || "",
  //         imageUrl: product.data.imageUrl || [],
  //         itemCountcustomer: product.data.itemCountcustomer || 0,
  //         name: product.data.name || "",
  //         price: product.data.price || "",
  //         sizecustomers: product.data.sizecustomers || "",
  //       })),
  //     };

  //     // const userDocRef = doc(collection(firestore, "users"), currentUser.uid);
  //     // const orderAddressRef = collection(userDocRef, "OrderAddress");
  //     // await addDoc(orderAddressRef, orderData);

  //     openRazorpay(orderData);
  //   } else {
  //     if (!addressSelected) {
  //       toast.error("Please select an old address or enter a new one.");
  //     } else {
  //       toast.error("Please fill all required fields correctly.");
  //     }
  //   }
  // };

  const generateOrderID = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // Validate all fields before submission
    const {
      username,
      pincode,
      phoneNumber,
      address_Line1,
      address_Line2,
      city,
      state,
    } = formFields;
    const errors = {};

    if (!username.trim()) {
      errors.usernameError = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(username.trim())) {
      errors.usernameError = "Name should contain only letters";
    }

    if (!pincode.trim()) {
      errors.pincodeError = "Pincode is required";
    } else if (!/^\d{6}$/.test(pincode.trim())) {
      errors.pincodeError = "Invalid pincode";
    }

    if (!address_Line1.trim()) {
      errors.address_Line1Error = "Address is required";
    }
    if (!address_Line2.trim()) {
      errors.address_Line2Error = "Address is required";
    }
    if (!city.trim()) {
      errors.cityError = "City is required";
    } else if (!/^[A-Za-z\s]+$/.test(city.trim())) {
      errors.cityError = "City should contain only letters";
    }
    if (!state.trim()) {
      errors.stateError = "State is required";
    } else if (!/^[A-Za-z\s]+$/.test(state.trim())) {
      errors.stateError = "State should contain only letters";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumberError = "Phone Number is required";
    } else if (!/^\d{10}$/.test(phoneNumber.trim())) {
      errors.phoneNumberError = "Invalid phone number";
    }

    setFormFieldsError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");

    // Check if either an old address is selected or a new address is entered
    const addressSelected = selectedAddress || showNewAddressForm;

    if (!hasErrors && addressSelected) {
      const orderAddressData = selectedAddress
        ? selectedAddress.data.orderAddress
        : formFields;

      const orderID = generateOrderID();

      const orderData = {
        orderID,
        username: orderAddressData.username,
        pincode: orderAddressData.pincode,
        address_Line1: orderAddressData.address_Line1,
        address_Line2: orderAddressData.address_Line2,
        phoneNumber: orderAddressData.phoneNumber,
        city: orderAddressData.city,
        state: orderAddressData.state,
        totalPrice: totalCartPrice,
        cartProducts: cartProducts.map((product) => ({
          brand: product.data.brand || "",
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

        comboProducts: productDetailsCombo.map((comboProduct) => ({
          brand: comboProduct.data.productDetailsCombo.brand || "",
          id: comboProduct.data.productDetailsCombo.id || "",
          imageUrl: comboProduct.data.productDetailsCombo.tumbnail || [],
          itemCountcustomer: comboProduct.data.itemCountcustomer || 0,
        })),
      };
      console.log(orderData, "::orderData");
      openRazorpay(orderData);
    } else {
      if (!addressSelected) {
        toast.error("Please select an old address or enter a new one.");
      } else {
        toast.error("Please fill all required fields correctly.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...formFieldsError };

    switch (name) {
      case "username":
        if (!value.trim()) {
          errors.usernameError = "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          errors.usernameError = "Name should contain only letters";
        } else {
          errors.usernameError = "";
        }
        break;
      case "pincode":
        if (!value.trim()) {
          errors.pincodeError = "Pincode is required";
        } else if (!/^\d{6}$/.test(value.trim())) {
          errors.pincodeError = "Invalid pincode";
        } else {
          errors.pincodeError = "";
        }
        break;
      case "address_Line1":
        if (!value.trim()) {
          errors.address_Line1Error = "Address is required";
        } else {
          errors.address_Line1Error = "";
        }
        break;
      case "address_Line2":
        if (!value.trim()) {
          errors.address_Line1Error = "Address is required";
        } else {
          errors.address_Line1Error = "";
        }
        break;
      case "city":
        if (!value.trim()) {
          errors.cityError = "City is required";
        } else if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          errors.cityError = "City should contain only letters";
        } else {
          errors.cityError = "";
        }
        break;
      case "state":
        if (!value.trim()) {
          errors.stateError = "State is required";
        } else if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          errors.stateError = "State should contain only letters";
        } else {
          errors.stateError = "";
        }
        break;
      case "phoneNumber":
        if (!value.trim()) {
          errors.phoneNumberError = "Phone Number is required";
        } else if (!/^\d{10}$/.test(value.trim())) {
          errors.phoneNumberError = "Invalid phone number";
        } else {
          errors.phoneNumberError = "";
        }
        break;

      default:
        break;
    }

    setFormFieldsError(errors);
  };

  // const openRazorpay = (orderData) => {
  //   if (totalCartPrice) {
  //     const options = {
  //       key: "rzp_live_W0t2SeLjFxX8SB",
  //       key_secret: "TO1w1yoIo0Z5HXmRitcqpEqG",
  //       amount: totalCartPrice * 100,
  //       currency: "INR",
  //       name: "TUNi",
  //       timeout: 300,
  //       description: "For Testing Purpose",
  //       handler: async function (response) {
  //         // alert(response.razorpay_payment_id);
  //         try {
  //           const newOrdersRef = doc(
  //             firestore,
  //             "AllOrderList",
  //             currentUser.uid
  //           );
  //           const newOrdersList = collection(newOrdersRef, "OrderItemPlaced");

  //           await Promise.all(
  //             cartProducts.map(async (product) => {
  //               await addDoc(newOrdersList, {
  //                 ...product.data,
  //                 totalPrice: totalCartPrice,
  //                 orderAddress: formFields,
  //                 orderID: orderData.orderID,
  //               });
  //             })
  //           );
  //           const newOrderAddress = doc(
  //             firestore,
  //             "AllOrderList",
  //             currentUser.uid
  //           );

  //           const newOrdersListAddress = collection(
  //             newOrderAddress,
  //             "OrderAddress_History"
  //           );

  //           await Promise.all(
  //             cartProducts.map(async (product) => {
  //               await addDoc(newOrdersListAddress, {
  //                 ...product.data,
  //                 orderAddress: formFields,
  //                 totalPrice: totalCartPrice,
  //                 orderID: orderData.orderID, // Include the order ID
  //               });
  //             })
  //           );
  //           await Promise.all(
  //             cartProducts.map((product) =>
  //               deleteItemFromFirestoreCartItem(product.id)
  //             )
  //           );

  //           navigate("/TrackOrder");
  //           toast.success("Your Product Placed");
  //           window.location.reload();
  //         } catch (error) {
  //           console.error("Error processing order after payment: ", error);
  //         }
  //       },
  //       prefill: {
  //         name: formFields.username,
  //         email: "",
  //         contact: formFields.phoneNumber,
  //       },
  //       notes: {
  //         address_Line1: formFields.address_Line1,
  //         address_Line2: formFields.address_Line2,
  //       },
  //       theme: {
  //         color: "#CC7833",
  //       },
  //     };
  //     const pay = new window.Razorpay(options);
  //     pay.open();
  //   } else {
  //     alert("Please add some products to the basket!");
  //   }
  // };

  const openRazorpay = (orderData) => {
    if (totalCartPrice) {
      const options = {
        key: "rzp_live_W0t2SeLjFxX8SB",
        key_secret: "TO1w1yoIo0Z5HXmRitcqpEqG",
        amount: totalCartPrice * 100,
        currency: "INR",
        name: "TUNi",
        timeout: 300,
        description: "For Testing Purpose",
        handler: async function (response) {
          try {
            const newOrdersRef = doc(
              firestore,
              "AllOrderList",
              currentUser.uid
            );
            const newOrdersList = collection(newOrdersRef, "OrderItemPlaced");

            // Adding cart products to the database
            await Promise.all(
              cartProducts.map(async (product) => {
                await addDoc(newOrdersList, {
                  ...product.data,
                  totalPrice: totalCartPrice,
                  orderAddress: formFields,
                  orderID: orderData.orderID,
                  orderStatus:false,
                });
              })
            );

            const newOrdersListCombo = collection(
              newOrdersRef,
              "OrderItemPlaced_Combo"
            );
            await Promise.all(
              productDetailsCombo.map(async (comboProduct) => {
                await addDoc(newOrdersListCombo, {
                  ...comboProduct.data,
                  totalPrice: totalCartPrice,
                  orderAddress: formFields,
                  orderID: orderData.orderID,
                  orderStatus:false,

                });
              })
            );

            const newOrderAddress = doc(
              firestore,
              "AllOrderList",
              currentUser.uid
            );
            const newOrdersListAddress = collection(
              newOrderAddress,
              "OrderAddress_History"
            );

            // Adding address history for cart products
            await Promise.all(
              cartProducts.map(async (product) => {
                await addDoc(newOrdersListAddress, {
                  ...product.data,
                  orderAddress: formFields,
                  totalPrice: totalCartPrice,
                  orderID: orderData.orderID,
                });
              })
            );

            // Adding address history for combo products
            const newOrdersListAddressCombo = collection(
              newOrderAddress,
              "OrderAddress_History_Combos"
            );

            await Promise.all(
              productDetailsCombo.map(async (comboProduct) => {
                await addDoc(newOrdersListAddressCombo, {
                  ...comboProduct.data,
                  orderAddress: formFields,
                  totalPrice: totalCartPrice,
                  orderID: orderData.orderID,
                });
              })
            );

            await Promise.all(
              cartProducts.map((product) =>
                deleteItemFromFirestoreCartItem(product.id)
              ),
              productDetailsCombo.map((product) =>
                deleteItemFromFirestoreCartItem_Combos(product.id)
              )
            );

            navigate("/TrackOrder");
            toast.success("Your Product Placed");
            window.location.reload();
          } catch (error) {
            console.error("Error processing order after payment: ", error);
          }
        },
        prefill: {
          name: formFields.username,
          email: "",
          contact: formFields.phoneNumber,
        },
        notes: {
          address_Line1: formFields.address_Line1,
          address_Line2: formFields.address_Line2,
        },
        theme: {
          color: "#CC7833",
        },
      };
      const pay = new window.Razorpay(options);
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
    } catch (error) {
      console.error("Error removing product from cart: ", error);
    }
  };

  const deleteItemFromFirestoreCartItem_Combos = async (productId) => {
    try {
      const userDocRef = doc(
        collection(
          firestore,
          "users",
          currentUser.uid,
          "cartCollection_Combos"
        ),
        productId
      );
      await deleteDoc(userDocRef);
    } catch (error) {
      console.error("Error removing product from cart: ", error);
    }
  };

  const uniqueAddresses = new Set();

  // const handleDeleteAddress = async (addressId) => {
  //   try {
  //     const addressDocRef = doc(
  //       firestore,
  //       "AllOrderList",
  //       currentUser.uid,
  //       "OrderItemPlaced",
  //       addressId
  //     );
  //     await deleteDoc(addressDocRef);
  //     setOldAddresses(
  //       oldAddresses.filter((address) => address.id !== addressId)
  //     );
  //     toast.success("Address deleted successfully.");
  //   } catch (error) {
  //     console.error("Error deleting address: ", error);
  //     toast.error("Failed to delete address.");
  //   }
  // };




  const handleDeleteAddress = async (addressId) => {
    try {
      // Define references to both collections
      const addressDocRef1 = doc(
        firestore,
        "AllOrderList",
        currentUser.uid,
        "OrderAddress_History",
        addressId
      );
      const addressDocRef2 = doc(
        firestore,
        "AllOrderList",
        currentUser.uid,
        "OrderAddress_History_Combos",
        addressId
      );
  
      // Try to delete from the first collection
      await deleteDoc(addressDocRef1)
        .then(() => {
          console.log(`Address ${addressId} deleted from OrderAddress_History.`);
        })
        .catch((error) => {
          if (error.code === "not-found") {
            console.log(`Address ${addressId} not found in OrderAddress_History.`);
          } else {
            throw error; // Re-throw if it's a different error
          }
        });
  
      // Try to delete from the second collection
      await deleteDoc(addressDocRef2)
        .then(() => {
          console.log(`Address ${addressId} deleted from OrderAddress_History_Combos.`);
        })
        .catch((error) => {
          if (error.code === "not-found") {
            console.log(`Address ${addressId} not found in OrderAddress_History_Combos.`);
          } else {
            throw error; 
          }
        });
  
     
      setOldAddresses(oldAddresses.filter((address) => address.id !== addressId));
  
     
      toast.success("Address deleted successfully.");
    } catch (error) {
      console.error("Error deleting address: ", error);
      toast.error("Failed to delete address.");
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
              disabled={
                cartProducts.length === 0 && productDetailsCombo.length === 0
              }
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
            <div className="mb-3">
              <Button
                variant="outline-primary"
                onClick={() => {
                  setShowOldAddress(true);
                  setShowNewAddressForm(false);
                }}
              >
                Pick Old Address
              </Button>{" "}
              <Button
                variant="outline-primary"
                onClick={handleToggleAddressForm}
              >
                Enter New Address
              </Button>
            </div>
            {/* <Collapse in={showOldAddress}>
              <div>
                <ListGroup>
                  {oldAddresses.map((address) => (
                    <div className="d-flex">
                      <ListGroup.Item
                        key={address.id}
                        action
                        active={
                          selectedAddress && selectedAddress.id === address.id
                        }
                        className="my-2 fontsize d-flex justify-content-between align-items-center"
                      >
                        <div onClick={() => handleSelectOldAddress(address)}>
                          <span className="fw-bold">Address :</span>{" "}
                          {address.data.orderAddress.username},{" "}
                          {address.data.orderAddress.phoneNumber},
                          {address.data.orderAddress.address_Line1},{" "}
                          {address.data.orderAddress.address_Line2},{" "}
                          {address.data.orderAddress.city},{" "}
                          {address.data.orderAddress.state},{" "}
                          {address.data.orderAddress.pincode}
                        </div>
                      </ListGroup.Item>
                      <Button
                        variant=""
                        className="text-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAddress(address.id);
                        }}
                      >
                        <i class="bi bi-trash3-fill"></i>
                      </Button>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </Collapse> */}
            <Collapse in={showOldAddress}>
              <div>
                {oldAddresses.map((address) => {
                  const addressString = `${address.data.orderAddress.username},${address.data.orderAddress.phoneNumber},${address.data.orderAddress.address_Line1},${address.data.orderAddress.address_Line2},${address.data.orderAddress.city},${address.data.orderAddress.state},${address.data.orderAddress.pincode}`;
                  if (!uniqueAddresses.has(addressString)) {
                    uniqueAddresses.add(addressString);
                    return (
                      <div className="d-flex" key={address.id}>
                        <ListGroup.Item
                          action
                          active={
                            selectedAddress && selectedAddress.id === address.id
                          }
                          className="my-2 fontsize d-flex justify-content-between align-items-center"
                          onClick={() => handleSelectOldAddress(address)}
                        >
                          <div>
                            <span className="fw-bold">Address :</span>{" "}
                            {address.data.orderAddress.username},{" "}
                            {address.data.orderAddress.phoneNumber},
                            {address.data.orderAddress.address_Line1},{" "}
                            {address.data.orderAddress.address_Line2},{" "}
                            {address.data.orderAddress.city},{" "}
                            {address.data.orderAddress.state},{" "}
                            {address.data.orderAddress.pincode}
                          </div>
                        </ListGroup.Item>
                        <Button
                          variant=""
                          className="text-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address.id);
                          }}
                        >
                          <i class="bi bi-trash3-fill"></i>
                        </Button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </Collapse>

            <Collapse in={showNewAddressForm}>
              <div>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="d-flex justify-content-start fs-6">
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="username"
                    value={formFields.username}
                    onChange={handleChange}
                  />
                  {formFieldsError.usernameError && (
                    <Form.Text className="text-danger">
                      <div className="font_size_error_message">
                        {formFieldsError.usernameError}
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
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label className="d-flex justify-content-start fs-6">
                    Address Line 1
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    name="address_Line1"
                    value={formFields.address_Line1}
                    onChange={handleChange}
                  />
                  {formFieldsError.address_Line1Error && (
                    <Form.Text className="text-danger">
                      <div className="font_size_error_message">
                        {formFieldsError.address_Line1Error}
                      </div>
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label className="d-flex justify-content-start fs-6">
                    Address Line 2
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    name="address_Line2"
                    value={formFields.address_Line2}
                    onChange={handleChange}
                  />
                  {formFieldsError.address_Line2Error && (
                    <Form.Text className="text-danger">
                      <div className="font_size_error_message">
                        {formFieldsError.address_Line2Error}
                      </div>
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="d-flex justify-content-start fs-6">
                    City
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your City"
                    name="city"
                    value={formFields.city}
                    onChange={handleChange}
                  />
                  {formFieldsError.cityError && (
                    <Form.Text className="text-danger">
                      <div className="font_size_error_message">
                        {formFieldsError.cityError}
                      </div>
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="d-flex justify-content-start fs-6">
                    State
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your State"
                    name="state"
                    value={formFields.state}
                    onChange={handleChange}
                  />
                  {formFieldsError.stateError && (
                    <Form.Text className="text-danger">
                      <div className="font_size_error_message">
                        {formFieldsError.stateError}
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
                    <Form.Text className="text-danger">
                      <div className="font_size_error_message">
                        {formFieldsError.pincodeError}
                      </div>
                    </Form.Text>
                  )}
                </Form.Group>
              </div>
            </Collapse>
            <Button
              variant="primary"
              type="submit"
              className="my-2"
              disabled={
                cartProducts.length === 0 && productDetailsCombo.length === 0
              }
            >
              Pay Now
            </Button>
          </Form>
        </div>
      </Collapse>
    </>
  );
};

export default Payment;
