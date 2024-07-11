import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./src/routes/auth.js";
import organisationRouter from "./src/routes/organisation.js";
import bodyParser from "body-parser";
import { createUserTable } from "./model/user.js";
import { createOrganisationTable, createUserOrganisationTable } from "./model/organisation.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { welcomeMessage } from "./src/helpers/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 6200;

// Middleware
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.get("/", welcomeMessage);


// Routes
app.use("/api", authRouter);
app.use("/api/organisations", organisationRouter);

app.use(errorHandler);

//
const syncDb = async () => {
  try {
    await createUserTable();
    await createOrganisationTable();
    await createUserOrganisationTable();
    console.log('Database tables created successfully.');
  } catch (error) {
    console.error('Error creating database tables:', error);
  }
};

syncDb();


app.listen(port, () => {
  console.log(`HNG server listening on port ${port}`);
});





