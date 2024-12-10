import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Row, Form, Modal } from "react-bootstrap";

const IVRequest = () => {
  const [visitData, setVisitData] = useState([]);
  const [collegeName, setCollegeName] = useState("");
  const [Visit_accept, setVisitAccept] = useState("");
  const [id, setId] = useState("");
  const [reason, setReason] = useState("");
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState(""); // "accept" or "reject"

  const handleClose = () => setShow(false);

  const handleOpenModal = (visit, type) => {
    setId(visit._id);
    setCollegeName(visit.college_name);
    setModalType(type);
    setShow(true);
  };

  const handleClear = () => {
    setCollegeName("");
    setVisitAccept("");
    setReason("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        const count = data.filter((visit) => visit.Visit_accept === "pending");
        const formattedData = count.map((visit) => ({
          ...visit,
          Date_of_visit: visit.Date_of_visit.split("T")[0],
          start_time: visit.start_time.split("T")[1].slice(0, 5),
          end_time: visit.end_time.split("T")[1].slice(0, 5),
        }));
        setVisitData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "College Name",
      "Number of Students",
      "Date of Visit",
      "Start Time",
      "End Time",
      "Number of Faculty",
      "Purpose",
      "Visiting Location",
      "Comment",
      "Visit Accept",
      "Visit Status",
    ];
    const tableRows = [];

    visitData.forEach((visit) => {
      tableRows.push([
        visit.college_name,
        visit.number_of_students,
        visit.Date_of_visit,
        visit.start_time,
        visit.end_time,
        visit.number_of_faculty,
        visit.purpose,
        visit.visiting_location,
        visit.comment,
        visit.Visit_accept,
        visit.Visit_status,
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("visit_data.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(visitData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visit Data");
    XLSX.writeFile(workbook, "visit_data.xlsx");
  };

  const handleUpdate = () => {
    const formData = { college_name: collegeName, Visit_accept };
    axios
      .put(`http://localhost:8000/updatevisit/${id}`, formData)
      .then(() => {
        handleClear();
        setShow(false);
      })
      .catch((err) => {
        console.error("Error updating visit:", err);
      });
  };

  const handleReject = () => {
    const formData = { college_name: collegeName, reason,Visit_accept };
    axios
      .put(`http://localhost:8000/updatevisit/${id}`, formData)
      .then(() => {
        handleClear();
        setShow(false);
      })
      .catch((err) => {
        console.error("Error updating visit:", err);
      });
  };

  const renderModalContent = () => {
    if (modalType === "accept") {
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Visit Accept</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>College Name</Form.Label>
                <Form.Control type="text" value={collegeName} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Visit Accept</Form.Label>
                <Form.Select
                  value={Visit_accept}
                  onChange={(e) => setVisitAccept(e.target.value)}
                >
                  <option value="">Select here...</option>
                  <option value="accept">Accept</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Accept
            </Button>
          </Modal.Footer>
        </>
      );
    }
    if (modalType === "reject") {
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Visit Reject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>College Name</Form.Label>
                <Form.Control type="text" value={collegeName} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Visit Accept</Form.Label>
                <Form.Select
                  value={Visit_accept}
                  onChange={(e) => setVisitAccept(e.target.value)}
                >
                  <option value="">Select here...</option>
                  <option value="reject">Reject</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Reason for Rejection</Form.Label>
                <Form.Control
                  as="textarea"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleReject}>
              Reject
            </Button>
          </Modal.Footer>
        </>
      );
    }
    return null;
  };

  return (
    <Container>
      <h2 className="my-5 text-center">Visit Requests</h2>
      <Row>
        <div className="mb-4 d-flex justify-content-start gap-2">
          <Button variant="primary" onClick={exportPDF}>
            Export PDF
          </Button>
          <Button variant="success" onClick={exportExcel}>
            Export Excel
          </Button>
          <CSVLink data={visitData} filename="visit_data.csv">
            <Button variant="info">Export CSV</Button>
          </CSVLink>
        </div>
      </Row>
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            <th>College Name</th>
            <th>Number of Students</th>
            <th>Date of Visit</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Visiting Location</th>
            <th>Student Details</th>
            <th>Faculty Details</th>
            <th>Request Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {visitData.map((visit, index) => (
            <tr key={index}>
              <td>{visit.college_name}</td>
              <td>{visit.number_of_students}</td>
              <td>{visit.Date_of_visit}</td>
              <td>{visit.start_time}</td>
              <td>{visit.end_time}</td>
              <td>{visit.visting_location}</td>
              <td>
                <a
                  href={`http://localhost:8000/images/${visit.student_details}`}
                  download
                  className="btn btn-link"
                >
                  Download
                </a>
              </td>
              <td>
                <a
                  href={`http://localhost:8000/images/${visit.faculty_details}`}
                  download
                  className="btn btn-link"
                >
                  Download
                </a>
              </td>
              <td>
                <Button
                  className="btn btn-primary me-2 px-1 py-2"
                  onClick={() => handleOpenModal(visit, "accept")}
                >
                  Accept
                </Button>
                <Button
                  className="btn btn-danger px-1 py-2"
                  onClick={() => handleOpenModal(visit, "reject")}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        {renderModalContent()}
      </Modal>
    </Container>
  );
};

export default IVRequest;
