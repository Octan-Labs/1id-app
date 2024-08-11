"use client";
import { useWalletInfo, useWeb3Modal } from "@web3modal/wagmi/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const navLinks = [
  {
    title: "Airdrop",
    href: "/",
  },
  {
    title: "1ID",
    href: "/dashboard",
  },
  {
    title: "Community",
    href: "#",
  },
  {
    title: "Farming",
    href: "#",
  },
];

export const Header = () => {
  const { open } = useWeb3Modal();
  const pathname = usePathname();
  const walletInfo = useWalletInfo();
  const accountInfo = useAccount();

  return (
    <header className="top-0 flex w-full justify-center bg-background-accent px-6 py-4 md:px-24">
      <div className="flex w-full max-w-screen-2xl items-center justify-between gap-4 font-extrabold italic tracking-wide">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <img src="img/logo/logo.svg" className="h-8 w-12" />
            <span className="sr-only">1ID</span>
          </Link>
          <nav className="hidden flex-col gap-2 lg:flex lg:flex-row lg:items-center lg:gap-3 lg:text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: link.href === pathname ? "outline" : "none",
                  }),
                  "py-0 text-xl font-bold hover:border-2 hover:border-solid hover:border-black hover:shadow-neo active:shadow-neo",
                )}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex gap-3">
          <Button
            variant="accent"
            disabled
            className="text-foreground hover:text-foreground rounded-none bg-accent-highlight py-1 text-xl font-bold italic tracking-wide transition-colors"
          >
            + Create Airdrop
          </Button>

          <Button
            onClick={() => {
              // if (!accountInfo.address) open();
              open();
            }}
            variant={accountInfo.address ? "outline" : "default"}
            className={cn(
              "text-foreground hover:text-foreground block max-w-56 truncate overflow-ellipsis rounded-none py-1 text-xl font-bold italic tracking-wide transition-colors",
              accountInfo.address ? "bg-background" : "bg-secondary",
            )}
          >
            <img
              src={walletInfo.walletInfo?.icon ?? ""}
              alt=""
              className={cn(accountInfo.address ?? "hidden")}
            />
            {accountInfo.address ?? "Connect"}
          </Button>
        </div>
      </div>
    </header>
  );
};
