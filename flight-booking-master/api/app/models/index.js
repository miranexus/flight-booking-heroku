const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: (msg) => console.log("[DB LOG]:", msg),
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.primeNgData = require("./prime-ng-data.model.js")(sequelize, Sequelize);

// Seed data function with enhanced error handling
db.seedData = async () => {
  try {
    console.log("[SEED] Starting database seed operation...");

    const count = await db.primeNgData.count();
    console.log(`[SEED] Current record count: ${count}`);

    // Only seed if table is empty
    if (count === 0) {
      const sampleData = [
        {
          title: "Flight Booking System",
          description: "A comprehensive flight booking application with real-time availability",
          published: true
        },
        {
          title: "Seat Selection",
          description: "Interactive seat map for selecting preferred seats",
          published: true
        },
        {
          title: "Payment Processing",
          description: "Secure payment gateway integration for multiple payment methods",
          published: true
        },
        {
          title: "Booking Confirmation",
          description: "Email confirmation with e-ticket and booking details",
          published: true
        },
        {
          title: "Passenger Management",
          description: "Manage passenger information and special requirements",
          published: true
        }
      ];

      console.log("[SEED] Inserting sample data...");
      const result = await db.primeNgData.bulkCreate(sampleData);
      console.log(`[SEED] Successfully seeded ${result.length} records into database.`);
      return { success: true, message: `Seeded ${result.length} records`, recordsAdded: result.length };
    } else {
      console.log(`[SEED] Database already contains ${count} records, skipping seed.`);
      return { success: true, message: `Database already has ${count} records`, recordsAdded: 0 };
    }
  } catch (err) {
    console.error("[SEED] Error seeding database:", err.message);
    console.error("[SEED] Full error:", err);
    return { success: false, message: `Error seeding database: ${err.message}`, error: err.message };
  }
};

module.exports = db;
