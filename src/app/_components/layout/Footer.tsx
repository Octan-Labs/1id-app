import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex justify-center px-24", className)}>
      <div className="max-w-screen-2xl">
        <Card variant="primary">
          <CardContent className="flex flex-col-reverse items-center gap-4 py-8 lg:grid lg:grid-cols-9 lg:items-center">
            <div className="col-span-2">
              <Link
                className={cn(
                  buttonVariants(),
                  "rounded-none text-xl font-bold italic",
                )}
                target="_blank"
                href="https://mirror.xyz/0xC0e09A112Ae45d87597CD78c11b7D95a55aCC5F0/pWO_AAM9ZJzO0_HjyBztiUnGMZe9wJ7c0MWJr0x8adE"
              >
                Subscription
              </Link>
            </div>
            <div className="col-span-5 flex flex-col items-center gap-2">
              <div className="flex items-center gap-4">
                <Link
                  href="https://twitter.com/1IDnetwork"
                  target="_blank"
                  className="h-full w-full"
                >
                  <img src="img/icon/x.svg" alt="" className="h-full w-full" />
                </Link>
                <Link href="#" target="_blank" className="h-full w-full">
                  <img src="img/icon/discord.svg" alt="" />
                </Link>
                <Link
                  href="https://t.me/onchainreputation1id"
                  target="_blank"
                  className="h-full w-full"
                >
                  <img src="img/icon/telegram.svg" alt="" />
                </Link>
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
