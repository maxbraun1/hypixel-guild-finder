"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="text-neutral-500 flex flex-col items-center w-full py-10">
      <SearchX size={50} className="mb-2" />
      <h1 className="text-4xl font-semibold uppercase">Guild Not Found!</h1>
      <Button className="mt-5 flex gap-1" onClick={() => router.back()}>
        <ArrowLeft size={15} /> Go Back
      </Button>
    </div>
  );
}
