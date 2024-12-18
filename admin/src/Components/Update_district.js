import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
// import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Update_district = () => {
  const [district_state, setDistrictstate] = useState("");
  const [district_name, setDistrictname] = useState("");
  const [district_status, setDistrictstatus] = useState("");
  const [statedata, setStatedata] = useState([]); // Store all states
  const [districrtdata, setDistrictdata] = useState({}); // Data of the city to update
  const navigate = useNavigate();

  const id = localStorage.getItem("updatedistrictid");

  // Fetch city data for updating
  useEffect(() => {
    axios
      .get(`http://localhost:8000/getonedistrict/${id}`)
      .then((response) => {
        console.log(response.data.data)
        setDistrictdata(response.data);
        setDistrictstate(response.data.district_state);
        setDistrictname(response.data.district_name);
        setDistrictstatus(response.data.district_status);
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
  
  

  const handleClear = () => {
    setDistrictname("");
    setDistrictstate("");
    setDistrictstatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      district_name,
      district_state,
      district_status,
    };

    axios
      .put(`http://localhost:8000/updatedistrict/${id}`, userdata)
      .then(() => {
        console.log("City updated successfully");
        navigate("/head/district");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Update District</h2>
          <Form className="border border-dark p-4 mt-5" onSubmit={handleSubmit}>
            {/* State Dropdown */}
            <Form.Group controlId="stateDropdown" className="mb-3">
              <Form.Label>State:</Form.Label>
              <Form.Control
                as="select"
                value={district_state}
                onChange={(e) => setDistrictstate(e.target.value)}
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
            <Form.Group controlId="districtName" className="mb-3">
              <Form.Label>District Name:</Form.Label>
              <Form.Control
                type="text"
                value={district_name}
                onChange={(e) => setDistrictname(e.target.value)}
                placeholder="Enter District Name"
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
                  value="active"
                  checked={district_status === "active"}
                  onChange={(e) => setDistrictstatus(e.target.value)}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Inactive"
                  name="status"
                  value="inactive"
                  checked={district_status === "inactive"}
                  onChange={(e) => setDistrictstatus(e.target.value)}
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

export default Update_district;
