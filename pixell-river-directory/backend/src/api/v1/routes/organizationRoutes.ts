import { Router } from "express";
import { getRoles, createOrgEntry } from "../controllers/organizationController";

var router = Router();

router.get("/", getRoles);
router.post("/", createOrgEntry);

export default router;