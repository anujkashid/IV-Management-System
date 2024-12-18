import axios from "axios";
import React, { useEffect, useState, } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";

const Update_agenda = () => {
  const [agendaData, setagendaData] = useState({});
  const [agenda_title, setAgenda_title] = useState("");
  const [agenda_description, setAgenda_description] = useState("");
  const [agenda_time, setAgenda_time] = useState("");
  const [agenda_status, setAgenda_status] = useState("");

  const id = localStorage.getItem("updateagendaid");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata={
      agenda_title,
      agenda_description,
      agenda_time,
      agenda_status
    }

    axios
    .put(`http://localhost:8000/update_agenda/${id}`, userdata)
    .then((res) => {
      alert("agenda Details Updated Successfully");
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error while updating agenda:", err);
    });
};

useEffect(() => {
  axios
    .get(`http://localhost:8000/get_agenda_one/${id}`)
    .then((res) => {
      console.log("API Response:", res.data);
      // setagendaData(res.data);
      const data = res.data.userData;
      setAgenda_title(data.agenda_title || "");
      setAgenda_description(data.agenda_description || "");
      setAgenda_time(data.agenda_time || "");
      setAgenda_status(data.agenda_status || "");
    })
    .catch((error) => {
      console.error("Error fetching visit data:", error);
    });
}, []);

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Update agenda</h2>
          <Form
            className="border border-dark p-4 mt-5"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label htmlFor="city" className="text-dark  fs-5"> Enter Title:</Form.Label>
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
                  <Form.Label htmlFor="name" className="text-dark fs-5">Enter Description:</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Name"
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
                  <Form.Label htmlFor="name" className="text-dark fs-5">Enter Time:</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Name"
                    type="text"
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
                      label="active"
                      name="status"
                      value={agenda_status}
                      className="me-5 text-dark"
                      checked={agenda_status === "active"}
                      onChange={(e) => setAgenda_status(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="inactive"
                      name="status"
                      value={agenda_status}
                      checked={agenda_status === "inactive"}
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
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Update_agenda;