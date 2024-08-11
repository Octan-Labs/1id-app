import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex justify-center px-24", className)}>
      <div className="max-w-screen-2xl">
        <Card variant="primary">
          <CardContent className="flex flex-col-reverse items-center gap-4 py-8 lg:grid lg:grid-cols-9 lg:items-center">
            <div className="col-span-2">
              <Button className="rounded-none text-xl font-bold italic">
                Subscription
              </Button>
            </div>
            <div className="col-span-5 flex flex-col items-center gap-2">
              <div className="flex gap-4">
                <img src="img/icon/x.svg" alt="" />
                <img src="img/icon/discord.svg" alt="" />
                <img src="img/icon/telegram.svg" alt="" />
              </div>
              <span className="text-center text-lg font-bold">
                Consider yourself lucky if you get a response
              </span>
            </div>
            <span className="col-span-2 text-center lg:text-right">
              Donate for this Social Goods, if you think onchain reputation is
              important. We highly appreciate your support.
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
