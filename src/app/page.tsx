"use client";
import { generateMnemonic } from "bip39";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, ArrowRight, AlertTriangle } from "lucide-react";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            Solana Web Wallet
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Secure your wallet by writing down these 24 recovery words. Keep
            them safe and never share them with anyone.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 mb-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Recovery Phrase
            </h2>
            <p className="text-slate-400">
              Write down these words in order and store them safely
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            {mnemonic
              ? mnemonic.split(" ").map((word, index) => (
                  <div
                    key={index}
                    className="bg-zinc-800 rounded-xl p-3 border border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:scale-105 group hover:bg-zinc-700/50"
                  >
                    <div className="text-xs text-slate-400 mb-1 font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="text-white font-medium text-sm group-hover:text-zinc-200 transition-colors">
                      {word}
                    </div>
                  </div>
                ))
              : Array.from({ length: 12 }).map((word, index) => (
                  <div
                    key={index}
                    className="bg-zinc-800 rounded-xl p-3 border border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:scale-105 group hover:bg-zinc-700/50"
                  >
                    <div className="text-xs text-slate-400 mb-1 font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="text-white font-medium text-sm group-hover:text-zinc-200 transition-colors">
                      loading...
                    </div>
                  </div>
                ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="lg"
              className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-300 min-w-[140px] group"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Copy Phrase
                </>
              )}
            </Button>

            <Button
              size="lg"
              className="bg-zinc-700 hover:bg-zinc-600 text-white shadow-lg hover:shadow-zinc-500/25 transition-all duration-300 min-w-[140px] group"
            >
              <span className="group-hover:translate-x-1 transition-transform">
                Next
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
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
      </div>
    </div>
  );
}
