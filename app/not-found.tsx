import { FileX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col grow items-center justify-center gap-5">
      <FileX size={150} color="#404040" />
      <div className="flex flex-col items-center">
        <h1 className="text-9xl text-neutral-700 font-extrabold">404</h1>
        <h2 className="text-5xl text-neutral-700 font-bold uppercase">
          Page Not Found
        </h2>
      </div>
    </div>
  );
}
