import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user/model/userModel";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [User],
  logging: false,
});

const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida correctamente.");
    await sequelize.sync(); // esto crea las tablas si no existen
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
};

export default authenticateDB;
