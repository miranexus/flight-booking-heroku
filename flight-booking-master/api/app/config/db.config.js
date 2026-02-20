module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // Connection retry and timeout settings
  connect_timeout: 10000,
  connectionLimit: 5,
  waitForConnections: true,
  queueLimit: 0
};
