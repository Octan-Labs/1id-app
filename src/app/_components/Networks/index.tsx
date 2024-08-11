"use client";
import { Button } from "~/components/ui/button";
import { ChainFilter } from "./ChainFilter";
import { NetworkCard, NetworkCardProps } from "./NetworkCard";

const networks: NetworkCardProps[] = [
  {
    address: "0x000000000000000000",
    name: "1ID",
    logo: "img/logo/1id.svg",
    endTime: new Date(1729566058000),
    totalStaked: 1000,
    remainingRewards: 1000,
    requirements: ["KYC", "Twitter", "Discord", "BNB RS"],
  },
  {
    address: "0x000000000000000001",
    name: "1ID",
    logo: "img/logo/1id.svg",
    endTime: new Date(1729266058000),
    totalStaked: 1000,
    remainingRewards: 600,
    requirements: ["KYC", "Twitter", "Discord", "BNB RS"],
  },
  {
    address: "0x000000000000000002",
    name: "1ID",
    logo: "img/logo/octan.svg",
    endTime: new Date(1729266058000),
    totalStaked: 1000,
    remainingRewards: 400,
    requirements: ["KYC", "Twitter", "Discord", "BNB RS"],
  },
];

export const Networks = () => {
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <ChainFilter />
        <Button
          className="rounded-full text-xl font-bold italic"
          variant="primary-active"
          shadow="onHover"
        >
          On-going
        </Button>
        <Button
          className="rounded-full text-xl font-bold italic"
          variant="primary-active"
          shadow="onHover"
        >
          Expired
        </Button>
        <Button
          className="rounded-full text-xl font-bold italic"
          variant="primary-active"
          shadow="onHover"
        >
          Coming Soon
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {networks.map((network) => (
          <NetworkCard {...network} />
        ))}
      </div>
    </div>
  );
};
