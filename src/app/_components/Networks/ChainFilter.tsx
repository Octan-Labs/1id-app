"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Triangle } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

const chains = [
  // {
  //   value: "ETH",
  //   label: "Ethereum",
  // },
  {
    value: "BSC",
    label: "BNB",
  },
];

export function ChainFilter() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="accent"
          shadow="onHover"
          size="rounded"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-xl font-bold italic"
        >
          <img src="img/icon/dice4.svg" alt="" className="h-8 w-8" />
          {value
            ? chains.find((chain) => chain.value === value)?.label
            : "All Chains"}
          <Triangle className="h-3 w-3 shrink-0 rotate-180 fill-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search chains..." />
          <CommandList>
            <CommandEmpty>No chain found.</CommandEmpty>
            <CommandGroup>
              {chains.map((chain) => (
                <CommandItem
                  key={chain.value}
                  value={chain.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === chain.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {chain.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
