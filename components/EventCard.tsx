"use client";

import { IEvent } from "@/database";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

export default function EventCard({
  _id,
  title,
  slug,
  location,
  date,
  time,
  image,
}: IEvent) {
  const handleClick = () => {
    posthog.capture("event_card_clicked", {
      event_id: _id,
      event_title: title,
      event_slug: slug,
      event_location: location,
      event_date: date,
    });
  };

  return (
    <Link
      href={`/events/${slug}`}
      className="event-card"
      id={_id.toString()}
      onClick={handleClick}
    >
      <Image
        src={image}
        alt={title}
        className="poster"
        width={410}
        height={300}
      />

      <div className="flex flex-row gap-2">
        <Image src={"/icons/pin.svg"} alt="location" width={14} height={14} />
        <p>{location}</p>
      </div>
      <p className="title">{title}</p>

      <div className="datetime">
        <div>
          <Image
            src={"/icons/calendar.svg"}
            alt="date"
            width={14}
            height={14}
          />
          <p>{date}</p>
        </div>
        <div>
          <Image src={"/icons/clock.svg"} alt="time" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
}
