import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";


// import { Provider } from 'react-redux'
import Login from "./Login";
import Home from "./Home";
import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Newuser from "./newuser";



const rootElement = document.getElementById("root");
render(

   <BrowserRouter>
  <Routes>
    <Route path="/"      element={<App />} />
    <Route path="/newuser" element={<Newuser />} /> 
    <Route path="/login" element={<Login />} />
     <Route path="/home" element={<Home />} /> 
  </Routes>
  </BrowserRouter>  
  ,
  rootElement
);


