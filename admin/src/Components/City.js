import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";

const City = () => {
  const [city_state, setCityState] = useState("");
  const [city_district, setCityDistrict] = useState("");
  const [city_name, setCityame] = useState("");
  const [city_status, setstatus] = useState("");
  const [statedata, setData] = useState([]);
  const [districtdata, setDistrictdata] = useState([]);

  //   get API for state
  useEffect(() => {
    axios
      .get("http://localhost:8000/getstate")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // get API for district based on selected state
  useEffect(() => {
    if (city_state) {
      axios
        .get("http://localhost:8000/getdistrict")
        .then((res) => {
          const filteredDistricts = res.data.data.filter(
            (district) => district.district_state === city_state
          );
          setDistrictdata(filteredDistricts);
        })
        .catch((err) => console.log(err));
    }
  }, [city_state]);

  //   add data API
  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      city_state,
      city_district,
      city_name,
      city_status,
    };

    axios
      .post("http://localhost:8000/addcity", userdata)
      .then((res) => {
        handleClear();
      })
      .catch((err) => console.log(err));
  };

  const handleClear = () => {
    setCityState("");
    setCityDistrict("");
    setCityame("");
    setstatus("");
  };

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Add City</h2>
          <Form className="border border-dark p-4 mt-5" onSubmit={handleSubmit}>
            <Row className="mb-3 text-center">
              <Form.Group controlId="categoryDropdown" className="mt-4">
                <Form.Label className="fs-5 text-dark">State:</Form.Label>
                <Form.Control
                  as="select"
                  value={city_state}
                  onChange={(e) => setCityState(e.target.value)}
                  className="mx-auto mt-3 py-2 dropdown-width"
                >
                  <option value="">
                    -- Select State --{" "}
                    <FaCaretDown className="ms-2 text-primary" />
                  </option>
                  {statedata.map((item, index) => {
                    return (
                      <option key={item._id} value={item.state_name}>
                        {item.state_name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3 text-center">
              <Form.Group controlId="categoryDropdown" className="mt-4">
                <Form.Label className="fs-5 text-dark">District:</Form.Label>
                <Form.Control
                  as="select"
                  value={city_district}
                  onChange={(e) => setCityDistrict(e.target.value)}
                  className="mx-auto mt-3 py-2 dropdown-width"
                >
                  <option value="">
                    -- Select District --{" "}
                    <FaCaretDown className="ms-2 text-primary" />
                  </option>
                  {districtdata.map((item, index) => {
                    return (
                      <option key={item._id} value={item.district_name}>
                        {item.district_name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label htmlFor="city" className="text-dark fs-5">
                    Enter City:
                  </Form.Label>
                  <Form.Control
                    id="city"
                    placeholder="Enter City"
                    type="text"
                    value={city_name}
                    onChange={(e) => setCityame(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label className="text-dark fs-5">
                    Select Status:
                  </Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Active"
                      name="status"
                      value="active"
                      className="me-5 text-dark"
                      checked={city_status === "Active"}
                      onChange={(e) => setstatus(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={city_status === "Inactive"}
                      onChange={(e) => setstatus(e.target.value)}
                      inline
                    />
                  </div>
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

export default City;