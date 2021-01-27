const { v4: uuidv4 } = require('uuid');

exports.getHashedFilename = (originalname) => {
    try {
        const chunks = originalname.split('.');
        const extension = chunks[chunks.length - 1];
        return `${uuidv4()}.${extension}`;
    } catch (err) {
        console.log({ error: err });
        return originalname;
    }
};
