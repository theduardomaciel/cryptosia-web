import React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {} /* ,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
} */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <button
                className={cn(
                    "p-2 bg-black rounded-md items-center justify-center gap-2.5 inline-flex font-title w-full hover:outline-3 hover:outline hover:outline-white transition hover:brightness-110",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
