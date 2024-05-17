import React, { useState } from "react";

import "./LoginandSignup.css";
import {firestore} from "../../firebaseConfig"
import { getDocs ,addDoc,collection,where ,query } from "firebase/firestore";


const Login = () => {

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
// const [match ,setMatch]=useState([]);
const dbref =collection(firestore ,"Auth");


// const handleSubmit=async (e)=>{
//   const matchEmail=query(dbref ,where("Email" ,'==','email'))
//   try{
// const snapshot = await getDocs(matchEmail)
// const emailMatchArray =snapshot.docs.map((doc)=>doc.data())
// if(emailMatchArray.length > 0){
//   alert("This Email is already registered! Please login instead.")

// }else{
//   await addDoc(dbref,{Name:name,PhoneNumber:phonenumber,Email:email,Password:password})
//   alert("User Added Successfully!")
// }
//   }catch (error){
// alert("error",error);
//   }

// }
const handleSubmit = async (e) => {
  e.preventDefault();

  // Set error states for each field
  setNameError(!name);
  setPhoneNumberError(!phoneNumber);
  setEmailError(!email);
  setPasswordError(!password);

  // Check if any field is empty
  if (!name || !phoneNumber || !email || !password) {
    return; 
  }

  const matchEmail = query(dbref, where("Email", '==', email));
  const matchPhone = query(dbref, where("Phone", '==', phoneNumber));

  try {
    // Get the documents for the email query
    const emailSnapshot = await getDocs(matchEmail);
    const emailMatchArray = emailSnapshot.docs.map((doc) => doc.data());

    // Get the documents for the phone number query
    const phoneSnapshot = await getDocs(matchPhone);
    const phoneMatchArray = phoneSnapshot.docs.map((doc) => doc.data());

    // Check if both email and phone number are already registered
    if (emailMatchArray.length > 0 && phoneMatchArray.length > 0) {
      alert("This Email and Phone Number are already registered! Please login instead.");
    } else if (emailMatchArray.length > 0) {
      alert("This Email is already registered! Please login instead.");
    } else if (phoneMatchArray.length > 0) {
      alert("This Phone Number is already registered! Please login instead.");
    } else {
      await addDoc(dbref, { Name: name, PhoneNumber: phoneNumber, Email: email, Password: password });
      alert("User Added Successfully!");
    }
  } catch (error) {
    alert("Error: " + error.message); 
  }
}



  return (
    <>
      <div className="section bg_black">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3 text_color">
                  <span >Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log" />



                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center text_color">
                          <h4 className="pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Email"
                            />
                            <i className="input-icon uil uil-at" />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Password"
                            />
                            <i className="input-icon uil uil-lock-alt" />
                          </div>
                          <div className="color">
                            <a href="/" className="btn mt-4">
                              Login
                            </a>
                          </div>
                          <div className="form-group mt-2">
                            <p>Or</p>
                            <a href="/" className="btn ">
                              <i className="fa-brands fa-facebook-f" />
                            </a>
                            <a href="/" className="btn ">
                              <i className="fa-brands fa-google" />
                            </a>
                            <a href="/" className="btn ">
                              <i class="fa-brands fa-square-instagram"></i>
                            </a>
                          </div>
                          <p className="mb-0 mt-4 text-center">
                            <a
                              href="/"
                              className="link"
                            >
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>


{/* register */}
<div className="card-back">
      <div className="center-wrap">
        <div className="section text-center text_color">
          <h4 className="mb-3 pb-3">Sign Up</h4>
          <div className="form-group">
            <input
              type="text"
              className="form-style"
              placeholder="Full Name"
              onChange={(e) => { setName(e.target.value); setNameError(false); }}
            />
            <i className="input-icon uil uil-user" />
            {nameError && <p className="error-msg  text-danger">Full Name is required</p>}
          </div>
          <div className="form-group mt-2">
            <input
              type="tel"
              className="form-style"
              placeholder="Phone Number"
              onChange={(e) => { setPhoneNumber(e.target.value); setPhoneNumberError(false); }}
            />
            <i className="input-icon uil uil-phone" />
            {phoneNumberError && <p className="error-msg  text-danger">Phone Number is required</p>}
          </div>
          <div className="form-group mt-2">
            <input
              type="email"
              className="form-style"
              placeholder="Email"
              onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
            />
            <i className="input-icon uil uil-at" />
            {emailError && <p className="error-msg  text-danger">Email is required</p>}
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              className="form-style"
              placeholder="Password"
              onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
            />
            <i className="input-icon uil uil-lock-alt" />
            {passwordError && <p className="error-msg  text-danger">Password is required</p>}
          </div>
          <div className="color">
            <button className="btn mt-1 text-white fw-bold" onClick={handleSubmit}>Register</button>
          </div>
        </div>
      </div>
    </div>


{/* end register */}



                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
