import React from 'react'
import comeing from "../../JoggerMen/Assets/4-2-coming-soon-png.png"
import Header from '../../../Compoment/Header/Header'
import Footer from '../../../Compoment/Footer/Footer'
const WomenPant = () => {
  return (
    <>
        <Header />
    <div className='container'>
            <div className='row'>
                <div className='col'>
                <div className='my-2 text-center'>
                    <img src={comeing} alt="commm"></img>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default WomenPant
