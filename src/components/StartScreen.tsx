import { useWalletStore } from "@/store/wallet.store";
import { generateMnemonic } from "bip39";
import { Button } from "./ui/button";
import { Plus, ArrowRight, Key } from "lucide-react";

export default function StartScreen() {
  const { setMnemonic, setState } = useWalletStore();

  const handleCreateNewWallet = () => {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
    setState("mnemonic");
  };

  const handleImportExistingWallet = () => {};

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 mb-8 shadow-2xl">
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700/50 p-6 hover:border-blue-500/30 transition-all duration-300">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30 flex items-center justify-center transition-transform duration-300">
              <Plus className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Create New Wallet
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Generate a new recovery phrase and create a fresh Solana wallet.
              Perfect for new users or when you need additional wallets.
            </p>
            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Generate secure 12-word recovery phrase</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Create multiple wallet addresses</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Full control over your private keys</span>
              </div>
            </div>
            <Button
              onClick={handleCreateNewWallet}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              <span className="transition-transform">Create New Wallet</span>
              <ArrowRight className="w-5 h-5 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Import Existing Wallet Option */}
        <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700/50 p-6 hover:border-green-500/30 transition-all duration-300 group">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 flex items-center justify-center transition-transform duration-300">
              <Key className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Import Existing Wallet
            </h3>

            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Restore your existing Solana wallet using your recovery phrase.
              Access your funds and continue where you left off.
            </p>
            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Restore from 12 or 24-word phrase</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Access existing wallet addresses</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Recover funds and transaction history</span>
              </div>
            </div>
            <Button
              onClick={handleImportExistingWallet}
              disabled={true}
              variant="border"
              size="lg"
              className="w-full border-green-600 text-green-400 hover:bg-green-600/10 hover:border-green-500 transition-all duration-300"
            >
              <span className="transition-transform">Import Wallet</span>
              <ArrowRight className="w-5 h-5 transition-transform" />
            </Button>
            <p className="text-center text-red-500 text-[10px] my-2 leading-relaxed">
              Coming Soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
