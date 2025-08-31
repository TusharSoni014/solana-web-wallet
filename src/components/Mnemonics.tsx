import { useWalletStore } from "@/store/wallet.store";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Mnemonics() {
  const { mnemonic, walletAddressList, setState, updateWalletAddressList } =
    useWalletStore();
  const [copied, setCopied] = useState(false);
  const handleNext = () => {
    const masterSeed = mnemonicToSeedSync(mnemonic);
    const derivationPath = `m/44'/501'/${walletAddressList.length}'/0'`;
    const derivedSeed = derivePath(
      derivationPath,
      masterSeed.toString("hex")
    ).key;
    const walletAddress = Keypair.fromSeed(derivedSeed).publicKey.toBase58();
    updateWalletAddressList(walletAddress);
    setState("wallet");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 mb-8 shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Recovery Phrase
        </h2>
        <p className="text-slate-400">
          Write down these words in order and store them safely
        </p>
      </div>
      <AnimatePresence mode="wait">
        {mnemonic ? (
          <motion.div
            key={"mnemonic"}
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8"
          >
            {mnemonic.split(" ").map((word, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="bg-zinc-800 rounded-xl p-3 border border-zinc-700"
              >
                <div className="text-xs text-slate-400 mb-1 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="text-white font-medium text-sm">{word}</div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={"loading"}
            className="border border-red-500 w-full h-full"
          >
            Loading...
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center ">
        <Button
          variant="border"
          className="min-w-[140px]"
          size="lg"
          onClick={() => setState("start")}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleCopy}
            variant="border"
            size="lg"
            className="min-w-[140px]"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Phrase
              </>
            )}
          </Button>
          <Button
            variant="zinc"
            size="lg"
            className="min-w-[140px]"
            onClick={handleNext}
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
