import multer from "multer";

// multer config
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.fieldname);
  },
});

// multer middlewares
export const profilePhoto = multer({ storage }).single("profile-photo");
