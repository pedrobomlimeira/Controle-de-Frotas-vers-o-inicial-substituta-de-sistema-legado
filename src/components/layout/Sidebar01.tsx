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
<<<<<<< HEAD
  Briefcase,
=======
  Settings,
>>>>>>> d4cfbb5 (Incluido menu Adm e nele o cadastro de usuarios)
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogIn as LogsIcon } from 'lucide-react'; // Adjust imports as necessary
import { Group as CompanyIcon }  from 'lucide-react'; // Import Company Icon

    // Add other items as needed
;
interface SidebarProps {
  className?: string;
  activePath?: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Fleet Status", path: "/" },
  { icon: MapPin, label: "Trips", path: "/trips" },
  { icon: Car, label: "Vehicles", path: "/vehicles" },
  { icon: Users, label: "Drivers", path: "/drivers" },
  { icon: Wrench, label: "Maintenance", path: "/maintenance" },
  { icon: Receipt, label: "Expenses", path: "/expenses" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Briefcase, label: "Companies", path: "/companies" },
  { icon: Users, label: "Users", path: "/users" },
  { icon: LogsIcon, label: "Logs", path: "/logs" },
];

const adminItems = [
  { icon: Users, label: "Manage Users", path: "/admin/users" },
  { icon: Settings, label: "System Settings", path: "/admin/settings" },
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

        <div className="pt-4 border-t border-border/50">
          <p className="px-4 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Admin
          </p>
          {adminItems.map((item) => {
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
        </div>
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
