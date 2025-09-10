"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Droplet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { toast } from "sonner";

export default function FaucetPage() {
  const [recipient, setRecipient] = useState("");
  const [recipientError, setRecipientError] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(0.5);
  const [balance, setBalance] = useState<number>(0);
  const { connection } = useConnection();

  useEffect(() => {
    const getBalance = async () => {
      const balance = await connection.getBalance(new PublicKey(recipient));
      setBalance(balance);
    };
    getBalance();
  }, [connection, recipient]);

  const amounts = [0.5, 1, 1.5, 2, 2.5];

  const sanitizeRecipient = (value: string) =>
    value
      .trim()
      .replace(/^solana:/i, "")
      .replace(/["'`<>]/g, "")
      .replace(/[\u200B-\u200D\uFEFF]/g, "");

  const isBase58 = (value: string) => /^[1-9A-HJ-NP-Za-km-z]+$/.test(value);

  const handleRequestAirdrop = async () => {
    const cleaned = sanitizeRecipient(recipient);
    setRecipient(cleaned);

    if (!cleaned) {
      setRecipientError("Address is required");
      toast.error("Enter a recipient address");
      return;
    }

    if (!isBase58(cleaned)) {
      setRecipientError("Invalid Base58 address characters");
      toast.error("Invalid address: non-Base58 characters detected");
      return;
    }

    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(cleaned);
    } catch {
      setRecipientError("Malformed Solana address");
      toast.error("Malformed Solana address");
      return;
    }

    setRecipientError("");
    setIsRequesting(true);
    try {
      const lamports = Math.round(selectedAmount * LAMPORTS_PER_SOL);
      const sig = await connection.requestAirdrop(publicKey, lamports);
      toast.success("Airdrop requested", { description: sig });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("429")) {
        toast.warning("Rate limited", {
          description: "RPC returned 429. Retrying in 1s...",
        });
        try {
          await new Promise((r) => setTimeout(r, 1000));
          const lamports = Math.round(selectedAmount * LAMPORTS_PER_SOL);
          const sig = await connection.requestAirdrop(publicKey, lamports);
          toast.success("Airdrop requested", { description: sig });
        } catch (retryErr) {
          const retryMsg =
            retryErr instanceof Error ? retryErr.message : String(retryErr);
          toast.error("Airdrop failed", { description: retryMsg });
        }
      } else {
        toast.error("Airdrop failed", { description: message });
      }
    } finally {
      setIsRequesting(false);
    }
  };

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
              <div className="w-full flex justify-between items-center mb-2 ">
                <label className="block text-sm text-zinc-300">
                  Recipient address
                </label>
                {recipient && !isRequesting && isBase58(recipient) ? (
                  <p className="text-sm text-zinc-300">
                    Balance:{" "}
                    <span className="text-cyan-400">
                      {balance / LAMPORTS_PER_SOL} SOL
                    </span>
                  </p>
                ) : null}
              </div>
              <Input
                placeholder="Enter Solana address (devnet)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                onBlur={(e) => setRecipient(sanitizeRecipient(e.target.value))}
                aria-invalid={Boolean(recipientError)}
              />
              {recipientError && (
                <div className="mt-2 text-xs text-red-400">
                  {recipientError}
                </div>
              )}
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
              disabled={!recipient || isRequesting || !isBase58(recipient)}
              className="w-full"
              onClick={() => handleRequestAirdrop()}
            >
              {isRequesting ? "Requesting..." : "Request Airdrop"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
