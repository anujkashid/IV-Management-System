import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Notification = () => {
  const [visitData, setVisitData] = useState([]);
  const [cancelledVisit, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData || [];
        const inactiveVisits = data.filter(
          (visit) => visit.Visit_accept === "pending"
        );
        setVisitData(inactiveVisits);

        const cancelledVisitData = data.filter(
          (visit) => visit.visit_cancelled === "cancelled"
        );
        setData(cancelledVisitData);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  const handleSeen = (id) => {

    axios
      .delete(`http://localhost:8000/deletevisit/${id}`)
      .then((response) => {
        // console.log("Notification marked as see", response);
      })
      .catch((error) => {
        console.error("Error updating notification", error);
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={10} className="mx-auto mt-5">
            <div>
              {visitData.length > 0 ? (
                visitData.map((visit, index) => (
                  <div
                    key={index}
                    className="border border-dark bg-secondary p-2 text-white fs-5 mt-2"
                  >
                    <Link className="text-white" to="/head/ivrequest">
                    You have a visit request from <strong>{visit.college_name}</strong>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="no-notifications">No new visit requests.</p>
              )}
            </div>

            {cancelledVisit.length > 0 && (
              <div className="mt-4">
                {cancelledVisit.map((item, index) => (
                  <div
                    key={index}
                    className="border border-dark bg-secondary p-2 text-white fs-5 mt-2 d-flex justify-content-between align-items-center"
                  >
                    <span>
                      Visit request cancelled by <strong>{item.college_name}</strong>
                    </span>
                      <Button
                        variant="light"
                        size="md"
                        onClick={() => handleSeen(item._id)}
                      >
                        Confirm
                      </Button>
                   
                  </div>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Notification;
