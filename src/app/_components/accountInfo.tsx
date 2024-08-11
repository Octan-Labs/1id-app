"use client";
import { useAccount } from "wagmi";

export function AccountInfo() {
  const { status, addresses } = useAccount();

  return <div>{status + " " + " " + addresses}</div>;
}
