import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    mode: {
      type: String,
      required: [true, "Mode is required"],
      enum: {
        values: ["online", "offline", "hybrid"],
        message: "Mode must be online, offline, or hybrid",
      },
    },
    audience: {
      type: String,
      required: [true, "Audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Agenda is required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "Agenda must have at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "Tags must have at least one item",
      },
    },
  },
  {
    timestamps: true, // Auto-generates createdAt and updatedAt
  },
);

/**
 * Generates a URL-friendly slug from a string.
 * Converts to lowercase, replaces spaces/special chars with hyphens.
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Normalizes date string to ISO format (YYYY-MM-DD).
 * Throws error if date is invalid.
 */
function normalizeDate(dateStr: string): string {
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  return parsed.toISOString().split("T")[0];
}

/**
 * Normalizes time to HH:MM format (24-hour).
 * Accepts various formats like "2:30 PM", "14:30", "2:30pm".
 */
function normalizeTime(timeStr: string): string {
  const trimmed = timeStr.trim().toLowerCase();

  // Match patterns like "2:30 pm", "14:30", "2:30"
  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/i);
  if (!match) {
    throw new Error(`Invalid time format: ${timeStr}`);
  }

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3];

  // Convert 12-hour to 24-hour format
  if (period === "pm" && hours < 12) {
    hours += 12;
  } else if (period === "am" && hours === 12) {
    hours = 0;
  }

  if (hours < 0 || hours > 23) {
    throw new Error(`Invalid hour value: ${hours}`);
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

// Pre-save hook for slug generation and date/time normalization
EventSchema.pre("save", async function () {
  // Generate slug only if title is new or modified
  if (this.isModified("title")) {
    const baseSlug = generateSlug(this.title);
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug uniqueness by appending counter if needed
    const EventModel = this.constructor as Model<IEvent>;
    while (await EventModel.exists({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }

  // Normalize date to ISO format if modified
  if (this.isModified("date")) {
    this.date = normalizeDate(this.date);
  }

  // Normalize time to HH:MM format if modified
  if (this.isModified("time")) {
    this.time = normalizeTime(this.time);
  }
});

// Prevent model recompilation in development with hot reload
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
