import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import ColHeader from "./Navbar";
import { useNavigate } from "react-router-dom";

const CancelledVisit = () => {
  const [visitData, setVisitData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [visit_cancelled, setVisitStatus] = useState("");
  const collegename = localStorage.getItem("CollegeName");
  const id = localStorage.getItem("cancelvisitid");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getvisitone/${id}`)
      .then((res) => {
        setVisitData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.toLocaleString("default", {
      month: "short",
    })}/${d.getFullYear()}`;
  };

  const cancelid = visitData._id;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (visitData?.Visit_accept === "accept") {
      localStorage.setItem("resceduledid", cancelid);
      navigate("/reschedulevisit");
    } else if (visitData?.Visit_accept === "pending") {
      const userdata = {
        visit_cancelled,
      };
      axios
        .put(`http://localhost:8000/updatevisit/${cancelid}`, userdata)
        .then((res) => {
          alert("Visit cancelled successfully");
        })
        .catch((err) => {
          console.error("Error cancelling visit:", err);
          alert("Error cancelling visit");
        });
    }
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
                Visit Date
              </label>
              <Form.Control
                type="text"
                value={formatDate(visitData.Date_of_visit)}
                readOnly
              ></Form.Control>
            </div>

            <div className="mb-3 text-center">
              <label className="form-label">Select Visit Status</label>
              <Form.Select
                aria-label="Select Visit Status"
                value={visit_cancelled}
                onChange={(e) => setVisitStatus(e.target.value)}
              >
                <option value="">Select status</option>
                {visitData.fees_status === "paid" && (
                  <option value="rescheduled">Rescheduled</option>
                  
                )}

                {visitData.fees_status === "unpaid" && (
                  <option value="cancelled">Cancelled</option>
                )}
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
