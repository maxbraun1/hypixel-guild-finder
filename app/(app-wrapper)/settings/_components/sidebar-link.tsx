import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const isActive = usePathname() === href; // optionally use `usePathname()` to highlight active link
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg py-1 text-sm font-medium transition-colors",
        "hover:text-neutral-300",
        isActive && "text-purple-400 hover:text-purple-400"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}