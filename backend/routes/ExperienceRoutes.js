import { Router } from "express";
import { getExperienceDetails, getExperiences } from "../controllers/ExperienceControllers.js";

export const experienceRouter = Router();


// GET /api/experiences - Get all experiences with pagination and search
experienceRouter.get("/", getExperiences);

// GET /api/experiences/:id - Get single experience with details
experienceRouter.get("/:id", getExperienceDetails);

