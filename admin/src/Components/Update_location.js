import axios from "axios";
import React, { useEffect, useState, } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Update_location = () => {
  const [locationData, setLocationData] = useState({});
  const [location_city, setLocationcity] = useState("");
  const [location_name, setLocationname] = useState("");
  const [location_status, setLocationstatus] = useState("");
  const id = localStorage.getItem("updatelocationid");
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata={
        location_city,
        location_name,
        location_status
    }

    axios
    .put(`http://localhost:8000/updatelocation/${id}`, userdata)
    .then((res) => {
      alert("Location Details Updated Successfully");
      navigate("/head/location");
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error while updating Location:", err);
    });
};

useEffect(() => {
  axios
    .get(`http://localhost:8000/getonelocation/${id}`)
    .then((res) => {
      setLocationData(res.data);
      setLocationcity(res.data.location_city); // Set the initial value for university_name
      setLocationname(res.data.location_name);
      setLocationstatus(res.data.location_status);
    })
    .catch((error) => {
      console.error("Error fetching visit data:", error);
    });
}, []);

  const handleClear = () => {
    setLocationcity("");
    setLocationname("");
    setLocationstatus("");
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col xl={6} className="mx-auto">
          <h2 className="text-center">Update Location</h2>
          <Form
            className="border border-dark p-4 mt-2"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="city" className="fw-bold ms-3"> Enter City</Form.Label>
                  <Form.Control
                    id="city"
                    placeholder="Enter city"
                    type="text"
                    value={location_city}
                    onChange={(e) => setLocationcity(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="name" className="fw-bold ms-3"> Building Name</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Name"
                    type="text"
                    value={location_name}
                    onChange={(e) => setLocationname(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                <div>
                  <Form.Label className="fw-bold ms-3">Select Status</Form.Label>
                  
                    <Form.Check
                      type="radio"
                      label="Active"
                      name="status"
                      value="active"
                      className="me-4 ms-4 text-dark"
                      checked={location_status === "active"}
                      onChange={(e) => setLocationstatus(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={location_status === "inactive"}
                      onChange={(e) => setLocationstatus(e.target.value)}
                      inline
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="text-center mt-4">
              <Col>
                <Button type="submit" className="btn btn-primary">
                  Update
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger ms-5"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Update_location;