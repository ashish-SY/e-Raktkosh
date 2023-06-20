const { log, error } = require("console");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/Blood_Management_new",
      {
        //userNewUrlParser: true,
        // userUnifiedTopology: true,
        // useFindAndModify: true,
      }
    );

    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
