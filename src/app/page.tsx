import { Networks } from "./_components/Networks";

export default function Home() {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <h1 className="text-5xl font-[900] uppercase italic">Airdrop</h1>
          <h2 className="leading-6 text-black">
            Got potential? Money&apos;s yours to get, no sweat
            <br />
            Claim 1 & Get 1 free
          </h2>
        </div>
        <div>
          <img
            className="h-[176px] w-[176px] object-cover"
            src="/img/homepage-1.gif"
            alt=""
          />
        </div>
      </div>
        <Networks />
    </div>
  );
}
