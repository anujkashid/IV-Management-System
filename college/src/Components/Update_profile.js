import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ColHeader from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

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
    reg_status: "",
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [universities, setUniversities] = useState([]);

  const id = localStorage.getItem("userid");

  // Fetch user data
  useEffect(() => {
    axios
      .get(`http://localhost:8000/get_registration_one/${id}`)
      .then((res) => {
        setProfileData(res.data.userData);
        console.log("data",  res.data.userData)
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [id]);

  // Fetch states, districts, cities, universities
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statesResponse = await axios.get("http://localhost:8000/getstate");
        setStates(statesResponse.data.data);

        const districtsResponse = await axios.get("http://localhost:8000/getdistrict");
        setDistricts(districtsResponse.data.data);

        const citiesResponse = await axios.get("http://localhost:8000/getcity");
        setCities(citiesResponse.data.data);

        const universitiesResponse = await axios.get("http://localhost:8000/getuniversity");
        setUniversities(universitiesResponse.data.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Submit form
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
    <div className="min-vh-100" style={{ backgroundColor: "#EEEEFF" }}>
      <ColHeader />
      <Container>
        <Row>
          <Col md={8} className="mx-auto">
            <h2 className="text-center mt-4 text-danger ">Update Profile</h2>
            <div className="d-flex justify-content-end mb-3">
            <Link to="/home" className="text-decoration-none">
                <Button
                  type="button"
                  className="btn btn-danger ms-5 px-3 py-1"
                >
                  Back
                </Button>
                </Link>
            </div>
            <Container className="border border-dark p-4">
              <Form onSubmit={handleSubmit}>
                {/* College Name */}
                <Form.Group className="mb-3 text-center" controlId="formGroupCollege">
                  <Form.Label>College Name:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="collage_name"
                    value={profileData.collage_name}
                    onChange={handleChange}
                    placeholder="Enter College Name"
                  />
                </Form.Group>

                {/* State */}
                <Form.Group className="mb-3 text-center" controlId="formGroupState">
                  <Form.Label>State:</Form.Label>
                  <Form.Select
                    required
                    name="reg_state"
                    value={profileData.reg_state}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    {states.map((item) => (
                      <option key={item._id} value={item.state_name}>
                        {item.state_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* District */}
                <Form.Group className="mb-3 text-center" controlId="formGroupDistrict">
                  <Form.Label>District:</Form.Label>
                  <Form.Select
                    required
                    name="reg_district"
                    value={profileData.reg_district}
                    onChange={handleChange}
                  >
                    <option value="">Select District</option>
                    {districts.map((item) => (
                      <option key={item._id} value={item.district_name}>
                        {item.district_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* City */}
                <Form.Group className="mb-3 text-center" controlId="formGroupCity">
                  <Form.Label>City:</Form.Label>
                  <Form.Select
                    required
                    name="reg_city"
                    value={profileData.reg_city}
                    onChange={handleChange}
                  >
                    <option value="">Select City</option>
                    {cities.map((item) => (
                      <option key={item._id} value={item.city_name}>
                        {item.city_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* University Name */}
                <Form.Group className="mb-3 text-center " controlId="formGroupUniversity">
                  <Form.Label>University Name:</Form.Label>
                  <Form.Select
                    required
                    name="reg_university_name"
                    value={profileData.reg_university_name}
                    onChange={handleChange}
                  >
                    <option value="">Select University</option>
                    {universities.map((item) => (
                      <option key={item._id} value={item.university_name}>
                        {item.university_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Principal Name */}
                <Form.Group className="mb-3 text-center" controlId="formGroupPrincipalName">
                  <Form.Label>Principal Name:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="reg_principal_name"
                    value={profileData.reg_principal_name}
                    onChange={handleChange}
                    placeholder="Enter Principal Name"
                  />
                </Form.Group>

                {/* Contact Person */}
                <Form.Group className="mb-3 text-center" controlId="formGroupContactPerson">
                  <Form.Label>Contact Person:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="reg_contact_person"
                    value={profileData.reg_contact_person}
                    onChange={handleChange}
                    placeholder="Enter Contact Person Name"
                  />
                </Form.Group>

                <Row>
                  <Col>
                    {/* Contact Person Contact 1 */}
                    <Form.Group className="mb-3 text-center " controlId="formGroupContact1">
                      <Form.Label>Contact Person Contact 1:</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        name="reg_contact_person_contact1"
                        value={profileData.reg_contact_person_contact1}
                        onChange={handleChange}
                        pattern="^\d{10}$"
                        placeholder="Enter 10-digit Contact Number"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    {/* Contact Person Contact 2 */}
                    <Form.Group className="mb-3 text-center" controlId="formGroupContact2">
                      <Form.Label>Contact Person Contact 2:</Form.Label>
                      <Form.Control
                        type="tel"
                        name="reg_contact_person_contact2"
                        value={profileData.reg_contact_person_contact2}
                        onChange={handleChange}
                        pattern="^\d{10}$"
                        placeholder="Enter 10-digit Contact Number (Optional)"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Email ID */}
                <Form.Group className="mb-3 text-center " controlId="formGroupEmail">
                  <Form.Label>Email ID:</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="reg_college_email_id"
                    value={profileData.reg_college_email_id}
                    onChange={handleChange}
                    placeholder="Enter Email ID"
                  />
                </Form.Group>

                {/* Username */}
                <Form.Group className="mb-3 text-center" controlId="formGroupUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="reg_college_username"
                    value={profileData.reg_college_username}
                    onChange={handleChange}
                    placeholder="Enter Username"
                  />
                </Form.Group>

                {/* MOU Signed */}
                <Form.Group className="mb-3 text-center " controlId="formGroupMOU">
                  <Form.Label>MOU Signed:</Form.Label>
                  <Form.Select
                    required
                    name="reg_mou_sign"
                    value={profileData.reg_mou_sign}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Select>
                </Form.Group>

                {/* Status */}
                <Row className="mb-3">
                  <Col>
                    <Form.Group className="text-center">
                      <Form.Label className="">Select Status:</Form.Label>
                      <div>
                        <Form.Check
                          type="radio"
                          label="Active"
                          name="reg_status"
                          value="Active"
                          className="me-5 text-dark"
                          checked={profileData.reg_status === "Active"}
                          onChange={handleChange}
                          inline
                        />
                        <Form.Check
                          type="radio"
                          label="Inactive"
                          name="reg_status"
                          value="Inactive"
                          checked={profileData.reg_status === "Inactive"}
                          onChange={handleChange}
                          inline
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center">

                  <Button variant="primary" type="submit">
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

export default UpdateProfile