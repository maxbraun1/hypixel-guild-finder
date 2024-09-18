import { SearchX } from "lucide-react";

export default function NoResults({ object }: { object: string }) {
  return (
    <div className="my-10 w-full flex flex-col items-center gap-5">
      <SearchX size={60} color="#6b7280" />
      <h1 className="text-4xl uppercase text-gray-500 font-semibold">
        No {object} Found...
      </h1>
    </div>
  );
}
