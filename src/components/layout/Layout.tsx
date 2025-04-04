import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Toast } from "../ui/toast";
import { ToastProvider } from "@radix-ui/react-toast";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="overflow-y-auto w-full overflow-visible">
          {children}
        </div>
      </div>
    </div>
  );
}
