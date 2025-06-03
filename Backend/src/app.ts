import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { createExpressServer, useContainer } from "routing-controllers";
import swaggerUi from "swagger-ui-express";
import Container from "typedi";
import authenticateDB from "./config/configDb";
import { ConfigSwagger } from "./config/swagger";
import { ControllerDependencies } from "./controllers/controllerDependencies";
import { initializeMappers } from "./services/mapper/mapperInitialize";
import { registerRepositories } from "./repositories/injectRepository";
import { registerServices } from "./services/injectServices";

// configures dotenv to work in your application
const app: Express = createExpressServer(ControllerDependencies);

// Configurar el container
useContainer(Container);

registerRepositories();
registerServices();

const port = 5000;
dotenv.config();

// MIDDLEWARE
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(bodyParser.json());

// inicializar los mappers
initializeMappers();

const swagger = ConfigSwagger(ControllerDependencies);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.get("/", function (req, res) {
  const response = { message: "Hola mundo", swagger: swagger };
  res.json(response);
});

// Autenticar la base de datos antes de iniciar el servidor
authenticateDB().then(() => {
  app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
    console.log(`Open API swagger on http://localhost:${port}/docs`);
  });
});
