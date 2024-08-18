import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export const Profile = ({
  me,
}: {
  me?: {
    id: string;
    email: string;
  } | null;
}) => {
  return (
    <div className="grid grid-cols-1 divide-x-2 divide-black md:grid-cols-12">
      <div className="col-span-5 grid gap-4 pr-12">
        <div className="flex w-full items-center gap-2">
          <img
            className="h-14 w-14 rounded-full bg-gray-300"
            src="https://i.pravatar.cc/300"
            alt=""
          />
          <div className="">
            <div className="text-2xl font-bold">Octan Network</div>
            <Badge variant="outline">
              Refferal link:&nbsp;
              <span className="select-all align-text-bottom font-semibold text-blue-500 hover:cursor-copy hover:underline">
                {"https://1id.network/1|D#12345"}
              </span>
            </Badge>
          </div>
        </div>
        <div className="grid w-full gap-6">
          <div className="grid w-full items-center gap-3">
            {me?.email ? (
              <EmailInput email={me?.email ?? ""} />
            ) : (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            )}
          </div>
          <div className="grid w-full items-center gap-6">
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
                <span>@Longnguyen123</span>
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
            <Button
              className="rounded-none text-xl font-semibold"
              variant="primary-active"
            >
              Send a code
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-7 pl-12">
        <Rewards />
      </div>
    </div>
  );
};

const EmailInput = ({ email }: { email: string }) => {
  const { mutate, isPending } = api.user.verifyEmail.useMutation();
  const [newEmail, setNewEmail] = useState(email);
  return (
    <>
      <Label htmlFor="email">Email Address</Label>
      <Input
        type="email"
        id="email"
        placeholder="Enter Your Email"
        value={newEmail}
        disabled={isPending}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <Button
        className="w-fit rounded-none text-xl font-semibold italic"
        onClick={() => {
          mutate({ email: newEmail || "" });
        }}
      >
        {isPending ? "Sending..." : "Send a code"}
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

const Rewards = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">1ID Reward</span>
        <div className="flex items-center gap-5">
          <Badge
            className="border-lime-600 bg-primary text-2xl font-bold text-lime-600"
            variant="primary"
          >
            500
          </Badge>
          <Button className="rounded-none py-2 text-xl font-bold">
            Claim Reward
          </Button>
        </div>
      </div>
      <table className="mt-6 w-full">
        <thead>
          <tr className="text-lg font-bold">
            <th className="text-left">#</th>
            <th className="text-left">Campaign</th>
            <th className="text-left">Bonus</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((reward) => (
            <tr key={reward.id} className="text-base">
              <td>{reward.id}</td>
              <td>{reward.campaign}</td>
              <td>{reward.bonus}</td>
              <td>{reward.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
