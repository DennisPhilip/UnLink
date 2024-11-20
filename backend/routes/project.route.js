import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getProjects, createProject, deleteProject, getProjectsById } from "../controllers/project.controller.js";


const router = express.Router();

router.get("/", protectRoute, getProjects);
router.post("/create", protectRoute, createProject);
router.delete("/delete/:id", protectRoute, deleteProject);
router.get("/:id", protectRoute, getProjectsById);

export default router