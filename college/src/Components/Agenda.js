import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";
import ColHeader from "./Navbar";

const Agenda = () => {
  const [agendaData, setAgendaData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/get_agenda")
      .then((res) => {
        const data = res.data.data;
        const activeagneda = data.filter( 
          (a) =>  a.agenda_status === "active"
      )
        setAgendaData(activeagneda); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="h-100 vh-100" style={{ backgroundColor: "#EEEEFF" }}>
      <ColHeader />
      <Container>
        <h3 className="mt-4 text-danger mb-4 text-center">Visit Agenda</h3>
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr className="text-center">
              <th>Sr.No</th>
              <th>Agenda Title</th>
              <th>Agenda Description</th>
              <th>Agenda Time</th>
              <th>Agenda Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {agendaData.length > 0 ? (
              agendaData.map((agenda, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{agenda.agenda_title}</td>
                  <td>{agenda.agenda_description}</td>
                  <td>{agenda.agenda_time}</td>
                  <td>{agenda.agenda_status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No agenda data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Agenda;
