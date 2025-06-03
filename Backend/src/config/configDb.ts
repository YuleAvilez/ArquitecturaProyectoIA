import "reflect-metadata";
import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { ModelsDependencies } from "../models/modelsDependencies";

dotenv.config();

export const connection = new Sequelize({
  host: process.env.DBHOST,
  port: Number(process.env.DBPORT),
  dialect: "mysql",
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBASE,
  models: [...ModelsDependencies],
});

// Función para autenticar
export const authenticateDB = async () => {
  try {
    await connection.authenticate();
    // connection.sync({ alter: true });
    console.log("La conexión ha sido establecida exitosamente. ⚡");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
};

export default authenticateDB;
