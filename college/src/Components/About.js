import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ColHeader from './Navbar';
import Footer from './Footer';
// Images section
import iv1 from "../Images/IMG-20241210-WA0002.jpg";
import features from "../Images/IMG-20241210-WA0003.jpg";
import student from "../Images/IMG-20241210-WA0005.jpg";
import process from "../Images/IMG-20241210-WA0008.jpg";
import visit from "../Images/IMG-20241210-WA0015.jpg";

// Icons
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
const About = () => {
     const[stateData,setStateData]=useState([]);

     useEffect(() => {
        axios.get('https://api.npoint.io/c462b5f3f1efad8b74e1')
            .then((response) => {
                console.log('Data fetched:', response.data);
                setStateData(response.data);
            })
            .catch((err) => {
                console.error('Error fetching data:', err.message);
            });
    }, []);
    
    return (
        <>
        <ColHeader></ColHeader>
        <Container fluid style={{ backgroundColor: "#EEEEFF" }}>
            <Container>
                {/* About IVMS */}
                <Row className="text-center">
                    <Col md={6} xs={12}>
                        <h3 className="fw-bold mt-5 text-danger ">About IVMS</h3>
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
                        <img src={iv1} alt="about" style={{width:"500px",height:"300px"}} />
                    </Col>
               
                {/* Key Features */}
                
                    <Col md={6} xs={12}>
                        <img
                            src={features}
                            alt="key-features"
                            className="mt-4"
                            style={{width:"500px",height:"300px"}}
                        />
                    </Col>
                    <Col md={6} xs={12}>
                        <h3 className="mt-4 fw-bold text-danger">Key Features:</h3>
                        <ul className="mt-4 fs-5 text-start">
                            <li>
                                <span className="fw-bold">Effortless Planning:</span> Helps to
                                schedule and manage visits with ease, from approvals to
                                logistics.
                            </li>
                            <li>
                                <span className="fw-bold">Transparent Communication:</span>
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
                
                {/*Benefits for students  */}
                
                    <Col md={6} xs={12} className="mt-4">
                        <h3 className="fw-bold text-danger">Benefits For Students:</h3>
                        <ul style={{ listStyleType: "Square" }} className="fs-5 mt-4 text-start">
                            <li>
                                Helps to explore
                                &nbsp;<span className="fw-bold">real-world industry practices</span> &nbsp; and technology.
                            </li>
                            <li>
                                Gain <span className="fw-bold">practical exposure</span> to
                                complement classroom learning.
                            </li>
                            <li>
                                Build
                                &nbsp; <span className="fw-bold">networks with professionals</span> in
                                your field of study.
                            </li>
                        </ul>
                    </Col>
                    <Col  className="mt-4">
                        <img src={student} alt="student" style={{width:"500px",height:"250px"}} />
                    </Col>
            
                {/*How It Works?  */}
    
                    <Col md={6} xs={12} className="mb-3">
                        <img src={process} alt="how" className="mt-4" style={{width:"500px",height:"250px"}}  />
                    </Col>
                    <Col md={6} xs={12} className="mt-4">
                        <h3 className="fw-bold text-danger">How It Works?</h3>
                        <ul style={{ listStyleType: "circle" }} className="fs-5 mt-2 text-start">
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
            </Container>
            </Container>

            <Footer></Footer>
        </>
    );
};
export default About;