const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Could not connect to MongoDB...', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDatabase;
