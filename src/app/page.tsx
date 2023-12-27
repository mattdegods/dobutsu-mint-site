import MintView from "./components/MintView";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dobutsu - Alpha Club",
  description:
    "Dobutsu (動物) is a next-gen NFT community, combining the 3 things you need for success: Top Tier Trading Tools: An A-list community deeply connected w/ the markets & CT culture; Bleeding edge innovation. Mint your Dobutsu persona to enter the Jungle and receive access to @MarketWizard94's elite Dobutsu Trading Bot and TradingView Indicator (it has predicted events like the current $BTC breakout). Exclusive cost-price on future apparel and toy drops—collect or profit, the choice is yours!",
};

export default function Home() {
  return (
    <main className="bg-black flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <MintView />
    </main>
  );
}
