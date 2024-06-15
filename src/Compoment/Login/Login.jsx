// import React, { useState, useEffect, useRef } from "react";
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
// import {
//   collection,
//   addDoc,
//   doc,
//   getDoc,
//   getDocs,
//   setDoc, query, where,
// } from "firebase/firestore";

// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const [showOTPForm, setShowOTPForm] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [verificationCode, setVerificationCode] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [error, setError] = useState("");
//   const [previousPage, setPreviousPage] = useState("");
//   const [phoneNumberError, setPhoneNumberError] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       const user = auth.currentUser;
//       setIsLoggedIn(!!user);
//     };

//     checkAuthStatus();
//   }, []);

//   const isValidIndianPhoneNumber = (phoneNumber) => {
//     const indianPhoneNumberRegex = /^\+91[0-9]{10}$/;
//     return indianPhoneNumberRegex.test(phoneNumber);
//   };

//   provider.setCustomParameters({
//     prompt: "select_account "
//   });

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

//   // const addGoogleUserToFirestore = async (user) => {
//   //   try {
//   //     const userDocRef = doc(collection(firestore, "users"), user.uid);
//   //     const docSnapshot = await getDoc(userDocRef);

//   //     if (!docSnapshot.exists()) {
//   //       await setDoc(userDocRef, {
//   //         email: user.email,
//   //         displayName: user.displayName,
//   //         photoURL: user.photoURL,
//   //         referralCode: generateReferralCode(),
//   //       });
//   //       console.log("Google user added to Firestore:", user.uid);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error adding Google user to Firestore:", error);
//   //   }
//   // };

//   const addGoogleUserToFirestore = async (user) => {
//     try {
//       const userDocRef = doc(firestore, "users", user.uid);
//       const personalDetailsRef = collection(userDocRef, "personal_details");
  
//       const docSnapshot = await getDoc(userDocRef);
  
//       if (!docSnapshot.exists()) {
//         const referralCode = generateReferralCode();
//         await addDoc(personalDetailsRef, {
//           email: user.email,
//           referralCode: referralCode,
//         });
//         console.log("Google user added to Firestore:", user.uid);
//       } else {
//         console.log("User already exists in Firestore:", user.uid);
  
//         // Fetch the user's referral code and details
//         const q = query(personalDetailsRef, where("email", "==", user.email));
//         const querySnapshot = await getDocs(q);
  
//         querySnapshot.forEach((doc) => {
//           console.log("Referral Code:", doc.data().referralCode);
//           console.log("User Details:", doc.data());
//         });
//       }
//     } catch (error) {
//       console.error("Error adding Google user to Firestore:", error);
//     }
//   };

//   const handlePhoneNumberChange = (value) => {
//     setPhoneNumber(value);
//     setPhoneNumberError("");
//   };

//   const handleSendOTP = async (e, phoneNumber) => {
//     e.preventDefault();
//     try {
//       console.log("Sending OTP...");

//       if (!phoneNumber || !isValidIndianPhoneNumber(phoneNumber)) {
//         setPhoneNumberError("Please enter a valid Indian phone number.");
//         return;
//       }

//       console.log("Initializing Recaptcha...");
//       const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container");
//       console.log("Recaptcha initialized.");

//       console.log("Sending OTP to phone number:", phoneNumber);
//       const confirmation = await signInWithPhoneNumber(
//         auth,
//         phoneNumber,
//         recaptcha
//       );
//       console.log("OTP sent successfully:", confirmation);
//       setConfirmationResult(confirmation);
//       setShowOTPForm(true);
//       setPreviousPage("login");
//       toast.success("OTP Sent Successfully");
//     } catch (err) {
//       console.error("Error sending OTP:", err);
//       setError(err.message);
//       toast.error("Error sending OTP. Please try again later.");
//     }
//   };

//   const handleVerifyOTP = async (otp) => {
//     try {
//       const userCredential = await confirmationResult.confirm(otp);
//       const phoneNumber = userCredential.user.phoneNumber;
//       const userId = userCredential.user.uid;
//       toast.success("OTP Verified Successfully...");

//       const userDocRef = doc(collection(firestore, "users"), userId);
//       const docSnapshot = await getDoc(userDocRef);
//       if (!docSnapshot.exists()) {
//         await addPhoneNumberToFirestore(userId, phoneNumber);
//       }

//       navigate("/");
//       window.location.reload();
//     } catch (err) {
//       setError("Invalid OTP. Please try again.");
//     }
//   };

//   const phoneNumberRef = useRef(null);

//   const handleResendOTP = async () => {
//     try {
//       console.log("Resending OTP...", confirmationResult);
//       const phoneNumber = phoneNumberRef.current.value;
//       console.log(phoneNumber, "phoneNumberphoneNumber");
//       if (!confirmationResult) {
//         setError("No confirmation result available. Please try again.");
//         return;
//       }

//       const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container");
//       await signInWithPhoneNumber(auth, phoneNumber, recaptcha);

//       toast.success("OTP Resent Successfully");
//     } catch (err) {
//       console.error("Error resending OTP:", err);
//       setError("Error resending OTP. Please try again later.");
//       toast.error("Error resending OTP. Please try again later.");
//     }
//   };

//   const addPhoneNumberToFirestore = async (userId, phoneNumber) => {
//     try {
//       const userDocRef = doc(collection(firestore, "users"), userId);
//       const personalDetailsRef = collection(userDocRef, "personal_details");
//       const querySnapshot = await getDocs(personalDetailsRef);
//       const existingPhoneNumberDoc = querySnapshot.docs.find(
//         (doc) => doc.data().phoneNumber === phoneNumber
//       );

//       if (!existingPhoneNumberDoc) {
//         const contactInfoDocRef = await addDoc(personalDetailsRef, {
//           phoneNumber,
//           referralCode: generateReferralCode(),
//         });
//         console.log("Phone number added:", contactInfoDocRef.id);
//       } else {
//         console.log("Phone number already exists:", existingPhoneNumberDoc.id);
//       }
//     } catch (err) {
//       console.error("Error adding phone number:", err);
//     }
//   };

//   const generateReferralCode = () => {
//     return Math.random().toString(36).substring(2, 10).toUpperCase();
//   };


//   // const generateReferralCode = () => {
//   //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   //   let result = '';
//   //   const charactersLength = characters.length;
//   //   for (let i = 0; i < 8; i++) {
//   //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   //   }
//   //   return result;
//   // };

//   const handleGoBack = () => {
//     if (previousPage === "login") {
//       setShowOTPForm(false);
//       setError("");
//     }
//   };

//   const logout = async () => {
//     try {
//       localStorage.clear();
//       await auth.signOut();
//       toast.success("Successfully logged out");
//       navigate("/");
//       window.location.reload();
//     } catch (error) {
//       console.error("Error logging out:", error.message);
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="row my-1">
//           <div className="col-lg-7 col-md-12 col-12">
//             <div className="login_image_logo text-center">
//               <img src={LoginSignupImg} alt="" className="img-fluid" />
//             </div>
//             <div className="my-3">
//               <p className="text-white fw-bold fs-5 text-center family_font">
//                 Join the TUNi Family for a delightful shopping experience
//               </p>
//             </div>
//             <div className="row my-5">
//               <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
//                 <div className="shadow_lg d-flex flex-column w-100">
//                   <div className="text-center small_image">
//                     <img src={fotterimg1} alt="" className="img-fluid my-3" />
//                   </div>
//                   <div className="py-2 flex-grow-1">
//                     <p className="text-center heading_font text-white fw-bold">
//                       Premium Quality Clothes
//                     </p>
//                     <p className="text-center text-white para_font">
//                       Quality, comfort, and style – TUNi delivers on all fronts
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
//                 <div className="shadow_lg d-flex flex-column w-100">
//                   <div className="text-center small_image">
//                     <img src={fotterimg1} alt="" className="img-fluid my-3" />
//                   </div>
//                   <div className="py-2 flex-grow-1">
//                     <p className="text-center heading_font text-white fw-bold">
//                       Great Customer Experience
//                     </p>
//                     <p className="text-center text-white para_font">
//                       For us customer experience comes first -TUNi
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6 col-sm-4 d-none d-md-block mb-3 d-flex">
//                 <div className="shadow_lg d-flex flex-column w-100">
//                   <div className="text-center small_image">
//                     <img src={fotterimg1} alt="" className="img-fluid my-3" />
//                   </div>
//                   <div className="py-2 flex-grow-1">
//                     <p className="text-center heading_font text-white fw-bold">
//                       Best Team Behind Your Clothes
//                     </p>
//                     <p className="text-center text-white para_font">
//                       We have the best talents to produce clothes you love
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* otp */}
//           <div
//             className="col-lg-5 col-md-12 col-12"
//             style={{ background: "white", borderRadius: "10px" }}
//           >
//             <div className="my-1">
//               {isLoggedIn ? (
//                 <p className="text-danger text-center mt-3">
//                   Error: Already logged in. Please log out to access this page.
//                   <button
//                     className="px-1 border-0 py-1 bg-info"
//                     onClick={logout}
//                   >
//                     Logout
//                   </button>
//                 </p>
//               ) : (
//                 <>
//                   {showOTPForm ? (
//                     <OtpForm
//                       handleVerifyOTP={handleVerifyOTP}
//                       handleResendOTP={handleResendOTP}
//                       phoneNumber={phoneNumber}
//                       handleGoBack={handleGoBack}
//                       setError={setError}
//                       error={error}
//                     />
//                   ) : (
//                     <>
//                       <h4 className="text-center fw-bold my-3 py-1">
//                         Delighted to have you!
//                       </h4>
//                       <p className="text-center text-secondary py-1">
//                         Enter your number or Email to Login/Signup.
//                       </p>
//                       <div className="text-center">
//                         <form>
//                           <div className="custom-border my-1">
//                             <PhoneInput
//                               country={"us"}
//                               placeholder="Enter phone number"
//                               value={phoneNumber}
//                               ref={phoneNumberRef}
//                               onChange={handlePhoneNumberChange}
//                             />
//                           </div>
//                           {phoneNumberError && (
//                             <p className="text-danger">{phoneNumberError}</p>
//                           )}
//                           <div id="recaptcha-container"></div>
//                           <div>
//                             <button
//                               onClick={(e) => handleSendOTP(e, phoneNumber)}
//                               className="my-4 py-1 border-0 custom-border1 px-2"
//                             >
//                               Login with OTP{" "}
//                               <i className="bi bi-arrow-right fs-6 fw-bold"></i>
//                             </button>
//                           </div>
//                         </form>
//                         <div className="text-center my-2 py-1">
//                           <span className="text-muted">─────────</span>{" "}
//                           <span className="mx-2">or</span>{" "}
//                           <span className="text-muted">─────────</span>
//                         </div>
//                         <div className="img_google">
//                           <button
//                             className="px-5 py-2"
//                             onClick={handleGoogleSignIn}
//                           >
//                             <img
//                               src={Google}
//                               alt="google"
//                               className="img-fluid px-2"
//                             />
//                             Google
//                           </button>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </>
//               )}
//             </div>

//             <div className="row">
//               <div className="col text-center">
//                 <p className="my-5 text-secondary">
//                   By logging in, you're agreeing to our?{" "}
//                   <a href="/PrivacyPolicy" className="text-secondary">
//                     Privacy Policy.
//                   </a>
//                   <a href="/TermConditions" className="text-secondary">
//                     Terms of Service
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//           {/* end otp  */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;


 




















import React, { useState, useEffect, useRef } from "react";
import "./LoginSignup.css";
import LoginSignupImg from "./assets/small.png";
import fotterimg1 from "./assets/corousal_icon_filled.svg";
import Google from "./assets/google.png";
import { useNavigate } from "react-router-dom";
import OtpForm from "./OtpForm";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { auth, provider, firestore } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc, query, where,
} from "firebase/firestore";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralDetails, setReferralDetails] = useState(null);
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

  provider.setCustomParameters({
    prompt: "select_account "
  });

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

  const addGoogleUserToFirestore = async (user) => {
    try {
      const userDocRef = doc(firestore, "users", user.uid);
      const personalDetailsRef = collection(userDocRef, "personal_details");
  
      const docSnapshot = await getDoc(userDocRef);
  
      if (!docSnapshot.exists()) {
        const referralCode = generateReferralCode();
        await addDoc(personalDetailsRef, {
          email: user.email,
          referralCode: referralCode,
          phoneNumber: user.phoneNumber || "", // assuming phoneNumber might not be available
        });
        console.log("Google user added to Firestore:", user.uid);
      } else {
        console.log("User already exists in Firestore:", user.uid);
  
        // Fetch the user's referral code and details
        const q = query(personalDetailsRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach((doc) => {
          console.log("Referral Code:", doc.data().referralCode);
          console.log("User Details:", doc.data());
        });
      }
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
      console.log("Sending OTP...");

      if (!phoneNumber || !isValidIndianPhoneNumber(phoneNumber)) {
        setPhoneNumberError("Please enter a valid Indian phone number.");
        return;
      }

      console.log("Initializing Recaptcha...");
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container");
      console.log("Recaptcha initialized.");

      console.log("Sending OTP to phone number:", phoneNumber);
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptcha
      );
      console.log("OTP sent successfully:", confirmation);
      setConfirmationResult(confirmation);
      setShowOTPForm(true);
      setPreviousPage("login");
      toast.success("OTP Sent Successfully");
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError(err.message);
      toast.error("Error sending OTP. Please try again later.");
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const phoneNumber = userCredential.user.phoneNumber;
      const userId = userCredential.user.uid;
      toast.success("OTP Verified Successfully...");

      const userDocRef = doc(collection(firestore, "users"), userId);
      const docSnapshot = await getDoc(userDocRef);
      if (!docSnapshot.exists()) {
        await addPhoneNumberToFirestore(userId, phoneNumber);
      }

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  const phoneNumberRef = useRef(null);

  const handleResendOTP = async () => {
    try {
      console.log("Resending OTP...", confirmationResult);
      const phoneNumber = phoneNumberRef.current.value;
      console.log(phoneNumber, "phoneNumberphoneNumber");
      if (!confirmationResult) {
        setError("No confirmation result available. Please try again.");
        return;
      }

      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container");
      await signInWithPhoneNumber(auth, phoneNumber, recaptcha);

      toast.success("OTP Resent Successfully");
    } catch (err) {
      console.error("Error resending OTP:", err);
      setError("Error resending OTP. Please try again later.");
      toast.error("Error resending OTP. Please try again later.");
    }
  };

  const addPhoneNumberToFirestore = async (userId, phoneNumber) => {
    try {
      const userDocRef = doc(collection(firestore, "users"), userId);
      const personalDetailsRef = collection(userDocRef, "personal_details");
      const querySnapshot = await getDocs(personalDetailsRef);
      const existingPhoneNumberDoc = querySnapshot.docs.find(
        (doc) => doc.data().phoneNumber === phoneNumber
      );

      if (!existingPhoneNumberDoc) {
        const contactInfoDocRef = await addDoc(personalDetailsRef, {
          phoneNumber,
          referralCode: generateReferralCode(),
        });
        console.log("Phone number added:", contactInfoDocRef.id);
      } else {
        console.log("Phone number already exists:", existingPhoneNumberDoc.id);
      }
    } catch (err) {
      console.error("Error adding phone number:", err);
    }
  };

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleGoBack = () => {
    if (previousPage === "login") {
      setShowOTPForm(false);
      setError("");
    }
  };

  const handleReferralCodeChange = (event) => {
    setReferralCode(event.target.value);
    console.log(event.target.value ,"referal");
  };

  // const handleReferralCodeSubmit = async (event) => {
  //   event.preventDefault();
  //   setError(""); // Clear any previous errors
  //   setReferralDetails(null); // Clear previous referral details
  //   console.log("Refer start...");
  
  //   try {
  //     // Validate referral code input
  //     if (!referralCode) {
  //       setError("Please enter a referral code.");
  //       return;
  //     }
  
  //     // Assuming you have the userId available
  //     const userId = "WEv8IhgHFWRlTnvHC6adU0cPWJm2"; // Replace with the actual user ID
  
  //     console.log("Checking user:", userId);
  
  //     // Reference the user's document and their personal details sub-collection
  //     const userDocRef = doc(firestore, "users", userId);
  //     const personalDetailsRef = collection(userDocRef, "personal_details");
  
  //     // Query the 'personal_details' sub-collection for the referral code
  //     const q = query(personalDetailsRef, where("referralCode", "==", referralCode));
  //     const querySnapshot = await getDocs(q);
  
  //     if (!querySnapshot.empty) {
  //       console.log("Referral code found for user:", userId);
  
  //       const personalDetailsDoc = querySnapshot.docs[0];
  //       const userDetails = personalDetailsDoc.data();
  //       setReferralDetails(userDetails);
  //       console.log(userDetails, "LOGIN userDetailsuserDetails");
  //     } else {
  //       setError("Referral code not found.");
  //     }
  //   } catch (error) {
  //     setError("Error fetching referral details. Please try again later.");
  //     console.error("Error fetching referral details:", error);
  //   }
  // };


  // const handleReferralCodeSubmit = async (event) => {
  //   event.preventDefault();
  //   setError(""); // Clear any previous errors
  //   setReferralDetails(null); // Clear previous referral details
  //   console.log("Refer start...");
  
  //   try {
  //     // Validate referral code input
  //     if (!referralCode) {
  //       setError("Please enter a referral code.");
  //       return;
  //     }
  
  //     console.log("Searching for referral code:", referralCode);
  
  //     // Reference the 'users' collection
  //     const usersRef = collection(firestore, "users");
  //     const usersSnapshot = await getDocs(usersRef);
  
  //     let found = false;
  
  //     // Iterate through all users
  //     for (const userDoc of usersSnapshot) {
  //       const userId = userDoc.id;
  //       console.log(userId,"userId");
  //       // const personalDetailsRef = collection(firestore, `users/${userId}/personal_details`);
  //       // const q = query(personalDetailsRef, where("referralCode", "==", referralCode));
  //       // const querySnapshot = await getDocs(q);
  
  //       // if (!querySnapshot.empty) {
  //       //   console.log("Referral code found.");
  
  //       //   // Assuming there is only one document with the given referral code
  //       //   const personalDetailsDoc = querySnapshot.docs[0];
  //       //   const userDetails = personalDetailsDoc.data();
  //       //   setReferralDetails(userDetails);
  //       //   console.log(userDetails, "LOGIN userDetails");
  
  //       //   // Display user ID
  //       //   console.log("User ID associated with referral code:", userId);
  //       //   alert(`User ID associated with referral code: ${userId}`);
          
  //       //   found = true;
  //       //   break; // Exit the loop once the referral code is found
  //       // }
  //     }
  
  //     if (!found) {
  //       setError("Referral code not found.");
  //     }
  //   } catch (error) {
  //     setError("Error fetching referral details. Please try again later.");
  //     console.error("Error fetching referral details:", error);
  //   }
  // };
  
  const handleReferralCodeSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear any previous errors
    setReferralDetails(null); // Clear previous referral details
    console.log("Refer start...");
  
    try {
      // Validate referral code input
      if (!referralCode) {
        setError("Please enter a referral code.");
        return;
      }
  
      console.log("Searching for referral code:", referralCode);
  
      const usersRef = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersRef);
  
      let found = false;
  
      // Iterate through all users
      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        console.log(userId, "userId");
        
        // Reference the user's 'personal_details' sub-collection
        const personalDetailsRef = collection(firestore, `users/${userId}/personal_details`);
        const q = query(personalDetailsRef, where("referralCode", "==", referralCode));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          console.log("Referral code found.");
  
          // Assuming there is only one document with the given referral code
          const personalDetailsDoc = querySnapshot.docs[0];
          const userDetails = personalDetailsDoc.data();
          setReferralDetails(userDetails);
          console.log(userDetails, "LOGIN userDetails");
  
          // Display user ID
          console.log("User ID associated with referral code:", userId);
          alert(`User ID associated with referral code: ${userId}`);
          
          found = true;
          break; // Exit the loop once the referral code is found
        }
      }
  
      if (!found) {
        setError("Referral code not found.");
      }
    } catch (error) {
      setError("Error fetching referral details. Please try again later.");
      console.error("Error fetching referral details:", error);
    }
  };
  
  
  
  

  const logout = async () => {
    try {
      localStorage.clear();
      await auth.signOut();
      toast.success("Successfully logged out");
      navigate("/");
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
                    Logout
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
                      setError={setError}
                      error={error}
                    />
                  ) : (
                    <>
                      <h4 className="text-center fw-bold my-3 py-1">
                        Delighted to have you!
                      </h4>
                      <p className="text-center text-secondary py-1">
                        Enter your number or Email to Login/Signup.
                      </p>
                      <div className="text-center">
                        <form>
                          <div className="custom-border my-1">
                            <PhoneInput
                              country={"us"}
                              placeholder="Enter phone number"
                              value={phoneNumber}
                              ref={phoneNumberRef}
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
                              alt="google"
                              className="img-fluid px-2"
                            />
                            Google
                          </button>
                        </div>
                        <div className="text-center my-4">
                          <form onSubmit={handleReferralCodeSubmit}>
                            <input
                              type="text"
                              placeholder="Enter referral code"
                              value={referralCode}
                              onChange={handleReferralCodeChange}
                              className="form-control my-2"
                            />
                            <button
                              type="submit"
                              className="btn btn-primary"
                            >
                              Check Referral Code
                            </button>
                          </form>
                          {referralDetails && (
                            <div className="mt-3">
                              <h5>Referral Details:</h5>
                              <p>Name: {referralDetails.firstname}</p>
                              <p>Email: {referralDetails.email}</p>
                              <p>Phone: {referralDetails.phoneNumber}</p>
                            </div>
                          )}
                          {error && <p className="text-danger">{error}</p>}
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
                  By logging in, you're agreeing to our?{" "}
                  <a href="/PrivacyPolicy" className="text-secondary">
                    Privacy Policy.
                  </a>
                  <a href="/TermConditions" className="text-secondary">
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


