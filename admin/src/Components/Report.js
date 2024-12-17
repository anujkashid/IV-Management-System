import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Row, Form } from "react-bootstrap";

const Report = () => {
  const [visitData, setVisitData] = useState([]);
  const [collegeData, setCollegeData] = useState([]);
  const [dateData, setDateData] = useState([]); // New state for dates
  const [selectedCollege, setSelectedCollege] = useState(""); // State for selected college
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);

        // Extract unique colleges
        const allcollegedata = [
          ...new Set(data.map((visit) => visit.college_name)),
        ];
        setCollegeData(allcollegedata);

        // Extract unique dates based on the data received
        const allDates = [
          ...new Set(data.map((visit) => formatDate(visit.Date_of_visit))),
        ];
        setDateData(allDates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // Filter data when selected college or date changes
    let filtered = visitData;
    if (selectedCollege) {
      filtered = filtered.filter(
        (visit) => visit.college_name === selectedCollege
      );
    }
    if (selectedDate) {
      filtered = filtered.filter(
        (visit) => formatDate(visit.Date_of_visit) === selectedDate
      );
    }
    setFilteredData(filtered);
  }, [selectedCollege, selectedDate, visitData]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Format to 'HH:mm'
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
      "Visit Status",
    ];
    const tableRows = [];

    filteredData.forEach((state, index) => {
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
        state.Visit_status,
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("visit_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visit Data");
    XLSX.writeFile(workbook, "visit_data.xlsx");
  };

  return (
    <Container>
      <h2 className="mt-5 text-center mb-3">Report</h2>

      <h4>Select College Name</h4>
      <Form.Select
        aria-label="Select college name"
        value={selectedCollege}
        onChange={(e) => setSelectedCollege(e.target.value)}
      >
        <option value="">Select College</option>
        {collegeData.map((college, index) => (
          <option key={index} value={college}>
            {college}
          </option>
        ))}
      </Form.Select>

      {selectedCollege && (
        <>
          <h4 className="mt-4">Select Date</h4>
          <Form.Select
            aria-label="Select date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">Select Date</option>
            {dateData.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </Form.Select>
        </>
      )}

      <div className="mb-4 mt-4 d-flex justify-content-start gap-2">
        <Button variant="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="success" onClick={exportExcel}>
          Export Excel
        </Button>
        <CSVLink data={filteredData} filename="state_data.csv">
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
          {filteredData.map((state, index) => (
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

export default Report;