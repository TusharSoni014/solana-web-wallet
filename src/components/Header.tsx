import React from "react";
import { Wallet } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-zinc-900 w-full">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-white font-semibold tracking-tight">
            Solana Web Wallet
          </span>
        </div>
        <span className="ml-2 text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
          Devnet
        </span>
      </div>
    </header>
  );
}
