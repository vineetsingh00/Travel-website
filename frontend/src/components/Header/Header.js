import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/logo.png";
import "./style.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, []);

  const logOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky-header");
      } else {
        headerRef.current.classList.remove("sticky-header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header" ref={headerRef}>
      {menuOpen && (
        <div className="backdrop" onClick={() => setMenuOpen(false)}></div>
      )}

      <Container>
        <Row>
          <div className="nav-wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} style={{ width: "100px" }} alt="logo" />
            </div>

            <div className={`navigation ${menuOpen ? "show-menu" : ""}`}>
              <ul className="menu d-flex align-items-center">
                {navLinks.map((item, index) => (
                  <li className="nav-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active-link" : ""
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Mobile-only: Auth Buttons inside drawer */}
              <div className="mobile-auth-btns d-md-none mt-4 d-flex flex-column gap-2">
                {!isLoggedIn ? (
                  <>
                    <Button className="btn secondary-btn w-100">
                      <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                    </Button>
                    <Button className="btn primary-btn w-100">
                      <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn primary-btn w-100">
                      <span onClick={() => { navigate('/UserProfile'); setMenuOpen(false); }}>Profile</span>
                    </Button>
                    <Button className="btn primary-btn w-100">
                      <span onClick={logOut}>Logout</span>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="nav-right d-none d-md-flex align-items-center gap-4">
              <div className="nav-btns d-flex align-items-center gap-4">
                {!isLoggedIn ? (
                  <>
                    <Button className="btn secondary-btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary-btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn primary-btn">
                      <span onClick={() => navigate('/UserProfile')}>Profile</span>
                    </Button>
                    <Button className="btn primary-btn">
                      <span onClick={logOut}>Logout</span>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle Icon */}
            <span className="mobile-menu" onClick={toggleMenu}>
              {menuOpen ? (
                <i className="ri-close-line"></i>
              ) : (
                <i className="ri-menu-line"></i>
              )}
            </span>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
