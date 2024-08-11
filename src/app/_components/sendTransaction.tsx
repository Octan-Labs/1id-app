"use client";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { Button } from "~/components/ui/button";

export function SendButton() {
  const { sendTransaction, error, status, data } = useSendTransaction();

  return (
    <Button
      onClick={() =>
        sendTransaction({
          to: "0x15542f002D89DFa0564f6Fe5313d27C55A8a41D1",
          value: parseEther("0.00"),
        })
      }
    >
      Send transaction
      {error?.message}
      {status}
      {data}
    </Button>
  );
}
