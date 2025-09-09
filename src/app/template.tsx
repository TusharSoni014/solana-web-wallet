"use client";

import { ConnectionProvider } from "@solana/wallet-adapter-react";
import React from "react";

export default function template({ children }: { children: React.ReactNode }) {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      {children}
    </ConnectionProvider>
  );
}
