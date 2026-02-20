const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

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

// Seed data function
db.seedData = async () => {
  try {
    const count = await db.primeNgData.count();

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

      await db.primeNgData.bulkCreate(sampleData);
      console.log("Database seeded with sample data successfully.");
    } else {
      console.log(`Database already contains ${count} records, skipping seed.`);
    }
  } catch (err) {
    console.error("Error seeding database:", err.message);
  }
};

module.exports = db;
