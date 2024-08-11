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
import { toPercent } from "~/lib/numberUtils";

export interface NetworkCardProps {
  address: string;
  name: string;
  logo: string;
  endTime: Date;
  totalStaked: number;
  remainingRewards: number;
  requirements: string[];
}

export const NetworkCard = ({
  address,
  name,
  logo,
  endTime,
  totalStaked,
  remainingRewards,
  requirements,
}: NetworkCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between">
        <div className="flex items-start gap-4">
          <img src={logo} className="h-10 w-10" alt="" />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{name}</span>
            <Badge variant="outline">{middleEllipsis(address, 12)}</Badge>
          </div>
        </div>
        <img className="-translate-y-1" src="img/icon/binanceCoin.png" alt="" />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <Progress
            value={toPercent(totalStaked - remainingRewards, totalStaked)}
          />
          <div className="flex justify-between">
            <div>
              <span className="font-bold">{totalStaked}</span> OCTA (total)
            </div>
            <div>
              <span className="font-bold">{remainingRewards}</span> OCTA left
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 font-semibold">
          Require:
          <ul className="flex flex-wrap gap-2">
            {requirements.map((requirement) => (
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
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>
          <CountDownTimer endTime={endTime} />
        </span>
        <Button className="rounded-none text-lg font-bold italic">Claim</Button>
      </CardFooter>
    </Card>
  );
};
