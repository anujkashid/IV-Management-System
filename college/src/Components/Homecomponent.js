import React from 'react'
import { Container } from 'react-bootstrap'
import ColHeader from './Navbar'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import vision from "../Images/IMG-20241210-WA0001.jpg";
import Footer from './Footer';
const Homecomponent = () => {
  return (
    <div>
    <ColHeader></ColHeader>
      <Container>
        {/* Hero Section  */}
        <Row>
          <h2 className="text-center">
            Let us help you bridge the gap between education and industry,
            shaping the innovators and leaders of tomorrow.
          </h2>
        </Row>
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
