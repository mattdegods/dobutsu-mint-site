import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Dobutsu - Alpha Club",
  description:
    "Dobutsu (動物) is a next-gen NFT community, combining the 3 things you need for success: Top Tier Trading Tools; An A-list community deeply connected w/ the markets & CT culture; Bleeding edge innovation. Mint your Dobutsu persona to enter the Jungle and receive by holding: Access to @MarketWizard94's elite Dobutsu Trading Bot and TradingView Indicator (It has predicted events like the current $BTC breakout. Exclusive cost-price on future apparel and toy drops—collect or profit, the choice is yours! ",
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
