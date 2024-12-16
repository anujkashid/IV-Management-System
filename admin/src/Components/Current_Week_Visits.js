import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const CurrentWeekVisits = () => {
  const [visitData, setVisitData] = useState([]);
  const [currentWeekVisits, setCurrentWeekVisits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);

      
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); 
        startOfWeek.setHours(0, 0, 0, 0); 

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); 
        endOfWeek.setHours(23, 59, 59, 999);

      
        const currentWeekVisits = data.filter((visit) => {
          const visitDate = new Date(visit.Date_of_visit);
          return visitDate >= startOfWeek && visitDate <= endOfWeek;
        });
        setCurrentWeekVisits(currentWeekVisits);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); 
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
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

    currentWeekVisits.forEach((visit, index) => {
      tableRows.push([
        index + 1,
        visit.college_name,
        visit.number_of_students,
        formatDate(visit.Date_of_visit),
        formatTime(visit.start_time),
        formatTime(visit.end_time),
        visit.number_of_faculty,
        visit.visting_location,
        visit.Visit_accept,
        visit.Visit_status
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("current_week_visits.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(currentWeekVisits);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Current Week Visits");
    XLSX.writeFile(workbook, "current_week_visits.xlsx");
  };



  return (
    <Container>
      <h2 className="mt-5 text-center mb-3">Current Week Visit Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2">
        <Button variant="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="success" onClick={exportExcel}>
          Export Excel
        </Button>
        <CSVLink data={currentWeekVisits} filename="current_week_visits.csv">
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
          {currentWeekVisits.map((visit, index) => (
            <tr key={visit._id}>
              <td>{index + 1}</td>
              <td>{visit.college_name}</td>
              <td>{visit.number_of_students}</td>
              <td>{formatDate(visit.Date_of_visit)}</td>
              <td>{formatTime(visit.start_time)}</td>
              <td>{formatTime(visit.end_time)}</td>
              <td>{visit.number_of_faculty}</td>
              <td>{visit.visting_location}</td>
              <td>{visit.Visit_accept}</td>
              <td>{visit.Visit_status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CurrentWeekVisits;
