const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
    const tiposPermitidos = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (tiposPermitidos.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Formato de imagem não permitido. Envie JPG, PNG, WEBP."));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;