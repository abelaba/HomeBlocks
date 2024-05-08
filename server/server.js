const app = require('./app');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const main = () => {
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
  const CLOUDINARY_APP_SECRET = process.env.CLOUDINARY_APP_SECRET;

  try {
    cloudinary.v2.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_APP_SECRET,
      secure: true,
    });

    // * CONNECT TO DB
    mongoose
      .connect(process.env.DB_connect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log('*** DATABASE HAS CONNECTED SUCCESSFULLY');
      })
      .catch((error) => {
        console.log('Error connecting to database:', error.message);
        process.exit(1);
      });

    const PORT = process.env.PORT;

    // * SERVER START
    app.listen(PORT, async () => {
      console.log(`*** SERVER IS RUNNING ON PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

main();
