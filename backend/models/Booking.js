// models/Booking.js
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userEmail: {
    type: String,
    required: true,
  },
  tourId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Tour",
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  guestSize: {
    type: Number,
    required: true,
  },
  bookAt: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);
