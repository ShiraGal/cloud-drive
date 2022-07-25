import "./FileList.css";
import axios from "axios";
import File from "./File"
import { useEffect, useState } from "react";

export default function FilesList(props) {
  let folderName= props.folderName
  const [filesList, setFilesList] = useState([]);

  useEffect(()=>{
    const result = axios.get(
      `http://localhost:3601/folders/${folderName}`
    ).then((result) => console.log(result.data));
  },[])


  return (
    <>
      <div className="filelist-files">{folderName}
        {/* {filesList.map(file => <File filename={file}></File>)} */}
      </div>
    </>
  )
}
