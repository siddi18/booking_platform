//Booking Controllers 

import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";

// Helper function to generate booking reference
function generateBookingRef() {
  const prefix = 'HUF';
  const random = Math.floor(10000 + Math.random() * 90000);
  const letters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                  String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${prefix}${random}${letters}`;
}


// Promo codes configuration
const PROMO_CODES = {
  'SAVE10': { type: 'percentage', value: 10 },
  'FLAT100': { type: 'flat', value: 100 },
  'WELCOME': { type: 'percentage', value: 15 },
  'ADVENTURE20': { type: 'percentage', value: 20 }
};



//Create a new booking for a user
export const createBooking = async (req, res) => {
  try {
    const { experienceId, fullName, email, date, time, quantity, promoCode } =
      req.body;

    // Validation
    if (!experienceId || !fullName || !email || !date || !time || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Get experience
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Check if user already has a booking for this experience, date, and time
    const existingBooking = await Booking.findOne({
      email: email.toLowerCase(),
      experienceId,
      date,
      time,
      status: { $ne: "cancelled" },
    });

    if (existingBooking) {
      return res.status(400).json({
        message:
          "You have already booked this experience for the selected date and time",
        existingBooking: existingBooking.bookingRef,
      });
    }

    // Find the slot and check availability
    const slot = experience.slots.find((s) => s.date === date);
    if (!slot) {
      return res
        .status(400)
        .json({ message: "Selected date is not available" });
    }

    const timeSlot = slot.times.find((t) => t.time === time);
    if (!timeSlot) {
      return res
        .status(400)
        .json({ message: "Selected time is not available" });
    }

    const availableSpots = timeSlot.available - timeSlot.booked;
    if (availableSpots < quantity) {
      return res.status(400).json({
        message: `Only ${availableSpots} spots available for this time slot`,
      });
    }

    // Calculate pricing
    const subtotal = experience.price * quantity;
    let discount = 0;

    // Apply promo code if provided
    if (promoCode) {
      const promo = PROMO_CODES[promoCode.toUpperCase()];
      if (promo) {
        if (promo.type === "percentage") {
          discount = (subtotal * promo.value) / 100;
        } else if (promo.type === "flat") {
          discount = promo.value;
        }
      }
    }

    const afterDiscount = subtotal - discount;
    const taxes = Math.round(afterDiscount * 0.05); // 5% tax
    const total = afterDiscount + taxes;

    // Generate booking reference
    const bookingRef = generateBookingRef();

    // Create booking
    const booking = new Booking({
      experienceId,
      experienceName: experience.title,
      fullName,
      email: email.toLowerCase(),
      date,
      time,
      quantity,
      promoCode: promoCode?.toUpperCase() || null,
      discount,
      subtotal,
      taxes,
      total,
      bookingRef,
      status: "confirmed",
    });

    await booking.save();

    // Update slot availability
    timeSlot.booked += quantity;
    await experience.save();

    res.status(201).json({
      message: "Booking confirmed successfully",
      booking: {
        bookingRef: booking.bookingRef,
        experienceName: booking.experienceName,
        date: booking.date,
        time: booking.time,
        quantity: booking.quantity,
        total: booking.total,
      },
    });
  } catch (error) {
    console.error("Booking error:", error);
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
  }
}


//get a bookings related to an email
export const getBookingByEmail = async (req, res) => {
  try {
    const bookings = await Booking.find({
      email: req.params.email.toLowerCase(),
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
}