import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Navbar from "./components/Nav";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={'ADCS '} />
          
        </Route>
        <Route path="*" element={<>
          <Navbar />
          <div className="p-3">
            <div className='phaser rounded d-flex my-5 text-center w-100 py-[100px]'>
                {<div className='mx-auto d-flex text-center'> <BsTriangle className='fs-5 mt-1 icon me-2' /> {location.pathname.includes('donate')?'404 ENOENT':'404 ENOENT'}</div>}
            </div>
          </div>
        </>} />
      </Routes>
    </Router>
  );
};

export default App;
