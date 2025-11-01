import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="max-w-7xl py-5 flex">{children}</div>
    </Suspense>
  );
}
