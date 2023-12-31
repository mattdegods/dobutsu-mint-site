"use client";

import { smallClickAnimation } from "../configs/framer.config";
import umiCreator from "../lib/umiCreator";
import {
  CandyMachine,
  fetchCandyGuard,
  fetchCandyMachine,
  mintV2,
} from "@metaplex-foundation/mpl-candy-machine";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import {
  Umi,
  generateSigner,
  publicKey,
  some,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import { toast } from "sonner";
import bs58 from "bs58";

interface Props {
  setMintSuccess: (success: boolean) => void;
}

const CandyMint: FC<Props> = ({ setMintSuccess }) => {
  // hooks
  const wallet = useWallet();
  const { connection } = useConnection();

  // ENV constants
  const treasury = process.env.NEXT_PUBLIC_TREASURY;
  const candyMachineAddress = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID;

  // local state
  const [umi, setUmi] = useState<Umi>();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  // functions
  const getNetworkType = (rpcUrl: string) => {
    if (rpcUrl.includes("devnet")) return "devnet";
    if (rpcUrl.includes("mainnet-beta")) return "mainnet";
    // Add more conditions as needed for other networks like testnet
    return "testnet";
  };

  // Determine the network type
  const networkType = getNetworkType(connection.rpcEndpoint);

  const soldOut = Number(candyMachine?.itemsRedeemed) === 2905;

  const onClick = async () => {
    if (!treasury) {
      toast.error("Treasury not found");
      return;
    }

    if (!umi || !candyMachine) {
      toast.error("Candy Machine not found");
      return;
    }

    if (!wallet.publicKey) {
      toast.error("Wallet not connected!");
      return;
    }

    // console.log("candyMachine", candyMachine);
    const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
    console.log("candyGuard", candyGuard);
    umi.guards.all();

    const toastId = toast.loading("Minting...");
    try {
      // mint from the candy machine
      const nftMint = generateSigner(umi);
      const transaction = transactionBuilder()
        .add(setComputeUnitLimit(umi, { units: 800_000 }))
        .add(
          mintV2(umi, {
            candyMachine: candyMachine.publicKey,
            candyGuard: candyGuard.publicKey,
            nftMint,
            collectionMint: candyMachine.collectionMint,
            collectionUpdateAuthority: candyMachine.authority,
            mintArgs: {
              solPayment: some({ destination: publicKey(treasury) }),
            },
          })
        );
      const { signature } = await transaction.sendAndConfirm(umi, {
        confirm: { commitment: "confirmed" },
      });
      const txid = bs58.encode(signature);
      // console.log("success", `Mint successful! ${txid}`);
      setMintSuccess(true);
      toast.success("Mint successful!", {
        id: toastId,
        action: {
          label: "See your tx",
          onClick: () =>
            window.open(
              `https://explorer.solana.com/tx/${txid}${
                networkType === "devnet" && "?cluster=devnet"
              }`,
              "_blank",
              "noreferrer noopener"
            ),
        },
      });
    } catch (error: any) {
      if (error.message.includes("User rejected")) {
        toast.error("User rejected request", { id: toastId });
        return;
      }
      toast.error("Mint failed, check logs!", { id: toastId });
      console.log("error", `Mint failed! ${error?.message}`);
    }
  };

  // effects
  useEffect(() => {
    const getCurrentCandyMachineState = async () => {
      if (!candyMachineAddress) {
        toast.error("Candy Machine not found");
        return;
      }

      if (!wallet) {
        toast.error("Wallet not connected!");
        return;
      }

      try {
        const umi = umiCreator(wallet);
        if (!umi) return;
        const candyMachine = await fetchCandyMachine(
          umi,
          publicKey(candyMachineAddress)
        );
        console.log("candyMachine", candyMachine);
        console.log("umi", umi);
        setUmi(umi);
        setCandyMachine(candyMachine);
      } catch (error) {
        console.log("Error creating umi + candymachine", error);
        return;
      }
    };
    getCurrentCandyMachineState();
  }, [wallet, candyMachineAddress]);

  if (!candyMachine) return <DotLoader color="white" />;

  return (
    <>
      <p className="italic">{`Price: 0.5 SOL -- Minted: ${Number(
        candyMachine.itemsRedeemed
      )} / ${candyMachine.data.itemsAvailable}`}</p>

      <motion.button
        className="rounded-md bg-gradient-to-br from-green-400 to-purple-500 text-2xl
        px-10 py-5 font-semibold text-white uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onClick}
        disabled={!wallet || !umi || !candyMachine || soldOut}
        {...smallClickAnimation}
      >
        {soldOut ? "SOLD OUT" : "MINT"}
      </motion.button>
    </>
  );
};

export default CandyMint;
