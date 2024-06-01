// import React from 'react';
// import "./Header.css";

// import Marquee from "react-fast-marquee";
// import logocompany from "./Assets/Tuni full logo.svg"
// import DrawerAppBar from './DrawerAppBar';


// const Header = () => {
//   return (
//     <>
//     <div className='container-fluid fixed-top' style={{zIndex:"1"}}>
//       <div className='row  marquee_bg_color'>
//       <p className='justify-content-center align-items-center py-1'><Marquee>Get Flat 10% Off on 1567/- or above. Use Code-FLAT10 </Marquee></p>  
//       </div>
//     </div>
   
//    {/* 2nd header */}
//    <div className='container'>
//       <div className='row'>
//       <DrawerAppBar />
//       </div>
//     </div>
//    {/* end 2nd header */}
//     </>
//   );
// }

// export default Header;



import React, { useState, useEffect } from 'react';
import "./Header.css";

import Marquee from "react-fast-marquee";
import logocompany from "./Assets/Tuni full logo.svg";
import DrawerAppBar from './DrawerAppBar';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setShowHeader(false);
    } else {
      // Scrolling up
      setShowHeader(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div className={`container-fluid fixed-top ${showHeader ? '' : 'header-hidden'}`} style={{ zIndex: "1" }}>
        <div className='row marquee_bg_color'>
          <p className='justify-content-center align-items-center py-1'>
            <Marquee>Get Flat 10% Off on 1567/- or above. Use Code-FLAT10</Marquee>
          </p>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <DrawerAppBar />
        </div>
      </div>
    </>
  );
};

export default Header;
