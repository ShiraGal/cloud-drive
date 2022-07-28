import "./FileList.css";
import axios from "axios";
import File from "./File"
import { useEffect, useState } from "react";

export default function FilesList(props) {
  let foldername= props.folderName
  const [filesList, setFilesList] = useState([]);

  useEffect(()=>{
    const result = axios.get(
      `http://localhost:3601/folders/${foldername}`
    ).then((result) => setFilesList(result.data));
  },[])


  return (
    <>
      <div className="filelist-files">
        {filesList.map(file => <File filename={file} foldername={foldername}></File>)}
      </div>
    </>
  )
}
