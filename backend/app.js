const express = require("express");
const connectToDb = require("./config/connectToDb");
require("dotenv").config();

// Connexion à la base de donnée
connectToDb();

// Init app
const app = express();

// Middlewares
app.use(express.json());

//routes

app.use("/api/auth", require("./routes/authRoute"));

// Running The server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Serveur tourne en mode ${process.env.NODE_ENV} sur le port ${PORT}`
  )
);
