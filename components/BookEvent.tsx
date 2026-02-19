"use client";

import { useState } from "react";

export default function BookEvent() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend or an API
    console.log("Email submitted:", email);
    setSubmitted(true);
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
