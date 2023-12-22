"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CandyMint from "./CandyMint";
import { useWindowSize } from "../hooks/useWindowSize";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Confetti from "react-confetti";

const MintView: FC = () => {
  const { publicKey } = useWallet();
  const [width, height] = useWindowSize();
  const router = useRouter();

  const [mintSuccess, setMintSuccess] = useState(false);

  return (
    <div className="mt-20 flex flex-col items-center gap-4">
      {mintSuccess ? (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={400}
          tweenDuration={10000}
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default MintView;
