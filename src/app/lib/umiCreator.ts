import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";

const umiCreator = (wallet: WalletContextState) => {
  const endpoint = process.env.NEXT_PUBLIC_RPC;
  if (!endpoint) {
    console.log("RPC is not defined");
    return;
  }

  try {
    return createUmi(endpoint)
      .use(walletAdapterIdentity(wallet))
      .use(mplCandyMachine())
      .use(mplTokenMetadata());
  } catch (error) {
    console.log("Error creating umi: ", error);
  }
};

export default umiCreator;
