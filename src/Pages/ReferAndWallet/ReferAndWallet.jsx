import React from "react";
import "./ReferAndWallet.css";
import img02 from "./Assets/Images/img02.png";
import img01 from "./Assets/Images/img01.png";
import img03 from "./Assets/Images/img3.png";
import img04 from "./Assets/Images/img4.png";
import img05 from "./Assets/Images/img5.png";
import img06 from "./Assets/Images/img6.png";
import Header from "../../Compoment/Header/Header";
import Footer from "../../Compoment/Footer/Footer";

const ReferAndWallet = () => {
  return (
    <>
    <Header />
      <div className="container mt-5 my-1">
        <div className="backgroundimg">
          <div className="row">
            <div className="col-lg-5 d-flex my-3">
              <div className="boxbored d-flex">
                <div className="my-4 px-2 py-1">
                  <div className="d-flex">
                    <h6>Current Balance :-  </h6>
                    
                    
                  </div>
                  <div className="rupee">
                    <i class="bi bi-currency-rupee"></i>27,163.00
                  </div>
                  <p className="small">
                  
                  To withdraw from your wallet, enter your full name and UPI ID, then click "Verify" to ensure they match. After verification, click "Submit" to complete the withdrawal, ensuring all fields are correctly filled to avoid errors.                  </p>
                  
                </div>
                <div className="img_02 ">
                  <img src={img02} alt="" />
                 <div className="">
                 <button type="button" class="btn btn-dark d-flex align-items-center">
                    WithDraw Earnings
                  </button>
                 </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 my-3 ">
              <div className="backbox2 d-flex">
                <div className="  my-3">
                  <h4 className="my-3">Referral Count</h4>
                  <h1 className="count_name my-3">42</h1>
                  <p className="small">
                  Your referral count shows how many users signed up with your unique link. Each successful referral earns you rewards and benefits.
                  </p>
                </div>
                <div>
                  <div className="total_earnings">
                    <h6>Total Earnings :-</h6>
                    <h1>4500</h1>
                  </div>
                  <div className="imgo1">
                    <img src={img01} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 my-3">
              <div className="backbox3">
                <h6>
                  <b>Spread the world and earn reward</b>
                </h6>
                <p>Get 10% cashpack for each person you refer to Tuni only for combo product</p>
                <div className="my-3">
                  <p>Share your unique referral link</p>
                  <div>
                    <div className="  input-group  form_control">
                      <div>
                        <input
                          type="text"
                          className="form-control "
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                        />
                      </div>

                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                      >
                        <i class="bi bi-copy"></i> Copy
                      </button>
                    </div>
                  </div>

                  <div className="social_media my-3">
                    <i class="bi bi-facebook"></i>
                    <i class="bi bi-whatsapp"></i>
                    <i class="bi bi-instagram"></i>
                    <i class="bi bi-telegram"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="backbox4">
                <ul className="ul_font">
                  <i class="bi bi-share-fill">
                    {" "}
                    <b>Share your refferal link</b>
                  </i>

                  <li className="li_font text-muted">
                    Invite your friends to join the tunii using your unique
                    referral link
                  </li>
                </ul>
                <ul className="ul_font">
                  <i class="bi bi-person-fill-add">
                    {""}
                    <b>Your friend joins</b>
                  </i>
                  <li className="li_font text-muted">
                    When your friends joins tuni through your shared link, they
                    become a part of our community.
                  </li>
                </ul>
                <ul className="ul_font">
                  <i class="bi bi-brightness-high-fill">
                    {""}
                    <b>You both earn reward</b>
                  </i>
                  <li className="li_font text-muted">
                    As a token of appreciation , both you and your friend will
                    receive 10 credits each
                  </li>
                </ul>
              </div>
            </div>

            <div className=" col-lg-12 align-items-center">
              <h2>How it works</h2>
            </div>
            <div className="d-flex content_items">
              <div className="col-lg-3">
                <div className="text_box1">
                  <h4>01</h4>
                  <hr />
                  <h4>
                    REFERRAL
                    <br />
                    PROGRAM
                  </h4>
                  <div className="image-container">
                    <img src={img03} alt="" />
                  </div>
                  <p>Share your referral code with friends</p>
                  <div>
                    <span class="badge text-bg-light">NEXT</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="text_box1">
                  <h4>02</h4>
                  <hr />
                  <h4>
                    REFERRAL
                    <br />
                    QR CODE
                  </h4>
                  <div className="image-container">
                    <img src={img04} alt="" />
                  </div>
                  <p>Apply the code while ordering the combo product</p>
                  <div>
                    <span class="badge text-bg-light">NEXT</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="text_box1">
                  <h4>03</h4>
                  <hr />
                  <h4>
                    REFERRAL
                    <br />
                    REWARD
                  </h4>
                  <div className="image-container">
                    <img src={img05} alt="" />
                  </div>
                  <p>
                    Once Someone places an order using your code
                  </p>
                  <div>
                    <span class="badge text-bg-light">NEXT</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="text_box1">
                  <h4>04</h4>
                  <hr />
                  <h4>
                    REFERRAL
                    <br />
                    PROGRAM
                  </h4>
                  <div className="image-container">
                    <img src={img06} alt="" />
                  </div>
                  <p>
                  you will get
                  10% of the order amount                  </p>
                  <div>
                    <span class="badge text-bg-light">NEXT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReferAndWallet;
