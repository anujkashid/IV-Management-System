import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const GetCity = () => {
  const [CityData, setCityData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getcity")
      .then((res) => {
        setCityData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "city_state",
      "city_district",
      "city_name",
      "city_status"
    ];
    const tableRows = [];

    CityData.forEach((city) => {
        tableRows.push([
        city.city_state,
        city.city_district,
        city.city_name,
        city.city_status
        ]);
      });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("city_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(CityData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "city Data");
    XLSX.writeFile(workbook, "city_data.xlsx");
  };

  return (
    <Container>
      <h2 className="my-5 text-center">City Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2">
  <Button variant="primary" onClick={exportPDF}>
    Export PDF
  </Button>
  <Button variant="success" onClick={exportExcel}>
    Export Excel
  </Button>
  <CSVLink data={CityData} filename="city_data.csv">
    <Button variant="info">Export CSV</Button>
  </CSVLink>
</div>

<div className="d-flex justify-content-end me-3 mb-3">
  <Link to="/head/addcity">
    <Button className="btn btn-primary py-2 px-3">Add</Button>
  </Link>
</div>

      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr className="text-center">
            <th>Sr.No</th>
            <th>City State</th>
            <th>City District</th>
            <th>City Name</th>
            <th>City Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {CityData.map((city, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
              <td>{city.city_state}</td>
              <td>{city.city_district}</td>
              <td>{city.city_name}</td>
              <td>{city.city_status}</td>
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

export default GetCity;
