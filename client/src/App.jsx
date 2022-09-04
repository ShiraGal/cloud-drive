import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import  axios  from 'axios';
import Layout from './component/layout/Layout';
import Header from './component/header/Header'
import FilesList from './component/fileList/FilesList';
import Folders from "./component/folders/Folders";
import { FilesContext } from "./context/FilesContext";
import { FoldersContext} from "./context/FoldersContext"

function App() {

const [filesList, setFilesList]= useState([])
const [foldersList, setFoldersList]= useState([])

  return (
    <div className="App">
      <FoldersContext.Provider value={{ foldersList, setFoldersList }}>
      <FilesContext.Provider value={{ filesList, setFilesList }}>
      <BrowserRouter> 
      
      <Routes>
        <Route path="/" element= {<Layout />} />
        <Route path="/:folderName" element={<FilesList />} />
        {/* <Route path="/:folderName" element={<Folders />} /> */}
      </Routes>
    </BrowserRouter> 
        </FilesContext.Provider>
        </FoldersContext.Provider>
    </div>
  )
}

export default App