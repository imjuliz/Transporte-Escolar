// /middleware/uploadMiddleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'public/uploads';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `user-${req.session.usuario.id}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

export {upload};
