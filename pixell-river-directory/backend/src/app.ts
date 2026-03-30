import express from "express";
import cors from "cors";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import organizationRoutes from "./api/v1/routes/organizationRoutes";

var app = express();

app.use(cors({
  origin: ["http://localhost:5173"]
}));

app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/organization", organizationRoutes);

export default app;