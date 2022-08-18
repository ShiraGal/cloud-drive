import "./File.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FilesContext } from "../context/FilesContext";
import pdfIcon from "../icons/pdfIcon.png"
import docxIcon from "../icons/docxIcon.png"
import jpgIcon from "../icons/jpgIcon.png"
import mp3Icon from "../icons/mp3Icon.png"
import toiletImg from "../icons/toilet.png"
import downloadImg from "../icons/downloadImg.png"
import detailsImg from "../icons/details.png"

export default function File(props) {
  const filename = props.filename;
  // const [filename, setFilename] = useState(props.filename)
  const foldername = props.foldername;
  const {filesList , setFilesList} = useContext(FilesContext)
  const filePath = `${foldername}/${filename}`;
  const [urlDown, setUrlDown] = useState()
  const [onRename, setOnRename] = useState("close")
  const [changeName, setChangeName] = useState(filename)
  const ext = filename.slice(filename.lastIndexOf(".") + 1)


 // ---------------------------------------------------------read details file=== לא טוב. Todo
  // const handelReadDetailsFile = async(filePath)=>{
  //   console.log("readDetailsFile==" + filename);
  //  await axios
  //     .get(`http://localhost:3601/files/readDetails?key=${filePath}`)
  //     .then((res) => console.dir(res))  
  // };
  
  // ---------------------------------------------------------download file
 
  const handelOpenFile = async(filePath)=>{
    console.log("lets make get req==" + filename);
   await axios
      .get(`http://localhost:3601/files/download?key=${filePath}`)
      .then((res) => setUrlDown(res.config.url))
      
  };
// ---------------------------------------------------------delete file
const handelRemoveFile = async(filePath) => {
  console.log("remove file from here:");
  axios
  .get(`http://localhost:3601/files/remove?key=${filePath}`)
      .then((res) => console.log(res))  
      setFilesList(filePath)
}

// ---------------------------------------------------------rename file
const rename = async() => {
  console.log("rename file from here:");
  const res = await axios.put('http://localhost:3601/files/rename', { pastPath : filePath, newPath: `${foldername}/${changeName}` });
}

// ---------------------------------------------------------
const openRename = ()=>{
  setOnRename("open")
}

const closeRename = ()=>{
  rename();
  setFilesList(changeName)
  setOnRename("close");
}
// ---------------------------------------------------------

  return (
    <>
      <div className="file-oneFile" >
        {onRename==="close"? <div className="file-text" onClick={openRename}>{filename}</div>:
        <input type="text" placeholder={filename} onChange={(e)=>setChangeName(`${e.target.value}.${ext}`)} onBlur={closeRename}></input>} 
        {ext==="pdf"?<img src={pdfIcon}></img>:
        ext==="docx"?<img src={docxIcon}></img>:
        ext==="jpg"?<img src={jpgIcon}></img>:
        ext==="mp3"?<img src={mp3Icon}></img>:null}
        <div className="file-options">
          <a href={urlDown} className="file-dounload" onClick={() => handelOpenFile(filePath)}><img src={downloadImg}></img></a>
          <div className="file-delete" onClick={() => handelRemoveFile(filePath)}><img src={toiletImg}></img></div>
          <div className="file-update" onClick={() => handelReadDetailsFile(filePath)}><img src={detailsImg}></img></div>
        </div>
      </div>
    </>
  );
}


// TODO- באג- בניסיון הראשון להוריד זה לא יורד. 
// אינפוט שינוי שם- שרק כשלוחצים תהייה אפשרות לשנות?