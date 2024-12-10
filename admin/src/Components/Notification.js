import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";


const Notification = () => {
  const [visitData, setVisitData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData || [];
        const inactiveVisits = data.filter(
          (visit) => visit.Visit_accept === "pending"
        );
        setVisitData(inactiveVisits);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  return (
    <>
    <Container>
        <Row>
            <Col md={10} className="mx-auto mt-5">
            <div className="">
      {visitData.length > 0 ? (
        visitData.map((visit, index) => (
          <div key={index} className="border border-dark bg-primary p-2 text-white fs-5 mt-2">
           You have a visit request from <strong>{visit.college_name}</strong>
          </div>
        ))
      ) : (
        <p className="no-notifications">No new visit requests.</p>
      )}
    </div>
            </Col>
        </Row>
    </Container>
    
    </>
  );
};

export default Notification;
