import Profile from "@/components/EditProfile";
import Link from "next/link";

export default async function Account() {
  return (
    <main>
      <h2>User Details</h2>
      <Link href="/account/edit">Edit Details</Link>
    </main>
  );
}
