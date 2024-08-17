// config/index.tsx

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, http } from "wagmi";
import { bsc } from "wagmi/chains";
import { env } from "~/env";

// Create a metadata object
const metadata = {
  name: "test-project",
  description: "AppKit Example",
  url: env.NEXT_PUBLIC_DOMAIN,
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [bsc] as const;
export const wagmiConfig = defaultWagmiConfig({
  chains,
  transports: { [bsc.id]: http() },
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
