const express = require("express");
const router = express.Router();
const multer = require("multer");
// const upload = multer();
const folderLogic = require("./folderLogic");

// ======================================================================יצירת תקייה
router.post("/", async (req, res) => {
    try {
      console.log(req.body.folderName);
      await folderLogic.createFolder(req.body.folderName);
      res.send("new folser seccess");
    } catch (err) {
      console.log("router folder error");
      res.status(400).json(err || "error");
    }
  });
  // ======================================================================קריאת תקייה
  router.get("/:query", async (req, res) => {
    console.log("in router read folder");
    try {
      let folderName = req.params.query;
      console.log(folderName+ "  the folder");
      if(folderName === "uploads"){
        let myfolders = folderLogic.readall().foldersOnly;
        let myOutFils = folderLogic.readall().filsOnly;
       res.send({myfolders, myOutFils});
      }else{
        let openFolder = folderLogic.readFolder(folderName);
        console.log("after logic==" + folderName);
        console.log(openFolder);
        res.send(openFolder);
      }
    } catch (err) {
      res.status(400).json(err || "errpr");
    }
  });
  

  module.exports = router;