/* eslint-disable @next/next/no-img-element */
"use client";
import Mnemonics from "@/components/Mnemonics";
import { useWalletStore } from "@/store/wallet.store";
import StartScreen from "@/components/StartScreen";
import WalletScreen from "@/components/WalletScreen";

export default function Home() {
  const { state } = useWalletStore();

  return (
    <div className="min-h-[calc(100vh-55px)] bg-black p-6">
      <div className="max-w-4xl mx-auto ">
        {state === "start" && <StartScreen />}
        {state === "mnemonic" && <Mnemonics />}
        {state === "wallet" && <WalletScreen />}
      </div>
    </div>
  );
}
