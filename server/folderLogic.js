const { error, log } = require("console");
const fs = require("fs"); 



//_______________________________________________________יצירת תקייה

function createFolder(folderName){
    try {
      console.log("try to fs folder");
      console.log(folderName);
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync("./uploads/"+folderName);
        console.log("!!!!");
      }else{
        throw error
      }
    } catch (error) {
      console.error("cant create folder");
    }
  }
  //_______________________________________________________ קריאת תקייה
  
  function readFolder(folderName) {
    try{
        console.log("logic folder read "+folderName);
        let folderPath = "./uploads/"+folderName
        let inFolder = fs.readdirSync(folderPath);
        console.log(inFolder);
        return inFolder
    }
    catch(error){
      console.log("can't read");
    }
  }
  //________________________________________________________הבאת כל התקיות


  module.exports = {createFolder, readFolder, readall };