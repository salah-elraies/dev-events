"use server";
import { Booking } from "@/database";
import connectToDatabase from "../mongodb";

export const createBooking = async (data: {
  eventId: string;
  email: string;
  slug: string;
}) => {
  try {
    await connectToDatabase();
    await Booking.create(data);
    return { success: true };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: "Failed to create booking" };
  }
};
