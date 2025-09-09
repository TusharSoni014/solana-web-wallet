/* eslint-disable @next/next/no-img-element */
"use client";
import { AlertTriangle } from "lucide-react";
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
          <div className="mt-6 mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2">
              <img
                src="/Y_Combinator_logo.svg"
                alt="Y Combinator"
                className="w-5 h-5 rounded-full"
              />
              <span className="text-xs text-zinc-300 font-medium">
                Not backed by YC
              </span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <AlertTriangle className="w-6 h-6 text-zinc-400" />
            <h3 className="text-lg font-semibold text-zinc-200">
              Security Reminder
            </h3>
          </div>
          <p className="text-zinc-300 text-sm">
            Never share your recovery phrase with anyone. Anyone with these
            words can access your wallet and funds.
          </p>
        </div>
        {state === "start" && <StartScreen />}
        {state === "mnemonic" && <Mnemonics />}
        {state === "wallet" && <WalletScreen />}
      </div>
    </div>
  );
}
