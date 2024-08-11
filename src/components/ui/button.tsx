import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-secondary hover:bg-secondary/85 active:bg-secondary/70 border-black",
        outline:
          "bg-background hover:brightness-90 active:brightness-80 border-black",
        primary:
          "bg-primary hover:bg-primary/85 active:bg-primary/70 border-black",
        "primary-active":
          "bg-primary-active hover:bg-primary-active/85 active:bg-primary-active/70 border-black",
        accent: "bg-accent hover:bg-accent/85 active:bg-accent/70 border-black",
        destructive:
          "bg-destructive hover:bg-destructive/85 active:bg-destructive/70 border-black",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        none: "bg-none border-transparent shadow-none",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      shadow: {
        default: "shadow-neo",
        onHover:
          "shadow-none hover:border-2 hover:shadow-neo active:shadow-neo",
      },
      size: {
        default: "border-2 py-2.5 px-4",
        rounded: "border-2 rounded-full px-5 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      shadow: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, shadow, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shadow, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
