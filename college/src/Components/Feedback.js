import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import ColHeader from "./Navbar";

const Feedback = () => {
  const [feedback_Visit_Date, setVisitDate] = useState("");
  const [feedback_message, setMessage] = useState("");
  const [visitData, setData] = useState([]);

  // get API for district based on selected visit date
  useEffect(() => {
    
      axios
        .get("http://localhost:8000/getvisit")
        .then((res) => {
        //   const filteredDistricts = res.data.data.filter(
        //     (district) => district.district_state =
        //   );
        //   setDistrictdata(filteredDistricts);
        })
        .catch((err) => console.log(err));
    
  }, []);

  //   add data API
  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
       feedback_Visit_Date,
       feedback_message
    };

    axios
      .post("http://localhost:8000/addfeedback", userdata)
      .then((res) => {
        handleClear();
      })
      .catch((err) => console.log(err));
  };

  const handleClear = () => {
    setVisitDate("");
    setMessage("");
  };

  return (
    <>
    <ColHeader></ColHeader>
    <Container className="mt-5" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Add Feedback</h2>
          <Form className="border border-dark p-4 mt-5" onSubmit={handleSubmit}>
            <Row className="mb-3 text-center">
              <Form.Group controlId="categoryDropdown" className="mt-4">
                <Form.Label className="fs-5 text-dark">Visit Date:</Form.Label>
                <Form.Control
                  as="select"
                  value={feedback_Visit_Date}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="mx-auto mt-3 py-2 dropdown-width"
                >
                  <option value="">
                    -- Select Date --{" "}
                    <FaCaretDown className="ms-2 text-primary" />
                  </option>
                  {visitData.map((item, index) => {
                    return (
                      <option key={item._id} value={item.state_name}>
                        {item.state_name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Row>

           
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label htmlFor="feedback" className="text-dark fs-5">
                    Feedback Message:
                  </Form.Label>
                  <Form.Control
                    id="feedback"
                    placeholder="Enter message"
                    type="text"
                    value={feedback_message}
                    onChange={(e) => setMessage (e.target.value)}
                    required
                    className="py-2"
                  />
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
    </>
  );
};

export default Feedback;
