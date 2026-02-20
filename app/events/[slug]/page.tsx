import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import Image from "next/image";
import { Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex-row-gap-2 items-center">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul className="list-disc list-inside">
        {agendaItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag, index) => (
        <div key={index} className="pill">
          {tag}
        </div>
      ))}
    </div>
  );
};

function splitAtCommaBeforePipe(str: string): string[] {
  // Remove [ and ] from the string
  const cleanedStr = str.replace(/[\[\]]/g, "");

  const parts: string[] = [];
  let current = "";

  for (let i = 0; i < cleanedStr.length; i++) {
    if (cleanedStr[i] === "," && cleanedStr.slice(i + 1).includes("|")) {
      parts.push(current);
      current = "";
    } else {
      current += cleanedStr[i];
    }
  }

  parts.push(current);
  return parts;
}

export default async function Event({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // "use cache";
  // cacheLife("hours"); // Cache for 1 hour
  const { slug } = await params;
  const res = await fetch(`${BASE_URL}/api/events/${slug}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour, then revalidate
  });
  const {
    event: {
      title,
      description,
      overview,
      date,
      time,
      location,
      mode,
      audience,
      image,
      organizer,
      tags,
      agenda,
      _id,
    },
  } = await res.json();

  const bookings = 10; // Placeholder for number of bookings, replace with actual data if available

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <Suspense fallback={<div>Loading event details...</div>}>
        <div className="header">
          <h1>Event Description</h1>
          <p className="mt-2">{description}</p>
        </div>
        <div className="details">
          {/* left side -> content */}
          <div className="content">
            <Image
              src={image}
              alt={title}
              width={800}
              height={800}
              className="banner"
              loading="lazy"
            />
            <section className="flex-col-gap-2">
              <h2>Overview</h2>
              <p>{overview}</p>
            </section>
            <section className="flex-col-gap-2">
              <h2>Event Details</h2>
              <EventDetailItem
                icon="/icons/calendar.svg"
                alt="calendar"
                label={date}
              />
              <EventDetailItem
                icon="/icons/clock.svg"
                alt="clock"
                label={time}
              />
              <EventDetailItem
                icon="/icons/pin.svg"
                alt="location"
                label={location}
              />
              <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
              <EventDetailItem
                icon="/icons/audience.svg"
                alt="audience"
                label={audience}
              />
            </section>
            <EventAgenda agendaItems={splitAtCommaBeforePipe(agenda[0])} />
            <section className="flex-col-gap-2">
              <h2>About The Organizer</h2>
              <p>{organizer}</p>
            </section>
            <EventTags tags={tags[0].replace(/\[|\]/g, "").split(",")} />
          </div>
          {/* right side -> booking form */}
          <aside className="booking">
            <div className="signup-card">
              <h2>Book Your Spot</h2>
              {bookings > 0 ? (
                <p className="text-sm">
                  Join {bookings} People Who Have Already Booked Their Spot!
                </p>
              ) : (
                <p className="text-sm">Be the first to book this event!</p>
              )}
              <BookEvent eventId={_id} slug={slug} />
            </div>
          </aside>
        </div>
      </Suspense>
      {similarEvents && (
        <div className="flex w-full flex-col gap-4 pt-20">
          <h2>Similar Events</h2>
          <div className="events">
            {similarEvents.map((event: IEvent) => (
              <EventCard key={event._id} {...event} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
