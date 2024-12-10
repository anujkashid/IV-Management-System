import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { IoIosNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import "../App.css";
import axios from "axios";

const HeaderComponent = () => {
  const [visitData, setVisitData] = useState([]); // To store visit data
  const [inactiveCount, setInactiveCount] = useState(0); // To store the count of "inactive" visits

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        console.log(data);
        setVisitData(data);
        const count = data.filter((visit) => visit.Visit_accept === "pending").length;
        setInactiveCount(count);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

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
          {/* Notifications Icon with Badge */}
          <Nav.Link href="/head/notification" className="position-relative">
            <IoIosNotificationsOutline
              className="me-4 text-white fw-bold"
              size={30}
            />
            {inactiveCount > 0 && (
              <span
                className="position-absolute translate-middle badge rounded-pill bg-primary text-white"
                style={{ top: "15px", right: "5px"  }}
              >
                {inactiveCount}
              </span>
            )}
          </Nav.Link>
          {/* User Icon */}
          <Nav.Link href="#">
            <FaRegUser className="me-4 text-white fw-bold" size={24} />
          </Nav.Link>
          <Nav.Link href="/">
            <IoIosLogOut className="me-4 text-white fw-bold" size={24} />
            </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderComponent;
