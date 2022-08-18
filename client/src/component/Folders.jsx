import "./Folders.css";
import File from "./File";
import { useEffect, useState } from "react";
import FilesList from "./FilesList";
import axios from "axios";

export default function Folders(props) {
  // const [foldersList, setFoldersList] = useState([]);
  // const [filsOutList, setFilsOutList] = useState([]);
  const [folderName, setFolderName] = useState();
  const [isOpen, setIsOpen] = useState(false);
  let satUploadFilename = props.satUploadFilename

  // const handelOpenFolder = async (folder) => {
  //   setFolderName(folder);
  //   setIsOpen(true);
  // };

  // useEffect(() => {
  //   const result = axios
  //     .get(`http://localhost:3601/folders/uploads`)
  //     .then((result) => {
  //       setFoldersList(result.data.myfolders);
  //       setFilsOutList(result.data.myOutFils);
  //     });
  // },[]);

  return (
    <>
      {/* <div className="folders-area">
        {foldersList.map((folder) => (
          <button onClick={() => handelOpenFolder(folder)}>
            <span>{folder}</span>
          </button>
        ))}
      </div>
      <hr />
      <div className="filelist-files">
        {filsOutList.map((file) => (
          <File filename={file} foldername={"uploads"}></File>
        ))}
      </div> */}
      {/* {isOpen ? <FilesList folderName={folderName} /> : null} */}
    </>
  );
}
