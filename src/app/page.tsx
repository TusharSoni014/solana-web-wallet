/* eslint-disable @next/next/no-img-element */
"use client";
import Mnemonics from "@/components/Mnemonics";
import { useWalletStore } from "@/store/wallet.store";
import StartScreen from "@/components/StartScreen";
import WalletScreen from "@/components/WalletScreen";

export default function Home() {
  const { state } = useWalletStore();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto ">
        <div className="text-center mb-12">
          <div className="flex gap-3 items-center justify-center ">
            <div className="rounded-full overflow-hidden bg-white p-3">
              <img src="/solana.jpg" alt="Solana" width={50} height={50} />
            </div>
            <h1 className="text-6xl font-bold text-white">Solana Web Wallet</h1>
          </div>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Create · Send · Receive · Expand
          </p>
        </div>

        {state === "start" && <StartScreen />}
        {state === "mnemonic" && <Mnemonics />}
        {state === "wallet" && <WalletScreen />}
      </div>
    </div>
  );
}
