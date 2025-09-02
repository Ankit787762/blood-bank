// middlewares/form.middleware.js
import multer from "multer";

const upload = multer();

// sirf text form-data ke liye (file nahi)
export const parseForm = upload.none();
