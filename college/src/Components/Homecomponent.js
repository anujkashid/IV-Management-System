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
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import AOS from "aos"
import "aos/dist/aos.css"

const Homecomponent = () => {
  const [bookedData, setBookedData] = useState({}); // Store booked slots
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ivcount, setIvcount] = useState(0);
  const [pendingiv, setPendingiv] = useState(0);
  const [rejectediv, setRejectediv] = useState(0);
  // const [collegeData, setCollegeData] = useState([]);
  const collegename = localStorage.getItem("CollegeName");
  const navigate = useNavigate();

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

        const bookings = data.reduce((acc, visit) => {
          const visitDate = formatDate(visit.start_time);
          if (!acc[visitDate]) acc[visitDate] = [];
          acc[visitDate].push({
            start_time: formatTime(visit.start_time),
            end_time: formatTime(visit.end_time),
            visting_location: visit.visting_location,
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
    const today = formatDate(new Date());

    // Ignore previous dates
    if (new Date(currentDate) < new Date(today)) {
      return null; // No styles for past dates
    }

    // Change color only for the selected booking dates
    if (currentDate === formatDate(selectedDate)) {
      return "selected-date";
    }

    // Leave booked slots with default styles
    if (bookedData[currentDate]) {
      return "booked-date";
    }

    return null;
  };

  const handleNavigate = () => {
    navigate("/addvisit");
  };

  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration (in ms)
      once: true, // Animation only happens once
    });
    }, []);

  return (
    <div style={{ backgroundColor: "#eaf5fc" }}>
      <div className="home-section">
      <ColHeader />

      {/* Content Section */}
      <Container fluid className=" d-flex flex-column justify-content-center" style={{ height: "100vh" }}>
        <h1 className="text-center text-white mt-2 fssize">
          Welcome
        </h1>
        <h3 className="text-center text-white mb-4  " style={{fontSize:"50px"}}>{collegename}</h3>
         <div className="text-center">
           <Link to="/addvisit" className="text-decoration-none"><Button className="px-4 py-2 btn btn-success rounded-4 fs-5">Book Visit</Button></Link>
         </div>
      </Container>
      </div>


      {/* Reports and Calendar */}
      <Container>
        <Row>
          {/* Report Cards */}
          <Col lg={8} md={12} xs={12} className="mt-4 ">
            <Row>
              <h2 className="text-center mb-4 mt-4 text-dark">Reports</h2>
              <Col md={3} xs={8} className="mx-auto me-md-4">
                <Card
                  className="me-2 shadow shadow-md"
                  style={{ width: "13rem", height: "20rem",background:"linear-gradient(-135deg, #145a76, #1d809f, #67b7d1)"}}
                >
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-center text-dark fs-1 mt-3">
                      {ivcount}
                    </Card.Title>
                    <Card.Title className="text-center text-white mt-auto fs-4">
                      Total Visit Count
                    </Card.Title>
                    <div className="mt-auto text-center">
                      <Button    variant="dark"
                        className="text-white" href="/totalvisit">
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} xs={8} className="mx-auto me-md-4 mt-3 mt-md-0">
                <Card
                  className="me-2 shadow shadow-md"
                  style={{ width: "13rem", height: "20rem",background:"linear-gradient(-135deg, #145a76, #1d809f, #67b7d1)" }}
                >
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-center text-dark fs-1 mt-3">
                      {pendingiv}
                    </Card.Title>
                    <Card.Title className="text-center text-white fs-4 mt-auto">
                      Pending Visit Count
                    </Card.Title>
                    <div className="mt-auto text-center">
                      <Button     variant="dark"
                        className="text-white" href="/pendingvisit">
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} xs={8} className="mx-auto  mt-3 mt-md-0">
                <Card
                  className="me-2 shadow shadow-md"
                  style={{ width: "13rem", height: "20rem",background:"linear-gradient(-135deg, #145a76, #1d809f, #67b7d1)" }}
                >
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-center text-dark fs-1 mt-3">
                      {rejectediv}
                    </Card.Title>

                    <Card.Title className="text-center text-white mt-auto fs-4">
                      Rejected Visit Count
                    </Card.Title>
                    <div className="mt-auto text-center">
                      <Button
                        variant="dark"
                        className="text-white"
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
          <Col md={12} lg={4} xs={12} className="mt-4">
            <h2 className="text-center mt-4 mb-3 text-dark">Booked Slots</h2>
            <div className="ms-3  d-flex justify-content-md-center mb-3 ms-lg-5   ">
              <Calendar
                className="shadow shadow-md"
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
                tileDisabled={({ date }) =>
                  date < new Date().setHours(0, 0, 0, 0)
                } // Disable past dates
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
                  <Button
                    className="btn btn-primary px-3 py-2 me-3"
                    onClick={handleNavigate}
                  >
                    Book
                  </Button>
                  <Button variant="dark" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Rules and regulations */}
     {/* Rules and regulations */}
     <Container className="rules">
      <Row className="mt-4">
        <h3 className="text-dark text-center mt-2 mb-2" data-aos="fade-up">
          Code Of Conduct For Attending IV
        </h3>
        <Col md={6} className="mt-3">
          <ul className="list-unstyled">
            <li
              className="text-md-class mb-2"
              data-aos="fade-left"
              data-aos-delay="200"
            >
            <FaCheckCircle className="text-success me-2" />
              All students must be in their college uniform.
            </li>
            <li
              className="text-md-class mb-2"
              data-aos="fade-left"
              data-aos-delay="400"
            >
            <FaCheckCircle className="text-success me-2" />
              All students should wear their identity cards.
            </li>
            <li
              className="text-md-class mb-2"
              data-aos="fade-left"
              data-aos-delay="600"
            >
            <FaCheckCircle className="text-success me-2" />
              Maintain discipline during visit.
            </li>
            </ul>
            </Col>
            <Col md={6} className="mt-3">
            <ul className="list-unstyled">
            <li
              className="text-md-class mb-2"
              data-aos="fade-left"
              data-aos-delay="800"
            >
            <FaCheckCircle className="text-success me-2" />
              Be polite and professional while interacting with the staff.
            </li>
            <li
              className="text-md-class mb-2"
              data-aos="fade-left"
              data-aos-delay="1000"
            >
            <FaCheckCircle className="text-success me-2" />
              Avoid touching system.
            </li>
            <li
              className="text-md-class mb-2"
              data-aos="fade-left"
              data-aos-delay="1200"
            >
            <FaCheckCircle className="text-success me-2" />
              All student supposed to follow the agenda for visit.
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
      {/* Contact Section */}
      <Container fluid className="mt-4 bg-white">
        <Row  style={{backgroundColor:"rgb(135,212,195)"}}>
          {/* Left Column */}
          <Col md={6} className="text-center mt-5">
            <h3 className="text-dark">
              <p className="fs-lg-2 fs-md-0 fw-bold mt-3">
                Let us help you bridge the gap between education and industry,
                shaping the innovators and leaders of tomorrow.
              </p>
            </h3>
            {/* <Button
              variant="danger"
              className="mt-lg-4 py-3 px-5 mb-3 rounded-pill"
            >
              <a href="/about" className="text-white text-decoration-none fs-lg-5 fs-md-0">
                
              </a>
            </Button> */}
          </Col>
          {/* Right Column */}
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <img src={cta} alt="Contact Us" className="contactus-img p-2" />
          </Col>
        </Row>
      </Container>
      {/* Vision Section */}
      <Container className="my-4 ">
        <Row>
          <Col md={6}>
            <img
              src={vision}
              alt="Our Vision"
              className="vision-img mt-4 rounded-2"
            />
          </Col>
          <Col md={6}>
            <h2 className="text-center mt-lg-4 mt-3 mt-md-0 fs-2 text-dark">
              Our Vision
            </h2>
            <p
              className="text-md-class ms-3 ms-md-0  mt-lg-3"
              style={{ textAlign: "justify" }}
            >
              To create a comprehensive learning environment that prepares
              students for the demands of the professional world by integrating
              academic knowledge with industrial exposure.
              <br /> We strive to foster innovation, creativity, and critical
              thinking among our students, empowering them to become leaders and
              changemakers in their respective fields.
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Homecomponent;
