import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "./SingleProductCombo.css";
import Header from "../../../Compoment/Header/Header";
import Footer from "../../../Compoment/Footer/Footer";
import RatingReviews from "../../Rating/RatingReviews";

const SingleProductCombo = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  
  const imageDetails = [
    {
      title: "Green White Tshirt Family Matching Combo",
      description: "Green White Crew Neck Men Tshirt",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
      title: "Blue Red Hoodie Combo",
      description: "Blue Red Hoodie for Men and Women",
      sizes: ["M", "L", "XL"]
    },
    {
      title: "Black Jeans Combo",
      description: "Black Jeans for Men and Women",
      sizes: ["S", "M", "L"]
    },
    {
      title: "Pink White Dress Combo",
      description: "Pink White Dress for Women",
      sizes: ["L", "XL", "XXL"]
    }
  ];

  const settings = {
    customPaging: function (i) {
      return <a>{/* Custom paging content, if any */}</a>;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setSelectedImageIndex(index),
  };

  const sliderRef = useRef(null);

  const handleSmallImageClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };
  


  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row my-1">
          <h5 className="py-3">Combo Pack</h5>
          <div className="col-lg-8 col-md-12 col-12">
            <div className="my-1">
              <div className="slider-container_combo1">
                <Slider {...settings} ref={sliderRef}>
                  <div className="slider-container_combo">
                    <img
                      src="https://tusokonline.com/cdn/shop/files/Slide10_a4e4f5f2-2ec7-4486-b6ee-af7c577c3ec8_576x.jpg?v=1714834044"
                      className="img-fluid"
                      alt="Slide 1"
                    />
                  </div>
                  <div className="slider-container_combo">
                    <img
                      src="https://tusokonline.com/cdn/shop/files/Slide4_61f3fde9-fe1a-4f21-bdb1-c9e57a88df11_576x.jpg?v=1714834055"
                      className="img-fluid"
                      alt="Slide 2"
                    />
                  </div>
                  <div className="slider-container_combo">
                    <img
                      src="https://tusokonline.com/cdn/shop/files/Slide1_2cc55f8c-afa9-4cc8-9a58-44c657b3fd10_576x.jpg?v=1714834067"
                      className="img-fluid"
                      alt="Slide 3"
                    />
                  </div>
                  <div className="slider-container_combo">
                    <img
                      src="https://tusokonline.com/cdn/shop/files/Slide2_ba912504-354d-4435-87c0-4be083230399_576x.jpg?v=1714834083"
                      className="img-fluid"
                      alt="Slide 4"
                    />
                  </div>
                </Slider>
              </div>
              <div className="small-images-container mt-3">
                {[
                  "Slide10_a4e4f5f2-2ec7-4486-b6ee-af7c577c3ec8_576x.jpg?v=1714834044",
                  "Slide4_61f3fde9-fe1a-4f21-bdb1-c9e57a88df11_576x.jpg?v=1714834055",
                  "Slide1_2cc55f8c-afa9-4cc8-9a58-44c657b3fd10_576x.jpg?v=1714834067",
                  "Slide2_ba912504-354d-4435-87c0-4be083230399_576x.jpg?v=1714834083",
                ].map((src, index) => (
                  <div
                    key={index}
                    className="small-image-box"
                    onClick={() => handleSmallImageClick(index)}
                  >
                    <img
                      src={`https://tusokonline.com/cdn/shop/files/${src}`}
                      className="img-fluid"
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <div className="">
              <h1>{imageDetails[selectedImageIndex].title}</h1>
              <p>{imageDetails[selectedImageIndex].description}</p>
              <div className="size-options mx-3">
                {imageDetails[selectedImageIndex].sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => handleSizeClick(size)}
                    className={`btn  ${
                      selectedSize === size
                        ? "btn-primary"
                        : "btn-outline-primary"
                    } mx-1 my-1`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="price-box my-2">
                <h3>Price:</h3>
                <p><i class="bi bi-currency-rupee"></i>2777.00 (For set of 4 pieces)</p>
              </div>
              <div><button className="bg-primary border-0 px-3 py-1 text-white ">Add to Cart</button></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div>
              <RatingReviews />
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProductCombo;
