import "./Folders.css";
import FolderOut from "./FolderOut";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Folders(props) {
  const [foldersList, setFoldersList] = useState([]);

  useEffect(() => {
    const result = axios
      .get(`http://localhost:3601/folders/uploads`)
      .then((result) => setFoldersList(result.data));
  }, []);


  return (
    <>
      <div className="folders-area">
        {foldersList.map(folder => <FolderOut foldername={folder}></FolderOut>)}
      </div>
    </>
  );
}
