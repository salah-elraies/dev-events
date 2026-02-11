import { Event } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function EventCard({
  title,
  image,
  slug,
  date,
  id,
  location,
  time,
}: Event) {
  return (
    <Link href={`/events/${slug}`} className="event-card" id={id.toString()}>
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
