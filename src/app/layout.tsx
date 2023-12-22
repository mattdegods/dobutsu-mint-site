import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Dubotsu",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClientWrapper>
        <body>
          <Toaster />
          {children}
        </body>
      </ClientWrapper>
    </html>
  );
}
