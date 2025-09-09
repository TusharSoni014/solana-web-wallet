import React, { useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy, Info, Lock, Plus } from "lucide-react";
import { useWalletStore } from "@/store/wallet.store";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

export default function WalletScreen() {
  const { walletAddressList, mnemonic, updateWalletAddressList } =
    useWalletStore();

  const [copied, setCopied] = useState(false);
  const [copiedWalletIndex, setCopiedWalletIndex] = useState<number | null>(
    null
  );
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleCopyWalletAddress = async (address: string, index: number) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedWalletIndex(index);
      setTimeout(() => setCopiedWalletIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy wallet address: ", err);
    }
  };

  const handleAddWallet = () => {
    const masterSeed = mnemonicToSeedSync(mnemonic);
    const derivationPath = `m/44'/501'/${walletAddressList.length}'/0'`;
    const derivedSeed = derivePath(
      derivationPath,
      masterSeed.toString("hex")
    ).key;
    const walletAddress = Keypair.fromSeed(derivedSeed).publicKey.toBase58();
    updateWalletAddressList(walletAddress);
  };
  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 mb-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Generated Wallets
          </h2>
          <p className="text-zinc-400 text-sm">
            {walletAddressList.length} wallet
            {walletAddressList.length !== 1 ? "s" : ""} generated from your
            recovery phrase
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="lg"
            className="border-zinc-600 text-zinc-300 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 mr-2 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-2" />
                Copy Recovery Phrase
              </>
            )}
          </Button>
          <Button onClick={handleAddWallet} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Wallet
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {walletAddressList.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-zinc-800 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="text-lg font-medium text-zinc-300 mb-2">
              No Wallets Yet
            </h3>
            <p className="text-zinc-500 text-sm">
              Click &quot;Add Wallet&quot; to generate your first wallet
            </p>
          </div>
        ) : (
          walletAddressList.map((address, index) => (
            <div
              key={address}
              className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700/50"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30 flex items-center justify-center">
                      <span className="text-blue-400 font-bold text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        Wallet {index + 1}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full border border-cyan-400/20">
                          Solana
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-zinc-200 transition-colors"
                      onClick={() => handleCopyWalletAddress(address, index)}
                      title="Copy Address"
                    >
                      {copiedWalletIndex === index ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-700/30">
                  <span className="font-mono text-sm text-zinc-300 break-all">
                    {address}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {walletAddressList.length > 0 && (
        <div className="mt-6 pt-6 border-t border-zinc-800">
          <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
            <Info className="w-4 h-4" />
            <span>All wallets are derived from the same recovery phrase</span>
          </div>
        </div>
      )}
    </div>
  );
}
