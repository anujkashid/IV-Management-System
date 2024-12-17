import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const College_registration = () => {
  const [collage_name, setCollage_name] = useState("");
  const [reg_state, setReg_state] = useState("");
  const [reg_district, setReg_district] = useState("");
  const [reg_city, setReg_city] = useState("");
  const [reg_university_name, setReg_university_name] = useState("");
  const [reg_principal_name, setReg_principal_name] = useState("");
  const [reg_contact_person, setReg_contact_person] = useState("");
  const [reg_contact_person_contact1, setReg_contact_person_contact1] =
    useState("");
  const [reg_contact_person_contact2, setReg_contact_person_contact2] =
    useState("");
  const [reg_college_email_id, setReg_college_email_id] = useState("");
  const [reg_college_username, setReg_college_username] = useState("");
  const [reg_password, setReg_password] = useState("");
  const [reg_confirm_password, setReg_confirm_password] = useState("");
  const [reg_visit_location, setReg_visit_location] = useState("");
  const [reg_mou_sign, setReg_mou_sign] = useState("");
  const [reg_status, setstatus] = useState("");
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [city, setCity] = useState([]);
  const [university, setUniversity] = useState([]);

  const [validated, setValidated] = useState(false);

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
      reg_status,
    };

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    axios
      .post("http://localhost:8000/add_registration", userdata)
      .then((res) => {
        console.log(res.data);
        handleClear();
      })
      .catch((err) => console.log(err));
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
    setstatus("");
  };

  // Get State
  useEffect(() => {
    axios
      .get("http://localhost:8000/getstate")
      .then((res) => {
        setState(res.data.data);
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
     <div  style={{
      background: "linear-gradient(135deg, #145a76, #1d809f, #67b7d1)",
      height: "100%",           
      width: "100vw"                
    }}>
     
      {/* Form  */}
      <Container
      >
        <Row>
          <Col  className="mx-auto h-100  p-4 bg-white mt-5 rounded-2 "style={{ maxWidth: "600px" }}  >
         <h2 className="text-center text-primary fs-3 mb-3">Registration Form</h2>
        <Form className=" p-2" noValidate validated={validated} onSubmit={handleSubmit}>
          {/* College Name */}
          <Form.Group className="mb-3 text-center" controlId="formGroupCollege">
            <Form.Label>College Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={collage_name}
              onChange={(e) => setCollage_name(e.target.value)}
              placeholder="Enter College Name"
            />
            <Form.Control.Feedback type="invalid">
              Please provide the college name.
            </Form.Control.Feedback>
          </Form.Group>

          {/* State */}
          <Form.Group className="mb-3 text-center" controlId="formGroupState">
            <Form.Label>State</Form.Label>
            <Form.Select
              required
              value={reg_state}
              onChange={(e) => setReg_state(e.target.value)}
            >
              <option value="">Select State</option>
              {state.map((item) => (
                <option key={item._id} value={item.state_name}>
                  {item.state_name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a state.
            </Form.Control.Feedback>
          </Form.Group>

          {/* District */}
          <Form.Group className="mb-3 text-center" controlId="formGroupDistrict">
            <Form.Label>District</Form.Label>
            <Form.Select
              required
              value={reg_district}
              onChange={(e) => setReg_district(e.target.value)}
            >
              <option value="">Select District</option>
              {district.map((item) => (
                <option key={item._id} value={item.district_name}>
                  {item.district_name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a district.
            </Form.Control.Feedback>
          </Form.Group>

          {/* City */}
          <Form.Group className="mb-3 text-center" controlId="formGroupCity">
            <Form.Label>City</Form.Label>
            <Form.Select
              required
              value={reg_city}
              onChange={(e) => setReg_city(e.target.value)}
            >
              <option value="">Select City</option>
              {city.map((item) => (
                <option key={item._id} value={item.city_name}>
                  {item.city_name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a city.
            </Form.Control.Feedback>
          </Form.Group>

          {/* University Name */}
          <Form.Group className="mb-3 text-center" controlId="formGroupUniversity">
            <Form.Label>University Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={reg_university_name}
              onChange={(e) => setReg_university_name(e.target.value)}
              placeholder="Enter University Name"
            />
            <Form.Control.Feedback type="invalid">
              Please provide the university name.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Principal Name */}
          <Form.Group className="mb-3 text-center" controlId="formGroupPrincipalName">
            <Form.Label>Principal Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={reg_principal_name}
              onChange={(e) => setReg_principal_name(e.target.value)}
              placeholder="Enter Principal Name"
            />
            <Form.Control.Feedback type="invalid">
              Please provide the principal name.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Contact Person */}
          <Form.Group className="mb-3 text-center" controlId="formGroupContactPerson">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control
              required
              type="text"
              value={reg_contact_person}
              onChange={(e) => setReg_contact_person(e.target.value)}
              placeholder="Enter Contact Person Name"
            />
            <Form.Control.Feedback type="invalid">
              Please provide the contact persons name.
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col>
              {/* Contact Person Contact 1 */}
              <Form.Group className="mb-3 text-center" controlId="formGroupContact1">
                <Form.Label>Contact Person Contact 1</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  value={reg_contact_person_contact1}
                  onChange={(e) =>
                    setReg_contact_person_contact1(e.target.value)
                  }
                  pattern="^\d{10}$"
                  placeholder="Enter 10-digit Contact Number"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid 10-digit contact number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              {/* Contact Person Contact 2 */}
              <Form.Group className="mb-3 text-center" controlId="formGroupContact2">
                <Form.Label>Contact Person Contact 2</Form.Label>
                <Form.Control
                  type="tel"
                  value={reg_contact_person_contact2}
                  onChange={(e) =>
                    setReg_contact_person_contact2(e.target.value)
                  }
                  pattern="^\d{10}$"
                  placeholder="Enter 10-digit Contact Number (Optional)"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid 10-digit contact number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Email ID */}
          <Form.Group className="mb-3 text-center" controlId="formGroupEmail">
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              required
              type="email"
              value={reg_college_email_id}
              onChange={(e) => setReg_college_email_id(e.target.value)}
              placeholder="Enter Email ID"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Username */}
          <Form.Group className="mb-3 text-center" controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              value={reg_college_username}
              onChange={(e) => setReg_college_username(e.target.value)}
              placeholder="Enter Username"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a username.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3 text-center" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={reg_password}
              onChange={(e) => setReg_password(e.target.value)}
              minLength={8}
              placeholder="Enter Password"
            />
            <Form.Control.Feedback type="invalid">
              Password must be at least 8 characters long.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3 text-center" controlId="formGroupConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={reg_confirm_password}
              onChange={(e) => setReg_confirm_password(e.target.value)}
              isInvalid={reg_password !== reg_confirm_password}
              placeholder="Confirm Password"
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Visiting Location */}
          <Form.Group className="mb-3 text-center" controlId="formGroupVisitLocation">
            <Form.Label>Visiting Location</Form.Label>
            <Form.Control
              required
              type="text"
              value={reg_visit_location}
              onChange={(e) => setReg_visit_location(e.target.value)}
              placeholder="Enter Visiting Location"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a visiting location.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 text-center" controlId="formGroupMOU">  
        <Form.Label>MOU Signed</Form.Label>  
        <Form.Select  
          required  
          value={reg_mou_sign}  
          onChange={(e) => setReg_mou_sign(e.target.value)}  
        >  
          <option value="">Select</option>  
          <option value="Yes">Yes</option>  
          <option value="No">No</option>  
        </Form.Select>    
      </Form.Group>  

      <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label className="text-dark fs-5">
                    Select Status:
                  </Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Active"
                      name="status"
                      value="active"
                      className="me-5 text-dark"
                      checked={reg_status === "Active"}
                      onChange={(e) => setstatus(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={reg_status === "Inactive"}
                      onChange={(e) => setstatus(e.target.value)}
                      inline
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

          {/* Submit Button */}
          <div className="text-center">
          <Button type="submit"  variant="primary">
            Submit
          </Button>
          <Button type="submit"  variant="danger" className="ms-5" onClick={handleClear}>
            Clear
          </Button>
          </div>

          <div className="text-center mt-3">
                  <p>Already have an account?  <Link to="/" className=""><span className="ms-3  ">Login</span></Link></p>
              </div>
        </Form>
        </Col>
        </Row>
      </Container>
      </div>
    </>
  );
};

export default College_registration;
