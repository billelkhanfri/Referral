const express = require("express");
const connectToDb = require("./config/connectToDb");
require("dotenv").config();
const cors = require("cors");

// Connexion à la base de donnée
connectToDb();

// Init app
const app = express();

// Middlewares
app.use(express.json());
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all methods
  allowedHeaders: "*", // Allow all headers
};

app.use(cors(corsOptions));

//routes

app.use("/api/auth", require("./routes/authRoute"));

// Running The server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Serveur tourne en mode ${process.env.NODE_ENV} sur le port ${PORT}`
  )
);
