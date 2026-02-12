import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { Event } from "@/lib/types";

const events: Event[] = [
  {
    id: 1,
    title: "Hackathon 2024",
    date: "2026-03-13",
    image: "/images/event1.png",
    slug: "hackathon-2024",
    location: "San Francisco",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Dev Meetup",
    date: "2027-10-20",
    image: "/images/event2.png",
    slug: "dev-meetup",
    location: "New York",
    time: "2:00 PM",
  },
  {
    id: 3,
    title: "Tech Conference",
    date: "2027-11-15",
    image: "/images/event3.png",
    slug: "tech-conference",
    location: "Los Angeles",
    time: "2:00 PM",
  },
  {
    id: 4,
    title: "Startup Pitch Night",
    date: "2027-12-05",
    image: "/images/event4.png",
    slug: "startup-pitch-night",
    location: "Austin",
    time: "6:00 PM",
  },
  {
    id: 5,
    title: "Dev Meetup",
    date: "2028-01-20",
    image: "/images/event5.png",
    slug: "dev-meetup",
    location: "Egypt",
    time: "7:00 PM",
  },
  {
    id: 6,
    title: "Startup Pitch Night",
    date: "2027-10-20",
    image: "/images/event6.png",
    slug: "startup-pitch-night",
    location: "New York",
    time: "2:00 PM",
  },
];

export default function Home() {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can&lsquo;t Miss
      </h1>
      <p className="text-center mt-5">{`Hackathons, Meetups, and Conferences, All in One Place`}</p>
      <ExploreBtn />
      {/*  */}
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
/**
 * routegroup: (group) > /route
 * it's used to group routes without affecting the URL structure
 * for example, you can have a routegroup called "profile" and inside it, you can have routes like "/profile/settings" and "/profile/history"
 * but the URL will still be "/settings" and "/history"
 * this is useful for organizing your code and keeping related routes together
 */
/**
 * "use cache" directive is used to enable caching for a route or a component
 * when you use "use cache" in a route, the response from that route will be cached and served from the cache for subsequent requests
 * this can improve performance and reduce server load for routes that return the same data for multiple requests
 * you can also use "use cache" in a component to cache the rendered output of that component
 * this can be useful for components that are expensive to render and don't change often
 * when you use "use cache" in a component, the rendered output of that component will be cached and served from the cache for subsequent renders
 * this can improve performance and reduce server load for components that are expensive to render and don't change often
 *
 * cacheLife is a function that allows you to specify the cache duration for a route or a component
 * you can use cacheLife to set a specific duration for how long the response or rendered output should be cached
 * for example, you can set cacheLife to 60 seconds to cache the response or rendered output for 60 seconds before it is considered stale and needs to be revalidated
 * this can be useful for routes or components that return data that changes frequently and you want to ensure that the cache is updated regularly
 * you can also use cacheLife to set a specific duration for how long the response or rendered output should be cached before it is considered stale and needs to be revalidated
 * this can be useful for routes or components that return data that changes frequently and you want to ensure that the cache is updated regularly
 */
/**
 * cacheLife => when to clear
 * cacheTage => what to clear
 */
