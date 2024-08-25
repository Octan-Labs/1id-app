// src/db/seed.ts
import { airdropCampaigns } from "./schema";
import { db } from ".";

const main = async () => {
  const data: (typeof airdropCampaigns.$inferInsert)[] = [
    {
      address: "0x79eBC9A2ce02277A4b5b3A768b1C0A4ed75Bd936",
      name: "Catgirl",
      href: "https://catgirl.io",
      logo: "/img/logo/catgirl-token.png",
      token: "CATGIRL",
      startTime: new Date("2024-08-24 00:00:00+00"),
      endTime: new Date("2024-08-28 00:00:00+00"),
      totalStaked: BigInt(681000000000),
      requirements: ["BNB RS"],
    },
    {
      address: "0x00000000000000000000000000",
      name: "Octan 1",
      href: "#",
      logo: "/img/logo/octan.svg",
      token: "OCTAN",
      startTime: new Date("2024-08-01 00:00:00+00"),
      endTime: new Date("2024-08-02 00:00:00+00"),
      totalStaked: BigInt(0),
      requirements: null,
    },
    {
      address: "0x00000000000000000000000000",
      name: "Octan 2",
      href: "#",
      logo: "/img/logo/octan.svg",
      token: "OCTAN",
      startTime: null,
      endTime: null,
      totalStaked: BigInt(0),
      requirements: null,
    },
    {
      address: "0x00000000000000000000000001",
      name: "1ID 1",
      href: "#",
      logo: "/img/logo/1id.svg",
      token: "1ID",
      startTime: new Date("2024-08-01 00:00:00+00"),
      endTime: new Date("2024-08-02 00:00:00+00"),
      totalStaked: BigInt(0),
      requirements: null,
    },
    {
      address: "0x00000000000000000000000000",
      name: "1ID 2",
      href: "#",
      logo: "/img/logo/octan.svg",
      token: "OCTAN",
      startTime: null,
      endTime: null,
      totalStaked: BigInt(0),
      requirements: null,
    },
  ];

  await db.insert(airdropCampaigns).values(data).execute();
};

console.log("Seed start");
await main();
console.log("Seed done");
