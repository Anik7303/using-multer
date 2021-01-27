const path = require('path');

const multer = require('multer');

const { getHashedFilename } = require('../services/utility');

const imageStorage = multer.diskStorage({
    filename: (req, file, cb) =>
        cb(null, getHashedFilename(file.originalname || file.filename)),
    destination: (req, file, cb) =>
        cb(null, path.join(__dirname, '..', 'uploads', 'images')),
});

const imageFileFilter = (req, file, cb) =>
    RegExp(/^image\//).test(file.mimetype) ? cb(null, true) : cb(null, false);

const videoStorage = multer.diskStorage({
    filename: (req, file, cb) =>
        cb(null, getHashedFilename(file.originalname || file.filename)),
    destination: (req, file, cb) =>
        cb(null, path.join(__dirname, '..', 'uploads', 'videos')),
});

const videoFileFilter = (req, file, cb) =>
    RegExp(/^video\//).test(file.mimetype) ? cb(null, true) : cb(null, false);

exports.uploadImage = multer({
    storage: imageStorage,
    fileFilter: imageFileFilter,
}).single('image');

exports.uploadVideo = multer({
    storage: videoStorage,
    fileFilter: videoFileFilter,
}).single('video');
