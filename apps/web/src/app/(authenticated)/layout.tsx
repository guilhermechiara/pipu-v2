import { PropsWithChildren } from "react";
import { Header } from "../../components/layout/Header";
import { SidebarInset, SidebarProvider } from "@pipu/ui/components";
import { AppSidebar } from "../../components/layout/AppSidebar";

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <SidebarProvider open={false} className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="m-18">{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
