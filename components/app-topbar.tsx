"use client";
import React from "react";
import { NavUser } from "./nav-user";
import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const AppTopbar = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <Button size={"icon"} variant={"outline"} className="px-3">
        <Bell />
      </Button>
      <Button
        variant={"outline"}
        className="px-3"
        size={"icon"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {/* display between a moon icon and the sun */}
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
      <NavUser
        user={{
          name: "Kebba Waiga",
          email: "kebbawaiga@gmail.com",
          avatar: "https://avatars.githubusercontent.com/u/103185999?s=96&v=4",
        }}
      />
      {/* theme switcher  */}
    </div>
  );
};

export default AppTopbar;
