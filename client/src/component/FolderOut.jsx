import './FolderOut.css'
import axios from 'axios';
import FilesList from './FilesList';
import { useNavigate } from "react-router-dom";

export default function FolderOut(props) {
  const navigate = useNavigate();
  const folderName = props.foldername

  const handelOpenFolder = async (folderName) => {
    const result = await axios.get(`http://localhost:3601/folders/${folderName}`);
    console.log(result.data);
    const filesList = result.data;
    navigate(`/${folderName}`)
  }
    
    return (
      <>
      <div className="folder-out" onClick={() => handelOpenFolder(folderName)}>
        <div className="folder-text">{folderName}</div>
        </div>
        {/* <FilesList files={filesList}/> */}
      </>
    );
  }
  