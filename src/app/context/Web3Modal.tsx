"use client";

import React, { ReactNode } from "react";
import { wagmiConfig } from "~/config/wagmi";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { State, WagmiProvider } from "wagmi";
import { env } from "~/env";
import { siweConfig } from "~/config/siwe";

// Create modal
createWeb3Modal({
  wagmiConfig,
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  siweConfig,
  // enableAnalytics: true, // Optional - defaults to your Cloud configuration
  // enableOnramp: true, // Optional - false as default
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
}
