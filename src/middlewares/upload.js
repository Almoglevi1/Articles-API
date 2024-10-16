import multer from 'multer';  // Import multer for handling file uploads

// Configure storage settings for multer
const storage = multer.diskStorage({
    // Set the destination for uploaded files
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the 'uploads/' directory
    },
    // Set the filename for uploaded files
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Use the current timestamp and original filename
    }
});

// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
    // Accept only JPEG and PNG files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept the file
    } else {
        cb(null, false); // Reject the file
    }
}

// Configure multer with storage settings, file size limit, and file filter
const upload = multer({
    storage, // Use the defined storage settings
    limits: {
        filesSize: 1024 * 1024 * 2 // Limit file size to 2MB
    },
    fileFilter // Use the defined file filter
});

export default upload;