import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut, IoIosNotificationsOutline } from "react-icons/io";
import axios from "axios";

const ColHeader = () => {
  const [visitData, setVisitData] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const collegename = localStorage.getItem("CollegeName");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((response) => {
        const today = new Date().toISOString().split("T")[0];
        const filteredData = response.data.userData.filter(
          (visit) =>
            visit.college_name === collegename &&
            visit.Date_of_visit >= today &&
            visit.notification_status === "unseen" && 
            (visit.Visit_accept === "accept" || visit.Visit_accept === "reject")
        );
        setVisitData(filteredData);
        setNotificationCount(filteredData.length);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
        <Container>
          {/* Brand */}
          <Navbar.Brand className="fs-4">{collegename}</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              {/* Links */}
              <Nav.Link href="/home" className="text-white fs-5 me-3">
                Home
              </Nav.Link>

              <Nav.Link href="/about" className="text-white fs-5 me-3">
                About
              </Nav.Link>

              <Nav.Link href="/addvisit" className="text-white fs-5 me-3">
                Schedule Visit
              </Nav.Link>
              <Nav.Link href="/feedback" className="text-white fs-5 me-3">
                Feedback
              </Nav.Link>
              <Nav.Link href="/gallery" className="text-white fs-5 me-3">
                Gallery
              </Nav.Link>
              <Nav.Link href="/report" className="text-white fs-5">
                Report
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto d-flex align-items-center">
              {/* Notifications */}
              <Nav.Link href="/notifications" className="position-relative">
                <IoIosNotificationsOutline
                  className="me-4 text-white fw-bold"
                  size={35}
                />
                {notificationCount > 0 && (
                  <span
                    className="position-absolute translate-middle badge rounded-pill bg-primary text-white"
                    style={{ top: "10px", right: "15px" }}
                  >
                    {notificationCount}
                  </span>
                )}
              </Nav.Link>

              {/* Profile */}
              <Nav.Link href="/profile">
                <FaRegUser size={30} className="me-4 text-white" />
              </Nav.Link>

              {/* Logout */}
              <Nav.Link href="/">
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
