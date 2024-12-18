import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import ColHeader from "./Navbar";

const CancelledVisit = () => {
  const [visitData, setVisitData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [visit_cancelled, setVisitStatus] = useState(""); // State for visit status (Cancelled / Accepted)
  const [selectedVisitId, setSelectedVisitId] = useState(""); // State to store visit ID for the selected date
  const collegename = localStorage.getItem("CollegeName");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        const collgedata = data.filter(
          (visit) => visit.college_name === collegename  && visit.Visit_accept==="accept"
        );
        setVisitData(collgedata);
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
    setSelectedDate(event.target.value);
    const selectedVisit = visitData.find(
      (item) => formatDate(item.Date_of_visit) === event.target.value
    );
    if (selectedVisit) {
      setSelectedVisitId(selectedVisit._id); // Store the selected visit ID
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userdata = {
      visit_cancelled
    };

    axios
      .put(`http://localhost:8000/updatevisit/${selectedVisitId}`, userdata)
      .then((res) => {
        alert("Visit cancelled successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Error cancelling visit");
      });
  };

  return (
    <div className="h-100 vh-100" style={{ backgroundColor: "#EEEEFF" }}>
      <ColHeader />
      <h3 className="text-center text-danger mb-4 mt-4">Cancel Visit</h3>
      <Col md={4} className="mx-auto">
        <div className="container">
          <form className="border border-dark p-2" onSubmit={handleSubmit}>
            <div className="mb-3 text-center">
              <label htmlFor="collegeName" className="form-label">
                College Name
              </label>
              <input
                type="text"
                className="form-control"
                id="collegeName"
                value={collegename}
                disabled
              />
            </div>

            <div className="mb-3 text-center">
              <label htmlFor="visitDate" className="form-label">
                Select Visit Date
              </label>
              <Form.Select
                aria-label="Select Visit Date"
                value={selectedDate}
                onChange={handleDateChange}
              >
                <option value="">Select visit date</option>
                {visitData.map((item, index) => (
                  <option key={index} value={formatDate(item.Date_of_visit)}>
                    {formatDate(item.Date_of_visit)}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="mb-3 text-center">
              <label htmlFor="visitStatus" className="form-label">
                Select Visit Status
              </label>
              <Form.Select
                aria-label="Select Visit Status"
                value={visit_cancelled}
                onChange={(e) => setVisitStatus(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </div>

            <div className="mb-3 text-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Col>
    </div>
  );
};

export default CancelledVisit;
