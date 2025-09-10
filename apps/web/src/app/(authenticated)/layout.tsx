"use client";

import { PropsWithChildren, Suspense, useState } from "react";
import { Header } from "../../components/layout/Header";
import { SidebarInset, SidebarProvider } from "@pipu/ui/components";
import { AppSidebar } from "../../components/layout/AppSidebar";
import { ProfileProvider } from "../../lib/providers/ProfileProvider";
import { AuthenticatedContent } from "../../components/layout/AuthenticatedContent";
import { ErrorCardMessage } from "../../components/layout/ErrorCardMessage";

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  function handleOpenChange(open: boolean) {
    setIsSideBarOpen(open);
  }

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <SidebarProvider
          open={isSidebarOpen}
          onOpenChange={handleOpenChange}
          className="flex flex-col"
        >
          <Header authenticated={true} />
          <div className="flex flex-1">
            <AppSidebar open={isSidebarOpen} />
            <SidebarInset className="m-18">{children}</SidebarInset>
          </div>
        </SidebarProvider>
      </Suspense>
    </div>
  );
}
