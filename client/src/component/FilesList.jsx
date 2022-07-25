import "./FileList.css";
import axios from "axios";
import File from "./File"

export default function FilesList(props) {
  const uploadFilename = props.uploadFilename;


  return (
    <>
      <div className="filelist-files">
        {props.files[0].map(file => <File filename={file}></File>)}
      </div>
    </>
  )
}
