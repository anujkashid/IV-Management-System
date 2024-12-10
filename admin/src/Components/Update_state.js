import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
// import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Update_state = () => {
  const [city_state, setCityState] = useState("");
  const [city_district, setCityDistrict] = useState("");
  const [city_name, setCityname] = useState("");
  const [city_status, setStatus] = useState("");
  const [statedata, setStatedata] = useState([]); // Store all states
  const [districtdata, setDistrictdata] = useState([]); // Store districts of selected state
  const [citydata, setCitydata] = useState({}); // Data of the city to update
  const navigate = useNavigate();

  const id = localStorage.getItem("updatestateid");

  // Fetch city data for updating
  useEffect(() => {
    axios
      .get(`http://localhost:8000/getonecity/${id}`)
      .then((response) => {
        setCitydata(response.data);
        setCityState(response.data.city_state);
        setCityDistrict(response.data.city_district);
        setCityname(response.data.city_name);
        setStatus(response.data.city_status);
      })
      .catch((err) => console.log(err));
  }, [id]);

    //   get API for state
    useEffect(() => {
      axios
        .get("http://localhost:8000/getstate")
        .then((res) => {
          setStatedata(res.data.data);
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
  

  const handleClear = () => {
    setCityname("");
    setCityDistrict("");
    setCityState("");
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      city_name,
      city_district,
      city_state,
      city_status,
    };

    axios
      .put(`http://localhost:8000/updatecity/${id}`, userdata)
      .then(() => {
        console.log("City updated successfully");
        navigate("/GetCity");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Update State</h2>
          <Form className="border border-dark p-4 mt-5" onSubmit={handleSubmit}>
            {/* State Dropdown */}
            <Form.Group controlId="stateDropdown" className="mb-3">
              <Form.Label>State:</Form.Label>
              <Form.Control
                as="select"
                value={city_state}
                onChange={(e) => setCityState(e.target.value)}
                required
              >
                <option value="">-- Select State --</option>
                {statedata.map((state) => (
                  <option key={state.id} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* District Dropdown */}
            <Form.Group controlId="districtDropdown" className="mb-3">
              <Form.Label>District:</Form.Label>
              <Form.Control
                as="select"
                value={city_district}
                onChange={(e) => setCityDistrict(e.target.value)}
                required
              >
                <option value="">-- Select District --</option>
                {districtdata.map((district) => (
                  <option key={district._id} value={district.district_name}>
                    {district.district_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* City Name */}
            <Form.Group controlId="cityName" className="mb-3">
              <Form.Label>City Name:</Form.Label>
              <Form.Control
                type="text"
                value={city_name}
                onChange={(e) => setCityname(e.target.value)}
                placeholder="Enter City Name"
                required
              />
            </Form.Group>

            {/* Status */}
            <Form.Group className="mb-3">
              <Form.Label>Status:</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Active"
                  name="status"
                  value="Active"
                  checked={city_status === "Active"}
                  onChange={(e) => setStatus(e.target.value)}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Inactive"
                  name="status"
                  value="Inactive"
                  checked={city_status === "Inactive"}
                  onChange={(e) => setStatus(e.target.value)}
                  inline
                />
              </div>
            </Form.Group>

            {/* Buttons */}
            <div className="text-center">
              <Button type="submit" className="btn btn-primary me-3">
                Submit
              </Button>
              <Button
                type="button"
                className="btn btn-danger"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Update_state;
