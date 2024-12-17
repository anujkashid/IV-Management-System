import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const GetState = () => {
  const [visitData, setVisitData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); 


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); // Format to 'MM/DD/YYYY'
  };

  
  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format to 'HH:mm'
  };

  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Sr.No",
      "College Name",
      "Number of Students",
      "Date of Visit",
      "Start Time",
      "End Time",
      "Number of Faculty",
      "Visiting Location",
      "Visit Accept",
      "Visit Status"
    ];
    const tableRows = [];

    visitData.forEach((state, index) => {
      tableRows.push([
        index + 1,
        state.college_name,
        state.number_of_students,
        formatDate(state.Date_of_visit),
        formatTime(state.start_time),
        formatTime(state.end_time),
        state.number_of_faculty,
        state.visting_location,
        state.Visit_accept,
        state.Visit_status
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("visit_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(visitData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "visit Data");
    XLSX.writeFile(workbook, "visit_data.xlsx");
  };

  const handleUpdate = (id) => {
    localStorage.setItem('updatestateid', id);
  };

  return (
    <Container>
      <h2 className="mt-5 text-center mb-3">Total Visit Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2">
        <Button variant="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="success" onClick={exportExcel}>
          Export Excel
        </Button>
        <CSVLink data={visitData} filename="state_data.csv">
          <Button variant="info">Export CSV</Button>
        </CSVLink>
      </div>

      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr className="text-center">
            <th>Sr.No</th>
            <th>College Name</th>
            <th>Number of Students</th>
            <th>Date of Visit</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Number of Faculty</th>
            <th>Visiting Location</th>
            <th>Visit Accept</th>
            <th>Visit Completed</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {visitData.map((state, index) => (
            <tr key={state._id}>
              <td>{index + 1}</td>
              <td>{state.college_name}</td>
              <td>{state.number_of_students}</td>
              <td>{formatDate(state.Date_of_visit)}</td>
              <td>{formatTime(state.start_time)}</td>
              <td>{formatTime(state.end_time)}</td>
              <td>{state.number_of_faculty}</td>
              <td>{state.visting_location}</td>
              <td>{state.Visit_accept}</td>
              <td>{state.Visit_status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GetState;