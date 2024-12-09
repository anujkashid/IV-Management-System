import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row, Container, Card } from "react-bootstrap";

const Dashboard = () => {
  const [location_city, setLocationcity] = useState("");
  const [location_name, setLocationname] = useState("");
  const [location_status, setLocationstatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      location_city,
      location_name,
      location_status,
    };

    axios
      .post("http://localhost:8000/addlocation", userdata)
      .then((res) => {
        console.log(res.data.data);
        handleClear();
      })
      .catch((err) => console.log(err));
  };

  const handleClear = () => {
    setLocationcity("");
    setLocationname("");
    setLocationstatus("");
  };

  return (
    <Container className="mt-5" fluid>
      
        
          <Form className=" " onSubmit={handleSubmit}>
            <Row>
              <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </Card.Text> 
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
              </Col>
             
              <Col>
              <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
              </Col>
              <Col>
              <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
              </Col>
             
              <Col>
              <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
              </Col>
            </Row>
          </Form>    
    </Container>
  );
};

export default Dashboard;
