import { FileX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col grow items-center justify-center">
      <FileX size={150} color="#404040" className="mb-5" />
      <h1 className="text-9xl text-neutral-700 font-extrabold">404</h1>
      <h2 className="text-3xl md:text-5xl text-neutral-700 font-bold uppercase text-center">
        Page Not Found
      </h2>
    </div>
  );
}
