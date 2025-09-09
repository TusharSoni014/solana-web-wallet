import { useWalletStore } from "@/store/wallet.store";
import { generateMnemonic } from "bip39";
import { Button } from "./ui/button";
import Link from "next/link";
import { Plus, ArrowRight, Key, Droplet } from "lucide-react";

export default function StartScreen() {
  const { setMnemonic, setState } = useWalletStore();

  const handleCreateNewWallet = () => {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
    setState("mnemonic");
  };

  const handleImportExistingWallet = () => {};

  return (
    <>
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
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 md:p-8 mb-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="rounded-xl border border-zinc-700/50 p-5 hover:border-blue-500/30 transition-colors">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/10 rounded-full border border-blue-500/30 flex items-center justify-center">
                <Plus className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Create
              </h3>
              <p className="text-slate-400 text-xs mb-4">
                New wallet with a secure phrase
              </p>
              <Button
                onClick={handleCreateNewWallet}
                size="sm"
                className="w-full"
              >
                <span>Create Wallet</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-700/50 p-5 hover:border-emerald-500/30 transition-colors">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-emerald-500/10 rounded-full border border-emerald-500/30 flex items-center justify-center">
                <Key className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Import
              </h3>
              <p className="text-slate-400 text-xs mb-4">
                Use existing recovery phrase
              </p>
              <Button
                onClick={handleImportExistingWallet}
                disabled={true}
                variant="border"
                size="sm"
                className="w-full border-emerald-600 text-emerald-400 hover:bg-emerald-600/10 hover:border-emerald-500"
              >
                <span>Import Wallet</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-center text-zinc-500 text-[10px] mt-2">
                Coming soon
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-700/50 p-5 hover:border-cyan-500/30 transition-colors">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-cyan-500/10 rounded-full border border-cyan-500/30 flex items-center justify-center">
                <Droplet className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Faucet
              </h3>
              <p className="text-slate-400 text-xs mb-4">
                Get test SOL for devnet
              </p>
              <Button variant="border" asChild size="sm" className="w-full">
                <Link href="/faucet">
                  <span>Open Faucet</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
