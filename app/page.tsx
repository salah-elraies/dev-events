import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";

// , {
//   cache: "force-cache",
// }
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export default async function Home() {
  const res = await fetch(`${BASE_URL}/api/events?featured=true`);
  const { events } = await res.json();
  // const events: IEvent[] = []; // Placeholder for events, replace with actual data fetching logic
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
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event._id.toString()}>
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
