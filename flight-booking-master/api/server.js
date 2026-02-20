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
  const fs = require('fs');
  const candidates = [
    path.join(__dirname, '../dist/flight-booking/index.html'),
    path.join(__dirname, '../dist/flight-booking/browser/index.html'),
    path.join(__dirname, '../dist/index.html'),
    path.join(process.cwd(), 'dist/flight-booking/index.html'),
    path.join(process.cwd(), 'dist/flight-booking/browser/index.html'),
    path.join(process.cwd(), 'dist/index.html'),
    path.join(process.cwd(), 'flight-booking-master/dist/flight-booking/index.html'),
    path.join(process.cwd(), 'flight-booking-master/dist/index.html')
  ];

  let foundIndex = null;
  let staticPath = null;

  for (const p of candidates) {
    if (fs.existsSync(p)) {
      foundIndex = p;
      staticPath = path.dirname(p);
      break;
    }
  }

  if (!foundIndex) {
    console.warn('No Angular index.html found in expected locations. Will still attempt to serve from ../dist/flight-booking');
    staticPath = path.join(__dirname, '../dist/flight-booking');
    foundIndex = path.join(staticPath, 'index.html');
  }

  console.log(`Serving static files from: ${staticPath}`);
  console.log(`Index file: ${foundIndex}`);
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.sendFile(foundIndex);
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
