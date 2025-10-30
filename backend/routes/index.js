//Main Router for different routes

import { Router  } from "express";
import { experienceRouter } from "./ExperienceRoutes.js";
import { bookingRouter } from "./BookingRoutes.js";
import { promoRouter } from "./PromoRoute.js";

export const mainRouter = Router();

mainRouter.use("/experiences",experienceRouter);
mainRouter.use("/bookings",bookingRouter);
mainRouter.use("/promo",promoRouter);

