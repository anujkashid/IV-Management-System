import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ForgetPasswordComponent = () => {
  const [data, setData] = useState([]);
  const [reg_college_email_id, setEmail] = useState('');
  const [reg_password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch the list of emails from the database
  useEffect(() => {
    axios
      .get('http://localhost:8000/get_registration')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Check if the entered email exists in the database
  const checkEmail = () => {
    const user = data.find((user) => user.reg_college_email_id === reg_college_email_id);
    if (user) {
      setEmailExists(true);
      setErrorMessage('');
    } else {
      setEmailExists(false);
      setErrorMessage('Email not available. Please register.');
    }
  };

  // Handle password update
  const updatePassword = async (e) => {
    e.preventDefault();

    // Password validation regex: At least one uppercase, one digit, and one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(reg_password)) {
      setErrorMessage('Password must contain at least one uppercase letter, one digit, and one special character.');
      return;
    }

    if (reg_password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/forget`, {
        reg_college_email_id,
        reg_password,
      });

      setSuccessMessage('Password updated successfully.');
      setErrorMessage('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setEmailExists(false);
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred while updating the password.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#91ace6' }}>
      <Container>
        <Row>
          <Col md={4} className="mx-auto border border-dark p-3">
            <h3 className="text-center">Forgot Password</h3>
            <Form>
              {!emailExists ? (
                <>
                  {/* Email Field */}
                  <Form.Group className="mt-4">
                    <Form.Control
                      type="email"
                      className="py-2"
                      placeholder="Enter email"
                      value={reg_college_email_id}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Button className="btn btn-primary mt-3" onClick={checkEmail}>
                    Verify Email
                  </Button>
                  <Link to="/" className="text-decoration-none">
                    <Button className="btn btn-danger mt-3 ms-5">Cancel</Button>
                  </Link>
                </>
              ) : (
                <>
                  {/* Password Fields */}
                  <Form.Group>
                    <Form.Label>Enter new password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={reg_password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Confirm new password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button className="btn btn-success mt-3" onClick={updatePassword}>
                    Update Password
                  </Button>
                  <Link to="/" className="text-decoration-none">
                    <Button className="btn btn-danger mt-3 ms-5">Cancel</Button>
                  </Link>
                </>
              )}
            </Form>
            {/* Error and Success Messages */}
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
            {successMessage && <p className="text-success mt-3">{successMessage}</p>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgetPasswordComponent;
