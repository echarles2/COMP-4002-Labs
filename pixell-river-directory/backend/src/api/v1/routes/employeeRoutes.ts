import { Router } from "express";
import { getDepartments, createEmployee } from "../controllers/employeeController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/", getDepartments);
router.post("/", requireAuth, createEmployee);

export default router;