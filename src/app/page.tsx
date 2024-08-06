import type { Metadata } from "next";

type HomeProps = Readonly<{}>;

export const metadata: Metadata = { title: "Home" };
export default async function Home({}: HomeProps) {
  return <div className="container flex-1 py-6">Home</div>;
}
