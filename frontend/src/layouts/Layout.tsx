import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-screen flex-1 flex-col">
        <SidebarTrigger />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
