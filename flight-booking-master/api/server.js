const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? '*' : "http://localhost:4200",
  credentials: true
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve static Angular files in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../dist/flight-booking');
  console.log(`Serving static files from: ${staticPath}`);
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    // Serve the standard Angular build index.html (not the `browser` subfolder)
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

const db = require("./app/models")

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to flight-booking-api." });
});

require("./app/routes/prime-ng-data.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
