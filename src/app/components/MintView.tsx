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

      <div className="w-full bg-white">
        {/* Section 1 */}
        <div className="w-full section1 text-white px-4 py-20 min-h-[1000px]">
          <h2 className="text-3xl font-bold">Welcome to the Jungle!</h2>
          {/* Content */}
        </div>

        {/* Section 2 */}
        <div className="-translate-y-96 w-full section2 text-white px-4 py-20 min-h-[800px]">
          <div className="">
            <h2 className="text-3xl font-bold">DOUBTSU</h2>
          </div>
        </div>

        {/* Section 3 */}
        <div className="-translate-y-[600px] w-full section3 text-white px-4 py-20 min-h-[800px]">
          <div className="">
            <h2 className="text-3xl font-bold">DOUBTSU</h2>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center gap-4">
        {!!publicKey ? (
          <CandyMint setMintSuccess={setMintSuccess} />
        ) : (
          <WalletMultiButton />
        )}
      </div> */}
    </div>
  );
};

export default MintView;
