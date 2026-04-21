const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "uploads/");
  },

  filename: function(req, file, cb){
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG images are allowed"), false);
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

module.exports = upload