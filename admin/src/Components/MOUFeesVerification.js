import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  Button,
  Col,
  Row,
} from "react-bootstrap"; // Import React-Bootstrap components

const MOUFeesVerification = () => {
  // Get college name and MOU signed status from localStorage
  const collegename = localStorage.getItem("selectedcollegename");
  const mousigned = localStorage.getItem("selectedmousigned");

  // States for fee data, titles, selected fee title, and selected fee details
  const [feesdata, setFeesData] = useState([]);
  const [feestitle, setFeestitle] = useState([]);
  const [selectedFeeTitle, setSelectedFeeTitle] = useState("");
  const [selectedFee, setSelectedFee] = useState(null);

  // Fetch fee data from backend API
  useEffect(() => {
    axios
      .get("http://localhost:8000/get_fees")
      .then((res) => {
        const data = res.data.data;
        setFeesData(data);
        const allfeestitle = data.map((item) => item.fees_title);
        setFeestitle(allfeestitle);
      })
      .catch((err) => {
        console.error("Error fetching fee data:", err);
      });
  }, []);

  // Handle fee title selection
  const handleFeeTitleChange = (e) => {
    const selectedTitle = e.target.value;
    setSelectedFeeTitle(selectedTitle);

    const feeDetails = feesdata.find(
      (item) => item.fees_title === selectedTitle
    );
    setSelectedFee(feeDetails);
  };

  // Clear form fields
  const handleClear = () => {
    setSelectedFeeTitle("");
    setSelectedFee(null);
  };

  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      college_name: collegename,
      fees_title: selectedFeeTitle,
      fees: selectedFee?.fees_amount,
      mousigned,
    };

    axios
      .post("http://localhost:8000/addmoufee", userdata)
      .then((res) => {
        console.log("Fee data submitted successfully:", res.data);
        handleClear();
      })
      .catch((err) => {
        console.error("Error submitting fee data:", err);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mt-3">MOU Fees Verification</h2>
      <Col md={4} className="mx-auto">
        <Form className="border border-dark p-4 mt-4" onSubmit={handleSubmit}>
          {/* College Name */}
          <FormGroup as={Row} className="mb-3">
            <Form.Label>College Name</Form.Label>
            <FormControl type="text" value={collegename} readOnly />
          </FormGroup>

          {/* MOU Signed */}
          <FormGroup as={Row} className="mb-3">
            <Form.Label>MOU Signed</Form.Label>
            <FormControl type="text" value={mousigned} readOnly />
          </FormGroup>

          {/* Select Fee Title */}
          <FormGroup as={Row} className="mb-3">
            <Form.Label>Select Fee Title</Form.Label>
            <FormControl
              as="select"
              value={selectedFeeTitle}
              onChange={handleFeeTitleChange}
            >
              <option value="">-- Select a Fee Title --</option>
              {feestitle.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </FormControl>
          </FormGroup>

          {/* Fee Details */}
          {selectedFee && (
            <>
              <FormGroup as={Row} className="mb-3">
                <Form.Label>Fee Amount</Form.Label>
                <FormControl
                  type="text"
                  value={selectedFee.fees_amount}
                  readOnly
                />
              </FormGroup>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </>
          )}
        </Form>
      </Col>
    </div>
  );
};

export default MOUFeesVerification;
