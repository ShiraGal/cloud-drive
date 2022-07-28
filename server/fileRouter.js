const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();
//{ dest : 'uploads/'};

const fileLogic = require("./fileLogic");



// ======================================================================יצירת קובץ
// router.post('/',async (req,res)=>{
//     console.log("in rout");
//     try{
//          await fileLogic.create(req.body.filename, req.body.content)
//          res.send("seccess")
//     }
//     catch(err){
//         res.status(400).json(err || 'errpr')
//     }
// })

// ======================================================================להעלות קובץ
router.post(
  "/upload",
  upload.single("myFile"),
  fileLogic.isValid,
  async (req, res) => {
    console.log("in router");
    try {
      const { file } = req;
      fileLogic.create(file.originalname, file.buffer);
      console.log("in try upload");
      res.sendStatus(200);
    } catch (err) {
      console.log("router error");
      res.status(400).json(err || "errpr");
    }
  }
);
// http://localhost:3601/files/${filePath}
// ======================================================================לקרוא קובץ
router.get("/:query", async (req, res) => {
  console.log("in router read file");
  try {
    console.log(req.params.query +"  --filePath from router");
    let filePath = req.params.query;
    console.log(filePath);
    let openFile = fileLogic.read(filePath);
    console.log("after logic==" + openFile);
    res.send(openFile);
  } catch (err) {
    res.status(400).json(err || "errpr");
  }
});

// ======================================================================למחוק קובץ


  

module.exports = router;
