import axios from "axios";
import { useState } from "react";
import { Card, Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [reg_college_username,SetCollegeName] = useState("");
  const [reg_password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError("");

    axios
      .post(
        "http://localhost:8000/loginauth",
        { reg_college_username, reg_password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const { token } = response.data.token;
        // console.log(response.data);
          localStorage.setItem("accessToken", token);
          localStorage.setItem("userid",response.data._id);
          localStorage.setItem("CollegeName",response.data.collage_name);
          localStorage.setItem("mousigned",response.data.mousigned);
          // console.log(response.data.mousigned)
          navigate("/home");
      })
      .catch((err) => {
        console.error("Login Error:", err);
        setServerError( "Invalid credentials. Please try again later.");
      });
  };

  return (
    <div  style={{
      background: "linear-gradient(135deg, #145a76, #1d809f, #67b7d1)",
      height: "100vh",           
      width: "100vw",            
      display: "flex",           
      justifyContent: "center",  
      alignItems: "center"       
    }}>
    <Container>
      <Row className="">
        <Col md={4} className="mx-auto">
          <Card className="border border-primary">
            <Card.Body>
              <h3 className="text-center text-primary fs-2">Login</h3>
              {serverError && <Alert variant="danger">{serverError}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3 mt-3 text-center">
                  <Form.Label className="">Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={reg_college_username}
                    onChange={(e) => SetCollegeName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3 text-center">
                  <Form.Label>Password:</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={reg_password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                   <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ms-2"
                  >
                    {showPassword ? (
                      <><FaEyeSlash size={24} className="me-1 text-dark" /></>
                    ) : (
                      <><FaEye size={24} className="me-1 text-dark" /></>
                    )}
                  </Button>

                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 fs-5">
                  Login
                </Button>

              <div className="mt-3 text-center">
              <Link to="/forget" className=""><span className="">Forgot Password?</span></Link>
              </div>
              <div className="text-center mt-2">
                  <p>Dont have an account?  <Link to="/register" className=""><span className="ms-1  ">Register</span></Link></p>
              </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Login;



































































































































































































































































































