const { Sequelize } = require("sequelize");
require("dotenv/config");

module.exports = connectToDb = async () => {
    const sequelize = new Sequelize({
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PWD,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };