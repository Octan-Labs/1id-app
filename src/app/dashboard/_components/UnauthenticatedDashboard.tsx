import { Button } from "~/components/ui/button";

export default function UnauthenticatedDashboard() {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-[900] uppercase italic">
            Bundle Your On-Chain Power
          </h1>
          <h2 className="leading-6 text-black">
            Don't Let Your On-Chain Moves Go to Waste, Let the World Know They
            Matter, 1ID Will Amplify Your Voice
          </h2>
          <Button className="w-fit rounded-none text-xl font-bold">
            Connect
          </Button>
        </div>
        <div>
          <img
            className="h-[337px] w-[337px] object-cover"
            src="/img/homepage-1.gif"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
