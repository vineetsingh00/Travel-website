import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const quickLinks = [
  {
    path: "/home",
    display: "Home",
  },

  {
    path: "/tours",
    display: "Tours",
  },
];

const quickLinks2 = [
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo} alt="" />
              <p>Adventure awaits—start your global journey today.</p>
              <div className="social-links d-flex align-items-center gap-4">
                <span>
                  <Link to="https://github.com/vineetsingh00/Travel-website">
                    <i class="ri-github-fill"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i class="ri-instagram-line"></i>{" "}
                  </Link>
                </span>
                <span>
                  <Link to="https://www.linkedin.com/in/vineet-singh21/">
                    <i class="ri-linkedin-box-fill"></i>{" "}
                  </Link>
                </span>
              </div>
            </div>
          </Col>
          <Col lg="3">
            <h5 className="footer-link-title">Discover</h5>
            <ListGroup className="footer-quick-links">
              {quickLinks.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer-link-title">Quick Links</h5>
            <ListGroup className="footer-quick-links">
              {quickLinks2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer-link-title">Contact</h5>
            <ListGroup className="footer-quick-links">
              <ListGroupItem className="ps-0 border-0 align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-map-pin-line"></i>
                  </span>
                  Address
                </h6>
                <p className="mb-0">Moradabad, India </p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-mail-line"></i>{" "}
                  </span>
                  Email:
                </h6>
                <a className="mb-0" href="mailto:singhvineet00111@gmail.com">singhvineet00111@gmail.com</a>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-phone-fill"></i>{" "}
                  </span>
                  Phone:
                </h6>
                <a className="mb-0" href="tel:+919027818676">+91 90278 18676</a>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5 ">
            <p className="copyright">Copyright {year}. All rights reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
