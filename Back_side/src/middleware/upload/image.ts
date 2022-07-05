import multer from "multer";
import { HttpException } from "../../errorHandling/httpException";
export const uploadImageMiddleware = multer({
  limits: {
    fileSize: 1024 * 1024,
    fieldNameSize: 100,
  },
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    console.log("its in filtering ");
    console.log(file);
    //
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    )
      //
      cb(null, true);
    else cb(new HttpException(400, "bad file"));
  },
});
export const uploadFileMiddleware = multer({
  limits: {
    fileSize: 1024 * 1024 * 20,
    fieldNameSize: 100,
  },
  storage: multer.memoryStorage(),
});
