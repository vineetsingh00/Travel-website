// routes/booking.js
import express from "express";
import {
  createBooking,
  getUserBookings
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/:userId", getUserBookings); // GET bookings by user ID

export default router;
