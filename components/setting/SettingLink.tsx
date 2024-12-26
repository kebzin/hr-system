"use client";
import React from "react";
import { settingSidebarData } from "@/constants/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SettingLink = () => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
      {settingSidebarData.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-500 ${"hover:text-primary"} ${
              isActive ? "bg-gray-500" : "text-muted-foreground"
            }`}
          >
            {/* {item.icon} */}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default SettingLink;
