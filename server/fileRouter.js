const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();
//{ dest : 'uploads/'};

const fileLogic = require("./fileLogic");



// ======================================================================קריאת פרטי קובץ
router.get("/readDetails", async (req, res) => {
  console.log("in router readDetails file");
  try {
    console.log(req.query.key +"  --filePath from readDetails router");
    let filePath = req.query.key;
    const res = fileLogic.read(filePath);
    console.log("after logic readDetails == " +res);
    res.send(res)
  } catch (err) {
    res.status(400).json(err || "errpr");
  }
});

// ======================================================================להעלות קובץ
router.post(
  "/upload",
  upload.single("myFile"),
  fileLogic.isValid,
  async (req, res) => {
    console.log("in router");
    const pathHere = req.headers.path
    const { file } = req;
    const path = `${pathHere}/${file.originalname}`
    console.log(path); 
    try {
      // console.log(req);
      fileLogic.create(path, file.buffer);
      console.log("in try upload");
      res.send("Ok");
    } catch (err) {
      console.log("router error");
      res.status(400).json(err || "errpr");
    }
  }
);
// http://localhost:3601/files/${filePath}
// ======================================================================הורדת קובץ 
router.get("/download", async (req, res) => {
  console.log("in router read file");
  try {
    console.log(req.query.key +"  --filePath from router");
    let filePath = req.query.key;
    fileLogic.read(filePath);
    // console.log("after logic==" + openFile);
    res.download(filePath)
  } catch (err) {
    res.status(400).json(err || "errpr");
  }
});

// ======================================================================למחוק קובץ
router.get("/remove", async (req, res) => {
  console.log("in router delete file");
  try {
    console.log(req.query.key +"  --filePath from remove router");
    let filePath = req.query.key;
    fileLogic.remove(filePath);
    console.log("after logic remove ==");
    res.send(true)
  } catch (err) {
    res.status(400).json(err || "errpr");
  }
});
// TODO- הקאוורי פה לא קולט אם הקובץ בתוך תקייה.

// ======================================================================לשנות שם קובץ
router.put("/rename", async (req, res) => {
  console.log("in router rename file");
 
  console.log(req.body);
  console.log(req.body.pastPath +"  --pastPath");
  console.log(req.body.newPath +"  --newPath");
  try {
    let pastPath = req.body.pastPath;
    let newPath = req.body.newPath;
    fileLogic.rename(newPath, pastPath);
    console.log("after logic rename!");
    res.send(newPath)
  } catch (err) {
    res.status(400).json(err || "errpr");
  }
})
  

module.exports = router;
