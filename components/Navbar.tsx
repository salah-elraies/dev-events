"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

export default function Navbar() {
  const handleNavClick = (linkName: string, href: string) => {
    posthog.capture("nav_link_clicked", {
      link_name: linkName,
      link_href: href,
    });
  };

  return (
    <header>
      <nav>
        <Link
          href="/"
          className="logo"
          onClick={() => handleNavClick("Logo", "/")}
        >
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>DevEvents</p>
        </Link>
        <ul>
          <Link
            href="/"
            className="hover:underline"
            onClick={() => handleNavClick("Home", "/")}
          >
            Home
          </Link>

          <Link
            href="/events"
            className="hover:underline"
            onClick={() => handleNavClick("Events", "/events")}
          >
            Events
          </Link>

          <Link
            href="/create-event"
            className="hover:underline"
            onClick={() => handleNavClick("Create Event", "/create-event")}
          >
            Create Event
          </Link>
        </ul>
      </nav>
    </header>
  );
}
