import axios from "axios";
import React, { useEffect, useState, } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";

const Update_university = () => {
  const [universityData, setUniversityData] = useState({});
  const [university_name, setUniversityname] = useState("");
  const [university_status, setUniversitystatus] = useState("");
  const id = localStorage.getItem("updateuniversityid");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata={
      university_name,
      university_status,
    }

    axios
    .put(`http://localhost:8000/updateuniversity/${id}`, userdata)
    .then((res) => {
      alert("Univarsity Details Updated Successfully");
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error while updating Location:", err);
    });
};

useEffect(() => {
  axios
    .get(`http://localhost:8000/getoneuniversity/${id}`)
    .then((res) => {
      setUniversityData(res.data);
      setUniversityname(res.data.university_name); // Set the initial value for university_name
      setUniversitystatus(res.data.university_status);
    })
    .catch((error) => {
      console.error("Error fetching visit data:", error);
    });
}, []);

  const handleClear = () => {
    setUniversityname("");
    setUniversitystatus("");
  };

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Update University</h2>
          <Form
            className="border border-dark p-4 mt-5"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label className="text-dark  fs-5"> Enter University Name:</Form.Label>
                  <Form.Control
                    placeholder="Enter name"
                    type="text"
                    value={university_name}
                    onChange={(e) => setUniversityname(e.target.value)}
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
                      checked={university_status === "active"}
                      onChange={(e) => setUniversitystatus(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={university_status === "inactive"}
                      onChange={(e) => setUniversitystatus(e.target.value)}
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

export default Update_university;