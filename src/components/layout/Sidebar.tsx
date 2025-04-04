import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BookOpen,
  BookIcon,
  Users,
  CalendarIcon,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { NavItem } from "@/types";
import { toast } from "sonner";
import dayjs from "dayjs";

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Students",
    href: "/students",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Homework",
    href: "/homework",
    icon: <CalendarIcon className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Time",
    href: "",
    icon: <Clock className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const showToastWithTime = () => {
    // Tạo một toast
    const toastId = toast.custom(() => (
      <div className="bg-white p-4 rounded-md shadow-lg border border-gray-300">
        ⏰ Thời gian hiện tại: <b>{dayjs().format("HH:mm:ss")}</b>
      </div>
    ));

    // Cập nhật nội dung của toast mỗi giây
    const interval = setInterval(() => {
      toast.custom(
        () => (
          <div className="bg-white p-4 rounded-md shadow-lg border border-gray-300">
            ⏰ Thời gian hiện tại: <b>{dayjs().format("HH:mm:ss")}</b>
          </div>
        ),
        { id: toastId }
      );
    }, 1000);

    // Xóa interval khi toast bị đóng
    setTimeout(() => {
      clearInterval(interval);
      toast.dismiss(toastId);
    }, 5000); // Tự động đóng sau 5 giây
  };

  return (
    <div className="sidebar-wrapper">
      <div
        className={cn(
          "bg-sidebar border-r border-sidebar-border h-full flex flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}>
        <div className="flex items-center px-4 h-16 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <BookIcon className="h-6 w-6 text-lms-blue-600" />
              <h1 className="font-bold text-lg">CourseScribe</h1>
            </div>
          )}
          {collapsed && (
            <BookIcon className="h-6 w-6 text-lms-blue-600 mx-auto" />
          )}
        </div>

        <div className="flex-1 py-4 px-2">
          <nav className="space-y-1">
            <TooltipProvider>
              {navItems.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.href}
                      style={{ display: "flex" }}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors ",
                          collapsed ? "justify-center" : "justify-start",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )
                      }
                      onClick={(e) => {
                        if (item.title === "Time") {
                          e.preventDefault();
                          showToastWithTime();
                        }
                      }}>
                      <div className={collapsed ? "mx-auto" : "mr-3"}>
                        {item.icon}
                      </div>
                      {!collapsed && <div>{item.title}</div>}
                    </NavLink>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  )}
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand" : "Collapse"}>
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
