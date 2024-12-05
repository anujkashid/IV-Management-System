import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";

const Fees = () => {
  const [agenda_title, setAgenda_title] = useState("");
  const [agenda_description, setAgenda_description] = useState("");
  const [agenda_time, setAgenda_time] = useState("");
  const [agenda_status, setAgenda_status] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata={
        agenda_title,
        agenda_description,
        agenda_time,
        agenda_status,
        
    }

    axios.post("http://localhost:8000/add_agenda",userdata)
    .then((res)=>{
        console.log(res.data.data);
        handleClear();
    })
    .catch((err)=> console.log(err))
  };

  const handleClear = () => {
    setAgenda_title("");
    setAgenda_description("");
    setAgenda_time("");
    setAgenda_status("");
  };

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Add Agenda</h2>
          <Form
            className="border border-dark p-4 mt-5"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label htmlFor="city" className="text-dark  fs-5"> Enter Agenda Title:</Form.Label>
                  <Form.Control
                    id="city"
                    placeholder="Enter title"
                    type="text"
                    value={agenda_title}
                    onChange={(e) => setAgenda_title(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label htmlFor="name" className="text-dark fs-5">Agenda Description:</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Amount"
                    type="text"
                    value={agenda_description}
                    onChange={(e) => setAgenda_description(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label htmlFor="name" className="text-dark fs-5">Agenda Time:</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Time"
                    type="datetime"
                    value={agenda_time}
                    onChange={(e) => setAgenda_time(e.target.value)}
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
                      checked={agenda_status === "Active"}
                      onChange={(e) => setAgenda_status(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={agenda_status === "Inactive"}
                      onChange={(e) => setAgenda_status(e.target.value)}
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