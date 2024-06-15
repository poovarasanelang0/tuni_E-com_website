import React from 'react'
import { Container, Row, Col } from "reactstrap";
import Header from '../../Compoment/Header/Header';
import Footer from '../../Compoment/Footer/Footer';

const ShippingPolicy = () => {
  return (
   <>
   <Header />
   <Container className='mt-5 pt-3'>
    <Row>
        <Col className='font'>
        <div className='title'>
            <h2>Shipping Policy</h2>
        </div>
        <div>
            <b>Shipping Rates</b>
            <p className='text-muted'>•We offer free shipping across India for all prepaid orders. For COD orders, an additional fee is applicable to "cash handling" by the carrier partner.</p>
        </div>
        <div>
            <b>Order Processing</b>
            <p  className='text-muted'>•We strive to fulfill orders as soon as you place them. In most cases, your order will be expected to be dispatched within 1-2 business days.
            </p>
        </div>
        <div>
            <b>Delivery Time</b>
            <p  className='text-muted'>•We usually take 2-5 working days, depending on your location. Metros 2-3 days and the Rest of India 3-5 days. However, you can track your package using a unique tracking link, which we will email/SMS you after your order is sent to our delivery partner.
            </p>
        </div>
        <div>
            <b> ORDER TRACKING</b>
            <p  className='text-muted'>•You'll receive a tracking number from us in your inbox as soon as it ships! Orders can be tracked in real-time via this link - <b>Track Order</b> </p>
        </div>

          
        </Col>
    </Row>
   </Container>

   <Footer />
   </> 
  )
}

export default ShippingPolicy
