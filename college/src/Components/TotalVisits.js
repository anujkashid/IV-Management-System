import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Pagination } from "react-bootstrap";
import ColHeader from "./Navbar";

const TotalVisit = () => {
  const [ivcount, setIvcount] = useState([]);
  const collegename = localStorage.getItem("CollegeName");
  const [ setCollegeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const visitsPerPage = 10; // Number of rows per page

  useEffect(() => {
    axios.get("http://localhost:8000/getvisit")
      .then((res) => {
        setCollegeData(res.data.userData);
        const data = res.data.userData;
        console.log("data", data)

        // total IV
        const totalIV = data.filter(
          (TIV) => TIV.college_name === collegename
        );
        setIvcount(totalIV);
      })
  },);
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  // Pagination logic
  const indexOfLastVisit = currentPage * visitsPerPage;
  const indexOfFirstVisit = indexOfLastVisit - visitsPerPage;
  const currentVisits = ivcount.slice(indexOfFirstVisit, indexOfLastVisit);

  const totalPages = Math.ceil(ivcount.length / visitsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <ColHeader></ColHeader>
      <Container>
        <h2 className="my-5 text-center">Total Visits</h2>
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
            {currentVisits.map((IV, index) => (
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


        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="justify-content-end">
            <Pagination.Prev disabled={currentPage === 1} onClick={handlePrevPage} />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            />
          </Pagination>
        )}

      </Container>
    </>
  );
};
export default TotalVisit;
