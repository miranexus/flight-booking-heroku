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

  console.log('Checking candidate index.html locations:');
  for (const p of candidates) {
    try {
      const exists = fs.existsSync(p);
      console.log(`${p} -> ${exists}`);
      if (exists && !foundIndex) {
        foundIndex = p;
        staticPath = path.dirname(p);
      }
    } catch (e) {
      console.log(`Error checking ${p}: ${e.message}`);
    }
  }

  if (!foundIndex) {
    console.warn('No Angular index.html found in expected locations. Searching /app for any dist/**/index.html...');

    // recursive search under process.cwd() for an index.html inside a dist folder (depth-limited)
    function findIndexUnderDist(dir, depth) {
      if (depth > 5) return null;
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const e of entries) {
          const full = path.join(dir, e.name);
          if (e.isFile() && e.name === 'index.html' && full.includes(path.sep + 'dist' + path.sep)) {
            return full;
          }
        }
        for (const e of entries) {
          if (e.isDirectory()) {
            const res = findIndexUnderDist(path.join(dir, e.name), depth + 1);
            if (res) return res;
          }
        }
      } catch (err) {
        // ignore permission errors
      }
      return null;
    }

    const autoFound = findIndexUnderDist(process.cwd(), 0);
    if (autoFound) {
      foundIndex = autoFound;
      staticPath = path.dirname(foundIndex);
      console.log(`Auto-found index at: ${foundIndex}`);
    } else {
      // try deeper search in the Heroku slug root if needed
      try {
        const slugRoot = '/app';
        console.log(`Searching slug root ${slugRoot} for any index.html (depth 8)...`);
        function findAnyIndex(dir, depth) {
          if (depth > 8) return null;
          try {
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const e of entries) {
              const full = path.join(dir, e.name);
              if (e.isFile() && e.name === 'index.html') return full;
            }
            for (const e of entries) {
              if (e.isDirectory()) {
                const res = findAnyIndex(path.join(dir, e.name), depth + 1);
                if (res) return res;
              }
            }
          } catch (err) {
            // ignore
          }
          return null;
        }
        const anyIndex = findAnyIndex(slugRoot, 0);
        if (anyIndex) {
          foundIndex = anyIndex;
          staticPath = path.dirname(foundIndex);
          console.log(`Found index anywhere in slug: ${foundIndex}`);
        }
      } catch (err) {
        // ignore
      }
    }
  }

  console.log(`Selected staticPath: ${staticPath}`);
  console.log(`Selected index file: ${foundIndex}`);

  // If selected index doesn't exist but a browser subfolder does, try that
  try {
    if (!fs.existsSync(foundIndex)) {
      const browserIndex = path.join(staticPath, 'browser', 'index.html');
      if (fs.existsSync(browserIndex)) {
        foundIndex = browserIndex;
        staticPath = path.dirname(browserIndex);
        console.log(`Falling back to browser index: ${foundIndex}`);
      } else {
        // log directory listing to aid debugging
        try {
          const listing = fs.readdirSync(staticPath);
          console.log(`Directory listing of ${staticPath}:`, listing);
        } catch (e) {
          console.log(`Could not read directory ${staticPath}: ${e.message}`);
        }
      }
    }
  } catch (e) {
    console.log(`Error during fallback checks: ${e.message}`);
  }

  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.sendFile(foundIndex, (err) => {
      if (err) {
        console.error('Error serving index file:', err && err.message ? err.message : err);
        res.status(404).send('Not found');
      }
    });
  });
}

const db = require("./app/models")

console.log("[STARTUP] Database configuration:");
console.log(`  HOST: ${process.env.DB_HOST || "50.6.161.1"}`);
console.log(`  DATABASE: ${process.env.DB_NAME || "sktmfgte_miranexus"}`);
console.log(`  USER: ${process.env.DB_USER || "sktmfgte_miranexus"}`);

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
