import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const College_registration = () => {
  const [collage_name, setCollage_name] = useState("");
  const [reg_state, setReg_state] = useState("");
  const [reg_district, setReg_district] = useState("");
  const [reg_city, setReg_city] = useState("");
  const [reg_university_name, setReg_university_name] = useState("");
  const [reg_principal_name, setReg_principal_name] = useState("");
  const [reg_contact_person, setReg_contact_person] = useState("");
  const [reg_contact_person_contact1, setReg_contact_person_contact1] = useState("");
  const [reg_contact_person_contact2, setReg_contact_person_contact2] = useState("");
  const [reg_college_email_id, setReg_college_email_id] = useState("");
  const [reg_college_username, setReg_college_username] = useState("");
  const [reg_password, setReg_password] = useState("");
  const [reg_confirm_password, setReg_confirm_password] = useState("");
  const [reg_visit_location, setReg_visit_location] = useState("");
  const [reg_mou_sign, setReg_mou_sign] = useState("");
  const [reg_status, setReg_status] = useState("");
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [city, setCity] = useState([]);
  const [university, setUniversity] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const userdata = {
      collage_name,
      reg_state,
      reg_district,
      reg_city,
      reg_university_name,
      reg_principal_name,
      reg_contact_person,
      reg_contact_person_contact1,
      reg_contact_person_contact2,
      reg_college_email_id,
      reg_college_username,
      reg_password,
      reg_confirm_password,
      reg_visit_location,
      reg_mou_sign,
      reg_status
    }
    axios.post("http://localhost:8000/add_registration", userdata)
      .then((res) => {
        console.log(res.data);
        handleClear();
      })
      .catch((err) => console.log(err))
  };
  const handleClear = () => {
    setCollage_name("");
    setReg_state("");
    setReg_district("");
    setReg_city("");
    setReg_university_name("");
    setReg_principal_name("");
    setReg_contact_person("");
    setReg_contact_person_contact1("");
    setReg_contact_person_contact2("");
    setReg_college_email_id("");
    setReg_college_username("");
    setReg_password("");
    setReg_confirm_password("");
    setReg_visit_location("");
    setReg_mou_sign("");
    setReg_status("");
  };

  // Get State
  useEffect(() => {
    axios
      .get("http://localhost:8000/getstate")
      .then((res) => {
        setState(res.data.data);
        // console.log("1",res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // Get District
  useEffect(() => {
    axios
      .get("http://localhost:8000/getdistrict")
      .then((res) => {
        setDistrict(res.data.data);
        // console.log("1",res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get City
  useEffect(() => {
    axios
      .get("http://localhost:8000/getcity")
      .then((res) => {
        setCity(res.data.data);
        // console.log("1",res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   Get University
  useEffect(() => {
    axios
      .get("http://localhost:8000/getuniversity")
      .then((res) => {
        setUniversity(res.data.data);
        // console.log("1",res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <h2 className="text-center my-4">Registration Form</h2>
      {/* Form  */}
      <Container
        className="border border-dark h-100  p-4 d-flex justify-content-center"
        style={{ maxWidth: "600px" }}
      >
        <Form className="w-100">
          {/* College Name */}
          <Form.Group className="mb-3" controlId="formGroupCollege">
            <Form.Label className="mt-3">College Name:</Form.Label>
            <Form.Control
              value={collage_name}
              onChange={(e) => setCollage_name(e.target.value)}
              type="text"
              placeholder="Enter name of the college"
              className="w-100"
            />
          </Form.Group>
          {/* State  */}
          <Form.Group className="mb-3" controlId="formGroupState">
            <Form.Label>State:</Form.Label>
            <Form.Select 
            aria-label="Select State"
            className="w-100"
            value={reg_state} 
            onChange={(e) => setReg_state(e.target.value)}
            >
              <option>Select State</option>
              {state.map((item, index) => {
                return (
                  <option key={item._id} value={item.state_name}>
                    {item.state_name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          {/* District */}
          <Form.Group className="mb-3" controlId="formGroupDistrict">
            <Form.Label>District:</Form.Label>
            <Form.Select 
            aria-label="Default select example" 
            className="w-100"
            value={reg_district} 
            onChange={(e) => setReg_district(e.target.value)}
            >
              <option>Select District</option>
              {district.map((item, index) => {
                return (
                  <option key={item._id} value={item.state_name}>
                    {item.district_name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          {/* City */}
          <Form.Group className="mb-3" controlId="formGroupCity">
            <Form.Label>City:</Form.Label>
            <Form.Select 
            aria-label="Default select example"
             className="w-100"
             value={reg_city} 
             onChange={(e) => setReg_city(e.target.value)}
             >
              <option>Select City</option>
              {city.map((item, index) => {
                return (
                  <option key={item._id} value={item.state_name}>
                    {item.city_name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          {/* University Name */}
          <Form.Group className="mb-3" controlId="formGroupUniversityName">
            <Form.Label className="mt-3">University Name:</Form.Label>
            <Form.Control
              type="text"
              value={reg_university_name}
              onChange={(e) => setReg_university_name(e.target.value)}
              placeholder="Enter name of the university"
              className="w-100"
            />
          </Form.Group>
          {/* Principal Name */}
          <Form.Group className="mb-3" controlId="formGroupPrincipalName">
            <Form.Label className="mt-3">Principal Name:</Form.Label>
            <Form.Control
              type="text"
              value={reg_principal_name}
              onChange={(e) => setReg_principal_name(e.target.value)}
              placeholder="Enter the name of the principal"
              className="w-100"
            />
          </Form.Group>
          {/* Contact Person  */}
          <Form.Group className="mb-3" controlId="formGroupContact">
            <Form.Label className="mt-3">Contact Person Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact person name"
              className="w-100"
              value={reg_contact_person}
              onChange={(e) => setReg_contact_person(e.target.value)}
            />
          </Form.Group>
          <Row>
            {/* First Contact Person */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGroupContact1">
                <Form.Control
                  type="tel"
                  value={reg_contact_person_contact1}
                  onChange={(e) => setReg_contact_person_contact1(e.target.value)}
                  placeholder="Contact Person 1 "
                  className="w-custom"
                />
              </Form.Group>
            </Col>
            {/* Second Contact Person */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGroupContact2">
                <Form.Control
                  type="tel"
                  value={reg_contact_person_contact2}
                  onChange={(e) => setReg_contact_person_contact2(e.target.value)}
                  placeholder="Contact Person 2 "
                  className="w-custom"
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Email ID */}
          <Form.Group className="mb-3" controlId="formGroupUniversityName">
            <Form.Label className="mt-3">College Email ID:</Form.Label>
            <Form.Control
              type="email"
              value={reg_college_email_id}
              onChange={(e) => setReg_college_email_id(e.target.value)}
              placeholder="Enter email ID of college"
              className="w-100"
            />
          </Form.Group>
          {/* Login / UserName */}
          <Form.Group className="mb-3" controlId="formGroupUserName">
            <Form.Label className="mt-3">Login Name/Username:</Form.Label>
            <Form.Control
              type="text"
              value={reg_college_username}
              onChange={(e) => setReg_college_username(e.target.value)}
              placeholder="Enter username"
              className="w-100"
            />
          </Form.Group>
          {/* Password */}
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label className="mt-3">Password:</Form.Label>
            <Form.Control
              type="password"
              value={reg_password}
              onChange={(e) => setReg_password(e.target.value)}
              placeholder="Enter password"
              className="w-100"
            />
          </Form.Group>
          {/* Confirm Password */}
          <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
            <Form.Label className="mt-3"> Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={reg_confirm_password}
              className="w-100"
            />
          </Form.Group>
          {/* Select Visiting Location 
          <Form.Group className="mb-3" controlId="formGroupLocation">
            <Form.Label>Visiting Location:</Form.Label>
            <Form.Select aria-label="Default select example" className="w-100">
              <option>Select City</option>
              <option value="1">Pune</option>
              <option value="2">Nashik</option>
            </Form.Select>
          </Form.Group>
          */}
          {/* Is MOU Signed? */}
          <Row>
            <Form.Group className="mb-3 mt-3" controlId="MOUSign">
              <Form.Label className="mx-5">Is MOU Signed?</Form.Label>
              <Form.Check
                type="radio"
                label="Yes"
                name="mouGroup" // Unique name for this group
                value="yes"
                className="me-5 text-dark"
                checked={reg_mou_sign === "yes"}
                onChange={(e) => setReg_mou_sign(e.target.value)}
                inline
              />
              <Form.Check
                type="radio"
                label="No"
                name="mouGroup" // Unique name for this group
                value="no"
                checked={reg_mou_sign === "no"}
                onChange={(e) => setReg_mou_sign(e.target.value)}
                inline
              />
            </Form.Group>
          </Row>

          {/* Active/Inactive Status */}
          <Row>
            <Form.Group className="" controlId="Status">
              <Form.Label className="mb-3 mx-5">Select Status :</Form.Label>
              <Form.Check
                type="radio"
                label="Active"
                name="statusGroup" // Unique name for this group
                value="Active"
                className="me-5 text-dark"
                checked={reg_status === "Active"}
                onChange={(e) => setReg_status(e.target.value)}
                inline
              />
              <Form.Check
                type="radio"
                label="Inactive"
                name="statusGroup" // Unique name for this group
                value="Inactive"
                checked={reg_status === "Inactive"}
                onChange={(e) => setReg_status(e.target.value)}
                inline
              />
            </Form.Group>
          </Row>


          {/* Submit button */}
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            <Button variant="danger" onClick={handleClear} className="mx-5">
              Clear
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default College_registration;