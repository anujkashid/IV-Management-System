import axios from "axios";
import React, { useEffect, useState, } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";

const Update_fees = () => {
  const [feesData, setFeesData] = useState({});
  const [fees_title, setFees_title] = useState("");
  const [fees_amount, setFees_amount] = useState("");
  const [fees_status, setFees_status] = useState("");
  const id = localStorage.getItem("updatefeesid");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata={
      fees_title,
      fees_amount,
      fees_status
    }

    axios
    .put(`http://localhost:8000/update_fees/${id}`, userdata)
    .then((res) => {
      alert("fees Details Updated Successfully");
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error while updating fees:", err);
    });
};

useEffect(() => {
  axios
    .get(`http://localhost:8000/get_fees_one/${id}`)
    .then((res) => {
      // setFeesData(res.data.userData);
      const data = res.data.userData;
      setFees_title(data.fees_title || ""); // Set the initial value for university_name
      setFees_amount(data.fees_amount || "");
      setFees_status(data.fees_status || "");
    })
    .catch((error) => {
      console.error("Error fetching visit data:", error);
    });
}, []);

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Update fees</h2>
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
                    value={fees_title}
                    onChange={(e) => setFees_title(e.target.value)}
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
                    value={fees_amount}
                    onChange={(e) => setFees_amount(e.target.value)}
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
                      checked={fees_status === "Active"}
                      onChange={(e) => setFees_status(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={fees_status === "Inactive"}
                      onChange={(e) => setFees_status(e.target.value)}
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

export default Update_fees;