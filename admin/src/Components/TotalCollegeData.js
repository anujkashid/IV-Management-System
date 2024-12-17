import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const TotalCollege = () => {
  const [collegeData, setCollegeData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/get_registration").then((res) => {
      setCollegeData(res.data.data); 
    });
  }, []);


  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Sr.No",
      "College Name",
      "City",
      "University Name",
      "Principal Name",
      "Contact Person",
      "Contact Person Contact 1",
      "Contact Person Contact 2",
      "College Email",
      "College Username",
      "Visit Location",
      "MOU Signed",
    ];
    const tableRows = [];

    collegeData.forEach((state, index) => {
      tableRows.push([
        index + 1,
        state.college_name,
        state.reg_city,
        state.reg_university_name,
        state.reg_principal_name,
        state.reg_contact_person,
        state.reg_contact_person_contact1,
        state.reg_contact_person_contact2,
        state.reg_college_email_id,
        state.reg_college_username,
        state.reg_visit_location,
        state.reg_mou_sign,
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("college_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(collegeData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "College Data");
    XLSX.writeFile(workbook, "college_data.xlsx");
  };

  return (
    <Container>
      <h2 className="mt-5 text-center mb-3"> College Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2">
        <Button variant="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="success" onClick={exportExcel}>
          Export Excel
        </Button>
        <CSVLink data={collegeData} filename="college_data.csv">
          <Button variant="info">Export CSV</Button>
        </CSVLink>
      </div>

      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr className="text-center">
            <th>Sr.No</th>
            <th>College Name</th>
            <th>City</th>
            <th>University Name</th>
            <th>Principal Name</th>
            <th>Contact Person</th>
            <th>Contact Person Contact 1</th>
            <th>Contact Person Contact 2</th>
            <th>College Email</th>
            <th>College Username</th>
            <th>Visit Location</th>
            <th>MOU Signed</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {collegeData.map((state, index) => (
            <tr key={state._id}>
              <td>{index + 1}</td>
              <td>{state.collage_name}</td>
              <td>{state.reg_city}</td>
              <td>{state.reg_university_name}</td>
              <td>{state.reg_principal_name}</td>
              <td>{state.reg_contact_person}</td>
              <td>{state.reg_contact_person_contact1}</td>
              <td>{state.reg_contact_person_contact2}</td>
              <td>{state.reg_college_email_id}</td>
              <td>{state.reg_college_username}</td>
              <td>{state.reg_visit_location}</td>
              <td>{state.reg_mou_sign}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TotalCollege;