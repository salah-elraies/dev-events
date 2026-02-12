import mongoose, { Schema, Document, Model, Types } from "mongoose";
import Event from "./event.model";

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Email validation regex pattern (RFC 5322 simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true, // Index for faster event-based queries
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => EMAIL_REGEX.test(value),
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true, // Auto-generates createdAt and updatedAt
  }
);

// Pre-save hook to verify that referenced event exists
BookingSchema.pre("save", async function () {
  // Only validate eventId if it's new or modified
  if (this.isModified("eventId")) {
    const eventExists = await Event.exists({ _id: this.eventId });

    if (!eventExists) {
      throw new Error(`Event with ID ${this.eventId} does not exist`);
    }
  }
});

// Prevent model recompilation in development with hot reload
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
