"use client";

import { useWalletInfo } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const Profile = () => {
  const account = useAccount();
  const { walletInfo } = useWalletInfo();
  return (
    <div className="grid gap-4">
      <div>
        <img
          className="h-8 w-8 rounded-full border bg-secondary"
          src={walletInfo?.icon}
          alt=""
        />
        <div>
          <h2>{walletInfo?.name}</h2>
        </div>
        <Badge variant="outline">
          Refferal link:&nbsp;
          <span className="select-all font-semibold text-blue-500 hover:cursor-copy hover:underline">
            {"https://1id.network/1|D#12345"}
          </span>
        </Badge>
      </div>
      <div className="grid gap-6">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Email Address</Label>
          <Input type="email" id="email" placeholder="Enter Your Email" />
          <Button className="w-fit rounded-none text-xl font-semibold">
            Send a code
          </Button>
        </div>
        <div className="grid w-full max-w-sm items-center gap-6">
          <div className="grid gap-1.5">
            <Label>Connect Account</Label>
            <Button
              className="flex justify-between text-xl font-semibold"
              variant="outline"
            >
              <span>Connect With Discord</span>
              <img src="img/icon/discordColor.svg" alt="" />
            </Button>
            <Button
              className="flex justify-between text-xl font-semibold"
              variant="outline"
            >
              <span>Connect With X</span>
              <img src="img/icon/xColor.svg" alt="" />
            </Button>
            <Button
              className="flex justify-between text-xl font-semibold"
              variant="outline"
            >
              <span>Connect With Telegram</span>
              <img src="img/icon/telegramColor.svg" alt="" />
            </Button>
          </div>
          <Button className="rounded-none text-xl font-semibold" variant="primary-active">
            Send a code
          </Button>
        </div>
      </div>
    </div>
  );
};
