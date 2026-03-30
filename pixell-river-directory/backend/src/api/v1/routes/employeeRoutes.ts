import { Router } from "express";
import { getDepartments, createEmployee } from "../controllers/employeeController";

var router = Router();

router.get("/", getDepartments);
router.post("/", createEmployee);

export default router;