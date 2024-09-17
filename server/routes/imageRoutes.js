   // routes/imageRoutes.js
   import express from 'express';
   import multer from 'multer';
   import path from 'path';

   const router = express.Router();

   // Set up storage for uploaded images
   const storage = multer.diskStorage({
       destination: (req, file, cb) => {
           cb(null, 'uploads/'); // Directory to store images
       },
       filename: (req, file, cb) => {
           cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
       }
   });

   // Initialize multer
   const upload = multer({ storage });

   // Route to upload an image
   router.post('/upload', upload.single('image'), (req, res) => {
       if (!req.file) {
           return res.status(400).json({ message: 'No file uploaded' });
       }
       const imageUrl = `http://localhost:8081/uploads/${req.file.filename}`; // Construct the image URL
       res.json({ imageUrl }); // Return the image URL
   });

   export default router;