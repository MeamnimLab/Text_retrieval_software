import { createSong } from '../controller/song.controller';
import { Router } from 'express';
import multer from 'multer';

const router = Router();

// Configure multer for file upload with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const errorHandler = (res, err) => {
  console.log(err);
  res.status(500).json({ msg: 'There is an error, try again later', err });
};

// Upload song route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {

    const file = req.file;
    if (!file) {
      return res.status(400).json({ msg: 'No file uploaded.' });
    }


    const song = await createSong(req.body, file);
   
    res.status(200).json({ msg: 'File and metadata received successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
});

export default router;
