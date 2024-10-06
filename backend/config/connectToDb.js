const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CLOUD_URI);
    console.log("connecté à MongoDB!");
  } catch (error) {
    console.log("Connection échouer à MongoDB!", error);
  }
};
