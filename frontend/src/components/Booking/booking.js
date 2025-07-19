import React, { useState, useEffect } from "react";
import "./booking.css";
import { Form, FormGroup, Button } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";

const Booking = ({ tour }) => {
  const { price } = tour || {};
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [credentials, setCredentials] = useState({
    userId: user?._id || "",
    userEmail: user?.email || "",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
    tourId: "", // Initialize as empty, set later via useEffect
  });

  const [loading, setLoading] = useState(false);

  // Redirect to login if user not logged in
  useEffect(() => {
    if (!user) {
      alert("Please login to book a tour.");
      navigate("/login");
    }
  }, [user, navigate]);

  // Set tourId only when tour is loaded
  useEffect(() => {
    if (tour && tour._id) {
      setCredentials((prev) => ({
        ...prev,
        tourId: tour._id,
      }));
    }
  }, [tour]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic client-side validation for tourId
    if (!credentials.tourId || credentials.tourId.length !== 24) {
      alert("Invalid tour ID. Please refresh the page or try again.");
      setLoading(false);
      return;
    }

    console.log("Booking data being sent:", credentials);

    try {
      const res = await axios.post(`${BASE_URL}/book`, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        alert("Booking successful!");
      } else {
        alert("Booking failed: " + res.data.message);
      }
    } catch (err) {
      console.error("Booking Error:", err);
      alert("An error occurred: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const serviceFee = 10;
  const totalAmount = price * credentials.guestSize + serviceFee;

  return (
    <div className="booking">
      <div className="booking-top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
      </div>

      <div className="booking-form">
        <h5>Information</h5>
        <Form className="booking-info-form" onSubmit={handleSubmit}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              value={credentials.fullName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              value={credentials.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <input
              type="date"
              id="bookAt"
              value={credentials.bookAt}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              min="1"
              value={credentials.guestSize}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <div className="booking-bottom mt-3">
            <ul className="booking-summary">
              <li>
                Price x {credentials.guestSize}:{" "}
                <span>${price * credentials.guestSize}</span>
              </li>
              <li>Service fee: <span>${serviceFee}</span></li>
              <li>Total: <span>${totalAmount}</span></li>
            </ul>

            <Button type="submit" className="btn primary-btn w-100" disabled={loading}>
              {loading ? "Booking..." : "Book Now"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Booking;
