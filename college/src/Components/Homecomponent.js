import React, { useEffect, useState } from "react";
import {
  Carousel,
  Container,
  Modal,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import ColHeader from "./Navbar";
import Footer from "./Footer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import vision from "../Images/vision.jpg";
import cta from "../Images/contact.png";
import slider1 from "../Images/slider1.jpg";
import slider2 from "../Images/slider2.jpg";
import slider3 from "../Images/slider3.jpg";
import '../App.css';


const Homecomponent = () => {
  const [bookedData, setBookedData] = useState({}); // Store booked slots
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ivcount, setIvcount] = useState(0);
  const [pendingiv, setPendingiv] = useState(0);
  const [rejectediv, setRejectediv] = useState(0);
  // const [collegeData, setCollegeData] = useState([]);
  const collegename = localStorage.getItem("CollegeName");

  // Format date helper
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(time).toLocaleString("en-US", options);
  };
  // Fetch booked slots
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getvisit");
        const data = response.data.userData;
    
        // Structure booked data as { date: [{start_time, end_time, visiting_location}, ...] }
        const bookings = data.reduce((acc, visit) => {
          const visitDate = formatDate(visit.start_time);
          if (!acc[visitDate]) acc[visitDate] = [];
          acc[visitDate].push({
            start_time: formatTime(visit.start_time),
            end_time: formatTime(visit.end_time),
            visting_location: visit.visting_location,  // Ensure this is added
          });
          return acc;
        }, {});
        setBookedData(bookings);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };
    
    fetchSlots();
  }, []);

  // Fetch visit reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getvisit");
        const data = response.data.userData.filter(
          (visit) => visit.college_name === collegename
        );
        // setCollegeData(data);

        setIvcount(data.length);
        setPendingiv(
          data.filter((visit) => visit.Visit_accept === "pending").length
        );
        setRejectediv(
          data.filter((visit) => visit.Visit_accept === "reject").length
        );
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, [collegename]);

  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // Get booked slots for the selected date
  const formattedDate = selectedDate ? formatDate(selectedDate) : null;
  const bookedSlots = bookedData[formattedDate] || [];

  // Highlight booked dates on calendar
  const tileClassName = ({ date }) => {
    const currentDate = formatDate(date);
    return bookedData[currentDate] ? "booked-date" : null;
  };

  return (
    <div style={{ backgroundColor: "#EEEEFF" }}>
      <ColHeader />
      
      <h2 className="text-center text-danger mt-2">Welcome To Sumago Infotech !!!!</h2>
      <h3 className="text-center text-dark ">{collegename}</h3>
      
      {/* Carousel Section */}
      <Container fluid className="mt-3">
        <Container>
          <Col md={10} className="mx-auto">
            <Carousel data-bs-theme="dark">
              {[slider1, slider2, slider3].map((slide, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 sliderimage"
                    src={slide}
                    alt={`Slide ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Container>
      </Container>
      {/* Reports and Calendar */}
      <Container>
        <Row>
          {/* Report Cards */}
          <Col  lg={8} md={12} xs={12} className="mt-4 ">
            <Row>
              <h2 className="text-center mb-4 mt-4 text-danger">Reports</h2>
              <Col md={3} xs={8} className="mx-auto me-md-4">
                <Card
                  className="me-2"
                  style={{ width: "13rem", height: "13rem" }}
                >
                  <Card.Body>
                    <Card.Title className="text-center fs-2">{ivcount}</Card.Title>

                    <Card.Title className="text-center mt-4">Total Visit Count</Card.Title>
                    <div className="mt-5 text-center">
                    <Button
                      variant="danger"
                      className=""
                      href="/totalvisit"
                    >
                      View Details
                    </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} xs={8} className="mx-auto me-md-4 mt-3 mt-md-0">
                <Card
                  className="me-2"
                  style={{ width: "13rem", height: "13rem" }}
                >
                  <Card.Body>
                    <Card.Title className="text-center fs-2">{pendingiv}</Card.Title>

                    <Card.Title className="text-center mt-4">Pending Visit Count</Card.Title>
                    <div className="mt-4 text-center">
                    <Button
                      variant="danger"
                      className=""
                      href="/pendingvisit"
                    >
                      View Details
                    </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} xs={8} className="mx-auto  mt-3 mt-md-0">
                <Card
                  className="me-2"
                  style={{ width: "13rem", height: "13rem" }}
                >
                  <Card.Body>
                    <Card.Title className="text-center fs-2">{rejectediv}</Card.Title>

                    <Card.Title className="text-center mt-4">Rejected Visit Count</Card.Title>
                    <div className="mt-4 text-center">
                    <Button
                      variant="danger"
                      className=""
                      href="/rejectedvisit"
                    >
                      View Details
                    </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          {/* Calendar */}
          <Col  md={12} lg={4} xs={12} className="mt-4">
            <h2 className="text-center  mt-4 mb-3 text-danger">
              Booked Slots
            </h2>
            <div className="ms-3  mb-3 d-flex justify-content-md-center">
              <Calendar
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
              />
              {/* Modal */}
              <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Booked Slots on {formattedDate}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {bookedSlots.length > 0 ? (
                    <ul>
                      {bookedSlots.map((slot, index) => (
                        <li key={index}>
                          {slot.start_time} - {slot.end_time}
                          &nbsp; {slot.visting_location}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No booked slots for this date.</p>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Rules and regulations */}
      <Container>
          <Row className="mt-4">
            <h3 className="text-danger text-center mt-2 mb-2">Code Of Conduct For Attending IV</h3>
             <Col md={6} className="mt-3">
              <ul>
                <li className="text-md-class mb-2">All students must be in their college uniform.</li>
                <li className="text-md-class mb-2">All students should wear their identity cards.</li>
                <li className="text-md-class ">Maintain discipline during visit.</li>
              </ul>

             </Col>

             <Col md={6} className="mt-md-3 mt-0">
              <ul>
                <li className="text-md-class mb-2">Be polite and professional while interacting with the  staff.</li>
                <li className="text-md-class mb-2">Avoid touching system.</li>
                <li className="text-md-class">All students are supposed to follow the agenda for visit.</li>
              </ul>

             </Col>
          </Row>
      </Container>
      {/* Contact Section */}
      <Container fluid className="mt-4 bg-white">
        <Row>
          {/* Left Column */}
          <Col md={6} className="text-center mt-5">
            <h3 className="text-danger">
              <p className="fs-lg-5 fs-md-0 fw-bold">
                Let us help you bridge the gap between education and industry,
                shaping the innovators and leaders of tomorrow.
              </p>
            </h3>
            <Button
              variant="danger"
              className="mt-lg-4 py-3 px-5 mb-3 rounded-pill"
            >
              <a href="/about" className="text-white text-decoration-none fs-lg-5 fs-md-0">
                About Us
              </a>
            </Button>
          </Col>
          {/* Right Column */}
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src={cta}
              alt="Contact Us"
              className="home-img"
            />
          </Col>
        </Row>
      </Container>
      {/* Vision Section */}
      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <img
              src={vision}
              alt="Our Vision"
              className="vision-img mt-4 rounded-2"
            />
          </Col>
          <Col md={6}>
            <h2 className="text-center mt-lg-4 mt-3 mt-md-0 fs-2 text-danger">Our Vision</h2>
            <p className="text-md-class ms-3 ms-md-0  text-start mt-lg-3">
              To create a comprehensive learning environment that prepares
              students for the demands of the professional world by integrating
              academic knowledge with industrial exposure.
              <br/> We strive to foster
              innovation, creativity, and critical thinking among our students,
              empowering them to become leaders and changemakers in their
              respective fields. 
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Homecomponent;
