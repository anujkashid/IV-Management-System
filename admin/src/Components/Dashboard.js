import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col, Card, CardTitle, CardText } from "react-bootstrap";

const Dashboard = () => {
    const [usedata, setData] = useState([]);
    const [count, setCount] = useState("")
    const [contact, setContact] = useState("")
    const [product, setProduct] = useState("")
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/getRdata")
        .then((res) => {
          setData(res.data.data);
          setCount(res.data.data.length)
          console.log(res.data.data);
          
        })
        .catch((error) => {
          console.log(error);
        });  
    }, []);

    // Get data
   useEffect(() => {
    axios
      .get("http://localhost:8000/getFdata")
      .then((res) => {
        setData(res.data.data);
        setContact(res.data.data.length)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get data
  useEffect(() => {
    axios
      .get("http://localhost:8000/getproductdata")
      .then((res) => {
        setData(res.data.data);
        setProduct(res.data.data.length)
        // console.log("xtrcyt",res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      
    </>
  );
};
export default Dashboard;
