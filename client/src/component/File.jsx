import './File.css'
import axios from 'axios';

export default function File(props) {
  const filename = props.filename;

  const handelOpen = async (filename) => {
    // console.log("lets make get req==" + filename);
    const result = await axios.get(`http://localhost:3601/files/file/${filename}`);
    console.log(result);
  };

  return (
    <>
      <div className="file-oneFile" onClick={() => handelOpen(filename)}>
        <div className="file-text">
          {filename}
        </div>
        <div className="file-options">
            <div className='file-delete'>🚽</div>
            <div className='file-update'>🔁</div>
            <div className='file-details'>📄</div>
            <div className='file-dounload'>⬇️</div>
        </div>
      </div>
    </>
  );
}
