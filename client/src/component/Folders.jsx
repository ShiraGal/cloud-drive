import "./Folders.css";
import FolderOut from "./FolderOut"
import { useEffect, useState } from "react";

export default function Folders(props) {

  return (
    <>
      <div className="folders-area">
        {props.Folders[0].map(folder => <FolderOut foldername={folder}></FolderOut>)}
      </div>
    </>
  );
}
