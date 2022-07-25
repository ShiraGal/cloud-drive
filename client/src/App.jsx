import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import  axios  from 'axios';
import Layout from './component/Layout';
import FilesList from './component/FilesList';
import Folders from "./component/Folders";

function App() {
  

  return (
    <div className="App">
      {/* <Layout /> */}
      <BrowserRouter> 
      <Routes>
        <Route path="/" element= {<Layout />} />
        {/* <Route path="/:folderName" element={<FilesList />} /> */}
        <Route path="/:folderName" element={<Folders />} />
      </Routes>
    </BrowserRouter> 
    </div>
  )
}

export default App