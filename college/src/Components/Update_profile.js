import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ColHeader from "./Navbar";
import axios from "axios";

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    collage_name: "",
    reg_state: "",
    reg_district: "",
    reg_city: "",
    reg_university_name: "",
    reg_principal_name: "",
    reg_contact_person: "",
    reg_contact_person_contact1: "",
    reg_contact_person_contact2: "",
    reg_college_email_id: "",
    reg_college_username: "",
    reg_mou_sign: "",
  });

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
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/update_registration/${id}`, profileData)
      .then((res) => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      });
  };

  return (
    <div className="h-100 vh-100" style={{ backgroundColor: "#EEEEFF" }}>
      <ColHeader />
      <Container>
        <Row>
          <Col md={8} className="mx-auto">
            <h2 className="text-center mt-4 text-danger mb-4">Update Profile</h2>
            <Container className="border border-dark p-4">
              <Form onSubmit={handleSubmit}>
                {Object.keys(profileData).map((key) => (
                  <Form.Group as={Row} className="mb-3" key={key}>
                    <Form.Label column sm={4}>
                      <b>{key.replace(/_/g, " ").toUpperCase()}:</b>
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        name={key}
                        value={profileData[key]}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                ))}
                <div className="text-center">
                  <Button type="submit" variant="primary">
                    Update Profile
                  </Button>
                </div>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateProfile;
