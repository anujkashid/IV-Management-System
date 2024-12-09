import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const IVReequest = () => {
  const [visitData, setVisitData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        const count = data.filter((visit) => visit.Visit_accept === "inactive");
        // Format date and time
        const formattedData = count.map((visit) => ({
          ...visit,
          Date_of_visit: visit.Date_of_visit.split("T")[0], // Extract date only
          start_time: visit.start_time.split("T")[1].slice(0, 5), // Extract HH:MM
          end_time: visit.end_time.split("T")[1].slice(0, 5), // Extract HH:MM
        }));
        setVisitData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  // Function to export as PDF
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

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(visitData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visit Data");
    XLSX.writeFile(workbook, "visit_data.xlsx");
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
            {/* <th>Number of Faculty</th> */}
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
              {/* <td>{visit.number_of_faculty}</td> */}
              <td>{visit.visiting_location}</td>
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
                  hhref={`http://localhost:8000/images/${visit.faculty_details}`}
                  download
                  className="btn btn-link"
                >
                  Download
                </a>
              </td>

              <td>
                <Link><Button className="btn btn-primary me-2 px-1 py-2">Accept</Button></Link>
                <Link><Button className="btn btn-danger px-1 py-2">Reject</Button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default IVReequest;
