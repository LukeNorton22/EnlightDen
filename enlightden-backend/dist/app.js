"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Use CORS to allow requests from your frontend origin
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Specify your frontend URL here
}));
// Configure Multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.join(__dirname, '../uploads/');
        fs_1.default.mkdirSync(uploadPath, { recursive: true }); // Ensure the uploads directory exists
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
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
    const uploadPath = path_1.default.join(__dirname, '../uploads');
    fs_1.default.readdir(uploadPath, (err, files) => {
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
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
