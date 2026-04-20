import { Router } from "express";
import { getRoles, createOrgEntry } from "../controllers/organizationController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/", getRoles);
router.post("/", requireAuth, createOrgEntry);

export default router;