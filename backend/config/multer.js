const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Configure multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'items',  // You can set the folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],  // Added 'webp' format
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
