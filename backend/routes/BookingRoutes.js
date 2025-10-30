import { Router } from "express";
import { createBooking, getBookingByEmail } from "../controllers/BookingControllers.js";

export const bookingRouter = Router();


// POST /api/bookings - Create a new booking
bookingRouter.post("/", createBooking);

// GET /api/bookings/:email - Get bookings by email
bookingRouter.get("/:email", getBookingByEmail);
