import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const GalleryAdd = () => {
  const [visitData, setVisitData] = useState([]);
  const [college_name, setCollegeName] = useState("");
  const [Date_of_visit, setDateOfVisit] = useState("");
  const [galleryimage, setGalleryImage] = useState([]);
  const [collegeData, setColleData] = useState([]);
  const [datedata, setDateData] = useState([]);

  const handleClear = () => {
    setCollegeName("");
    setDateOfVisit("");
    setGalleryImage([]);
    setDateData([]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);
        const filteredCollege = [
          ...new Set(data.map((item) => item.college_name)),
        ];
        setColleData(filteredCollege);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (college_name) {
      const today = new Date();
      const pastWeek = new Date(today);
      pastWeek.setDate(today.getDate() - 7);

      const filteredDate = visitData
        .filter(
          (item) =>
            item.college_name === college_name &&
            new Date(item.Date_of_visit) <= today &&
            new Date(item.Date_of_visit) >= pastWeek
        )
        .map((item) => ({ date: item.Date_of_visit, id: item._id }));

      setDateData(filteredDate);
    } else {
      setDateData([]);
    }
  }, [college_name, visitData]);

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    if (selectedFiles.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setGalleryImage(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("college_name", college_name);
    formdata.append("Date_of_visit", Date_of_visit);

    galleryimage.forEach((file) => {
      formdata.append("galleryimage", file);
    });

    axios
      .post(`http://localhost:8000/addgallery`, formdata)
      .then(() => {
        handleClear();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Media files add</h2>
          <Form className="border border-dark p-4 mt-5" onSubmit={handleSubmit}>
            <Row className="mb-3 text-center">
              <Form.Group controlId="categoryDropdown" className="mt-4">
                <Form.Label className="fs-5 text-dark">College:</Form.Label>
                <Form.Control
                  as="select"
                  value={college_name}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="mx-auto mt-3 py-2 dropdown-width"
                >
                  <option value="">-- Select College --</option>
                  {collegeData.map((college, index) => (
                    <option key={index} value={college}>
                      {college}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3 text-center">
              <Form.Group controlId="categoryDropdown" className="mt-4">
                <Form.Label className="fs-5 text-dark">Date:</Form.Label>
                <Form.Control
                  as="select"
                  value={Date_of_visit}
                  onChange={(e) => setDateOfVisit(e.target.value)}
                  className="mx-auto mt-3 py-2 dropdown-width"
                  disabled={!college_name}
                >
                  <option value="">-- Select Date of Visit --</option>
                  {datedata.map((item, index) => (
                    <option key={index} value={item.date}>
                      {new Date(item.date).toLocaleDateString()}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label className="text-dark fs-5">Add Images</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="text-center mt-4">
              <Col>
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger ms-5"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default GalleryAdd;
