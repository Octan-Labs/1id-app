// config/index.tsx

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { env } from "~/env";

// Create a metadata object
const metadata = {
  name: "test-project",
  description: "AppKit Example",
  url: env.NEXT_PUBLIC_DOMAIN,
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;
export const wagmiConfig = defaultWagmiConfig({
  chains,
  transports: { [mainnet.id]: http(), [sepolia.id]: http() },
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
