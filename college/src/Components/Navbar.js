import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut, IoIosNotificationsOutline } from "react-icons/io";

const ColHeader = () => {
  const collegename = localStorage.getItem("CollegeName");

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
        <Container>
          {/* Brand */}
          <Navbar.Brand>{collegename}</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              {/* Home Link */}
              <Nav.Link href="#home" className="text-white fs-5">
                Home
              </Nav.Link>

              {/* Dropdown Menu */}
              <NavDropdown
                title={<span className="text-white">Masters</span>}
                id="collapsible-nav-dropdown"
                className="ms-4 fs-5"
              >
                <NavDropdown.Item href="#action/1">University</NavDropdown.Item>
                <NavDropdown.Item href="#action/2">State</NavDropdown.Item>
                <NavDropdown.Item href="#action/3">District</NavDropdown.Item>
                <NavDropdown.Item href="#action/4">City</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Right-Aligned Icons */}
            <Nav className="ms-auto d-flex align-items-center">
              {/* Notifications */}
              <Nav.Link href="#" className="position-relative">
                <IoIosNotificationsOutline
                  className="me-4 text-white fw-bold"
                  size={35}
                />
                <span
                  className="position-absolute translate-middle badge rounded-pill bg-primary text-white"
                  style={{ top: "10px", right: "0" }}
                >
                  12
                </span>
              </Nav.Link>

              {/* Profile */}
              <Nav.Link href="/profile">
                <FaRegUser size={30} className="me-4 text-white" />
              </Nav.Link>

              {/* Logout */}
              <Nav.Link href="/logout">
                <IoIosLogOut size={30} className="me-4 text-white" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default ColHeader;
