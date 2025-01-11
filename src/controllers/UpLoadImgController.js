const cloudinary = require("../config/CloudinaryConfig");
const fs = require('fs');

// Hàm upload ảnh
const uploadImg = async (req, res) => {
    try {
        console.log('Uploading')
        // Kiểm tra nếu không có file
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Upload file lên Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Trả về kết quả upload thành công
        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully!',
            data: {
                url: result.secure_url, // URL của ảnh trên Cloudinary
                public_id: result.public_id, // ID của ảnh trên Cloudinary
            },
        });
    } catch (err) {
        console.error('Cloudinary Upload Error:', err);
        return res.status(500).json({
            success: false,
            message: err,
            error: err.message,
        });
    }
};

module.exports = {
    uploadImg,
};
