import React from "react";
import Header from "../../Compoment/Header/Header";
import Footer from "../../Compoment/Footer/Footer";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="container " style={{ marginTop: "45px" }}>
        <div className="row">
          <div className="col-12">
            <div className="text-muted">
              <h4 className="text-center py-1 my-2">Contact Us</h4>
            </div>
            <div>
              <h6 className="text-muted">HELP CENTER :-</h6>
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
                  If the link doesn’t work, please WhatsApp us ‘Hi TUNi’ on{" "}
                  <a href="#" alt="">
                    +91 8921514011
                  </a>{" "}
                  and we will get back to you within 24 hours
                </span>
              </div>
              <div className="py-3 my-2">
                <h6 className="text-muted">Important Note:</h6>
                <p className="text-muted">
                  Dear Customer, In order to serve you faster & efficiently, the
                  official support of TUNi has been shifted to WhatsApp only on
                  the number -{" "}
                  <a href="#" alt="">
                    +91 8921514011{" "}
                  </a>
                  Please note, we DO NOT have ANY OTHER NUMBER for Call /
                  WhatsApp as official support Please beware, if you encounter
                  any other contact number / WhatsApp / email online, it might
                  be a spam
                  <a href="https://tunii.store/" alt="" target="_blank">
                    TUNi.Store
                  </a>
                  Tunii.store will never call you for password / OTP which may
                  lead to financial fraud For any help, feel free to reach out
                  to us -{" "}
                  <a href="#" alt="">
                    Click here{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
