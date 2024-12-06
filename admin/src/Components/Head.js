import React from "react";
import '../App.css'
import { Container, Row,} from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import HeaderComponent from "./HeaderComponent";
import Fees from "./Fees";
import Agenda from "./Agenda";
import Location from "./Location";
import University from "./University";
import State from "./State";
import District from "./District";
import City from "./City";
import College_registration from "./College_registration";

const Head = () => {
  return (
    <div className="d-flex">
      <div className="">
      {/* Sidebar */}
      <Sidebar />
      </div>
      {/* Main Content */}
      <div className="content-container flex-grow-1"> 
          <HeaderComponent />
        <Container>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/location" element={<Location />} />
            <Route path="/university" element={<University />} />
            <Route path="/state" element={<State />} />
            <Route path="/district" element={<District/>}/>
            <Route path="/city" element={<City/>}/>
            <Route path="/college_registration" element={<College_registration/>}/>
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default Head;
