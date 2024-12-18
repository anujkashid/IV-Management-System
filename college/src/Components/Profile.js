import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ColHeader from "./Navbar";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  const id = localStorage.getItem("userid");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get_registration_one/${id}`)
      .then((res) => {
        setProfileData(res.data.userData);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <div className="" style={{ backgroundColor: "#EEEEFF", height:"100%" }}>
      <ColHeader />
      <Container>
        <Row>
          <Col md={8} className="mx-auto">
            <h2 className="text-center mt-3 mb-4">Profile Details</h2>
            <Container className="border border-dark p-4">
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                    <b>College Name:</b>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profileData.collage_name || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                    <b>State:</b>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profileData.reg_state || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                   <b>District:</b> 
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profileData.reg_district || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                   <b>City:</b> 
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profileData.reg_city || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                  <b>University Name:</b> 
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profileData.reg_university_name || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                  <b>Principal Name:</b> 
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profileData.reg_principal_name || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                  <b>Contact Person:</b> 
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profileData.reg_contact_person || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                  <b>Contact Number 1:</b>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profileData.reg_contact_person_contact1 || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                  <b>Contact Number 2:</b> 
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profileData.reg_contact_person_contact2 || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                  <b>College Email ID:</b> 
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="email"
                      value={profileData.reg_college_email_id || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                  <b>Username:</b>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profileData.reg_college_username || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                  <b>MOU Signed:</b> 
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profileData.reg_mou_sign || ""}
                      readOnly
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
