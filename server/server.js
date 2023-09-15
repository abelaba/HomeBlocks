const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// * CONNECT TO DB
mongoose.connect(
  process.env.DB_connect,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("*** DATABASE HAS CONNECTED SUCCESSFULLY");
  }
);

const PORT = process.env.PORT || 5000;

// * SERVER START
app.listen(PORT, () => {
  console.log(`*** SERVER IS RUNNING ON PORT ${PORT}`);
});
