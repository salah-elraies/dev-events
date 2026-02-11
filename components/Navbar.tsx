import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>DevEvents</p>
        </Link>
        <ul>
          <Link href="/" className="hover:underline">
            Home
          </Link>

          <Link href="/events" className="hover:underline">
            Events
          </Link>

          <Link href="/create-event" className="hover:underline">
            Create Event
          </Link>
        </ul>
      </nav>
    </header>
  );
}
