import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent } from "~/components/ui/card";

const walletList = [
  {
    address: "0x15542f002D89DFa0564f6Fe5313d27C55A8a41D1",
  },
  {
    address: "0x15542f002D89DFa0564f6Fe5313d27C55A8a41D2",
  },
  {
    address: "0x15542f002D89DFa0564f6Fe5313d27C55A8a41D3",
  },
  {
    address: "0x15542f002D89DFa0564f6Fe5313d27C55A8a41D4",
  },
];

export const Reputation = () => {
  return (
    <div className="grid grid-cols-1 divide-x-2 divide-black md:grid-cols-12">
      <div className="col-span-5 flex flex-col gap-2 pr-12">
        <div className="grid w-full gap-6">
          <div className="grid w-full items-center gap-3">
            <WalletInput />
          </div>
          <div className="grid w-full items-center gap-6"></div>
        </div>
        <div className="grid gap-2">
          <Label>Wallet List</Label>
          {walletList.map((wallet, index) => (
            <div key={index} className="flex w-full items-center">
              <Button className="w-full justify-start" variant="outline">
                {wallet.address}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-7 pl-12">
        <Rewards />
      </div>
    </div>
  );
};

const WalletInput = () => {
  const [wallet, setWallet] = useState("");
  return (
    <>
      <Label htmlFor="wallet">Import new wallet</Label>
      <Input
        type="text"
        id="wallet"
        placeholder="Enter Wallet"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      <Button className="w-fit rounded-none text-xl font-semibold italic">
        Import
      </Button>
    </>
  );
};

const rewards = [
  {
    id: 1,
    campaign: "Octan Network airdrop",
    bonus: "10000",
    status: "Claimed",
  },
  {
    id: 2,
    campaign: "1ID AirDrop",
    bonus: "500",
    status: "Unclaimed",
  },
  {
    id: 3,
    campaign: "1ID Referral",
    bonus: "500",
    status: "Unclaimed",
  },
  {
    id: 4,
    campaign: "Farming",
    bonus: "500",
    status: "Unclaimed",
  },
];

const chains = [
  {
    id: 1,
    name: "Ethereum",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032",
  },
  {
    id: 2,
    name: "Binance Smart Chain",
    icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=032",
  },
  {
    id: 3,
    name: "Polygon",
    icon: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032",
  },
  {
    id: 4,
    name: "Avalanche",
    icon: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=032",
  },
  {
    id: 5,
    name: "Fantom",
    icon: "https://cryptologos.cc/logos/fantom-ftm-logo.svg?v=032",
  },
];

const chainRewards = [
  {
    tag: "ETH RS",
    amount: "100000",
    rank: "68532325",
    rankTotal: "150235000",
    expiredDate: "07/19/2024",
  },
  {
    tag: "DeFi RS",
    amount: "Updating",
    rank: "Updating",
    rankTotal: "Updating",
  },
  {
    tag: "Meme RS",
    amount: "N/A",
    rank: "N/A",
    rankTotal: "N/A",
    expiredDate: "N/A",
  },
  {
    tag: "NFT RS",
    amount: "N/A",
    rank: "N/A",
    rankTotal: "N/A",
    expiredDate: "N/A",
  },
];

const Rewards = () => {
  return (
    <div>
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="flex w-fit gap-0 rounded-md border-2 border-black">
          <div className="p-2">Select a chains</div>
          {chains.map((chain, index) => (
            <TabsTrigger
              key={index}
              className="mx-0 flex w-12 items-center rounded-l-none rounded-r-md border-b-0 border-l-2 border-r-0 border-t-0 px-0"
              value={chain.id.toString()}
            >
              <img src={chain.icon} alt={chain.name} className="h-6 w-6" />
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="1" className="grid gap-2">
          <Card className="w-full rounded py-4 pb-0">
            <CardContent className="grid gap-2">
              <div className="flex justify-between">
                <Badge
                  className="border-lime-600 bg-primary text-base font-bold"
                  variant="primary"
                >
                  {chainRewards.at(0)?.tag}
                </Badge>
                <span className="text-md font-bold text-lime-500">
                  {(100000).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-md font-bold">Rank</span>
                <span>
                  <span className="text-md font-bold">
                    {(68532325).toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}
                  </span>{" "}
                  /{" "}
                  {(150235000).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-md font-bold">Expired Date</span>
                <span className="text-md font-bold">07/19/2024</span>
              </div>
              <Button className="rounded-none py-1 text-lg font-bold italic">
                Extend
              </Button>
            </CardContent>
          </Card>
          <Card className="w-full rounded py-4 pb-0">
            <CardContent className="grid gap-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    className="border-lime-600 bg-primary text-base font-bold"
                    variant="primary"
                  >
                    {chainRewards.at(0)?.tag}
                  </Badge>
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00395 11.7457L9.00389 11.7455C8.88102 11.3391 8.60325 10.3712 8.3557 9.25434C8.10998 8.14572 7.88583 6.85479 7.88583 5.81583C7.88583 5.06075 8.12413 4.44568 8.52734 4.01468C8.92815 3.58625 9.46646 3.36844 10.0061 3.3674C10.5459 3.36636 11.0851 3.58224 11.4866 4.01094C11.8904 4.44207 12.1283 5.0583 12.1283 5.81583V5.81604C12.1279 6.86259 11.8914 8.17748 11.6385 9.29465C11.3836 10.421 11.1028 11.3851 10.9981 11.7415L9.00395 11.7457ZM9.00395 11.7457C9.14238 12.2029 9.48853 12.6182 10.0077 12.6146M9.00395 11.7457L10.0077 12.6146M10.0077 12.6146C10.5239 12.6109 10.8652 12.1947 10.9981 11.7417L10.0077 12.6146ZM0.5 10.5C0.5 5.25364 4.75364 1 10 1C15.2464 1 19.5 5.25364 19.5 10.5C19.5 15.7464 15.2464 20 10 20C4.75364 20 0.5 15.7464 0.5 10.5ZM8.18333 15.5C8.18333 16.5235 8.90982 17.3833 10 17.3833C10.5334 17.3833 10.9984 17.1799 11.3268 16.8238C11.6514 16.4719 11.8167 16 11.8167 15.5C11.8167 14.9918 11.6529 14.5178 11.3249 14.1661C10.9936 13.8107 10.5278 13.6167 10 13.6167C8.94304 13.6167 8.18333 14.4427 8.18333 15.5Z"
                      fill="#FF6D01"
                      stroke="#1E1E1E"
                    />
                  </svg>
                </div>
                <span>Updating</span>
              </div>
              <div className="flex justify-between">
                <span className="text-md font-bold">Rank</span>
                <span>Updating</span>
              </div>
              <div className="flex justify-between">
                <span className="text-md font-bold">Expired Date</span>
                <span className="">Updating</span>
              </div>
              <Button className="rounded-none py-1 text-lg font-bold italic">
                Subscribe
              </Button>
            </CardContent>
          </Card>
          <Card className="w-full rounded bg-slate-300 py-4 pb-0">
            <CardContent className="grid gap-2">
              <div className="flex justify-between">
                <Badge
                  className="border-lime-600 bg-primary text-base font-bold"
                  variant="primary"
                >
                  {chainRewards.at(2)?.tag}
                </Badge>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-md font-bold">Rank</span>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-md font-bold">Expired Date</span>
                <span className="">N/A</span>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full rounded bg-slate-300 py-4 pb-0">
            <CardContent className="grid gap-2">
              <div className="flex justify-between">
                <Badge
                  className="border-lime-600 bg-primary text-base font-bold"
                  variant="primary"
                >
                  {chainRewards.at(3)?.tag}
                </Badge>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-md font-bold">Rank</span>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-md font-bold">Expired Date</span>
                <span className="">N/A</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
