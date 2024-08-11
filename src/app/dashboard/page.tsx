"use client";
import UnauthenticatedDashboard from "./_components/UnauthenticatedDashboard";
import { useAccount } from "wagmi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Profile } from "./_components/Profile";

export default function Dashboard() {
  const account = useAccount();
  return (
    <>
      {account.address ? (
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
                <TabsList>
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
                  <Profile />
                </TabsContent>
                <TabsContent value="reputation">
                  Change your password here.
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
}
