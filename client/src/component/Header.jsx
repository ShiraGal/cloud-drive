import "./Layout.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react"
import { FoldersContext } from "../context/FoldersContext";
import { FilesContext } from "../context/FilesContext";

export default function Header(props) {

  const { foldersList, setFoldersList } = useContext(FoldersContext);
  const { filesList, setFilesList } = useContext(FilesContext);
  const pathHere = props.pathHere;
  const [filename, setFilename] = useState();
  const [selectFile, setSelectFile] = useState();
  const [myFolder, setMyFolder] = useState();
  // const [type, setType] = useState();
  const [mg, setMg] = useState();

  //   --------------------------------------------  add folder

  const handelFolder = (e) => {
    let newFolder = e.target.value;
    setMyFolder(newFolder);
  };

  const handelSubmitFolder = () => {
    if (myFolder){
      axios
        .post("http://localhost:3601/folders", { folderName: myFolder })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      setFoldersList([...foldersList, myFolder]);
    }else{
      alert("Enter name to your new folder")
    }
  };

  //   --------------------------------------------  add file
  const handelFile = (e) => {
    console.dir(e.target);

    setSelectFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
      // setType(e.target.files[0].type)
      setMg(e.target.files[0].size/1024)
  };

  const handelSubmit = async() => {
    const formData = new FormData();
    formData.append("myFile", selectFile);
    // console.log("type= "+type);
    if(mg < 9000){
      await axios
        .post("http://localhost:3601/files/upload", formData, {headers:{path : pathHere}})
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
        console.log("post file");
      setFilesList([...filesList, filename]);
    }
    else if(mg < 9000){
      alert("this file is to big")
    }
    else{
      alert("Choose file")
    }
  };

  return (
    <div className="layout-head">
      <div className="layout-head-continer">
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
        </div>
        <div className="layout-upload-aria">
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={(e) => handelFile(e)}
          ></input>
          <button id="head-upload-file" onClick={handelSubmit}>upload file</button>
        </div>
      </div>
    </div>
  );
}
