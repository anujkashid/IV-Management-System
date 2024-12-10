import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CRUDOperation = () => {
    const [data,setData]=useState([]);
    
    const firstName=localStorage.getItem("firstName");
    const lastName=localStorage.getItem("lastName");
    // Calculate password strength (simple version)



    useEffect(() => {
        axios
            .get('http://localhost:8000/getcrud')
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        localStorage.setItem('deleteid', id);
    };


    const handleUpdate = (id) => {
        localStorage.setItem('updateid', id);
        // console.log("id",id);
    };


    return (
        <div style={{
            backgroundColor: "#91ace6",
            height: "100vh",           
            width: "100vw",                   
          }}>

            <Container fluid>
            <marquee>
                    <h3 className='text-success fw-bold mt-4'>Welcome {firstName} {lastName}</h3>
                </marquee>
            </Container>

            <Container className=''>
                <Row>
                    <Col md={12} className='mt-5'>
                        <h3 className=''>Users List</h3>
                        <Table striped bordered hover responsive className='mt-5'>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <Link
                                                className='btn btn-info me-4'
                                                to='/update'
                                                onClick={() => handleUpdate(user._id)}
                                            >
                                                Update
                                            </Link>
                                            <Link
                                                className='btn btn-danger'
                                                to='/delete'
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CRUDOperation;
