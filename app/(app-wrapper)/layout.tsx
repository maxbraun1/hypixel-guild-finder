import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <div className="w-full max-w-5xl p-5 flex-grow flex flex-col">
        {children}
      </div>
    </TooltipProvider>
  );
}
