import express from "express";
import "dotenv/config";
import RecipesRouter from "./routes/RecipesRoutes.js";
import cors from "cors";
import UsersRouter from "./routes/UserRoutes.js";
import AuthRouter from "./routes/AuthRoutes.js";
import { sequelize } from "./config/database.js";
import { applyAssociations } from "./models/associations.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { upload } from "./controllers/multer.js";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Recipe and User API",
      version: "1.0.0",
      description: "API for managing users and their recipes",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/RecipesRoutes.js", "./routes/UserRoutes.js", "./routes/AuthRoutes.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
fs.mkdirSync("uploads", { recursive: true });
app.use("/uploads", express.static("uploads"));

app.get(`/`, (request, response) => {
  response.json("Welcome to my recipies API");
});

app.use("/api", RecipesRouter, UsersRouter, AuthRouter);

app.listen(PORT, async () => {
  console.log("Server is listening on port 3000");
  try {
    await sequelize.authenticate();
    console.log("Successfully established connection with DB");
    applyAssociations();
    await sequelize.sync({ alter: true });
  } catch (err) {
    return console.log(err);
  }
});
