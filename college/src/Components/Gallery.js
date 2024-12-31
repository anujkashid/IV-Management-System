import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ColHeader from "./Navbar";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [visitDates, setVisitDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const collegename = localStorage.getItem("CollegeName");

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", { month: "short" })}-${d.getFullYear()}`;
  };

  // Fetch gallery data
  useEffect(() => {
    axios
      .get("http://localhost:8000/getgallery")
      .then((res) => {
        const data = res.data.userData;

        // Filter gallery data by college name
        const collegeGallery = data.filter(
          (item) => item.college_name === collegename
        );
        setGalleryData(collegeGallery);

        // Get unique visit dates
        const uniqueDates = [
          ...new Set(collegeGallery.map((item) => item.Date_of_visit)),
        ];
        setVisitDates(uniqueDates);
      })
      .catch((err) => console.log(err));
  }, [collegename]);

  const filteredImages = selectedDate
    ? galleryData.filter(
        (item) => new Date(item.Date_of_visit).toISOString() === selectedDate
      )
    : [];

  const allImages = filteredImages.flatMap((item) => item.galleryimage);

  // Function to download all images as a zip file
  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const imageFolder = zip.folder("Gallery_Images");

    const imagePromises = allImages.map((image) =>
      axios
        .get(`http://localhost:8000/images/${image}`, { responseType: "blob" })
        .then((response) => {
          imageFolder.file(image, response.data);
        })
    );

    await Promise.all(imagePromises);
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "Gallery_Images.zip");
    });
  };

  return (
    <>
      <ColHeader />
      <Container fluid className="h-100 vh-100" style={{marginTop:'15vh'}}>
        <Container className="py-4">
          <h2 className="text-center mb-4 text-danger">Gallery</h2>
          <Col md={8} className="mx-auto">
            <Form.Group controlId="visitDateDropdown" className="mb-4 text-center">
              <Form.Label className="mb-2">Select Visit Date:</Form.Label>
              <Form.Select
                aria-label="Select Date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">-- Select Date --</option>
                {visitDates.map((date, index) => (
                  <option key={index} value={new Date(date).toISOString()}>
                    {formatDate(date)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {selectedDate && allImages.length > 0 ? (
              <>
                <div className="text-center mb-4">
                  <Button variant="primary" onClick={handleDownloadAll}>
                    Download All Images
                  </Button>
                </div>
                <Row>
                  {allImages.map((image, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <Card className="h-100 shadow-sm">
                        <a
                          href={`http://localhost:8000/images/${image}`}
                          download={`Gallery_Item_${index + 1}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Card.Img
                            variant="top"
                            src={`http://localhost:8000/images/${image}`}
                            alt={`Gallery Item ${index + 1}`}
                            style={{
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </a>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            ) : selectedDate ? (
              <p className="text-center">No images available for the selected date.</p>
            ) : (
              <p className="text-center">Please select a visit date to view the gallery images.</p>
            )}
          </Col>
        </Container>
      </Container>
    </>
  );
};

export default Gallery;
