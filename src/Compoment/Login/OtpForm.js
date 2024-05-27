// import React, { useState, useEffect, useRef } from "react";

// const OtpForm = ({
//   handleVerifyOTP,
//   handleResendOTP,
//   error,
//   phoneNumber,
//   handleGoBack,
// }) => {
//   const [otp, setOtp] = useState(Array(6).fill(""));
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(10);

//   const inputRefs = useRef([]);

//   useEffect(() => {
//     let timer;
//     if (resendDisabled && countdown > 0) {
//       timer = setTimeout(() => {
//         setCountdown((prevCount) => prevCount - 1);
//       }, 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [resendDisabled, countdown]);

//   useEffect(() => {
//     if (countdown === 0) {
//       setResendDisabled(false);
//       setCountdown(10);
//     }
//   }, [countdown]);

//   const handleChange = (index, value) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Move to next input box
//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//     // Move to previous input box
//     else if (!value && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const fullOtp = otp.join("");
//     handleVerifyOTP(fullOtp);
//   };

//   const handleResendClick = () => {
//     handleResendOTP();
//     setResendDisabled(true);
//   };

//   return (
//     <div>
//       <h4 className="text-center fw-bold my-3 py-1">Verify your Number!</h4>
//       <p className="text-center text-secondary py-1">
//         We have sent verification code to {phoneNumber}{" "}
//         <button className="border-0">
//           <span className="badge text-bg-warning" onClick={handleGoBack}>
//             Edit and Resend
//           </span>
//         </button>{" "}
//       </p>
//       <form onSubmit={handleSubmit}>
//         {error && <div className="alert alert-danger">{error}</div>}
//         <div className="d-flex justify-content-center">
//           {/* Generate OTP input boxes */}
//           {[...Array(6)].map((_, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength={1}
//               className="form-control mx-1 text-center"
//               style={{ width: "50px" }}
//               value={otp[index]}
//               onChange={(e) => handleChange(index, e.target.value)}
//               ref={(el) => (inputRefs.current[index] = el)}
//             />
//           ))}
//         </div>

//         <div className="text-center mt-3">
//           <button
//             type="button"
//             className="btn btn-link"
//             onClick={handleResendClick}
//             disabled={resendDisabled}
//           >
//             {resendDisabled
//               ? `Resend in ${countdown} seconds`
//               : "ReSend"}
//           </button>
//         </div>
//         <div className="text-center mt-3">
//           <button type="submit" className="btn btn-primary mx-2">
//             Verify
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default OtpForm;

import React, { useState, useEffect, useRef } from "react";

const OtpForm = ({
  handleVerifyOTP,
  handleResendOTP,
  error,
  setError,
  phoneNumber,
  handleGoBack,
}) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const inputRefs = useRef([]);

  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(10);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input box
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    // Move to previous input box
    else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some((value) => value === "")) {
      setError("Please enter the complete OTP.");
      return;
    }

    const fullOtp = otp.join("");
    handleVerifyOTP(fullOtp);
  };

  const handleResendClick = () => {
    handleResendOTP();
    setResendDisabled(true);
  };

  return (
    <div>
      <h4 className="text-center fw-bold my-3 py-1">Verify your Number!</h4>
      <p className="text-center text-secondary py-1">
        We have sent a verification code to {phoneNumber}{" "}
        <button className="border-0">
          <span className="badge text-bg-warning" onClick={handleGoBack}>
            Edit and Resend
          </span>
        </button>{" "}
      </p>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-flex justify-content-center otpbox">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="form-control mx-1 text-center bg-secondary text-white"
              style={{ width: "50px" }}
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>

        {/* <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link"
            onClick={handleResendClick}
            disabled={resendDisabled}
          >
            {resendDisabled ? `Resend in ${countdown} seconds` : "ReSend"}
          </button>
        </div> */}
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary mx-2">
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
