import React, { useState } from 'react';
import '../App.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Col, Nav, Row } from 'react-bootstrap';
import { Offcanvas, Button } from 'react-bootstrap';
import { BsBarChartLineFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import sumago from '../Images/sumago-logo.png';
const Sidebar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <style>
        {`
        .sidebar {
          position: fixed;
          background-color: #f8f9fa;
          height: 100vh;
          width: 250px;
          z-index: 1045; 
        }
        .nav-link {
          color: black;
          font-size: 20px;
        }
        .nav-link:hover {
          background-color: #e2e6ea; 
          color: #007bff; 
        }
        .offcanvas-header {
          background-color: #f8f9fa;
        }
        `}
      </style>

      {/* Toggle Button */}
      <Button 
        variant="dark" 
        className="d-md-none" 
        onClick={handleShow} 
        style={{ position: 'fixed', top: '10px', left: '20px', zIndex: '1050' }}
      >
        ☰
      </Button>

      {/* Sidebar for Larger Screens */}
      <div className="sidebar d-none d-md-block">
        <div  className='mt-3 mb-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={sumago} alt="profile" style={{ width: "50px", height: "50px" }} />
          <h4 className='text-danger fw-bold ms-2' style={{fontFamily:"Times New Roman"}}>Sumago Infotech</h4>
        </div>
        <Nav defaultActiveKey="/dashboard" className="flex-column">
          <Nav.Item>
            <Link to="/head/dashboard" className="nav-link p-2">
              <BsBarChartLineFill size={30} className='me-2' /> Dashboard
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/dashboard" className="nav-link p-2">
              <BsBarChartLineFill size={30} className='me-2' /> College Registration
            </Link>
          </Nav.Item>
          <Nav.Item>
          <Row>
          <Col md={2}><BsBarChartLineFill size={30} className='ms-2'/></Col>
          <Col md={10}>
              <NavDropdown
              id="nav-dropdown-dark-example"
              title="Master"
              menuVariant="dark"
              className='d-flex'
            >
            <NavDropdown.Item as={Link} to="/head/location" className='nav-link p-2 ms-4 text-white'>Location
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/head/university" className='nav-link p-2 ms-4 text-white'>University
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/head/state" className='nav-link p-2 ms-4 text-white'>State
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/head/district" className='nav-link p-2 ms-4 text-white'>District
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/head/city" className='nav-link p-2 ms-4 text-white'>City
            </NavDropdown.Item>
            </NavDropdown>
            </Col>
            </Row>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/agenda" className="nav-link p-2">
              <BsBarChartLineFill size={30} className='me-2' /> Agenda
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/fees" className="nav-link p-2">
              <BsBarChartLineFill size={30} className='me-2' /> Fees
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/dashboard" className="nav-link p-2">
              <BsBarChartLineFill size={30} className='me-2' /> Report
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/dashboard" className="nav-link p-2">
              <BsBarChartLineFill size={30} className='me-2' /> IV Requests
            </Link>
          </Nav.Item>
          {/* Add more Nav.Items as needed */}
        </Nav>
      </div>













      {/* Offcanvas for Smaller Screens */}
      <Offcanvas show={show} onHide={handleClose} className="d-md-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> 
          <div  className='mt-3 mb-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={sumago} alt="profile" style={{ width: "50px", height: "50px" }} />
          <h4 className='text-danger fw-bold' style={{fontFamily:"Times New Roman"}}>Sumago Infotech</h4>
        </div>
        </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="sidebar d-block d-md-none">   
        <Nav defaultActiveKey="/dashboard" className="flex-column">
          <Nav.Item>
            <Link to="/head/dashboard" className="nav-link p-2">
              <BsBarChartLineFill size={30} className='me-2' /> Dashboard
            </Link>
          </Nav.Item>
          {/* Add more Nav.Items as needed */}
        </Nav>
      </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;

