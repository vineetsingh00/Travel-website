// frontend/pages/Login.js
import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
import { BASE_URL } from "../utils/config";
import loginImg from "../assets/images/login.png";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, credentials, {
        withCredentials: true, // required for cookies
      });

      if (res.data?.success) {
        // Save token and user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data));

        alert(res.data.message || "Login successful!");
        window.location.href = '/';
      } else {
        alert("Login failed: " + (res.data?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error: " + (err.response?.data?.message || "Something went wrong."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col lg={8} md={10} sm={12} className="m-auto">
            <div className="login-container d-flex flex-column flex-md-row justify-content-between align-items-center p-4 shadow rounded-4 bg-white">
              <div className="login-img">
                <img src={loginImg} alt="login" />
              </div>
              <div className="login-form w-100 ps-md-4">
                <h2>Login</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary-btn auth-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <Spinner size="sm" color="light" /> : "Login"}
                  </Button>
                </Form>
                <p className="mt-3">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
