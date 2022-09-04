import "../layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react"
import { FoldersContext } from "../../context/FoldersContext";
import { FilesContext } from "../../context/FilesContext";
import { useNavigate } from "react-router-dom";
import Popup from "../popup/Popup";

export default function Header(props) {

  const pathHere = props.pathHere;
  const inFolder =  props.inFolder
  const { foldersList, setFoldersList } = useContext(FoldersContext);
  const { filesList, setFilesList } = useContext(FilesContext);
  const [popup, setPopup] = useState(false)
  const [filename, setFilename] = useState();
  const [selectFile, setSelectFile] = useState();
  const [myFolder, setMyFolder] = useState();
  const [mg, setMg] = useState();
  const navigate = useNavigate();


  //   --------------------------------------------  add folder

  const handelFolder = (e) => {
    let newFolder = e.target.value;
    setMyFolder(newFolder);
  };

  const handelSubmitFolder = () => {
    if (myFolder){
      axios
        .post("http://localhost:3601/folders", { folderName: myFolder })
        // .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
      setFoldersList([...foldersList, myFolder]);
    }else{
      setPopup("Name the folder")
    }
  };

  //   --------------------------------------------  add file
  const handelFile = (e) => {
    console.dir(e.target);

    setSelectFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
      setMg(e.target.files[0].size/1024)
  };

  const handelSubmit = async() => {
    const formData = new FormData();
    formData.append("myFile", selectFile);
  console.log("handelSubmit file");
    if(mg < 9000){
      await axios
        .post("http://localhost:3601/files/upload", formData, {headers:{path : `./${pathHere}`}})
        // .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => setPopup(error.response.data));
        console.log("post file");
      setFilesList([...filesList, filename]);
    }
    else if(mg > 9000){
      setPopup("This file is too big")
    }
    else{
      setPopup("Choose a file")
    }
  };

  //   --------------------------------------------  delete folder
  const handelDeleteFolder = async(pathHere) => {
    console.log(inFolder);
    if(inFolder.length === 0){
      console.log("remove folder from here:");
      axios
      .get(`http://localhost:3601/folders?key=${pathHere}`)
          .then((res) => console.log(res))  
          navigate("/");
    }else{
      setPopup("First delete the files from the folder")
    }
    }
    
  

  return (
    <div className="layout-head">
      <div className="layout-head-continer">
        {inFolder ? <button onClick={()=>handelDeleteFolder(pathHere)}> Delete folder </button> : 
        <div className="layout-folder-area">
          <button id="addFolder" onClick={handelSubmitFolder}>
             Add Folder 
          </button>
          <input
            type="text"
            id="inputFolder"
            placeholder="Name the folder"
            onChange={(e) => handelFolder(e)}
          ></input>
        </div> }
        <div className="layout-upload-aria">
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={(e) => handelFile(e)}
          ></input>
          <button id="head-upload-file" onClick={handelSubmit}> upload file </button>
        </div>
      </div>
      <Popup state={[popup, setPopup]}/>
    </div>
  );
}
