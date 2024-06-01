import React from "react";
import "./WomensCombo.css";
import comeing from "../../JoggerMen/Assets/4-2-coming-soon-png.png";
import Header from "../../../Compoment/Header/Header";
import Footer from "../../../Compoment/Footer/Footer";

const WomensCombo = () => {
  return (
    <>
    <Header />
      <div className="container" >
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="my-2 text-center">
              <img src={comeing} alt="commm"></img>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WomensCombo;
