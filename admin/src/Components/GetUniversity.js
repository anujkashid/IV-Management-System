import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const GetUniversity = () => {
  const [universityData, setUniversityData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getuniversity")
      .then((res) => {
        setUniversityData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "university_name",
      "university_status",
    ];
    const tableRows = [];

    universityData.forEach((university) => {
        tableRows.push([
     university.university_name,
     university.university_status
        ]);
      });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("university_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(universityData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "university Data");
    XLSX.writeFile(workbook, "university_data.xlsx");
  };

  return (
    <Container>
      <h2 className="my-5 text-center">University Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2">
  <Button variant="primary" onClick={exportPDF}>
    Export PDF
  </Button>
  <Button variant="success" onClick={exportExcel}>
    Export Excel
  </Button>
  <CSVLink data={universityData} filename="visit_data.csv">
    <Button variant="info">Export CSV</Button>
  </CSVLink>
</div>

<div className="d-flex justify-content-end me-3 mb-3">
  <Link to="/head/adduniversity">
    <Button className="btn btn-primary py-2 px-3">Add</Button>
  </Link>
</div>

      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr className="text-center">
            <th>Sr.No</th>
            <th>University Name</th>
            <th>University Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {universityData.map((university, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
              <td>{university.university_name}</td>
              <td>{university.university_status}</td>
              <td>
                <Link><Button className="btn btn-primary me-4 px-3 py-2">Update</Button></Link>
                <Link><Button className="btn btn-danger px-3 py-2">Delete</Button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GetUniversity;
