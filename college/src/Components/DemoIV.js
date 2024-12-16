import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ColHeader from "./Navbar";
import axios from "axios";

const ColLogin = () => {
  const [number_of_students, setNumberofStudent] = useState("");
  const [Date_of_visit, setStartDate] = useState(new Date());
  const [start_time, setStartTime] = useState(null);
  const [end_time, setEndTime] = useState(null);
  const [number_of_faculty, setNumberOffaculty] = useState("");
  const [purpose, setPurpose] = useState("");
  const [visting_location, setVisitingLocation] = useState("");
  const [student_details, setStudentDetails] = useState(null);
  const [faculty_details, setFacultyDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [startTimeData, setStartTimeData] = useState([]);

  const college_name = localStorage.getItem("CollegeName");

  useEffect(() => {
    axios.get("http://localhost:8000/getlocation").then((res) => {
      setLocationData(res.data.data);
    });

    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        const startData = data.filter((visit) => visit.start_time);
        setStartTimeData(startData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClear = () => {
    setNumberofStudent("");
    setStartDate(new Date());
    setStartTime(null);
    setEndTime(null);
    setNumberOffaculty("");
    setPurpose("");
    setVisitingLocation("");
    setStudentDetails(null);
    setFacultyDetails(null);
    setComment("");
  };

  const handleStartTimeChange = (time) => {
    const selectedDate = new Date(Date_of_visit);
    const startDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      time.getHours(),
      time.getMinutes()
    );
    setStartTime(startDateTime);

    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);
    setEndTime(endDateTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the slot overlaps with existing bookings
    const isSlotTaken = startTimeData.some((visit) => {
      const bookedStartTime = new Date(visit.start_time).getTime();
      const bookedEndTime = new Date(visit.end_time).getTime();
      return (
        (start_time.getTime() >= bookedStartTime &&
          start_time.getTime() < bookedEndTime) ||
        (end_time.getTime() > bookedStartTime &&
          end_time.getTime() <= bookedEndTime) ||
        (start_time.getTime() <= bookedStartTime &&
          end_time.getTime() >= bookedEndTime)
      );
    });

    if (isSlotTaken) {
      alert(
        "The selected time slot overlaps with an existing booking. Please choose another time."
      );
      return;
    }

    const formData = new FormData();
    formData.append("college_name", college_name);
    formData.append("number_of_students", number_of_students);
    formData.append("Date_of_visit", Date_of_visit.toLocaleDateString("en-CA"));
    formData.append("start_time", start_time ? start_time.toISOString() : "");
    formData.append("end_time", end_time ? end_time.toISOString() : "");
    formData.append("number_of_faculty", number_of_faculty);
    formData.append("purpose", purpose);
    formData.append("visting_location", visting_location);
    formData.append("student_details", student_details);
    formData.append("faculty_details", faculty_details);
    formData.append("comment", comment);

    try {
      const res = await axios.post("http://localhost:8000/addvisit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      handleClear();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <ColHeader />
      <Container>
        <Row>
          <Col md={9} className="mx-auto">
            <h2 className="text-center mt-3 mb-3">Add Visit</h2>
            <Container className="border border-dark p-4 d-flex justify-content-center">
              <Form className="w-100" onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={5} className="d-flex align-items-center">
                    <Form.Label className="mb-0">
                      Number of Students:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={number_of_students}
                      onChange={(e) => setNumberofStudent(e.target.value)}
                      className="ms-2"
                    />
                  </Col>
                  <Col md={1}></Col>
                  <Col md={5} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Number of Faculty:</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={number_of_faculty}
                      onChange={(e) => setNumberOffaculty(e.target.value)}
                      className="ms-2"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Date of Visit:</Form.Label>
                    <DatePicker
                      selected={Date_of_visit}
                      onChange={(date) => setStartDate(date)}
                      className="form-control ms-2"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select a date"
                      required
                      minDate={new Date()}
                    />
                  </Col>
                  <Col md={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Start Time:</Form.Label>
                    <DatePicker
                      selected={start_time}
                      onChange={handleStartTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="hh:mm aa"
                      className="form-control"
                      required
                    />
                  </Col>
                  <Col md={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">End Time:</Form.Label>
                    <DatePicker
                      selected={end_time}
                      readOnly
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="hh:mm aa"
                      className="form-control"
                      required
                    />
                  </Col>
                </Row>

                <Form.Group
                  className="mb-3 text-center"
                  controlId="formGroupLocation"
                >
                  <Form.Label className="mt-3">Visiting Location:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="w-100 mt-2"
                    value={visting_location}
                    onChange={(e) => setVisitingLocation(e.target.value)}
                    required
                  >
                    <option value="">Select City</option>
                    {locationData.map((item) => (
                      <option key={item._id} value={item.location_city}>
                        {item.location_city}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  className="mb-3 text-center"
                  controlId="formGroupPurpose"
                >
                  <Form.Label className="mt-2">Purpose of Visit:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-100"
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3 text-center">
                  <Form.Label>Student Details:</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    onChange={(e) => setStudentDetails(e.target.files[0])}
                    accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3 text-center">
                  <Form.Label>Faculty Details:</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    onChange={(e) => setFacultyDetails(e.target.files[0])}
                    accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group
                      className="text-center"
                      controlId="formGroupDescription"
                    >
                      <Form.Label>Any Comments:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Any comments"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-100"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-center mt-4">
                  <Button variant="primary" className="me-4" type="submit">
                    Submit
                  </Button>
                  <Button variant="danger" onClick={handleClear}>
                    Clear
                  </Button>
                </div>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ColLogin;