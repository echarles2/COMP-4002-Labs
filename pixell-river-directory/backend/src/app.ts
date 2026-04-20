import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import organizationRoutes from "./api/v1/routes/organizationRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger";

const app = express();

app.use(clerkMiddleware());

app.use(cors({
  origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/employees", employeeRoutes);
app.use("/organization", organizationRoutes);

export default app;