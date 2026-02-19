import { Suspense } from "react";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfileDetails id={params.id} />
    </Suspense>
  );
}

function ProfileDetails({ id }: { id: string }) {
  return <div>Profile id: {id}</div>;
}
