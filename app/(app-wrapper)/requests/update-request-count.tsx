"use client";

import { useEffect } from "react";
import { useUserStore } from "@/lib/stores/user-store";

export default function UpdateRequestCount({ count }: { count: number }) {
  const { setRequestCount } = useUserStore();

  useEffect(() => {
    setRequestCount(count);
  }, []);

  return null;
}
