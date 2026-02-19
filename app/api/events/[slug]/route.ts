import { Event } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Type for dynamic route params
type RouteParams = {
  params: Promise<{ slug: string }>;
};

// Slug validation regex: lowercase letters, numbers, and hyphens only
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Validates slug format.
 * Returns error message if invalid, null if valid.
 */
function validateSlug(slug: string): string | null {
  if (!slug || typeof slug !== "string") {
    return "Slug parameter is required";
  }

  const trimmed = slug.trim();
  if (trimmed.length === 0) {
    return "Slug cannot be empty";
  }

  if (trimmed.length > 200) {
    return "Slug exceeds maximum length of 200 characters";
  }

  if (!SLUG_PATTERN.test(trimmed)) {
    return "Invalid slug format. Use lowercase letters, numbers, and hyphens only";
  }

  return null;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug.
 */
export async function GET(
  _request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    // Extract slug from params
    const { slug } = await params;

    // Validate slug format
    const validationError = validateSlug(slug);
    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Query event by slug
    const event = await Event.findOne({ slug: slug.trim() }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${slug}' not found` },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching event by slug:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
