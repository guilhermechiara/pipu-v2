import React, { PropsWithChildren } from "react";
import { AppProps } from "next/app";
import { Header } from "../../components/layout/Header";

export default function RootLayout({ children }: PropsWithChildren<AppProps>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex min-h-(calc(100vh_-_--header-height)) flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}
