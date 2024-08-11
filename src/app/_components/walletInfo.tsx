"use client";
import { useWalletInfo } from "@web3modal/wagmi/react";

export default function Component() {
  const { walletInfo } = useWalletInfo();
  return <div></div>;
}
