const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("MONGO_URI existe:", !!process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
  }
};

module.exports = connectDB;
