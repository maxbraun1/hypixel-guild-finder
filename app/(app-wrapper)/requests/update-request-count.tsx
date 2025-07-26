"use client";

import { useEffect } from "react";
import { useRequestStore } from "../guilds/search/request-store";

export default function UpdateRequestCount() {
  const setRequestCount = useRequestStore((state) => state.setRequestCount);

  useEffect(() => {
    setRequestCount(0);
  }, []);

  return null;
}
