import { Sequelize } from "sequelize";

// Configure Sequelize connection
const db = new Sequelize(
    process.env.DB_NAME || "surat_penawaran_db", // Database name
    process.env.DB_USER || "root",              // Username
    process.env.DB_PASSWORD || "react%123",     // Password
    {
        host: process.env.DB_HOST || "localhost", // Host
        dialect: "mysql",                         // Database dialect
        logging: false,                           // Disable SQL logging
    }
);

// Test the connection
db.authenticate()
    .then(() => console.log("Connected to the database successfully!"))
    .catch((err) => console.error("Unable to connect to the database:", err));

export default db;