import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Account.css";
import Header from "../../Compoment/Header/Header";
import Footer from "../../Compoment/Footer/Footer";
import { firestore, auth } from "../../firebaseConfig";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  setDoc,
  query,
  deleteDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const fileInputRefImage = useRef(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchOrderItems(user.uid);
      } else {
        setUserId(null);
        setOrderProducts([]);
        setTotalPrice(0);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let sum = 0;
    orderProducts.forEach((product) => {
      sum += product.data.totalPrice;
    });
    setTotalPrice(sum);
  }, [orderProducts]);

  const fetchOrderItems = async (userId) => {
    try {
      const userDocItem = collection(
        firestore,
        "AllOrderList",
        userId,
        "OrderAddress_History"
      );
      const userDocSnap = await getDocs(userDocItem);
      const orderProducts = [];
      userDocSnap.forEach((doc) => {
        orderProducts.push({ id: doc.id, data: doc.data() });
      });
      setOrderProducts(orderProducts);
      setLoading(false); // Set loading state to false when order products are fetched
    } catch (error) {
      console.error("Error fetching order products:", error);
    }
  };

  // ------------------------------profile----------------------------------------------
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profileUrl: "",
  });
  
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    fetchProfile(userId);
  }, [userId]);

  const fetchProfile = async (userId) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      const personalDetailsRef = collection(userDocRef, "personal_details");
      const querySnapshot = await getDocs(personalDetailsRef);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setProfile(userData);
        if (userData.profileUrl) {
          setImageUploaded(true);
        }
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };


  const [fileError, setFileError] = useState("");

  const handleFileInputs = async (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/bmp"];

    if (file && allowedTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profileUrl: reader.result,
        }));
        setImageUploaded(true);
      };
      reader.readAsDataURL(file);

    } else {
      setFileError("Invalid file type. Only bitmap, jpeg, png, and jpg are accepted.");
      toast.error("Invalid file type. Only bitmap, jpeg, png, and jpg are accepted.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });


  const handleSubmit = async () => {
    // Reset previous errors
    setErrors({
      name: "",
      email: "",
      phoneNumber: "",
    });
  
    let hasError = false;
  
    // Field validation
    if (!profile.name?.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Please enter your name.",
      }));
      hasError = true;
    }
  
    if (!profile.email?.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter your email.",
      }));
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      hasError = true;
    }
  
    if (!profile.phoneNumber?.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Please enter your phone number.",
      }));
      hasError = true;
    } else if (!/^\+91\d{10}$/.test(profile.phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber:
          "Please enter a valid Indian phone number starting with +91 followed by 10 digits.",
      }));
      hasError = true;
    }
  
    if (hasError) {
      return;
    }
  
    try {
      // Your existing logic for updating profile
      const userDocRef = doc(firestore, "users", userId);
      const personalDetailsRef = collection(userDocRef, "personal_details");
  
      const querySnapshot = await getDocs(
        query(
          personalDetailsRef,
          where("phoneNumber", "==", profile.phoneNumber)
        )
      );
  
      if (!querySnapshot.empty) {
        const existingDocId = querySnapshot.docs[0].id;
        const existingDocRef = doc(personalDetailsRef, existingDocId);
        await setDoc(existingDocRef, profile, { merge: true });
      } else {
        await addDoc(personalDetailsRef, profile);
      }
      toast.success("Profile updated successfully");
      console.log("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };
  

  const handleDeleteProduct = async (productId) => {
    try {
      const productDocRef = doc(
        firestore,
        "AllOrderList",
        userId,
        "OrderAddress_History",
        productId
      );
      await deleteDoc(productDocRef);
      setOrderProducts(
        orderProducts.filter((product) => product.id !== productId)
      );
      toast.success("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product: ", error);
      toast.error("Failed to delete product.");
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("rzp_device_id");
      localStorage.clear();
      localStorage.removeItem("rzp_checkout_anon_id");
      toast.success("Successfully Logout");
      navigate("/");
      await auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="container my-4 py-2">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <ul
              class="nav nav-pills mb-3 d-flex justify-content-between"
              id="p"
              role=""
            >
              <li class="nav-item" role="presentation">
                <button
                  className="nav-link  btn-custom"
                  id="pills-Profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-Profile"
                  aria-selected="true"
                >
                  {" "}
                  <br />
                  Profile{" "}
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-Returns-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Returns"
                  type="button"
                  role="tab"
                  aria-controls="pills-Returns"
                  aria-selected="false"
                >
                  {" "}
                  <br />
                  Returns/Exchange
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-myorders-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-myorders"
                  type="button"
                  role="tab"
                  aria-controls="pills-myorders"
                  aria-selected="false"
                >
                  {" "}
                  <br />
                  My Orders
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-Help-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Help"
                  type="button"
                  role="tab"
                  aria-controls="pills-Help"
                  aria-selected="false"
                >
                  {" "}
                  <br />
                  Help{" "}
                </button>
              </li>
              <li class="nav-item my-2" role="presentation">
                <a
                  onClick={logout}
                  className="border-0"
                  id="pills-myorders-tab"
                  type="button"
                  role="tab"
                  aria-controls="pills-"
                  aria-selected="false"
                >
                  {" "}
                  <br />
                  Logout{" "}
                </a>
              </li>
            </ul>
          </div>
          <hr />
          {/* ------------------------------------------------------------------------------- */}
          <div className="col-lg-12 col-md-12 col-12">
            <div class="tab-content" id="pills-tabContent">
              {/* --------------------- Profile------------------ */}
              <div
                class="tab-pane fade "
                id="pills-Profile"
                role="tabpanel"
                aria-labelledby="pills-Profile-tab"
                tabindex="0"
              >
                <div className="row">
                  <h5 className="fw-bold fs-4 text_color">Profile :</h5>
                                 <h6 className="text-center fw-bold">Upload Profile Image</h6>
                                 {fileError && (
                          <p className="text-danger text-center">{fileError}</p>
                        )}
                  <div
                    style={{ cursor: "pointer" }}
                    className="text-center d-flex justify-content-center"
                  >
                    <label htmlFor="fileInputImage" className="file-upload">
                      <img
                        src={
                          imageUploaded
                            ? profile.profileUrl
                            : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                        }
                        width="150"
                        height="150"
                        alt="Preview"
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                        className="preview-image"
                      />
                    </label>
                    <input
                      onChange={handleFileInputs}
                      ref={fileInputRefImage}
                      name="profileUrl"
                      id="fileInputImage"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                     
                  </div>
                  <div className="">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-6 col-md-12 col-12 shadow-lg px-5 py-4">
                          <div className="my-2">
                            <label
                              htmlFor="name"
                              className="form-label fw-bold"
                            >
                              Name<span className="text-danger fs-4">*</span>
                            </label>
                            <div className="">
                              <input
                                type="text"
                                name="name"
                                id="form3Example1c"
                                className="form-control"
                                value={profile.name}
                                onChange={handleChange}
                              />
                              {errors.name && (
                              <div className="text-danger">{errors.name}</div>
                            )}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="email"
                              className="form-label fw-bold"
                            >
                              Email<span className="text-danger fs-4">*</span>
                            </label>
                            <div>
                              <input
                                name="email"
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                value={profile.email}
                                onChange={handleChange}
                              />
                              {errors.email && (
                              <div className="text-danger">{errors.email}</div>
                            )}
                            </div>
                          </div>
                          <div className="my-2">
                            <label
                              htmlFor="phoneNumber"
                              className="form-label fw-bold"
                            >
                              Mobile Number
                              <span className="text-danger fs-4">*</span>
                            </label>
                            <div>
                              <input
                                name="phoneNumber"
                                type="text"
                                id="number"
                                className="form-control"
                                value={profile.phoneNumber}
                                onChange={handleChange}
                              />
                             {errors.phoneNumber && (
                              <div className="text-danger">
                                {errors.phoneNumber}
                              </div>
                            )}
                            </div>
                          </div>
                          <div className="text-center my-4">
                            <button
                              className="px-4 py-1 border-0 submitbtn_edit"
                              onClick={handleSubmit}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ----------------------Returns--------------------------------- */}
              <div
                class="tab-pane fade"
                id="pills-Returns"
                role="tabpanel"
                aria-labelledby="pills-Returns-tab"
                tabindex="0"
              >
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="text-center">
                        <h4 className="fw-bold text-primary">
                          Returns & Exchanges
                        </h4>
                        <p className="text-muted">
                          Enter your order number and Email or Phone to find
                          your order
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                      <div className="my-2">
                        <label
                          htmlFor="LastName"
                          className="form-label fw-bold"
                        >
                          Order Number{" "}
                          <span className="text-danger fs-4">*</span>
                        </label>
                        <div className="">
                          <input
                            type="text"
                            name="name"
                            id="form3Example1c"
                            className="form-control"
                            placeholder="Enter Order Number eg:N123456"
                          />
                        </div>
                      </div>
                      <div className="my-2">
                        <label
                          htmlFor="LastName"
                          className="form-label fw-bold"
                        >
                          Phone Or Email
                          <span className="text-danger fs-4">*</span>
                        </label>
                        <div className="">
                          <input
                            type="text"
                            name="name"
                            id="form3Example1c"
                            className="form-control"
                            placeholder="Enter Phone Or Email"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <button className="my-4 py-2 px-4 border-0 submitbtn_edit">
                          Find Your Order
                        </button>
                      </div>
                      <p className="text-muted">
                        {" "}
                        Click here to read our{" "}
                        <a href="#">return/exchange policy</a>
                      </p>
                    </div>
                    <div className="col-lg-4"></div>
                  </div>
                </div>
              </div>
              {/* ----------------------myorders ---------------------------------- */}
              <div
                class="tab-pane fade"
                id="pills-myorders"
                role="tabpanel"
                aria-labelledby="pills-myorders-tab"
                tabindex="0"
              >
                <div className="col">
                  <h4 className="fw-bold py-1 px-1 text-primary">My Order History.</h4>
                  <div
                    className="scrollable-container"
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    {orderProducts.length === 0 ? (
                      <div className="alert alert-info" role="alert">
                        No order products in history.
                      </div>
                    ) : (
                      orderProducts.map((product, index) => (
                        <div className="card" key={product.data.id}>
                          <div className="card-body">
                            <div className="border">
                              <div className="c">
                                <div className="row">
                                  <div className="col-md-1 col-sm-6">
                                    <img
                                      src={product.data.imageUrl[0]}
                                      className="img-fluid"
                                      alt={product.data.name}
                                    />
                                  </div>
                                  <div className="col-md-1 col-sm-6 text-center d-flex justify-content-center align-items-center">
                                    <p className="text-muted mb-0 small">
                                      {product.data.name}
                                    </p>
                                  </div>
                                  <div className="col-md-2 col-sm-6 text-center d-flex justify-content-center align-items-center">
                                    <p className="text-muted mb-0 small">
                                      Color: {product.data.color}
                                    </p>
                                  </div>
                                  <div className="col-md-2 col-sm-6 text-center d-flex justify-content-center align-items-center">
                                    <p className="text-muted mb-0 small">
                                      Size: {product.data.sizecustomers}
                                    </p>
                                  </div>
                                  <div className="col-md-2 col-sm-6 text-center d-flex justify-content-center align-items-center">
                                    <p className="text-muted mb-0 small">
                                      Qty: {product.data.itemCountcustomer}
                                    </p>
                                  </div>
                                  <div className="col-md-2 col-sm-6 text-center d-flex justify-content-center align-items-center">
                                    <p className="text-muted mb-0 small">
                                      Price:{" "}
                                      <i className="bi bi-currency-rupee"></i>{" "}
                                      {product.data.totalPrice}
                                    </p>
                                  </div>
                                  <div className="col-md-1 col-sm-6 text-center d-flex justify-content-center align-items-center">
                                    <button
                                      variant=""
                                      className="text-danger border-0"
                                      onClick={() =>
                                        handleDeleteProduct(product.id)
                                      }
                                    >
                                      <i class="bi bi-trash3-fill"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              {/* ----------------------Help ---------------------------------- */}
              <div
                class="tab-pane fade"
                id="pills-Help"
                role="tabpanel"
                aria-labelledby="pills-Help-tab"
                tabindex="0"
              >
                <div className="row">
                  <div className="col-12">
                    <div>
                      <h6 className="text-primary fw-bold">HELP CENTER :-</h6>
                      <div>
                        <span className="text-muted py-2">
                          To submit return/ exchange requests -{" "}
                          <a href="#" alt="">
                            Click here{" "}
                          </a>
                          <br />
                          For any other queries and Quicker Help, WhatsApp us -{" "}
                          <a href="#" alt="">
                            Click here{" "}
                          </a>
                          <br />
                          If the link doesn’t work, please WhatsApp us ‘Hi TUNi’
                          on{" "}
                          <a href="#" alt="">
                            +91 8921514011
                          </a>{" "}
                          and we will get back to you within 24 hours
                        </span>
                      </div>
                      <div className="py-3 my-2">
                        <h6 className="text-muted">Important Note:</h6>
                        <p className="text-muted">
                          Dear Customer, In order to serve you faster &
                          efficiently, the official support of TUNi has been
                          shifted to WhatsApp only on the number -{" "}
                          <a href="#" alt="">
                            +91 8921514011{" "}
                          </a>
                          Please note, we DO NOT have ANY OTHER NUMBER for Call
                          / WhatsApp as official support Please beware, if you
                          encounter any other contact number / WhatsApp / email
                          online, it might be a spam
                          <a href="https://tunii.store/" alt="" target="_blank">
                            TUNi.Store
                          </a>
                          Tunii.store will never call you for password / OTP
                          which may lead to financial fraud For any help, feel
                          free to reach out to us -{" "}
                          <a href="#" alt="">
                            Click here{" "}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
