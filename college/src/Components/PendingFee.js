import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import ColHeader from "./Navbar";
import { setDate } from "date-fns";

const PendingFee = () => {
  const [visitData, setVisitData] = useState([]);
  const [datedata, setDateData] = useState([]);
  const [selectedFee, setSelectedFee] = useState("");
  const collegename = localStorage.getItem("CollegeName");
  const [fees_status, setFeesStatus] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((response) => {
        const filteredData = response.data.userData.filter(
          (visit) =>
            visit.college_name === collegename &&
            visit.fees !== 0 &&
            visit.fees_status === "unpaid"
        );
        setVisitData(filteredData);

        const datevisitdata = filteredData.map((item) => ({
          date: item.Date_of_visit,
          fees: item.fees,
          id: item._id,
        }));
        setDateData(datevisitdata);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const selectedItem = datedata.find((item) => item.date === selectedDate);
    if (selectedItem) {
      setSelectedFee(selectedItem.fees);
      setId(selectedItem.id); // Correctly set ID
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id || !fees_status) {
      alert("Please select a visit date and update fee status.");
      return;
    }

    const userdata = { fees_status };

    axios
      .put(`http://localhost:8000/updatevisit/${id}`, userdata)
      .then(() => {
        alert("Fee status updated successfully!");
        setId("");
        setFeesStatus("");
        setDate("");
        localStorage.removeItem(collegename);
        setSelectedFee("");
      })
      .catch((err) => {
        console.error("Error updating fee status:", err);
        alert("Error updating fee status. Please try again.");
      });
  };

  return (
    <Container fluid>
      <Row>
        <ColHeader />
        <Col md={6} className="mx-auto mt-5">
          <h2 className="text-center">Update Fee Status</h2>
          <Form className="border border-dark p-4 mt-5" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label className="text-dark fs-5">College Name:</Form.Label>
                  <Form.Control
                    placeholder="Enter name"
                    type="text"
                    value={collegename}
                    readOnly
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label className="text-dark">Date of Visit:</Form.Label>
                  <Form.Control as="select" onChange={handleDateChange}>
                    <option value="">Select Date</option>
                    {datedata.map((dateItem, idx) => (
                      <option key={idx} value={dateItem.date}>
                        {formatDate(dateItem.date)}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label className="text-dark">Fees:</Form.Label>
                  <Form.Control type="text" value={selectedFee} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Form.Label>Fees Paid Status</Form.Label>
              <Form.Select
                value={fees_status}
                onChange={(e) => setFeesStatus(e.target.value)}
              >
                <option value="">Select here...</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </Form.Select>
            </Row>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PendingFee;
