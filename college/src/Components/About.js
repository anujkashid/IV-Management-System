import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ColHeader from './Navbar'
// Images section
import iv1 from "../Images/IMG-20241210-WA0002.jpg";
import features from "../Images/IMG-20241210-WA0003.jpg";
import student from "../Images/IMG-20241210-WA0005.jpg";
import process from "../Images/IMG-20241210-WA0008.jpg";
import visit from "../Images/IMG-20241210-WA0015.jpg";
// Icons
import { FaArrowRight } from "react-icons/fa";
const About = () => {
    return (
        <>
        <ColHeader></ColHeader>
            <Container>
                {/* About IVMS */}
                <Row>
                    <Col md={6} xs={12}>
                        <h2 className="fw-bold mt-5">About IVMS</h2>
                        <p className="mt-4 fs-5">
                            Industrial visits are a crucial part of bridging the gap between
                            academic knowledge and real-world applications. The<br></br>
                            <span className="fw-bold">
                                Industrial Visit Management System (IVMS)
                            </span>
                            is designed to streamline the process of organizing and managing
                            educational trips to various industries, ensuring a seamless
                            experience for students, faculty, and administrators.
                        </p>
                    </Col>
                    <Col md={6} xs={12}>
                        <img src={iv1} alt="about" className="w-100 h-75 rounded-2" />
                    </Col>
                </Row>
                {/* Key Features */}
                <Row>
                    <Col md={6} xs={12}>
                        <img
                            src={features}
                            alt="key-features"
                            className="w-100 h-75 mt-1"
                        />
                    </Col>
                    <Col md={6} xs={12}>
                        <h2 className="mt-4 fw-bold">Key Features:</h2>
                        <ul className="mt-4 fs-5">
                            <li>
                                <span className="fw-bold">Effortless Planning:</span> Helps to
                                schedule and manage visits with ease, from approvals to
                                logistics.
                            </li>
                            <li>
                                <span className="fw-bold"> Transparent Communication:</span>
                                Keeps colleges and faculty updated with notifications about
                                schedules, itineraries, and guidelines.
                            </li>
                            <li>
                                <span className="fw-bold">Comprehensive Records: </span> A
                                centralized database of all past and upcoming visits, including
                                industry details and feedback.
                            </li>
                            <li>
                                <span className="fw-bold"> Eco-friendly Operations:</span>
                                Minimizes paperwork with a fully digital solution.
                            </li>
                        </ul>
                    </Col>
                </Row>
                {/*Benefits for students  */}
                <Row>
                    <Col md={6} xs={12}>
                        <h2 className="fw-bold">Benefits For Students:</h2>
                        <ul style={{ listStyleType: "Square" }} className="fs-5 mt-4">
                            <li>
                                Helps to explore
                                <span className="fw-bold">real-world industry practices</span>
                                and technology.
                            </li>
                            <li>
                                Gain <span className="fw-bold">practical exposure</span> to
                                complement classroom learning.
                            </li>
                            <li>
                                Build
                                <span className="fw-bold">networks with professionals</span> in
                                your field of study.
                            </li>
                        </ul>
                    </Col>
                    <Col>
                        <img src={student} alt="student" className="w-100 h-75 rounded-2" />
                    </Col>
                </Row>
                {/*How It Works?  */}
                <Row>
                    <Col md={6} xs={12}>
                        <img src={process} alt="how" className="w-75 h-75 rounded-2" />
                    </Col>
                    <Col md={6} xs={12}>
                        <h2 className="fw-bold">How It Works?</h2>
                        <ul style={{ listStyleType: "circle" }} className="fs-5 mt-4">
                            <li>Faculty and administrators propose an industrial visit.</li>
                            <li>The visit is approved and scheduled through IVMS.</li>
                            <li>Students are notified with all necessary details.</li>
                            <li>
                                After the visit, feedback is collected to improve future
                                experiences.
                            </li>
                        </ul>
                    </Col>
                </Row>
                {/* Call to Action  */}
                <Row
                    className="text-center py-5"
                    style={{ backgroundColor: "#f8f9fa" }}
                >
                    <Col md={6} xs={12}>
                        <h3 className="fs-2 fw-bold">
                            Join Us in Bridging the Gap Between Academia and Industry!
                        </h3>
                        <p className="fs-6 text-left">
                            Discover a world of learning opportunities beyond the classroom.
                            Embrace the power of IVMS for a more organized, engaging, and
                            enriching industrial visit experience.
                        </p>
                        {/* Call to Action Buttons */}
                        <div className="d-block mt-4">
                            {/* Plan Your Visit */}
                            <a
                                href="#"
                                className="d-block mb-3 text-decoration-none  hover-link"
                            >
                                <FaArrowRight style={{ color: "#000" }} className="me-2" />
                                Plan Your Visit Now
                            </a>

                            {/* Learn More About IVMS */}
                            <a
                                href="#"
                                className="d-block mb-3 text-decoration-none hover-link"
                            >
                                <FaArrowRight style={{ color: "#000" }} className="me-2" />
                                Learn More About IVMS
                            </a>

                            {/* Contact Us */}
                            <a href="#" className="d-block text-decoration-none  hover-link">
                                <FaArrowRight style={{ color: "#000" }} className="me-2" />
                                Contact Us for Support
                            </a>
                        </div>
                    </Col>
                    <Col md={6} xs={12}>
                        <img src={visit} alt="visit" className="w-100 h-100 rounded-2" />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default About;