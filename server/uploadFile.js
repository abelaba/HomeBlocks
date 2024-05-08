const cloudinary = require('cloudinary');

const uploadFile = (file) => {
  return cloudinary.v2.uploader.upload(
    file,
    { resource_type: 'auto' },
    (error, result) => {
      if (error) {
        throw new Error(error.message);
      }
    },
  );
};

module.exports = uploadFile;