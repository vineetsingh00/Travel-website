import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";
import { BASE_URL } from "../utils/config";
import registerImg from "../assets/images/register.png";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, credentials);

      if (res.data.success) {
        alert("Registered Successfully!");
        navigate("/login");
      } else {
        alert("Registration failed: " + res.data.message);
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert("An error occurred: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <section>
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col lg={8} md={10} sm={12} className="m-auto">
            <div className="register-container d-flex flex-column flex-md-row justify-content-between align-items-center p-4 shadow rounded-4 bg-white">
              <div className="register-img">
                <img src={registerImg} alt="register" />
              </div>
              <div className="register-form w-100 ps-md-4">
                <h2>Register</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <input
                      type="text"
                      placeholder="Photo URL (optional)"
                      id="photo"
                      onChange={handleChange}
                    />
                  </FormGroup> */}
                  <Button className="btn secondary-btn auth-btn" type="submit">
                    Register
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
