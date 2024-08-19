"use client";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { CountDownTimer } from "./CountDownTimer";
import { middleEllipsis } from "../../../lib/stringUtils";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import { useAccount } from "wagmi";
import { api } from "~/trpc/react";

export interface NetworkCardProps {
  campaignId: string;
  address: string;
  name: string;
  href: string;
  logo?: string | null;
  token?: string;
  startTime?: Date | null;
  endTime?: Date | null;
  totalStaked?: number;
  remainingRewards?: number;
  requirements?: string[];
  variant?: "default" | "tbd";
  claimed: boolean;
}

export const NetworkCard = ({
  campaignId,
  address,
  name,
  href,
  logo,
  token,
  startTime,
  endTime,
  totalStaked,
  requirements,
  claimed,
}: NetworkCardProps) => {
  const now = new Date();
  const { mutate, isPending, isSuccess } =
    api.campaign.whitelistWallet.useMutation();

  const claimToken = () => {
    mutate({ campaignId });
    api.campaign.allCampaigns.useQuery().refetch();
  };

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between">
        <div className="flex items-start gap-4">
          <img src={logo ?? ""} className="h-10 w-10" alt="" />
          <div className="flex flex-col">
            <div className="group inline-flex">
              <Link
                href={href}
                target="_blank"
                className="text-xl font-bold text-blue-600 group-hover:underline"
              >
                {name}
              </Link>
              <SquareArrowOutUpRight className="hidden h-3 min-h-3 w-3 min-w-3 text-blue-600 group-hover:flex" />
            </div>
            <Badge variant="outline">{middleEllipsis(address, 12)}</Badge>
          </div>
        </div>
        <img className="-translate-y-1" src="img/icon/binanceCoin.png" alt="" />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <Progress
            value={
              startTime && endTime
                ? now > startTime
                  ? now < endTime
                    ? ((now.getTime() - startTime.getTime()) /
                        (endTime.getTime() - startTime.getTime())) *
                      100
                    : 100
                  : 0
                : 0
            }
          />
          <div className="flex justify-between">
            <div>
              {totalStaked ? (
                <>
                  <span className="font-bold">
                    {totalStaked?.toLocaleString()}
                  </span>{" "}
                  {token} (total)
                </>
              ) : (
                "TBD"
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 font-semibold">
          Require:{" "}
          {requirements?.length ? (
            <ul className="flex flex-wrap gap-2">
              {requirements?.map((requirement) => (
                <li key={requirement}>
                  <Badge
                    className="border-lime-600 bg-primary text-base font-bold"
                    variant="primary"
                  >
                    {requirement}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            "TBD"
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <span>
          {startTime && endTime ? (
            <CountDownTimer startTime={startTime} endTime={endTime} />
          ) : (
            <div className="text-lg font-bold">TBD</div>
          )}
        </span>
        <ClaimButton
          claimStatus={
            isSuccess || claimed
              ? "claimed"
              : startTime && endTime
                ? now < startTime
                  ? "not started"
                  : endTime < now
                    ? "ended"
                    : "started"
                : "not started"
          }
          isPending={isPending}
          onClick={claimToken}
        />
      </CardFooter>
    </Card>
  );
};

const ClaimButton = ({
  claimStatus,
  onClick,
  isPending,
}: {
  claimStatus: "not started" | "started" | "ended" | "claimed";
  onClick: () => void;
  isPending: boolean;
}) => {
  const { status } = useAccount();
  const { open } = useWeb3Modal();
  return (
    <Button
      onClick={() => {
        if (status === "disconnected") {
          return open();
        }
        onClick();
      }}
      disabled={
        status === "connecting" || claimStatus !== "started" || isPending
      }
      className="rounded-none text-lg font-bold italic"
    >
      {status === "connecting"
        ? "Connecting..."
        : isPending
          ? "Claiming..."
          : {
              "not started": "Coming Soon",
              started: "Whitelist",
              ended: "Ended",
              claimed: "Whitelisted",
            }[claimStatus]}
    </Button>
  );
};
