import "./File.css";
import axios from "axios";

export default function File(props) {
  const filename = props.filename;
  const foldername = props.foldername;
  const filePath = `${foldername}/${filename}`;

  const handelOpen = (filePath) => {
    // console.log("lets make get req==" + filename);
    const result = axios
      .get(`http://localhost:3601/files/${filePath}`)
      .then((result) => console.log(result.data));
  };

  return (
    <>
      <div className="file-oneFile" onClick={() => handelOpen(filePath)}>
        <div className="file-text">{filename}</div>
        <div className="file-options">
          <div className="file-delete">🚽</div>
          <div className="file-update">🔁</div>
          <div className="file-details">📄</div>
          <div className="file-dounload">⬇️</div>
        </div>
      </div>
    </>
  );
}
