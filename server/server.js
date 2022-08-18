require("dotenv").config();
const express = require('express'); //יבוא של ספריית אקספרס
const app = express();
const port = process.env.PORT || 4000;

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/files', require('./fileRouter'));
app.use('/folders', require('./folderRouter'));

app.listen(port, ()=>{console.log(`CONNECTION SUCCESS- on port: ${port}`)})
