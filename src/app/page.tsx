import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type HomeProps = Readonly<{}>;

export const metadata: Metadata = { title: "Home" };
export default async function Home({}: HomeProps) {
  return <div className="container flex-1 py-6">Home</div>;
}
