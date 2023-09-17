import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-black px-3 py-2 text-sm ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

const InputRoot = React.forwardRef<HTMLDivElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "flex flex-col items-start justify-start gap-2",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
InputRoot.displayName = "InputRoot";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

const labelVariants = cva(
    "font-medium leading-none lg:leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const InputLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
        VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(
            "text-black text-lg lg:text-base font-normal font-serif",
            labelVariants(),
            className
        )}
        {...props}
    />
));
InputLabel.displayName = LabelPrimitive.Root.displayName;

export interface InputHeaderProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const InputHeader = React.forwardRef<HTMLDivElement, InputHeaderProps>(
    ({ className, icon, children, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "flex flex-row items-center justify-start w-full gap-2",
                    className
                )}
                ref={ref}
                {...props}
            >
                {icon}
                <InputLabel>{children}</InputLabel>
            </div>
        );
    }
);
InputHeader.displayName = "InputHeader";

export { Input, InputRoot, InputLabel, InputHeader };
