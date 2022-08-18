import "./FileList.css";
import Header from "./Header";
import axios from "axios";
import File from "./File"
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilesContext } from "../context/FilesContext";

export default function FilesList() {
  const { folderName } = useParams();
  console.log(folderName);
  const {filesList, setfilesList} = useContext(FilesContext)
  // let foldername= props.folderName
  const [filesHere, setfilesHere] = useState([]);

  useEffect(()=>{
    const result = axios.get(
      `http://localhost:3601/folders/${folderName}`
    ).then((result) => setfilesHere(result.data));
  },[filesList])


  return (
    <>
    <Header pathHere={"./uploads/"+folderName}/>
      <div className="filelist-files">
        {filesHere?<> {filesHere.map(file => <File filename={file} foldername={"./uploads/"+folderName}></File>)}</>:null}
      </div>
    </>
  )
}
