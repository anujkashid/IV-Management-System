import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { IoIosNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import "../App.css"
const HeaderComponent = () => {
  return (
    <Navbar expand="sm" className="bg-secondary px-3" style={{ marginBottom: 0 }}>
      {/* Align the toggle button to the right */}
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="ms-auto"
        style={{ borderColor: "white", color: "white" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link href="#" className="position-relative">
            <IoIosNotificationsOutline
              className="me-4 text-white fw-bold"
              size={30}
            />
            <span
              className="position-absolute translate-middle badge rounded-pill bg-primary text-white"
              style={{ top: "10px", right: "0" }}
            >
              12
            </span>
          </Nav.Link>
          <Nav.Link href="">
            <FaRegUser className="me-4 text-white fw-bold" size={24} />
          </Nav.Link>
          <Nav.Link href="">
            <IoIosLogOut className="me-4 text-white fw-bold" size={24} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderComponent;
