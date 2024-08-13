import { FC, ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col pb-6">
      <Header />
      <main className="flex justify-center px-6 py-14 text-text md:px-24">
        <div className="w-full max-w-screen-2xl">{children}</div>
      </main>
      <Footer className="mt-auto"/>
    </div>
  );
};
