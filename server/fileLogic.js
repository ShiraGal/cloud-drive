const { error, log } = require("console");
const fs = require("fs"); //יבוא של אףאס

// פונקציות לשימוש:

function isExist(filePath) {
  console.log("exist??");
  return fs.existsSync(filePath);
}
function isValidName(filename = "") {
  return ["/", "\\", "*", ":", "|", "?", "<", ">", '"'].find((char) =>
    filename.includes(char)
  )
    ? false
    : true;
}
function isValidExtantions(filename = "") {
  let ext = filename.slice(filename.lastIndexOf(".") + 1);
  console.log(filename);
  return ["pdf", "jpg","docx","mp3"].find(
    (char) => ext == char
  )
    ? true
    : false;
}

function isValid(req, res, next) {
  let filename = req.file.originalname; //middlewere
  console.log("file name= " + filename);
  if (isValidName(filename) && isValidExtantions(filename)) {
    console.log("it is valid");
    next();
  } else {
    console.log("not valid");
    return error;
  }
}

//_______________________________________________________יצירת קובץ
function create(path, content) {
  console.log("logic");
  try {
    if (!isExist(path)) {
      console.log("under isExist--- "+path);
      fs.writeFileSync(path, content);
    } else {
      console.log("create");
      throw error;
    }
  } catch (error) {}
}
//_______________________________________________________ הוספה לקובץ
const update = (filename, content) => {
  try {
    if (isExist(filename)) {
      fs.appendFileSync(filename, content);
    } else {
      throw error;
    }
  } catch (error) {
    console.log("can't add");
  }
};



//_______________________________________________________ הורדת קובץ
const read = (filePath) => {
  try {
    console.log("in logic read");
    if (isExist(filePath)) {
      console.log("in if logic read");
      let res = fs.readFileSync(filePath, { encoding: "utf8" });
      return res
    } else {
      throw error;
    }
  } catch (error) {
    console.log("can't read");
  }
};
//_______________________________________________________מחיקת קובץ
const remove = (filePath) => {
  try{
    console.log("in if logic remove  "+filePath)
    fs.unlinkSync("./"+filePath)
  }catch (error){
    console.log("can't remove");
  }
};
//_______________________________________________________
const rename = (newPath, pastPath)=>{
  try{
    console.log("in logic rename!  "+newPath)
    let res = fs.renameSync(`./${pastPath}`, `./${newPath}`) //TODO- יש פה בעיה
    return res
  }catch (error){
    console.log("can't rename...");
  }
}



module.exports = { create, read, update, remove, isValid, rename };
