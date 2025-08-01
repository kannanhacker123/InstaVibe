"use client";

import { Home, Heart, Search, User, PlusSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreatePost from "./CreatePost";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/explore", icon: Search, label: "Explore" },
  { href: "/create", icon: PlusSquare, label: "Create" },
  { href: "/notifications", icon: Heart, label: "Notifications" },
  { href: "/profile", icon: User, label: "Profile" },
];

function BottomNavBar() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.label === "Create") {
            return (
              <Dialog key={item.label}>
                <DialogTrigger asChild>
                  <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <item.icon className="size-6" />
                    <span className="text-xs sr-only">{item.label}</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                  </DialogHeader>
                  <CreatePost />
                </DialogContent>
              </Dialog>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors",
                isActive && "text-primary"
              )}
            >
              <item.icon className="size-6" />
              <span className="text-xs sr-only">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNavBar;
