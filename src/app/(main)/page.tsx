import { logout } from "@/actions/users";
import { getAuth } from "@/lib/auth";
import type { Metadata } from "next";
import Link from "next/link";

type HomeProps = Readonly<{}>;

export const metadata: Metadata = { title: "Home" };
export default async function Home({}: HomeProps) {
  const { user } = await getAuth();

  return (
    <div className="container flex-1 py-6">
      Home
      <br />
      {user ? (
        <>
          <h1>Logged in as @{user?.name}</h1>
          <p>{user?.email}</p>
          <form
            action={async () => {
              "use server";
              await logout();
            }}
          >
            <button> Logout</button>
          </form>
        </>
      ) : (
        <Link href="/auth/login">login</Link>
      )}
    </div>
  );
}
