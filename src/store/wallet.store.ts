import { create } from "zustand";

export type WalletState = "start" | "mnemonic" | "wallet";

interface WalletStore {
  mnemonic: string;
  setMnemonic: (mnemonic: string) => void;
  state: WalletState;
  setState: (state: WalletStore["state"]) => void;
  walletAddressList: string[];
  updateWalletAddressList: (walletAddress: string) => void;
}

export const useWalletStore = create<WalletStore>((set) => {
  return {
    mnemonic: "",
    setMnemonic: (mnemonic: string) => set({ mnemonic }),
    state: "start",
    setState: (state: WalletStore["state"]) => set({ state }),
    walletAddressList: [],
    updateWalletAddressList: (walletAddress: string) =>
      set((state) => ({
        walletAddressList: [...state.walletAddressList, walletAddress],
      })),
  };
});
