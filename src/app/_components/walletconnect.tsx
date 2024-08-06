"use client";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export function WalletConnect() {
  const { open, close } = useWeb3Modal();

  return (
    <div>
      <button onClick={() => open()}>Open WalletConnect</button>
      <button onClick={close}>Close WalletConnect</button>
    </div>
  );
}
