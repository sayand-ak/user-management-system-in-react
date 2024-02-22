import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if(file){
    cb(null, true)
  }else{
    cb(new Error('No file provided'), false);
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, 
  fileFilter: fileFilter
}).single('profileImage');

export default upload;