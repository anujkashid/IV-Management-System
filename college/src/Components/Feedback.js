import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import ColHeader from "./Navbar";

const Feedback = () => {
  const [feedback_Visit_Date, setVisitDate] = useState("");
  const [feedback_message, setMessage] = useState("");
  const [visitData, setVisitData] = useState([]);
  const [collegeData, setColleData] = useState([]);
  const [datedata, setDateData] = useState([]);

  const college_name = localStorage.getItem("CollegeName");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        console.log("data", res.data.userData);
        setVisitData(data);

        const filteredCollege = [
          ...new Set(data.map((item) => item.college_name)),
        ];
        setColleData(filteredCollege);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (college_name) {
      const today = new Date();
      const pastWeek = new Date(today);
      pastWeek.setDate(today.getDate() - 30);


      const filteredDate = visitData.filter(
        (item) =>
          item.college_name === college_name &&
          new Date(item.Date_of_visit) <= today &&
          new Date(item.Date_of_visit) >= pastWeek
      );

      setDateData(filteredDate);
    } else {
      setDateData([]);
    }
  }, [college_name, visitData]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      college_name,
      feedback_Visit_Date,
      feedback_message,
    };

    axios
      .post("http://localhost:8000/addfeedback", userdata)
      .then((res) => {
        handleClear();
        // Optional: Provide a success message or redirect
      })
      .catch((err) => console.log(err));
  };

  // Clear form data
  const handleClear = () => {
    setVisitDate("");
    setMessage("");
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString('default', { month: 'short' })}-${d.getFullYear()}`;
  };
  
  return (
    <>
     <ColHeader />
    <Container fluid className="h-100 vh-100" style={{ backgroundColor: "#EEEEFF" }}> 
        <Row>
          <Col md={4} className="mx-auto">
            <h2 className="text-center text-danger mt-4">Add Feedback</h2>
            <Form className="border border-dark p-4 mt-4" onSubmit={handleSubmit}>
              <Row className="mb-3 text-center">
                <Form.Group controlId="categoryDropdown" className="">
                  <Form.Label className=" text-dark">Visit Date:</Form.Label>
                  <Form.Select
                   aria-label="Select Date"
                    value={feedback_Visit_Date}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="mx-auto mt-3 py-2 dropdown-width"
                  >
                    <option value="">
                      -- Select Date --{" "}
                      <FaCaretDown className="ms-2 text-primary" />
                    </option>
                    {datedata.map((item, index) => (
                      <option key={index} value={item.Date_of_visit}>
                        {formatDate(item.Date_of_visit)} 
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group className="text-center">
                    <Form.Label htmlFor="feedback" className="text-dark">
                      Feedback Message:
                    </Form.Label>
                    <Form.Control
                      id="feedback"
                      placeholder="Enter message"
                      type="text"
                      value={feedback_message}
                      onChange={(e) => setMessage(e.target.value)}
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
