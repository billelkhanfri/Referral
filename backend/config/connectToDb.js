const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CLOUD_URI
    );
    console.log("Connecté à MongoDB!");
  } catch (error) {
    console.log("Connection échouée à MongoDB!", error);
  }
};
