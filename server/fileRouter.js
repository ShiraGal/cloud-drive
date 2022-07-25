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
// ======================================================================לקרוא קובץ
router.get("/file/:query", async (req, res) => {
  console.log("in router read");
  try {
    console.log(req.params.query);
    let filename = req.params.query;
    console.log(filename);
    let openFile = fileLogic.read(filename);
    console.log("after logic==" + openFile);
    res.send(openFile);
  } catch (err) {
    res.status(400).json(err || "errpr");
  }
});

// ======================================================================למחוק קובץ


  

module.exports = router;
