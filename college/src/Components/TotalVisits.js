import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";
import ColHeader from "./Navbar";
import { MdFileDownload } from "react-icons/md";

const TotalVisit = () => {
  const [ivcount, setIvcount] = useState([]);
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
      setIvcount(totalIV);
    })
  },[]
  );
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

    return (
        <div className="h-100 vh-100" style={{ backgroundColor: "#EEEEFF" }}>
        <ColHeader></ColHeader>
        <Container>
            <h2 className="my-4 text-center text-danger">Total Visits</h2>
            <Table striped bordered hover responsive>
                <thead className="thead-dark">
                    <tr className="text-center">
                        <th>Sr.No</th>
                        <th>Number of student</th>
                        <th>Number of faculty</th>
                        <th>Date of visit</th>
                        <th>Visiting Location</th>
                        <th>Student Details</th>
                        <th>Faculty Details</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {ivcount.map((IV, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{IV.number_of_students}</td>
                            <td>{IV.number_of_faculty}</td>
                            <td>{formatDate(IV.Date_of_visit)}</td>
                            <td>{IV.visting_location}</td>
                            <td>
                <a
                  href={`http://localhost:8000/images/${IV.student_details}`}
                  download
                  className="btn btn-link"
                >
                  <MdFileDownload size={30} />
                </a>
              </td>
              <td>
                <a
                  href={`http://localhost:8000/images/${IV.faculty_details}`}
                  download
                  className="btn btn-link"
                >
                  <MdFileDownload size={30} />
                </a>
              </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </div>
    );
};
export default TotalVisit;
