import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import "./tour-card.css";

const TourCard = ({ tour }) => {
  const navigate = useNavigate();
  const { _id, title, city, photo, price, featured } = tour;

  const handleRedirect = () => {
    if(localStorage.getItem("user")) {
      navigate(`/tours/${_id}`);
    } else {
      alert("Login First");
    }
  }

  return (
    <div className="tour-card">
      <Card>
        <div className="tour-img">
          <img src={photo} alt={photo} />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card-top d-flex align-items-center justify-content-between">
            <span className="tour-location d-flex align-items-center gap-1">
              <i class="ri-map-pin-line"></i> {city}
            </span>
            <span className="tour-location d-flex align-items-center gap-1">
              <i class="ri-map-pin-line"></i>
              {/* <span>({reviews.length})</span> */}
            </span>
          </div>

          <h5 className="tour-title">
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>

          <div className="card-bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span>/per person</span>
            </h5>
            <button onClick={handleRedirect} className="btn booking-btn">
              <span>Book Now</span>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
