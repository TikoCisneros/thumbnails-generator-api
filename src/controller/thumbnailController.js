import express from 'express';
import multer from 'multer';
import { buildThumbnails, getThumbnailDataByName } from '../generators/thumbnailGenerator';

const router = express.Router();
// multer options
const uploader = multer({
  // dest: 'images', // folder destination
  limits: {
    fileSize: 1000000, // 5MB (5242880)
    fileFilter: (_req, file, callback) => {
      if (!file.originalname.match(/\.(png|jpg)$/)) {
        callback(new Error('Please upload a valid image.'));
      }
      callback(undefined, true);
    }
  },
});

router.post('/upload', uploader.single('img'), async ({ file }, res) => {
  try {
    if (!file) {
      res.status(400).send({ error: { code: 'IMAGE_UPLOAD' , message: 'Something was wrong. Send a image content.' } });
      return;
    }
  
    const thumbnails = await buildThumbnails(file);
    res.status(201).send({ thumbnails });
  } catch (_error) {
    res.status(400).send({ error: { code: 'THUMBNAIL_GENERATION' , message: 'Something was wrong. Try again!' } });
  }
}, ({ code , message }, _req, res, _next) => res.status(400).send({ error: { code , message } }));

router.get('/image/:name', (req, res) => {
  const { params: { name } } = req;
  const bufferedThumbnail = getThumbnailDataByName(name);

  if (!bufferedThumbnail) {
    res.status(400).send({ error: { code: 'THUMBNAIL_SEARCH' , message: 'Something was wrong. Try again!' } });
    return;
  }

  res.set('Content-Type', 'image/png');
  res.send(bufferedThumbnail);
});

module.exports = router;