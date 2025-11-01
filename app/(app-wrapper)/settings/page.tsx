"use client";

import { redirect, usePathname } from "next/navigation";

export default function Settings(){
  const pathname = usePathname();
  
    if(pathname === "/settings") redirect("/settings/account");
}