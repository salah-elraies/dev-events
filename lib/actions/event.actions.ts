"use server";

import { Event, IEvent } from "@/database";
import connectToDatabase from "../mongodb";

export const getSimilarEventsBySlug: (
  slug: string,
) => Promise<IEvent[]> = async (slug: string) => {
  try {
    await connectToDatabase();
    const event = await Event.findOne({ slug });
    return (
      JSON.parse(
        JSON.stringify(
          await Event.find({
            _id: { $ne: event?._id },
            tags: { $in: event?.tags || [] },
          })
            .limit(5)
            .lean(),
        ),
      ) || []
    );
  } catch (error) {
    console.error("Error fetching similar events:", error);
    return [];
  }
};
