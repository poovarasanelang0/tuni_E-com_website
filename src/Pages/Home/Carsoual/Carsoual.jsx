import React from 'react';
import Carsoul1 from "../Assets/car1.webp";
import Carsoul2 from "../Assets/car2.webp";
import Carsoul3 from "../Assets/car3.webp";
import Carsoul4 from "../Assets/car5.webp";
import "./Carsoual.css"
import zIndex from '@mui/material/styles/zIndex';

const Carsoual = () => {
  return (
    <>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
        <div id="carouselExampleIndicators" className="carousel slide " data-bs-ride="carousel">
        <div className="carousel-indicators" style={{zIndex:"1"}}>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={3} aria-label="Slide 4" />
        </div>
        <div className="carousel-inner carsoul_bar">
          <div className="carousel-item active">
            <img src={Carsoul1} className="d-block w-100" alt="Carsoul 1" />
          </div>
          <div className="carousel-item">
            <img src={Carsoul2} className="d-block w-100" alt="Carsoul 2" />
          </div>
          <div className="carousel-item">
            <img src={Carsoul3} className="d-block w-100" alt="Carsoul 3" />
          </div>
          <div className="carousel-item">
            <img src={Carsoul4} className="d-block w-100" alt="Carsoul 4" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bg_next_prev_color shadow-lg rounded-circle" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon bg_next_prev_color rounded-circle" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
        </div>

      </div>

    </div>

      
    </>
  );
};

export default Carsoual;
