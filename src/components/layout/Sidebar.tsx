import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  Users,
  MapPin,
  Wrench,
  Receipt,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  activePath?: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Fleet Status", path: "/" },
  { icon: Car, label: "Vehicles", path: "/vehicles" },
  { icon: Users, label: "Drivers", path: "/drivers" },
  { icon: MapPin, label: "Trips", path: "/trips" },
  { icon: Wrench, label: "Maintenance", path: "/maintenance" },
  { icon: Receipt, label: "Expenses", path: "/expenses" },
  { icon: FileText, label: "Reports", path: "/reports" },
];

const Sidebar = ({ className = "", activePath = "/" }: SidebarProps) => {
  return (
    <div
      className={cn(
        "w-[280px] h-full bg-white/80 backdrop-blur-md border-r px-3 py-4 flex flex-col",
        className,
      )}
    >
      <div className="mb-8 px-4">
        <img
          src="/logo.png"
          alt="PresServ Logo"
          className="h-16 w-auto mx-auto"
        />
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4 py-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              alt="User avatar"
              className="rounded-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@fleet.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
