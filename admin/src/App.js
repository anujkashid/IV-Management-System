import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Head from './Components/Head';
const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        {/* Login Page - Offcanvas is hidden here */}
         {/* <Route path="/" element={<Login />} /> */}
        {/* All other routes are wrapped inside Head */}
        <Route path="/head" element={<Head />} />
      </Routes>
      </BrowserRouter>
  );
};

export default App;
