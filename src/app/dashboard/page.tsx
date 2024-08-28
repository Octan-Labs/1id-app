"use client";
import UnauthenticatedDashboard from "./_components/UnauthenticatedDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Profile } from "./_components/Profile";
// import { api } from "~/trpc/react";
import { Reputation } from "./_components/Reputation";
import { useAccount } from "wagmi";

export default function Page() {
  return <Dashboard />;
}

const Dashboard = () => {
  const { isConnected } = useAccount();
  // const { data: me } = api.user.me.useQuery();
  return (
    <>
      {isConnected ? (
        <div>
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-black uppercase italic">
                DASHBOARD
              </h1>
              <h2 className="leading-6 text-black">
                Sew Your Bag, Grab Your Rewards
              </h2>
            </div>
            <div>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="pb-8">
                  <TabsTrigger
                    className="px-8 text-lg font-bold"
                    value="profile"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    className="px-8 text-lg font-bold"
                    value="reputation"
                  >
                    Reputation
                  </TabsTrigger>
                  <TabsTrigger
                    className="px-8 text-lg font-bold"
                    value="community"
                  >
                    Community
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <Profile me={null} />
                </TabsContent>
                <TabsContent value="reputation">
                  <Reputation />
                </TabsContent>
                <TabsContent value="community">asdsa</TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      ) : (
        <UnauthenticatedDashboard />
      )}
    </>
  );
};
