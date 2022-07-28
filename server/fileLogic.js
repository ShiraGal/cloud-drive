const { error, log } = require("console");
const fs = require("fs"); //יבוא של אףאס

// פונקציות לשימוש:

function isExist(filePath) {
  console.log("exist??");
  return fs.existsSync("./uploads/" + filePath);
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
  return ["pdf", "txt", "png", "jpg", "js", "html", "css", "jsx", "ts"].find(
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
function create(filename, content) {
  console.log("logic");
  try {
    if (!isExist(filename)) {
      console.log("under isExist--- "+filename);
      fs.writeFileSync("./uploads/"+filename, content);
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
//_______________________________________________________ קריאת קובץ
const read = (filePath) => {
  try {
    console.log("in logic read");
    if (isExist(filePath)) {
      console.log("in if logic read");
      let result = fs.readFileSync("./uploads/" + filePath, { encoding: "utf8" });
      return result
    } else {
      throw error;
    }
  } catch (error) {
    console.log("can't read");
  }
};
//_______________________________________________________מחיקת קובץ
const remove = (filename) => {
  fs.rmSync("./files/" + filename);
};

module.exports = { create, read, update, remove, isValid };
