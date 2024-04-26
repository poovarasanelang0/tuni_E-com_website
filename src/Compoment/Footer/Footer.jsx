import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
    <>
<div className='container-fluid bg_color_footer'>
  <div className='row '>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-3 col-md-6 col-12 my-3 text-white'>
          <h4 className='fw-bold'>Categories</h4>
          <div class="">
  <ul class="list-unstyled my-2">
    <li className='py-1 px-2'>Men</li>
    <li className='py-1 px-2'>Women</li>
    <li className='py-1 px-2'>Summer T-Shirts</li>
    <li className='py-1 px-2'>Oversized T-Shirts</li>
  </ul>
</div>

        </div>
        <div className='col-lg-3 col-md-6 col-12 my-3 text-white'>
          <h4 className='fw-bold'>Need Help</h4>
          <div class="">
  <ul class="list-unstyled my-2">
    <li className='py-1 px-2'>Track Your Order</li>
    <li className='py-1 px-2'>Returns & Exchanges</li>
    <li className='py-1 px-2'>Chat on WhatsApp</li>
    <li className='py-1 px-2'>Contact Us</li>
    <li className='py-1 px-2'>FAQs</li>
  </ul>
</div>
        </div>
        <div className='col-lg-3 col-md-6 col-12 my-3 text-white'>
          <h4 className='fw-bold'>Company</h4>
          <div class="">
  <ul class="list-unstyled my-2">
    <li className='py-1 px-2'>Shipping Policy</li>
    <li className='py-1 px-2'>Privacy Policy</li>
    <li className='py-1 px-2'>Terms of Service</li>
    
  </ul>
</div>
          </div> 
         <div className='col-lg-3 col-md-6 col-12 my-3 text-white'>
          <h4 className='fw-bold'>Get in touch</h4>
          <div class="">
  <ul class="list-unstyled  d-flex my-2">
    <li><i class="bi bi-instagram px-3 fs-2"></i></li>
    <li><i class="bi bi-facebook px-3 fs-2"></i></li>
    <li><i class="bi bi-whatsapp px-3 fs-2"></i></li>
  
  </ul>
</div>
         </div>


      </div>
    </div>

  </div>
</div>
      
    </>
  )
}

export default Footer
