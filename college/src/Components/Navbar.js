import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Dropdown, Modal, Form, Button } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut, IoIosNotificationsOutline } from "react-icons/io";
import axios from "axios";
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
            (visit.Visit_accept === "accept" || visit.Visit_accept === "reject" || visit.Visit_accept === "pending")
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
  const [errorMessage, setErrorMessage] = useState("");
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = async (e) => {
    e.preventDefault();


    const id = localStorage.getItem("userid");

    try {
     
      // Step 3: Proceed with account deletion if the password matches
      await axios.delete(`http://localhost:8000/delete_registration/${id}`, {
      }); 
      alert("Account deleted successfully.");
      localStorage.clear(); // Clear user data
      window.location.href = "/"; // Redirect to homepage or login
    }
    catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error deleting account. Try again."
      );
    }
  };

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
              <Nav.Link href="/agenda" className="text-white fs-5">
                Agenda
              </Nav.Link>
              <Nav.Link href="/pendingfees" className="text-white fs-5">
                Pending Fees
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

              <Dropdown className="me-4">
                
                <Dropdown.Toggle
                  variant="link"
                  id="profile-dropdown"
                  className="text-white p-0 border-0"
                >
                <FaRegUser size={30} className="me-1 text-white" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                  <Dropdown.Item href="/update_profile">Update Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item  onClick={handleShow} className="text-danger">Delete Account</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Logout */}
              <Nav.Link href="/">
                <IoIosLogOut size={30} className=" me-2 text-white" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        {/*Account deletion code */} 

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDelete}>
            <Form.Group className="mb-3">
              <Form.Label>Why are you deleting your account?</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter your reason"
              />
            </Form.Group>
            {errorMessage && (
              <div className="text-danger mb-3">{errorMessage}</div>
            )}
            <div className="text-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="danger" type="submit">
                Delete Account
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ColHeader;
