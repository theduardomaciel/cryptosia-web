"use client";
import { useState } from "react";
import clsx from "clsx";

import { ChevronDownIcon } from "@radix-ui/react-icons";

interface SectionProps {
    name: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export default function Section({
    name,
    icon,
    children,
    className,
}: SectionProps) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded((current) => !current);

    return (
        <li
            className={clsx(
                "transition hover:bg-gray-100 dark:hover:bg-dark-gray-300 bg-gray-200 dark:bg-dark-gray-400 w-full",
                {
                    "bg-dark-gray-300 border border-dark-gray-100": expanded,
                },
                className
            )}
        >
            {/* Header */}
            <div
                className="cursor-pointer transition flex flex-row px-5 items-center justify-between w-full h-fit py-5 gap-x-3"
                onClick={toggleExpanded}
            >
                <div className="flex flex-row flex-wrap items-center justify-start gap-x-6">
                    {icon}
                    <p className="text-text-100 font-bold font-title leading-tight text-2xl">
                        {name}
                    </p>
                </div>
                <ChevronDownIcon
                    width={18}
                    height={18}
                    color="var(--text-200)"
                    className={clsx("min-w-[18px] transition-transform", {
                        "transform rotate-180": expanded,
                    })}
                />
            </div>
            {/* Content */}
            <div
                className={clsx(
                    "px-5 pt-0 overflow-hidden transition-[max-height,opacity] max-h-0 bg-primary-01",
                    {
                        "max-h-[50rem] opacity-100": expanded,
                        "max-h-0 opacity-0": !expanded,
                    }
                )}
            >
                {children && children}
            </div>
        </li>
    );
}
