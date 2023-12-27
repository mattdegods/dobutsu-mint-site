"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import CandyMint from "./CandyMint";
import { useWindowSize } from "../hooks/useWindowSize";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Confetti from "react-confetti";

const MintView: FC = () => {
  const { publicKey } = useWallet();
  const [width, height] = useWindowSize();

  const [mintSuccess, setMintSuccess] = useState(false);

  useEffect(() => {
    if (mintSuccess) {
      setTimeout(() => {
        setMintSuccess(false);
      }, 6000);
    }
  }, [mintSuccess]);

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <Image
        src="/images/logo.png"
        width={200}
        height={200}
        alt="logo"
        className="absolute top-3 left-6 z-50"
      />
      {mintSuccess && (
        <div className="z-50 absolute inset-0">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={400}
            tweenDuration={10000}
          />
        </div>
      )}

      <div className="w-full bg-black">
        <div className="absolute left-1/2 -translate-x-1/2 top-10 z-50">
          <div className="w-full flex items-center justify-between">
            <Image
              src="/images/floater1.png"
              width={500}
              height={500}
              alt="floating character 1"
              priority
            />
            <Image
              src="/images/floater2.png"
              width={900}
              height={900}
              alt="floating character 2"
              priority
            />
          </div>
        </div>
        {/* Section 1 */}
        <div className="relative z-10 w-full section1 text-white px-4 py-20 h-screen">
          <div className="h-full flex flex-col justify-center px-10">
            <h2 className="text-4xl font-bold italic">DOBUTSU</h2>
            <p className="text-6xl font-bold italic uppercase">
              welcome
              <br />
              to the
              <br />
              jungle!
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="absolute inset-0 top-[75%] 3xl:top-[69%] z-20 w-full section2 text-white px-4 py-20 h-[800px]">
          <div className="h-full w-full flex items-center justify-center xl:gap-20">
            <Image
              src="/images/racoon.png"
              width={600}
              height={600}
              alt="racoon"
              className="hidden xl:block"
            />
            <Image
              src="/images/box-text.png"
              width={500}
              height={500}
              alt="box text"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className="absolute inset-0 top-[140%] 3xl:top-[120%] z-30 w-full section3 text-white px-4 min-h-[500px]">
          <div className="h-full w-1/2 mx-auto flex items-center pt-10">
            <div className="flex flex-col items-center gap-5">
              <p className="font-bold text-5xl text-center">
                Mint your Dobutsu
              </p>
              {!!publicKey ? (
                <CandyMint setMintSuccess={setMintSuccess} />
              ) : (
                <WalletMultiButton />
              )}
            </div>
          </div>
          <div className="absolute right-0 top-0 z-50 hidden lg:block">
            <Image
              src="/images/rabbit.png"
              width={480}
              height={480}
              alt="rabbit"
            />
          </div>
          <div className="absolute right-0 bottom-0 z-50 lg:hidden">
            <Image
              src="/images/rabbit.png"
              width={200}
              height={200}
              alt="rabbit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintView;
