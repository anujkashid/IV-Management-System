import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";
import ColHeader from "./Navbar";

const PendingVisit = () => {
  const [pendingiv, setPendingiv] = useState([]);
  const collegename = localStorage.getItem("CollegeName");
  const [collegeData, setCollegeData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getvisit")
    .then((res)  => {
      setCollegeData(res.data.userData);
      const data = res.data.userData;
      console.log("data",data)

      // total IV
      const totalIV = data.filter(
        (TIV) => TIV.college_name === collegename
      );
      const IVdata = totalIV;

      const pendingIV = IVdata.filter(
      (PIV) => PIV.Visit_accept === "pending"
    );
      setPendingiv(pendingIV);
    })
  },[]
  );
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

    return (
      <>
      <ColHeader></ColHeader>
        <Container>    
            <h2 className="my-5 text-center">Pending Visits</h2>
            <Table striped bordered hover responsive>
                <thead className="thead-dark">
                    <tr className="text-center">
                        <th>Sr.No</th>
                        <th>Number of student</th>
                        <th>Number of faculty</th>
                        <th>Date of visit</th>
                        <th>Visiting Location</th>
                        <th>Visit Status</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {pendingiv.map((IV, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{IV.number_of_students}</td>
                            <td>{IV.number_of_faculty}</td>
                            <td>{formatDate(IV.Date_of_visit)}</td>
                            <td>{IV.visting_location}</td>
                            <td>{IV.Visit_status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </>
    );
};
export default PendingVisit;
