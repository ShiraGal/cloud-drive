import "./FileList.css";
import Header from "../header/Header";
import axios from "axios";
import File from "../file/File"
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilesContext } from "../../context/FilesContext";

export default function FilesList() {
  const { folderName } = useParams();
  console.log(folderName);
  const {filesList, setfilesList} = useContext(FilesContext)
  // let foldername= props.folderName
  const [filesHere, setfilesHere] = useState([]);

// ---------------------------------------------------------קריאה לקבצים שבתקייה הנוכחית
  useEffect(()=>{
    const result = axios.get(
      `http://localhost:3601/folders/${folderName}`
    ).then((result) => setfilesHere(result.data));
  },[filesList])

// ---------------------------------------------------------מחיקת תקייה


// ---------------------------------------------------------
  return (
    <>
    <Header pathHere={"uploads/"+folderName} inFolder={filesHere}/>
    
    <br></br>
      <div className="filelist-files">
        {filesHere?<> {filesHere.map(file => <File filename={file} foldername={"./uploads/"+folderName}></File>)}</>:null}
      </div>
    </>
  )
}
