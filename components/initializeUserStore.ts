"use client"

import { User, useUserStore } from "@/lib/stores/user-store";
import { useEffect } from "react";

export default function InitializeUserStore({
  userData,
}: {
  userData: {
    user: User | null,
    guild: guild | null,
    request_count: number
  }
}){
  const { init } = useUserStore();

  useEffect(() => init(userData), []);

  return null;
}
