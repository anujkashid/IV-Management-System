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
import Notification from "./Notification";
import IVReequest from "./IVReequest";
import GetLocation from "./GetLocation";
import GetCity from "./GetCity";
import GetUniversity from "./GetUniversity";
import GetState from "./GetState";
import GetDistrict from "./GetDistrict";
import Update_city from "./Update_city";
import Update_district from "./Update_district";
import Update_state from "./Update_state";
import Update_location from "./Update_location";
import Update_university from "./Update_university";

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
            <Route path="/location" element={<GetLocation />} />
            <Route path="/university" element={<GetUniversity/>} />
            <Route path="/addstate" element={<State />} />
            <Route path="/adddistrict" element={<District/>}/>
            <Route path="/city" element={<GetCity/>}/>
            <Route path="/college_registarion" element={<College_registration/>}/>
            <Route path="/notification" element={<Notification></Notification>}/>
            <Route path="/ivrequest" element={<IVReequest></IVReequest>}/>
            <Route path="/addlocation" element={<Location></Location>}/>
            <Route path="/addcity" element={<City/>}/>
            <Route path="/adduniversity" element={<University/>}/>
            <Route path="/state" element={<GetState/>}/>
            <Route path="/district" element={<GetDistrict/>}/>
            <Route path="/update_city" element={<Update_city/>}/>
            <Route path="/update_district" element={<Update_district/>}/>
            <Route path="/update_state" element={<Update_state/>}/>
            <Route path="/update_location" element={<Update_location/>}/>
            <Route path="/update_university" element={<Update_university/>}/>
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default Head;
