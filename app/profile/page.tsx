import Link from "next/link";

export default async function Profile() {
  // fetching data from an API on server side
  // const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  // if (!response.ok) {
  //   throw new Error("Failed to fetch user data");
  // }
  // const user = await response.json();
  // console.log(user);
  return (
    <div>
      <ul className="list-disc list-inside mt-4">
        <li className="text-center">
          <Link href="/profile/123">View Profile</Link>
        </li>
        <li className="text-center">
          <Link href="/profile/456">View Profile</Link>
        </li>
        <li className="text-center">
          <Link href="/profile/789">View Profile</Link>
        </li>
        <li className="text-center">
          <Link href="/profile/000">View Profile</Link>
        </li>
      </ul>
    </div>
  );
}
