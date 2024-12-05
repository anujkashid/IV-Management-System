import React, { useState } from "react";
import "../App.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Col, Nav, Row } from "react-bootstrap";
import { Offcanvas, Button } from "react-bootstrap";
import { BsBarChartLineFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import sumago from "../Images/sumago-logo.png";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaUserPlus } from 'react-icons/fa';
import { MdAppRegistration } from 'react-icons/md';
import { AiOutlineCalendar } from 'react-icons/ai'; 
import { FaMoneyBillWave } from 'react-icons/fa'; 
import { MdReport } from 'react-icons/md';
import { FaRegHandshake } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaGraduationCap } from 'react-icons/fa'; 
import { MdLocationOn } from 'react-icons/md';
import { FaMapPin } from 'react-icons/fa';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showDropdown, setShowDropdown] = useState(false);

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
        style={{ position: "fixed", top: "10px", left: "20px", zIndex: "1050" }}
      >
        ☰
      </Button>

      {/* Sidebar for Larger Screens */}
      <div className="sidebar d-none d-md-block">
        <div
          className="mt-3 mb-4"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={sumago}
            alt="profile"
            style={{ width: "50px", height: "50px" }}
          />
          <h4
            className="text-danger fw-bold ms-2"
            style={{ fontFamily: "Times New Roman" }}
          >
            Sumago Infotech
          </h4>
        </div>
        <Nav defaultActiveKey="/dashboard" className="flex-column">
          <Nav.Item>
            <Link to="/head/dashboard" className="nav-link p-2">
              <BsBarChartLineFill size={30} className="me-3 text-darks" /> Dashboard
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/dashboard" className="nav-link p-2">
              <FaUserPlus size={30} className="me-2 text-dark" /> College
              Registration
            </Link>
          </Nav.Item>
          <Nav.Item>
  <Row>
    <Col md={2}>
      <MdAppRegistration size={30} className="ms-2 text-dark mt-2" />
    </Col>
    <Col md={10}>
      <div className="">
        <Button
          variant="link"
          className="nav-link  p-2"
          style={{ fontSize: "20px", textDecoration: "none" }}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Master
          <IoIosArrowDropdown size={20} style={{marginLeft:"70px"}} />
        </Button>
        {showDropdown && (
          <div className="mt-2 d-flex flex-column">
            <div>
              <FaMapMarkerAlt size={24} className="text-dark me-2"></FaMapMarkerAlt>
            <Link
              to="/head/location"
              className="nav-link p-2 text-dark"
              style={{ display: "inline-block" }}
            >
              Location
            </Link>
            </div>
                
            <div>
              <FaGraduationCap size={24} className="text-dark me-2"/>   
            <Link
              to="/head/university"
              className="nav-link p-2 text-dark"
              style={{ display: "inline-block" }}
            >
              University
            </Link>
            </div>
           
           <div>
           <MdLocationOn size={24} className="text-dark me-2" />
           <Link
              to="/head/state"
              className="nav-link p-2 text-dark"
              style={{ display: "inline-block" }}
            >
              State
            </Link>
          </div>

          <div>
            <FaMapPin size={24} className="text-dark me-2"/>
            <Link
              to="/head/district"
              className="nav-link p-2 text-dark"
              style={{ display: "inline-block" }}
            >
              District
            </Link>
          </div>
  
          <div>
            <FaMapPin size={24} className="text-dark me-2"/>
            <Link
              to="/head/city"
              className="nav-link p-2 text-dark"
              style={{ display: "inline-block" }}
            >
              City
            </Link>
          </div>
          </div>
        )}
      </div>
    </Col>
  </Row>
</Nav.Item>


          <Nav.Item>
            <Link to="/head/agenda" className="nav-link p-2">
              <AiOutlineCalendar size={30} className="me-2 text-dark" /> Agenda
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/fees" className="nav-link p-2">
              <FaMoneyBillWave size={30} className="me-2 text-dark" /> Fees
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/dashboard" className="nav-link p-2">
              <MdReport size={30} className="me-2 text-dark" /> Report
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/dashboard" className="nav-link p-2">
              <FaRegHandshake size={30} className="me-2 text-dark" /> IV Requests
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/college_registration" className="nav-link p-2">
              <BsBarChartLineFill size={30} className='me-2' /> Collage Registration
            </Link>
          </Nav.Item>
          {/* Add more Nav.Items as needed */}
        </Nav>
      </div>

      {/* Offcanvas for Smaller Screens */}
      <Offcanvas show={show} onHide={handleClose} className="d-md-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div
              className="mt-3 mb-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={sumago}
                alt="profile"
                style={{ width: "50px", height: "50px" }}
              />
              <h4
                className="text-danger fw-bold"
                style={{ fontFamily: "Times New Roman" }}
              >
                Sumago Infotech
              </h4>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="sidebar d-block d-md-none">
            <Nav defaultActiveKey="/dashboard" className="flex-column">
              <Nav.Item>
                <Link to="/head/dashboard" className="nav-link p-2">
                  <BsBarChartLineFill size={30} className="me-2" /> Dashboard
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
