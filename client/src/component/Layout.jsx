import "./Layout.css";
import Header from "./Header";
import { useContext } from "react";
import Folders from "./Folders";
import FilesList from "./FilesList";
import { useEffect, useState } from "react";
import axios from "axios";
import { FoldersContext } from "../context/FoldersContext";
import { FilesContext } from "../context/FilesContext";
import File from "./File";
import { useNavigate } from "react-router-dom";
import folderImg from "../icons/folderImg.png"

export default function Layout() {
  const { foldersList, setFoldersList } = useContext(FoldersContext);
  const { filesList, setFilesList } = useContext(FilesContext);
  const [showFoldersList, setShowFoldersList] = useState([]);
  const [showFilesList, setShowFilesList] = useState([]);
  // const [filesInFolder, setFilesInFolder] = useState([]);
  // const [filename, setFilename] = useState();
  // const [uploadFilename, satUploadFilename] = useState([]);
  // const [selectFile, setSelectFile] = useState();
  // const [myFolder, setMyFolder] = useState();
  const navigate = useNavigate();

  //================================================================== קריאה לתקייה ראשית

  useEffect(() => {
    const result = axios
      .get(`http://localhost:3601/folders/uploads`)
      .then((result) => {
        setShowFoldersList(result.data.myfolders);
        setShowFilesList(result.data.myOutFils);
        console.log("end showOut");
      });
  }, [foldersList, filesList]);
  //================================================================== קריאת קבצים שבתוך תקייה

  const handelOpenFolder = async (folder) => {
    navigate(`/${folder}`);
  };

  //==================================================================
  return (
    <>
    <Header pathHere="./uploads"/>
      <br></br>

      <div className="folders-area">
        {showFoldersList.map((folder) => (
          <button onClick={() => handelOpenFolder(folder)}>
            <span>{folder}</span>
            <img className="folderImg" src={folderImg}></img>
          </button>
        ))}
      </div>
      <hr />
      <div className="filelist-files">
        {showFilesList.map((file) => (
          <File filename={file} foldername={"uploads"}></File>
        ))}
      </div>
    </>
  );
}

// TODO:
// שינוי שם

// גרירה- לתוך תקייה
