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
      console.log(folderName);
      let openFolder = folderLogic.readFolder(folderName);
      console.log("after logic==" + folderName);
      console.log(openFolder);
      res.send(openFolder);
    } catch (err) {
      res.status(400).json(err || "errpr");
    }
  });
  // ======================================================================הבאת כל התקיות
  // router.get("/folders", async (req, res) => {
  //   console.log("in foldersss");
  //   try {
  //     let myfolders = folderLogic.readall();
  //     res.send(myfolders);
  //   } catch (err) {
  //     res.status(400).json(err || "errpr");
  //   }
  // });

  module.exports = router;