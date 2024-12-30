import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Dropdown,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut, IoIosNotificationsOutline } from "react-icons/io";
import axios from "axios";
import logo from "../Images/sumago-logo.png";
// import bcrypt from "bcryptjs";

const ColHeader = () => {
  const [visitData, setVisitData] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const collegename = localStorage.getItem("CollegeName");
  const [id, setId] = useState("");

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
            (visit.Visit_accept === "accept" ||
              visit.Visit_accept === "reject" ||
              visit.Visit_accept === "pending"
              )
        );
        setVisitData(filteredData);
        setNotificationCount(filteredData.length);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  // {/*Profile deletion code */}

  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!reason || !password) {
      setErrorMessage("Both reason and password are required.");
      return;
    }

    const userId = localStorage.getItem("userid");

    try {
      const response = await axios.get(
        `http://localhost:8000/get_registration_one/${userId}`
      );
      const hashedPassword = response.data.reg_password;

      if (hashedPassword === password) {
        setId(userId);

        return;
      }

      // Step 3: Proceed with account deletion if the password matches
      await axios.delete(`http://localhost:8000/delete_registration/${id}`, {});
      alert("Account deleted successfully.");
      localStorage.clear(); // Clear user data
      window.location.href = "/"; // Redirect to homepage or login
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error deleting account. Try again."
      );
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
        {/* Brand */}
        <Navbar.Brand className="fs-5 ms-4 d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="me-3"
            style={{ width: "70px", height: "70px" }}
          />
          <div>
            <span
              className="text-white fw-bold d-block"
              style={{ fontFamily: "Times New Roman" }}
            >
              Sumago Infotech
            </span>
            <span
              className="text-white fw-bold"
              style={{ fontFamily: "Times New Roman" }}
            >
              Private Limited
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            {/* Links */}
            <Nav.Link href="/home" className="text-white fs-5 me-2">
              Home
            </Nav.Link>

            {/* <Nav.Link href="/about" className="text-white fs-5 me-2">
                About
              </Nav.Link> */}

            <Nav.Link
              href="/collegetotalvisit"
              className="text-white fs-5 me-2"
            >
              Schedule Visit
            </Nav.Link>
            <Nav.Link href="/feedback" className="text-white fs-5 me-2">
              Feedback
            </Nav.Link>
            <Nav.Link href="/gallery" className="text-white fs-5 me-2">
              Gallery
            </Nav.Link>
            <Nav.Link href="/agenda" className="text-white fs-5 me-2">
              Agenda
            </Nav.Link>
            <Nav.Link href="/pendingfees" className="text-white fs-5 me-2">
              Pending Fees
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            {/* Notifications */}
            <Nav.Link href="/notifications" className="position-relative">
              <IoIosNotificationsOutline
                className="me-3 text-white fw-bold"
                size={35}
              />
              {notificationCount > 0 && (
                <span
                  className="position-absolute translate-middle badge rounded-pill bg-primary text-white"
                  style={{ top: "10px", right: "10px" }}
                >
                  {notificationCount}
                </span>
              )}
            </Nav.Link>

            {/* Profile */}

            <Dropdown className="me-3">
              <Dropdown.Toggle
                variant="link"
                id="profile-dropdown"
                className="text-white p-0 border-0"
              >
                <FaRegUser size={30} className="me-1 text-white" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                <Dropdown.Item href="/update_profile">
                  Update Profile
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Logout */}
            <Nav.Link href="/">
              <IoIosLogOut size={30} className="me-4 text-white" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default ColHeader;
