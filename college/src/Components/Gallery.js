import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import axios from "axios";
import ColHeader from "./Navbar";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [visitDates, setVisitDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const collegename = localStorage.getItem("CollegeName");

  // Fetch gallery data
  useEffect(() => {
    axios
      .get("http://localhost:8000/getgallery")
      .then((res) => {
        const data = res.data.userData;
        // console.log("Fetched data: ", data);

        
        const collegeGallery = data.filter(
          (item) => item.college_name === collegename
        );
        setGalleryData(collegeGallery);

        
        const uniqueDates = [
          ...new Set(collegeGallery.map((item) => item.Date_of_visit)),
        ];
        // console.log(uniqueDates);
        setVisitDates(uniqueDates);
      })
      .catch((err) => console.log(err));
  }, [collegename]);


  const filteredImages = selectedDate
    ? galleryData.filter((item) => item.Date_of_visit === selectedDate)
    : [];

  
  const allImages = filteredImages.flatMap((item) => item.galleryimage);

  console.log(allImages); 

  return (
    <>
      <ColHeader />
      <Container className="py-4">
        <h2 className="text-center mb-4">Gallery</h2>

        <Form.Group controlId="visitDateDropdown" className="mb-4">
          <Form.Label>Select Visit Date:</Form.Label>
          <Form.Control
            as="select"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">-- Select Date --</option>
            {visitDates.map((date, index) => (
              <option key={index} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

     
        {selectedDate && allImages.length > 0 ? (
          <Row>
            {allImages.map((image, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000/images/${image}`}
                    alt={`Gallery Item ${index + 1}`}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : selectedDate ? (
          <p>No images available for the selected date.</p>
        ) : (
          <p>Please select a visit date to view the gallery images.</p>
        )}
      </Container>
    </>
  );
};

export default Gallery;
