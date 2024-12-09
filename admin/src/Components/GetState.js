import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import GetCity from "./GetCity";

const GetState = () => {
  const [StateData, setStateData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getstate")
      .then((res) => {
        setStateData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "state_name",
      "state_status"
    ];
    const tableRows = [];

    StateData.forEach((state) => {
        tableRows.push([
          state.state_name,
          state.state_status,
        ]);
      });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("state_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(StateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "state Data");
    XLSX.writeFile(workbook, "state_data.xlsx");
  };

  return (
    <Container>
      <h2 className="my-5 text-center">State Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2">
  <Button variant="primary" onClick={exportPDF}>
    Export PDF
  </Button>
  <Button variant="success" onClick={exportExcel}>
    Export Excel
  </Button>
  <CSVLink data={StateData} filename="state_data.csv">
    <Button variant="info">Export CSV</Button>
  </CSVLink>
</div>

<div className="d-flex justify-content-end me-3 mb-3">
  <Link to="/head/addstate">
    <Button className="btn btn-primary py-2 px-3">Add</Button>
  </Link>
</div>

      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr className="text-center">
            <th>Sr.No</th>
            <th>State Name</th>
            <th>state Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {StateData.map((state, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
              <td>{state.state_name}</td>
              <td>{state.state_status}</td>
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

export default GetState;
