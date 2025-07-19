// controllers/bookingController.js
import mongoose from "mongoose";
import Booking from "../models/Booking.js";

// Create booking
export const createBooking = async (req, res) => {
  try {
    const { tourId, bookAt } = req.body;

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tourId format",
      });
    }

    const newBooking = new Booking({
      ...req.body,
      bookAt: new Date(bookAt),
    });

    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      message: "Successfully created booking",
      data: savedBooking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking. Error: " + error.message,
    });
  }
};

// Get bookings for a specific user
export const getUserBookings = async (req, res) => {
  const userId = req.params.userId;
  console.log("🔥 Hit GET /book/:userId with", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid userId format",
    });
  }

  try {
    const bookings = await Booking.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    
    res.status(200).json({
      success: true,
      message: "Successfully fetched bookings for the user",
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching bookings",
    });
  }
};
