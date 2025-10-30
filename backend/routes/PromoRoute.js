import { Router } from "express";
import { validatePromoCode } from "../controllers/PromoControllers.js";

export const promoRouter = Router();

// POST /api/promo/validate - Validate promo code
promoRouter.post("/validate", validatePromoCode);