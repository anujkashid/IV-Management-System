import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// Icons:
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Container fluid className="bg-dark text-white">
      <Row>
        {/* Contact Us Section */}
        <Col sm={12} md={4} className="text-center mb-3 mt-3">
          <h4 className="text-center mb-3">Contact Us</h4>
          <Row className="mb-2">
            <Col>
              <a
                href="mailto:info@sumagoinfotech.com"
                className="d-flex align-items-center justify-content-center mx-2 text-white text-decoration-none"
              >
                <MdOutlineEmail size={20} className="me-3" />
                <span>info@sumagoinfotech.com</span>
              </a>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <a
                href="tel:+918408084888"
                className="d-flex align-items-center justify-content-center mx-2 text-white text-decoration-none"
              >
                <FaPhoneAlt size={20} className="me-3" />
                <span>+91 8408084888</span>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <a
                href="tel:+917263084881"
                className="d-flex align-items-center justify-content-center mx-2 text-white text-decoration-none"
              >
                <FaPhoneAlt size={20} className="me-3" />
                <span>+91 7263084881</span>
              </a>
            </Col>
          </Row>

          <h4 className="mt-4 mb-3">Social Media</h4>
          <div className="d-flex justify-content-center">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              className="text-decoration-none text-white me-3 rounded-circle bg-primary px-2 py-2 text-center"
              title="YouTube"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="text-decoration-none text-white me-3 rounded-circle bg-primary px-2 py-2 text-center"
              title="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              className="text-decoration-none text-white me-3 rounded-circle bg-primary px-2 py-2 text-center"
              title="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </Col>

        {/* Quick Links Section */}
        <Col sm={12} md={4} className="text-center mb-3 mt-3">
          <h4 className="text-center mb-3">Quick Links</h4>
          <div className="d-flex flex-column align-items-center">
            <Link to="/home" className="text-decoration-none text-white mb-2">
              Home
            </Link>
            <Link to="/addvisit" className="text-decoration-none text-white mb-2">
              Visit Schedule
            </Link>
            <Link to="/feedback" className="text-decoration-none text-white mb-2">
              Feedback
            </Link>
            <Link to="/agenda" className="text-decoration-none text-white mb-2">
              Agenda
            </Link>
            <Link to="/gallery" className="text-decoration-none text-white mb-2">
              Gallery
            </Link>
            <Link to="/report" className="text-decoration-none text-white">
              Report
            </Link>
          </div>
        </Col>

        {/* Address Section */}
        <Col sm={12} md={4} className="text-center mb-3 mt-3">
          <h4 className="text-center mb-3">Address</h4>
          <Row>
            <Col sm={6} className="mb-3">
              <h5 className="text-start">Corporate Office:</h5>
              <p className="text-start">
                <a href= "https://maps.app.goo.gl/EfoL8csq1A7HRiJv7" >
                  <FaLocationDot className="fs-5 me-2" />
                </a>
                The Avenue, Six Floor, Behind Prakash Petrol Pump, Govind Nagar, Nashik, Maharashtra 422009.
              </p>
            </Col>
            <Col sm={6} className="mb-3">
              <h5 className="text-start">Pune Office:</h5>
              <p className="text-start">
                <a href="https://maps.app.goo.gl/6kYXy34MrjSvih8n7">
                  <FaLocationDot className="fs-5 me-2" />
                </a>
                Third Floor, Kakade Center Port, University Rd, near E-Square, Premnagar, Shivajinagar, Pune, Maharashtra 411016
              </p>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Copyright Line */}
      <Row className="mt-0 text-center">
        <Col>
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Sumago Infotech private limited. All Rights Reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
