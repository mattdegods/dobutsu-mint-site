import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";
import { Toaster } from "sonner";

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
