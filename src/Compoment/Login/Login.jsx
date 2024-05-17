// import React, { useState, useEffect } from "react";
// import "./LoginSignup.css";
// import LoginSignupImg from "./assets/small.png";
// import fotterimg1 from "./assets/corousal_icon_filled.svg";
// import Google from "./assets/google.png";
// import { Link, useNavigate } from "react-router-dom";
// import OtpForm from "./OtpForm";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
// import { auth, provider, firestore } from "../../firebaseConfig";
// import { signInWithPopup } from "firebase/auth";
// import "firebase/auth";
// import toast from "react-hot-toast";
// import {
//   collection,
//   addDoc,
//   doc,
//   getDoc,
//   getDocs,
//   setDoc,
// } from "firebase/firestore";

// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const Login = () => {
//   const [showOTPForm, setShowOTPForm] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState(""); // Initialize phoneNumber state
//   const [verificationCode, setVerificationCode] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [error, setError] = useState("");
//   const [previousPage, setPreviousPage] = useState("");
//   const [value, setValue] = useState("");
//   const [phoneNumberError, setPhoneNumberError] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's authentication status
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//     };

//     checkAuthStatus();
//   }, []);

//   const isValidIndianPhoneNumber = (phoneNumber) => {
//     const indianPhoneNumberRegex = /^\+91[0-9]{10}$/;
//     return indianPhoneNumberRegex.test(phoneNumber);
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       const userDocRef = doc(collection(firestore, "users"), user.uid);
//       const docSnapshot = await getDoc(userDocRef);

//       if (!docSnapshot.exists()) {
//         await addGoogleUserToFirestore(user);
//       }

//       localStorage.setItem("email", user.email);
//       navigate("/");
//       window.location.reload();
//     } catch (error) {
//       setError("Error signing in with Google. Please try again later.");
//       console.error("Error signing in with Google:", error);
//     }
//   };

//   const handleVerifyOTP = async (otp) => {
//     try {
//       const userCredential = await confirmationResult.confirm(otp);
//       console.log("verify login");
//       const phoneNumber = userCredential.user.phoneNumber;
//       const userId = userCredential.user.uid;

//       const userDocRef = doc(collection(firestore, "users"), userId);
//       const docSnapshot = await getDoc(userDocRef);
//       if (!docSnapshot.exists()) {
//         await addPhoneNumberToFirestore(userId, phoneNumber);
//       }

//       navigate("/");
//       window.location.reload();
//     } catch (err) {
//       setError("Error verifying OTP. Please try again.");
//       console.log(err);
//     }
//   };

//   const addGoogleUserToFirestore = async (user) => {
//     try {
//       const userDocRef = doc(collection(firestore, "users"), user.uid);
//       // const userGoogleRef=collection(userDocRef, "personal_details_webb_google");
//       await setDoc(userDocRef, {
//         email: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL,
//         // Add other user information as needed
//       });
//       console.log("Google user added to Firestore:", user.uid);
//     } catch (error) {
//       console.error("Error adding Google user to Firestore:", error);
//     }
//   };

//   const handleGoBack = () => {
//     if (previousPage === "login") {
//       setShowOTPForm(false);
//     }
//   };
//   const handlePhoneNumberChange = (value) => {
//     setPhoneNumber(value);
//     setPhoneNumberError("");
//   };

//   const handleSendOTP = async (e, phoneNumber) => {
//     e.preventDefault();
//     try {
//       if (!phoneNumber || !isValidIndianPhoneNumber(phoneNumber)) {
//         if (phoneNumber && phoneNumber.length < 10) {
//           setPhoneNumberError(
//             "Less than 10 numbers. Please enter a correct number."
//           );
//         } else if (phoneNumber && phoneNumber.length > 10) {
//           setPhoneNumberError(
//             "More than 10 numbers. Please enter a correct number."
//           );
//         } else {
//           setPhoneNumberError("Please enter a valid Indian phone number.");
//         }
//         return;
//       }

//       const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container");

//       const confirmation = await signInWithPhoneNumber(
//         auth,
//         phoneNumber,
//         recaptcha
//       );
//       setConfirmationResult(confirmation);
//       setShowOTPForm(true);
//       setPreviousPage("login");
//     } catch (err) {
//       console.log(err);
//       setError(err.message);
//     }
//   };

//   const handleResendOTP = async () => {
//     try {
//       if (!phoneNumber) {
//         toast.error("Please provide a phone number");
//         return;
//       }

//       const recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response) => {
//             console.log("reCAPTCHA solved", response);
//           },
//           "expired-callback": () => {
//             console.log("reCAPTCHA expired");
//           },
//         },
//         auth
//       );

//       if (!recaptchaVerifier) {
//         console.error("RecaptchaVerifier is not initialized");
//         return;
//       }
//       setConfirmationResult(null);

//       const confirmation = await signInWithPhoneNumber(
//         auth,
//         phoneNumber,
//         recaptchaVerifier
//       );
//       setConfirmationResult(confirmation);
//       toast.success("OTP resent successfully!");
//     } catch (error) {
//       console.error("Error resending OTP:", error);
//       toast.error("Failed to resend OTP. Please try again later.");
//     }
//   };

//   // const handleVerifyOTP = async (otp) => {
//   //   try {
//   //     const userCredential = await confirmationResult.confirm(otp);
//   //     console.log("verify login");
//   //     const phoneNumber = userCredential.user.phoneNumber;
//   //     const userId = userCredential.user.uid;

//   //     const userDocRef = doc(collection(firestore, "users"), userId);
//   //     const docSnapshot = await getDoc(userDocRef);
//   //     if (!docSnapshot.exists()) {
//   //       await addPhoneNumberToFirestore(userId, phoneNumber);
//   //     }

//   //     navigate("/");
//   //     window.location.reload();
//   //   } catch (err) {
//   //     console.log(err);
//   //     setError(err.message);
//   //   }
//   // };

//   const addPhoneNumberToFirestore = async (userId, phoneNumber) => {
//     try {
//       const userDocRef = doc(collection(firestore, "users"), userId);
//       const personalDetailsRef = collection(userDocRef, "personal_details");

//       const querySnapshot = await getDocs(personalDetailsRef);
//       const existingPhoneNumberDoc = querySnapshot.docs.find(
//         (doc) => doc.data().phoneNumber === phoneNumber
//       );

//       if (existingPhoneNumberDoc) {
//         console.log("Phone number already exists:", existingPhoneNumberDoc.id);
//         return;
//       }

//       const contactInfoDocRef = await addDoc(personalDetailsRef, {
//         phoneNumber,
//       });
//       console.log("Phone number added:", contactInfoDocRef.id);
//     } catch (err) {
//       console.error("Error adding phone number:", err);
//     }
//   };

//   const logout = async () => {
//     try {
//       localStorage.clear();

//       await auth.signOut();
//       window.location.reload();
//     } catch (error) {
//       console.error("Error logging out:", error.message);
//     }
//   };

//   return (
    // <>
    //   <div className="container">
    //     <div className="row my-1">
    //       <div className="col-lg-7 col-md-12 col-12">
    //         <div className="login_image_logo text-center">
    //           <img src={LoginSignupImg} alt="" className="img-fluid" />
    //         </div>
    //         <div className="my-3">
    //           <p className="text-white fw-bold fs-5 text-center family_font">
    //             Join the TUNi Family for a delightful shopping experience
    //           </p>
    //         </div>
    //         <div className="row my-5">
    //           <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
    //             <div className="shadow_lg d-flex flex-column w-100">
    //               <div className="text-center small_image">
    //                 <img src={fotterimg1} alt="" className="img-fluid my-3" />
    //               </div>
    //               <div className="py-2 flex-grow-1">
    //                 <p className="text-center heading_font text-white fw-bold">
    //                   Premium Quality Clothes
    //                 </p>
    //                 <p className="text-center text-white para_font">
    //                   Quality, comfort, and style – TUNi delivers on all fronts
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
    //             <div className="shadow_lg d-flex flex-column w-100">
    //               <div className="text-center small_image">
    //                 <img src={fotterimg1} alt="" className="img-fluid my-3" />
    //               </div>
    //               <div className="py-2 flex-grow-1">
    //                 <p className="text-center heading_font text-white fw-bold">
    //                   Great Customer Experience
    //                 </p>
    //                 <p className="text-center text-white para_font">
    //                   For us customer experience comes first -TUNi
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
    //             <div className="shadow_lg d-flex flex-column w-100">
    //               <div className="text-center small_image">
    //                 <img src={fotterimg1} alt="" className="img-fluid my-3" />
    //               </div>
    //               <div className="py-2 flex-grow-1">
    //                 <p className="text-center heading_font text-white fw-bold">
    //                   Best Team Behind Your Clothes
    //                 </p>
    //                 <p className="text-center text-white para_font">
    //                   We have the best talents to produce clothes you love
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* otp */}
    //       <div
    //         className="col-lg-5 col-md-12 col-12"
    //         style={{ background: "white", borderRadius: "10px" }}
    //       >
    //         <div className="my-1">
    //           {isLoggedIn ? (
    //             <p className="text-danger text-center mt-3">
    //               Error: Already logged in. Please log out to access this page.
    //               <button
    //                 className="px-1 border-0 py-1 bg-info"
    //                 onClick={logout}
    //               >
    //                 logout
    //               </button>
    //             </p>
    //           ) : (
    //             <>
    //               {showOTPForm ? (
    //                 <OtpForm
    //                   handleVerifyOTP={handleVerifyOTP}
    //                   handleResendOTP={handleResendOTP}
    //                   phoneNumber={phoneNumber}
    //                   handleGoBack={handleGoBack}
    //                 />
    //               ) : (
    //                 <>
    //                   <h4 className="text-center fw-bold my-3 py-1">
    //                     Delighted to have you!
    //                   </h4>
    //                   <p className="text-center text-secondary py-1">
    //                     Enter your Email number to Login/Signup.
    //                   </p>
    //                   <div className="text-center">
    //                     <form>
    //                       <div className="custom-border my-1">
    //                         <PhoneInput
    //                           country={"us"}
    //                           placeholder="Enter phone number"
    //                           value={phoneNumber}
    //                           onChange={handlePhoneNumberChange}
    //                         />
    //                       </div>
    //                       {phoneNumberError && (
    //                         <p className="text-danger">{phoneNumberError}</p>
    //                       )}
    //                       <div id="recaptcha-container"></div>
    //                       <div>
    //                         <button
    //                           onClick={(e) => handleSendOTP(e, phoneNumber)}
    //                           className="my-4 py-1 border-0 custom-border1 px-2"
    //                         >
    //                           Login with OTP{" "}
    //                           <i className="bi bi-arrow-right fs-6 fw-bold"></i>
    //                         </button>
    //                       </div>
    //                     </form>
    //                     <div className="text-center my-2 py-1">
    //                       <span className="text-muted">─────────</span>{" "}
    //                       <span className="mx-2">or</span>{" "}
    //                       <span className="text-muted">─────────</span>
    //                     </div>
    //                     <div className="img_google">
    //                       <button
    //                         className="px-5 py-2"
    //                         onClick={handleGoogleSignIn}
    //                       >
    //                         <img
    //                           src={Google}
    //                           alt="googleee"
    //                           className="img-fluid px-2"
    //                         />
    //                         Google
    //                       </button>
    //                     </div>
    //                   </div>
    //                 </>
    //               )}
    //             </>
    //           )}
    //         </div>

    //         <div className="row">
    //           <div className="col text-center">
    //             <p className="my-5 text-secondary">
    //               By logging in, you're agreeing to our ?{" "}
    //               <a href="#" className="text-secondary">
    //                 Privacy Policy.
    //               </a>
    //               <a href="#" className="text-secondary">
    //                 Terms of Service
    //               </a>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       {/* end otp  */}
    //     </div>
    //   </div>
    // </>
//   );
// };

// export default Login;









import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import LoginSignupImg from "./assets/small.png";
import fotterimg1 from "./assets/corousal_icon_filled.svg";
import Google from "./assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import OtpForm from "./OtpForm";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { auth, provider, firestore } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { collection, addDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const user = auth.currentUser;
      setIsLoggedIn(!!user);
    };

    checkAuthStatus();
  }, []);

  const isValidIndianPhoneNumber = (phoneNumber) => {
    const indianPhoneNumberRegex = /^\+91[0-9]{10}$/;
    return indianPhoneNumberRegex.test(phoneNumber);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(collection(firestore, "users"), user.uid);
      const docSnapshot = await getDoc(userDocRef);

      if (!docSnapshot.exists()) {
        await addGoogleUserToFirestore(user);
      }

      localStorage.setItem("email", user.email);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError("Error signing in with Google. Please try again later.");
      console.error("Error signing in with Google:", error);
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const phoneNumber = userCredential.user.phoneNumber;
      const userId = userCredential.user.uid;

      const userDocRef = doc(collection(firestore, "users"), userId);
      const docSnapshot = await getDoc(userDocRef);
      if (!docSnapshot.exists()) {
        await addPhoneNumberToFirestore(userId, phoneNumber);
      }

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Error verifying OTP. Please try again.");
      console.error(err);
    }
  };

  const addGoogleUserToFirestore = async (user) => {
    try {
      const userDocRef = doc(collection(firestore, "users"), user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      console.log("Google user added to Firestore:", user.uid);
    } catch (error) {
      console.error("Error adding Google user to Firestore:", error);
    }
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setPhoneNumberError("");
  };

  const handleSendOTP = async (e, phoneNumber) => {
    e.preventDefault();
    try {
      if (!phoneNumber || !isValidIndianPhoneNumber(phoneNumber)) {
        setPhoneNumberError("Please enter a valid Indian phone number.");
        return;
      }

      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container");

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
      setConfirmationResult(confirmation);
      setShowOTPForm(true);
      setPreviousPage("login");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleResendOTP = async () => {
    try {
      if (!phoneNumber) {
        toast.error("Please provide a phone number");
        return;
      }

      const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved", response);
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired");
        },
      }, auth);

      setConfirmationResult(null);

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmation);
      toast.success("OTP resent successfully!");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Please try again later.");
    }
  };

  const addPhoneNumberToFirestore = async (userId, phoneNumber) => {
    try {
      const userDocRef = doc(collection(firestore, "users"), userId);
      const personalDetailsRef = collection(userDocRef, "personal_details");
      const querySnapshot = await getDocs(personalDetailsRef);
      const existingPhoneNumberDoc = querySnapshot.docs.find(doc => doc.data().phoneNumber === phoneNumber);

      if (existingPhoneNumberDoc) {
        console.log("Phone number already exists:", existingPhoneNumberDoc.id);
        return;
      }

      const contactInfoDocRef = await addDoc(personalDetailsRef, {
        phoneNumber,
      });
      console.log("Phone number added:", contactInfoDocRef.id);
    } catch (err) {
      console.error("Error adding phone number:", err);
    }
  };
  const handleGoBack = () => {
    if (previousPage === "login") {
      setShowOTPForm(false);
    }
  };
  const logout = async () => {
    try {
      localStorage.clear();
      await auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <>
    <div className="container">
      <div className="row my-1">
        <div className="col-lg-7 col-md-12 col-12">
          <div className="login_image_logo text-center">
            <img src={LoginSignupImg} alt="" className="img-fluid" />
          </div>
          <div className="my-3">
            <p className="text-white fw-bold fs-5 text-center family_font">
              Join the TUNi Family for a delightful shopping experience
            </p>
          </div>
          <div className="row my-5">
            <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
              <div className="shadow_lg d-flex flex-column w-100">
                <div className="text-center small_image">
                  <img src={fotterimg1} alt="" className="img-fluid my-3" />
                </div>
                <div className="py-2 flex-grow-1">
                  <p className="text-center heading_font text-white fw-bold">
                    Premium Quality Clothes
                  </p>
                  <p className="text-center text-white para_font">
                    Quality, comfort, and style – TUNi delivers on all fronts
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
              <div className="shadow_lg d-flex flex-column w-100">
                <div className="text-center small_image">
                  <img src={fotterimg1} alt="" className="img-fluid my-3" />
                </div>
                <div className="py-2 flex-grow-1">
                  <p className="text-center heading_font text-white fw-bold">
                    Great Customer Experience
                  </p>
                  <p className="text-center text-white para_font">
                    For us customer experience comes first -TUNi
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
              <div className="shadow_lg d-flex flex-column w-100">
                <div className="text-center small_image">
                  <img src={fotterimg1} alt="" className="img-fluid my-3" />
                </div>
                <div className="py-2 flex-grow-1">
                  <p className="text-center heading_font text-white fw-bold">
                    Best Team Behind Your Clothes
                  </p>
                  <p className="text-center text-white para_font">
                    We have the best talents to produce clothes you love
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* otp */}
        <div
          className="col-lg-5 col-md-12 col-12"
          style={{ background: "white", borderRadius: "10px" }}
        >
          <div className="my-1">
            {isLoggedIn ? (
              <p className="text-danger text-center mt-3">
                Error: Already logged in. Please log out to access this page.
                <button
                  className="px-1 border-0 py-1 bg-info"
                  onClick={logout}
                >
                  logout
                </button>
              </p>
            ) : (
              <>
                {showOTPForm ? (
                  <OtpForm
                    handleVerifyOTP={handleVerifyOTP}
                    handleResendOTP={handleResendOTP}
                    phoneNumber={phoneNumber}
                    handleGoBack={handleGoBack}
                  />
                ) : (
                  <>
                    <h4 className="text-center fw-bold my-3 py-1">
                      Delighted to have you!
                    </h4>
                    <p className="text-center text-secondary py-1">
                      Enter your Email number to Login/Signup.
                    </p>
                    <div className="text-center">
                      <form>
                        <div className="custom-border my-1">
                          <PhoneInput
                            country={"us"}
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                          />
                        </div>
                        {phoneNumberError && (
                          <p className="text-danger">{phoneNumberError}</p>
                        )}
                        <div id="recaptcha-container"></div>
                        <div>
                          <button
                            onClick={(e) => handleSendOTP(e, phoneNumber)}
                            className="my-4 py-1 border-0 custom-border1 px-2"
                          >
                            Login with OTP{" "}
                            <i className="bi bi-arrow-right fs-6 fw-bold"></i>
                          </button>
                        </div>
                      </form>
                      <div className="text-center my-2 py-1">
                        <span className="text-muted">─────────</span>{" "}
                        <span className="mx-2">or</span>{" "}
                        <span className="text-muted">─────────</span>
                      </div>
                      <div className="img_google">
                        <button
                          className="px-5 py-2"
                          onClick={handleGoogleSignIn}
                        >
                          <img
                            src={Google}
                            alt="googleee"
                            className="img-fluid px-2"
                          />
                          Google
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="row">
            <div className="col text-center">
              <p className="my-5 text-secondary">
                By logging in, you're agreeing to our ?{" "}
                <a href="#" className="text-secondary">
                  Privacy Policy.
                </a>
                <a href="#" className="text-secondary">
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* end otp  */}
      </div>
    </div>
  </>
  );
};

export default Login;

