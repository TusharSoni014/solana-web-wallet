"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Droplet } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FaucetPage() {
  const [recipient, setRecipient] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const amounts = [0.5, 1, 1.5, 2, 2.5];

  return (
    <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center bg-black">
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 md:p-8 mb-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg border border-cyan-500/30 flex items-center justify-center">
              <Droplet className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                Devnet Faucet
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm">
                Request test SOL for development
              </p>
            </div>
          </div>
          <Button asChild variant="secondary" size="sm">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
        </div>

        <div className="rounded-xl border border-zinc-700/50 p-5 w-[90vw] max-w-md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-300 mb-2">
                Recipient address
              </label>
              <Input
                placeholder="Enter Solana address (devnet)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>

            <div>
              <div className="text-sm text-zinc-300 mb-2">Amount (SOL)</div>
              <div className="grid grid-cols-5 gap-2">
                {amounts.map((amt) => {
                  const isSelected = selectedAmount === amt;
                  return (
                    <Button
                      key={amt}
                      type="button"
                      size="sm"
                      variant="border"
                      className={
                        (isSelected
                          ? "border-cyan-500 text-cyan-400 bg-cyan-500/10 "
                          : "") + "w-full"
                      }
                      onClick={() => setSelectedAmount(amt)}
                    >
                      {amt}
                    </Button>
                  );
                })}
              </div>
            </div>

            <Button
              type="button"
              size="sm"
              disabled={!recipient || selectedAmount === null}
              className="w-full"
            >
              Request Airdrop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
