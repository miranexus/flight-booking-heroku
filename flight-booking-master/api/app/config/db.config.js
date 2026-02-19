module.exports = {
  HOST: process.env.DB_HOST || "50.6.161.1",
  USER: process.env.DB_USER || "sktmfgte_miranexus",
  PASSWORD: process.env.DB_PASSWORD || "Urumqi@!#781",
  DB: process.env.DB_NAME || "sktmfgte_miranexus",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
