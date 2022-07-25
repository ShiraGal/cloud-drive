const express = require('express'); //יבוא של ספריית אקספרס
const app = express();
const PORT = 3601; 

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/files', require('./fileRouter'));
app.use('/folders', require('./folderRouter'));

app.listen(process.env.PORT || PORT , ()=>{console.log("CONNECTION SUCCESS")})
