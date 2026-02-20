const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve static Angular files in production
if (process.env.NODE_ENV === 'production') {
  const fs = require('fs');
  const candidates = [
    path.join(__dirname, '../dist/flight-booking/browser/index.html'),
    path.join(__dirname, '../dist/flight-booking/index.html'),
    path.join(__dirname, '../dist/index.html'),
    path.join(process.cwd(), 'dist/flight-booking/browser/index.html'),
    path.join(process.cwd(), 'dist/flight-booking/index.html'),
    path.join(process.cwd(), 'dist/index.html')
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

  if (foundIndex) {
    app.use(express.static(staticPath));
    app.get('*', (req, res) => {
      res.sendFile(foundIndex, (err) => {
        if (err) {
          console.error('Error serving index file:', err?.message || err);
          res.status(404).send('Not found');
        }
      });
    });
  } else {
    console.warn('Warning: No Angular build found in expected locations');
  }
}

const db = require("./app/models")

console.log("[STARTUP] Database configuration loaded from environment variables");

db.sequelize.sync()
  .then(() => {
    console.log("[DB] Synced db.");
    // Seed data if table is empty
    return db.seedData();
  })
  .then((result) => {
    console.log("[DB] Database initialization complete:", result.message);
  })
  .catch((err) => {
    console.error("[DB ERROR] Failed to sync db: " + err.message);
    console.error("[DB ERROR] Stack trace:", err.stack);
    console.error("[DB ERROR] Note: Database connection may be restricted from Heroku.");
    console.error("[DB ERROR] You can manually seed data via POST /api/seed endpoint once connection is fixed.");
  });

// Manual seed endpoint - allows triggering seed after connection is restored
app.post("/api/seed", async (req, res) => {
  try {
    const result = await db.seedData();
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  db.sequelize.authenticate()
    .then(() => {
      res.json({ status: "ok", database: "connected" });
    })
    .catch((err) => {
      res.status(503).json({ status: "error", database: "disconnected", message: err.message });
    });
});

// ...existing code...

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
