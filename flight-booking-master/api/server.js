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

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
    // Seed data if table is empty
    return db.seedData();
  })
  .then(() => {
    console.log("Database initialization complete.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
    console.log("Note: Database connection may be restricted. Check database host permissions.");
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
