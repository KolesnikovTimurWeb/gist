"use client";

import H1 from "@/components/ui/H1";
import Link from "next/link";

export default function Error() {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
      <H1>Error</H1>
      <p>An unexpected error occurred.</p>
      <Link href={'/'}>Home page</Link>
    </main>
  );
}