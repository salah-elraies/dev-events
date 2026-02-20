"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import { useState } from "react";

export default function BookEvent({
  eventId,
  slug,
}: {
  eventId: string;
  slug: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const { success, error } = await createBooking({
      eventId,
      email,
      slug,
    });
    if (success) {
      setSubmitted(true);
    } else {
      console.error("Failed to create booking:", error);
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for Signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Adress</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
            <button
              type="submit"
              className="button-submit"
              onClick={() => setSubmitted(true)}
            >
              Submitt
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
