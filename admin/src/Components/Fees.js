import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";

const Fees = () => {
  const [location_city, setLocationcity] = useState("");
  const [location_name, setLocationname] = useState("");
  const [location_status, setLocationstatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata={
        location_city,
        location_name,
        location_status
    }

    axios.post("http://localhost:8000/addlocation",userdata)
    .then((res)=>{
        console.log(res.data.data);
        handleClear();
    })
    .catch((err)=> console.log(err))
  };

  const handleClear = () => {
    setLocationcity("");
    setLocationname("");
    setLocationstatus("");
  };

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Add Fees</h2>
          <Form
            className="border border-dark p-4 mt-5"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label htmlFor="city" className="text-dark  fs-5"> Enter Fees Title:</Form.Label>
                  <Form.Control
                    id="city"
                    placeholder="Enter title"
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
                <Form.Group className="text-center">
                  <Form.Label htmlFor="name" className="text-dark fs-5">Enter Amount:</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Amount"
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
                <Form.Group className="text-center">
                  <Form.Label className="text-dark fs-5">Select Status:</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Active"
                      name="status"
                      value="active"
                      className="me-5 text-dark"
                      checked={location_status === "Active"}
                      onChange={(e) => setLocationstatus(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={location_status === "Inactive"}
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
                  Submit
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

export default Fees;