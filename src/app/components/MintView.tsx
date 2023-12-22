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
    <div className="mt-20 flex flex-col items-center gap-4">
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
      <p className="text-4xl font-bold">Dubotsu Mint</p>
      <Image
        src="/mint.png"
        width={300}
        height={300}
        alt="sample art"
        className="rounded-lg"
      />
      <p className="text-2xl font-bold">Mint your Dubotsu</p>
      <div className="flex items-center gap-4">
        {!!publicKey ? (
          <CandyMint setMintSuccess={setMintSuccess} />
        ) : (
          <WalletMultiButton />
        )}
      </div>
    </div>
  );
};

export default MintView;
