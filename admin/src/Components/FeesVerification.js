import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Table, Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FeesVerification = () => {
  const [visitData, setVisitData] = useState([]);
  const [feesReceived, setFeesStatus] = useState("");
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((response) => {
        const filteredData = response.data?.userData?.filter(
          (visit) => visit.fees_received === "incomplete"
        ) || [];
        setVisitData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
        alert("Failed to fetch visit data.");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = { fees_received: feesReceived };

    axios
      .put(`http://localhost:8000/updatevisit/${id}`, userdata)
      .then(() => {
        alert("Fee status updated successfully!");
        navigate("/head/ivrequest");
        setShowModal(false);
        setId("");
        setFeesStatus("");
      })
      .catch((err) => {
        console.error("Error updating fee status:", err);
        alert("Error updating fee status. Please try again.");
      });
  };

  const handleOpenModal = (visit) => {
    setId(visit._id);
    setFeesStatus(visit.fees_received);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setId("");
    setFeesStatus("");
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <h3 className='mt-5 mb-4 text-center'>Fees Confirmation</h3>
          <Table striped bordered hover responsive>
            <thead className="thead-dark">
              <tr className="text-center">
                <th>College Name</th>
                <th>Date of Visit</th>
                <th>Visiting Location</th>
                <th>Mou Signed</th>
                <th>Fee Status</th>
                <th>Fee Received</th>
                <th>Confirm Fee Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {visitData.map((visit, index) => (
                <tr key={index}>
                  <td>{visit.college_name}</td>
                  <td>{formatDate(visit.Date_of_visit)}</td>
                  <td>{visit.visting_location}</td>
                  <td>{visit.mousigned}</td>
                  <td>{visit.fees_status}</td>
                  <td>{visit.fees_received}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleOpenModal(visit)}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Fee Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="feesReceived">
              <Form.Label>Fee Status</Form.Label>
              <Form.Control
                as="select"
                value={feesReceived}
                onChange={(e) => setFeesStatus(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Fee Status
                </option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FeesVerification;
