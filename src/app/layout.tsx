import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";
import { Toaster } from "sonner";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>Dobutsu - Alpha Club</title>
        <meta name="title" content={`Dobutsu - Alpha Club`} />
        <meta
          name="description"
          content={`Dobutsu (動物) is a next-gen NFT community, combining the 3 things you need for success: Top Tier Trading Tools; An A-list community deeply connected w/ the markets & CT culture; Bleeding edge innovation. Mint your Dobutsu persona to enter the Jungle and receive access to @MarketWizard94's elite Dobutsu Trading Bot and TradingView Indicator (It has predicted events like the current $BTC breakout). Exclusive cost-price on future apparel and toy drops—collect or profit, the choice is yours! `}
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://mint.dobutsu.xyz`} />
        <meta property="og:title" content={`Dobutsu - Alpha Club`} />
        <meta
          property="og:description"
          content={`Dobutsu (動物) is a next-gen NFT community, combining the 3 things you need for success: Top Tier Trading Tools; An A-list community deeply connected w/ the markets & CT culture; Bleeding edge innovation. Mint your Dobutsu persona to enter the Jungle and receive access to @MarketWizard94's elite Dobutsu Trading Bot and TradingView Indicator (It has predicted events like the current $BTC breakout). Exclusive cost-price on future apparel and toy drops—collect or profit, the choice is yours! `}
        />
        <meta property="og:image" content={`/images/floaters.png`} />
        <meta property="og:image:width" content="1800" />
        <meta property="og:image:height" content="941" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`Dobutsu - Alpha Club`} />
        <meta
          property="twitter:description"
          content={`Dobutsu - Alpha Club: Dobutsu (動物) is a next-gen NFT community, combining the 3 things you need for success: Top Tier Trading Tools; An A-list community deeply connected w/ the markets & CT culture; Bleeding edge innovation. Mint your Dobutsu persona to enter the Jungle and receive access to @MarketWizard94's elite Dobutsu Trading Bot and TradingView Indicator (It has predicted events like the current $BTC breakout). Exclusive cost-price on future apparel and toy drops—collect or profit, the choice is yours! `}
        />
        <meta property="twitter:image" content={`/images/floaters.png`} />
      </Head>
      <html lang="en">
        <ClientWrapper>
          <body>
            <Toaster />
            {children}
          </body>
        </ClientWrapper>
      </html>
    </>
  );
}
