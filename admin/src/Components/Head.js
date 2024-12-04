import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import HeaderComponent from "./HeaderComponent";

const Head = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar-container">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="content-container flex-grow-1">
        <HeaderComponent />
        <Container fluid>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default Head;
