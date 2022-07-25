import "./FolderOut.css";
import axios from "axios";
import FilesList from "./FilesList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FolderOut(props) {
  const navigate = useNavigate();
  const folderName = props.foldername;
  const [isOpen ,setIsOpen] = useState(false)

  const handelOpenFolder = async (folderName) => {
    setIsOpen(true);
  //  navigate(`/${folderName}`); //go to "FilesList" under that folder
  };

  return (
    <>
      <div className="folder-out" onClick={() => handelOpenFolder(folderName)}>
        <div className="folder-text">{folderName}</div>
      </div>
      {isOpen? <FilesList folderName={folderName}/> : null}
    </>
  );
}
