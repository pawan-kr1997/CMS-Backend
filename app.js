import express from "express";
import "dotenv/config";
import { formRoutes } from "./routes/FormRoutes.js";
import { connectToDatabase } from "./helpers/DatabaseHelper.js";
import cors from "cors";

import FormDetail from "./models/FormDetail.js";
import { apiError } from "./helpers/LogHelper.js";
import { dashboardRoutes } from "./routes/DashboardRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
await connectToDatabase();

// Basic route
app.use("/", formRoutes);
app.use("/", dashboardRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  return apiError(
    err.message ? String(err.message) : String(err),
    res,
    {},
    err.code ? err.code : 500
  );
});

FormDetail.sync({ alter: true });
