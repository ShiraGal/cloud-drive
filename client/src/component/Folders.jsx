import "./Folders.css";
import "./FolderOut.css";
import { useEffect, useState } from "react";
import FilesList from "./FilesList";
import axios from "axios";
// import FolderOut from "./FolderOut";

export default function Folders(props) {
  const [foldersList, setFoldersList] = useState([]);
  const [folderName, setFolderName] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handelOpenFolder = async (folder) => {
    setFolderName(folder);
    setIsOpen(true);
  };

  useEffect(() => {
    const result = axios
      .get(`http://localhost:3601/folders/uploads`)
      .then((result) => setFoldersList(result.data));
  }, []);


  return (
    <>
      <div className="folders-area">
        {foldersList.map((folder) => (
          <button onClick={() => handelOpenFolder(folder)}>
            <span>{folder}</span>
          </button>
        ))}
      </div>
      <hr />  
        {isOpen ? <FilesList folderName={folderName} /> : null}
    </>
  );
}
