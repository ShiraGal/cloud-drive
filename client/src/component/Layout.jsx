import "./Layout.css";
import Folders from "./Folders";
import FilesList from "./FilesList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Layout() {
  const [filename, setFilename] = useState();
  const [uploadFilename, satUploadFilename] = useState([]);
  //   const [type, setType] = useState();
  //   const [mg, setMg] = useState();
  const [selectFile, setSelectFile] = useState();
  const [filesList, setFilesList] = useState([]);
  const [foldersList, setFoldersList] = useState([]);
  const [myFolder, setMyFolder] = useState();

  //   --------------------------------------------add folder

  const handelFolder = (e) => {
    let newFolder = e.target.value;
    setMyFolder(newFolder);
  };

  const handelSubmitFolder = () => {
    addFolder(myFolder);

    axios
      .post("http://localhost:3601/folders", { folderName: myFolder })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  function addFolder(myFolder) {
    setFoldersList([...foldersList, myFolder]);
    console.log(foldersList);
  }

  //   --------------------------------------------add file
  const handelFile = (e) => {
    console.dir(e.target);

    setSelectFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    //   setType(e.target.files[0].type)
    //   setMg(e.target.files[0].size/1024)
  };

  const handelSubmit = () => {
    const formData = new FormData();
    formData.append("myFile", selectFile);
    satUploadFilename(filename);
    addFile(filename);

    axios
      .post("http://localhost:3601/files/upload", formData)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  function addFile(filename) {
    setFilesList([...filesList, filename]);
  }

  //==================================================================

  return (
    <>
      <div className="layout-head">
        <div className="layout-head-continer">
          <div className="layout-folder-area">
          <button id="addFolder" onClick={handelSubmitFolder}>
            Add Folder
          </button>
          <input
            type="text"
            id="inputFolder"
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
            <button onClick={handelSubmit}>upload file</button>
          </div>
        </div>
      </div>
      <br></br>
      <Folders Folders={[foldersList, setFoldersList]} />
      <FilesList
        uploadFilename={uploadFilename}
        files={[filesList, setFilesList]}
      />
    </>
  );
}
