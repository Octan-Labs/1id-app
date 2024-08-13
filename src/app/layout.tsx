import "~/styles/globals.css";

import localfont from "next/font/local";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Web3ModalProvider from "./context/Web3Modal";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { wagmiConfig } from "~/config/wagmi";
import { Layout } from "./_components/layout";
import { HydrateClient } from "~/trpc/server";

const GTWalsheimPro = localfont({
  src: [
    {
      path: "./font/GTWalsheimPro-UltraLight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./font/GTWalsheimPro-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./font/GTWalsheimPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./font/GTWalsheimPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/GTWalsheimPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    // {
    //   path: "./font/GTWalsheimPro-SemiBold.woff2",
    //   weight: "600",
    //   style: "normal",
    // },
    {
      path: "./font/GTWalsheimPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./font/GTWalsheimPro-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./font/GTWalsheimPro-UltraBold.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./font/GTWalsheimPro-UltraLightOblique.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "./font/GTWalsheimPro-ThinOblique.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "./font/GTWalsheimPro-LightOblique.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./font/GTWalsheimPro-RegularOblique.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./font/GTWalsheimPro-MediumOblique.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./font/GTWalsheimPro-BoldOblique.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./font/GTWalsheimPro-BlackOblique.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "./font/GTWalsheimPro-UltraBoldOblique.woff2",
      weight: "900",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "1ID",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie"),
  );
  return (
    <html lang="en" className={`${GTWalsheimPro.className}`}>
      <body>
        <Web3ModalProvider initialState={initialState}>
          <TRPCReactProvider>
            <HydrateClient>
              <div className="font-semibold"></div>
              <Layout>{children}</Layout>
            </HydrateClient>
          </TRPCReactProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
