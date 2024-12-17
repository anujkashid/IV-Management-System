import React, { useEffect, useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import ColHeader from './Navbar'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import vision from "../Images/IMG-20241210-WA0001.jpg";
import cta from "../Images/contact.png";
import Footer from './Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
const Homecomponent = () => {
  const [bookedData, setBookedData] = useState({}); // Holds all booked slots
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

    // Fetch booked slots once
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllSlots");
        setBookedData(response.data); // Response should be an object: { "2024-12-12": ["10-12", "2-4"], ... }
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };
    fetchSlots();
  }, []);

  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  // Format selected date
  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;

  // Get booked slots for the selected date
  const bookedSlots = bookedData[formattedDate] || [];


  // Reports
  const [ivcount, setIvcount] = useState(0);
  const [pendingiv, setPendingiv] = useState(0);
  const [rejectediv, setRejectediv] = useState(0);
  const collegename = localStorage.getItem("CollegeName");
  const [collegeData, setCollegeData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getvisit")
    .then((res)  => {
      setCollegeData(res.data.userData);
      const data = res.data.userData;
      console.log("data",data)

      // total IV
      const totalIV = data.filter(
      (TIV) => TIV.college_name === collegename
    );
      setIvcount(totalIV.length);
    const IVdata = totalIV;
    console.log("message",totalIV )

      const pendingIV = IVdata.filter(
        (PIV) => PIV.Visit_accept  === "pending"
      );
        setPendingiv(pendingIV.length);
      
      const rejectedIV = IVdata.filter(
        (ReIV) => ReIV.Visit_accept === "reject"
      );
       setRejectediv(rejectedIV.length)
    })
  },[]
  )
    
  return (
    <div>
    <ColHeader></ColHeader>
      <Container>
        <Row>
          {/* report */}
        <Col md={7} xs={12}>
          <Row className=''>
        <h2 className='text-center mb-4'>Reports</h2>
        <Col md={4} xs={12}>
        <Card className="me-2" style={{ width: '13rem', height:'10rem' }}>
 
        <Card.Body>
        <Card.Title className='text-center'>{ivcount}</Card.Title>

        <Card.Title>Total Visit Count</Card.Title>

          <Button variant="primary" className='mt-4' href='/totalvisit'>View Details</Button>
        </Card.Body>
      </Card>
        </Col>
        <Col md={4} xs={12}>
        <Card className="me-2" style={{ width: '13rem' , height:'10rem' }}>   
        <Card.Body>
          <Card.Title className='text-center'>{pendingiv}</Card.Title>
          <Card.Title>Pending Visit Count</Card.Title>
          <Button variant="primary" href='/pendingvisit'>View Details</Button>
        </Card.Body>
      </Card>
        </Col>
        
        <Col md={4} xs={12}>
        <Card className="me-2" style={{ width: '13rem', height:'10rem' }}>
        <Card.Body>
          <Card.Title className='text-center' >{rejectediv}</Card.Title>
          <Card.Title>Rejected Visit Count</Card.Title>
          <Button variant="primary" href='/rejectedvisit'>View Details</Button>
        </Card.Body>
      </Card>
        </Col>
         </Row>
          </Col>
          {/* calender */}
          <Col md={5} xs={12}>
          <h2 className="d-flex justify-content-center" >Available Slots</h2>
      <div className="d-flex justify-content-end mb-3" >
      <Calendar onClickDay={handleDateClick} />
      {/* Modal to show booked slots */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booked Slots on {formattedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookedSlots.length ? (
            <ul>
              {bookedSlots.map((slot, index) => (
                <li key={index}>{slot}</li>
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
        <Container fluid>
          <div
            className="row"
            style={{ backgroundColor: "#87d4db" }}
          >
            {/* Left Column */}
            <div className="col-md-6 col-12">
              <div className=" mt-5">
                <h3 className="text-center ms-5 text-dark fw-bold">
                  <strong>
                  Let us help you bridge the gap between education and industry,
                  shaping the innovators and leaders of tomorrow.
                  </strong>
                </h3>
              </div>
              <div className="text-center mb-5 mt-4">
                <button className="py-3 px-5 border border-1 rounded-pill bg-white">
                  <a href="/home" className="text-dark text-decoration-none">
                    <b className="fs-5">Contact Us</b>
                  </a>
                </button>
              </div>
            </div>
            {/* Right Column */}
            <div className="col-md-6 col-12 mt-1 d-flex justify-content-center align-items-center">
              <img
                src={cta}
                style={{ width: "300px", height: "200px" }}
                alt="Contact Us"
              />
            </div>
            
          </div>
          </Container>

          <Container>
        {/* Our Vision */}
        <Row>
          <Col md={6} xs={12}>
            <img
              src={vision}
              alt="vision"
              className="h-75 w-75 mt-4 rounded-2"
            ></img>
          </Col>
          <Col md={6} xs={12}>
            <h2 className="text-center mt-4 fs-2">Our Vision</h2>
            <p className="fs-5">
              To create a comprehensive learning environment that prepares
              students for the demands of the professional world by integrating
              academic knowledge with industrial exposure.
            </p>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};
export default Homecomponent;
