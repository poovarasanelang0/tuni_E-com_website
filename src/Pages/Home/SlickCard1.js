import React,{useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card1 from './Assets/card1.webp';
import Card2 from './Assets/card2.webp';
import Card3 from './Assets/card3.webp';
import Card4 from './Assets/card4.webp';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SlickCard1 = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className="container">
      <Slider {...settings}>
        <div className="col">
          <img src={Card1} alt="card1" className="img-fluid px-2"  data-aos="flip-left"/>
        </div>
        <div className="col">
          <img src={Card2} alt="card2" className="img-fluid px-2" data-aos="flip-left" />
        </div>
        <div className="col">
          <img src={Card3} alt="card3" className="img-fluid px-2" data-aos="flip-left"/>
        </div>
        <div className="col">
          <img src={Card4} alt="card4" className="img-fluid px-2" data-aos="flip-left"/>
        </div>
      </Slider>
    </div>
  );
};

export default SlickCard1;
