"use client";
import { Button } from "~/components/ui/button";
import { ChainFilter } from "./ChainFilter";
import { NetworkCard, NetworkCardProps } from "./NetworkCard";
import { useEffect, useMemo, useState } from "react";
import { api } from "~/trpc/react";
import { useAccount } from "wagmi";

// const networks: NetworkCardProps[] = [
//   {
//     address: "0x79eBC9A2ce02277A4b5b3A768b1C0A4ed75Bd936",
//     name: "CATGIRL",
//     href: "https://www.catgirl.io/",
//     logo: "img/logo/catgirl-token.png",
//     token: "CATGIRL",
//     // startTime: new Date(1724112000000),
//     startTime: new Date(1723270798000),
//     endTime: new Date(1724716800000),
//     totalStaked: 666000000,
//     requirements: ["Twitter", "Discord", "BNB RS"],
//   },
//   {
//     address: "0x000000000000000001",
//     name: "1ID",
//     href: "#",
//     logo: "img/logo/1id.svg",
//     token: "1ID",
//     requirements: ["Twitter", "Discord", "BNB RS"],
//   },
//   {
//     address: "0x000000000000000002",
//     name: "Octan",
//     href: "#",
//     logo: "img/logo/octan.svg",
//     token: "OCTAN",
//     requirements: ["Twitter", "Discord", "BNB RS"],
//   },
// ];
const data = [
  {
    campaignId: "01919720-3d2c-7aaf-92a5-f2329b9175c6",
    address: "0x00000000000000000000000000",
    name: "Octan 1",
    href: "#",
    logo: "/img/logo/octan.svg",
    token: "OCTAN",
    startTime: new Date("2024-08-01T00:00:00.000Z"),
    endTime: new Date("2024-08-02T00:00:00.000Z"),
    totalStaked: 0,
    requirements: null,
    claimed: null,
  },
  {
    campaignId: "01919720-3d2c-7aaf-92a6-00417dbaba51",
    address: "0x00000000000000000000000001",
    name: "1ID 1",
    href: "#",
    logo: "/img/logo/1id.svg",
    token: "1ID",
    startTime: new Date("2024-08-01T00:00:00.000Z"),
    endTime: new Date("2024-08-02T00:00:00.000Z"),
    totalStaked: 0,
    requirements: null,
    claimed: null,
  },
  {
    campaignId: "01919720-3d2c-7aaf-92a5-eaa320ef74d2",
    address: "0x79eBC9A2ce02277A4b5b3A768b1C0A4ed75Bd936",
    name: "Catgirl",
    href: "https://catgirl.io",
    logo: "/img/logo/catgirl-token.png",
    token: "CATGIRL",
    startTime: new Date("2024-08-24T00:00:00.000Z"),
    endTime: new Date("2024-09-25T00:00:00.000Z"),
    totalStaked: 681000000000,
    requirements: ["BNB RS"],
    claimed: null,
  },
  {
    campaignId: "01919720-3d2c-7aaf-92a5-fbcc6988eb44",
    address: "0x00000000000000000000000000",
    name: "Octan 2",
    href: "#",
    logo: "/img/logo/octan.svg",
    token: "OCTAN",
    startTime: null,
    endTime: null,
    totalStaked: 0,
    requirements: null,
    claimed: null,
  },
  {
    campaignId: "01919720-3d2d-7aaf-92a6-0a5b3f2dc5fb",
    address: "0x00000000000000000000000000",
    name: "1ID 2",
    href: "#",
    logo: "/img/logo/octan.svg",
    token: "OCTAN",
    startTime: null,
    endTime: null,
    totalStaked: 0,
    requirements: null,
    claimed: null,
  },
];
export const Networks = () => {
  const [listing, setListing] = useState<
    "all" | "on-going" | "ended" | "coming-soon"
  >("all");
  // const { data, refetch } = api.campaign.allCampaigns.useQuery();
  // const { isConnected } = useAccount();

  // TODO: There is a desync issue between walletconenct and nextauth session.
  // This does not fix the issue, look into a way to sync the two providers.
  // Or look into a way to reload the page when the walletconnect session changes.
  // useEffect(() => {
  //   refetch();
  // }, [isConnected, refetch]);

  const replacer = (_key: any, value: any) =>
    typeof value === "bigint" ? { $bigint: value.toString() } : value;

  // console.log("AA", JSON.stringify(data, replacer));

  const filteredNetworks = useMemo(
    () =>
      data?.filter((network) => {
        if (listing === "on-going") {
          return (
            network.startTime &&
            network.startTime < new Date() &&
            network.endTime &&
            network.endTime > new Date()
          );
        }
        if (listing === "ended") {
          return (
            network.endTime &&
            network.endTime < new Date() &&
            network.totalStaked &&
            network.totalStaked > 0
          );
        }
        if (listing === "coming-soon") {
          return (
            (network.startTime && network.startTime > new Date()) ??
            !network.totalStaked
          );
        }
        return true;
      }),
    [data, listing],
  );

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <ChainFilter />
        <Button
          className="rounded-full text-xl font-bold italic"
          variant={listing === "on-going" ? "outline" : "primary-active"}
          shadow={listing === "on-going" ? "default" : "onHover"}
          onClick={() => {
            if (listing === "on-going") {
              setListing("all");
            } else {
              setListing("on-going");
            }
          }}
        >
          On-going
        </Button>
        <Button
          className="rounded-full text-xl font-bold italic"
          variant={listing === "ended" ? "outline" : "primary-active"}
          shadow={listing === "ended" ? "default" : "onHover"}
          onClick={() => {
            if (listing === "ended") {
              setListing("all");
            } else {
              setListing("ended");
            }
          }}
        >
          Expired
        </Button>
        <Button
          className="rounded-full text-xl font-bold italic"
          variant={listing === "coming-soon" ? "outline" : "primary-active"}
          shadow={listing === "coming-soon" ? "default" : "onHover"}
          onClick={() => {
            if (listing === "coming-soon") {
              setListing("all");
            } else {
              setListing("coming-soon");
            }
          }}
        >
          Coming Soon
        </Button>
      </div>
      {filteredNetworks?.length ? (
        <div className="grid grid-cols-1 gap-4 pt-2 lg:grid-cols-2 xl:grid-cols-3">
          {filteredNetworks?.map((network) => (
            <NetworkCard
              key={network.campaignId}
              {...network}
              claimed={!!network.claimed}
              requirements={network.requirements as string[]}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex-col items-center pt-2">
          <h1 className="text-center text-4xl font-bold">
            No Airdrop Currently Available
          </h1>
          <p className="text-center text-lg">Please check back later</p>
        </div>
      )}
    </div>
  );
};
