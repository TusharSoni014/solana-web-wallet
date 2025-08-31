/* eslint-disable @next/next/no-img-element */
"use client";
import { mnemonicToSeedSync } from "bip39";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, AlertTriangle, Plus, Lock, Info } from "lucide-react";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import Mnemonics from "@/components/Mnemonics";
import { useWalletStore } from "@/store/wallet.store";
import StartScreen from "@/components/StartScreen";

export default function Home() {
  const { mnemonic, state, walletAddressList, updateWalletAddressList } =
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
        {state === "wallet" && (
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 mb-8 shadow-2xl">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Generated Wallets
                </h2>
                <p className="text-zinc-400 text-sm">
                  {walletAddressList.length} wallet
                  {walletAddressList.length !== 1 ? "s" : ""} generated from
                  your recovery phrase
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
                <Button
                  onClick={handleAddWallet}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Wallet
                </Button>
              </div>
            </div>

            {/* Wallet List */}
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
                      {/* Wallet Header */}
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

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-zinc-400 hover:text-zinc-200 transition-colors"
                            onClick={() =>
                              handleCopyWalletAddress(address, index)
                            }
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

            {/* Footer Info */}
            {walletAddressList.length > 0 && (
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                  <Info className="w-4 h-4" />
                  <span>
                    All wallets are derived from the same recovery phrase
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
