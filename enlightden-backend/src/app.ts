import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors'; // Import CORS middleware

const app = express();
const port = process.env.PORT || 5000;

// Use CORS to allow requests from your frontend origin
app.use(cors({
  origin: 'http://localhost:3000', // Specify your frontend URL here
}));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/');
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the uploads directory exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Endpoint to handle file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  res.json({
    id: req.file.filename,
    title: req.file.originalname,
    fileUrl: `/uploads/${req.file.filename}`, // Adjust this as necessary
  });
});

// Endpoint to fetch notes
app.get('/api/notes', (req, res) => {
  const uploadPath = path.join(__dirname, '../uploads');
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read directory' });
    }

    const notes = files.map((file) => ({
      id: file,
      title: file,
      fileUrl: `/uploads/${file}`,
    }));

    res.json(notes);
  });
});

// Serve static files for uploaded content
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
