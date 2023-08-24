"use client";
import clsx from "clsx";
import { useSearchParams, useRouter } from "next/navigation";

import { ChevronDownIcon } from "@radix-ui/react-icons";

interface SectionProps {
    id: string;
    name: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    isisExpanded?: boolean;
}

export default function Section({
    id,
    name,
    icon,
    children,
    className,
}: SectionProps) {
    const router = useRouter();

    const searchParams = useSearchParams();
    const currentSection = searchParams?.get("app");
    const isExpanded =
        currentSection == id || (!currentSection && id == "public-key");

    return (
        <li
            className={clsx(
                "transition hover:bg-gray-100 dark:hover:bg-dark-gray-300 bg-gray-200 dark:bg-dark-gray-400 w-full",
                {
                    "bg-dark-gray-300 border border-dark-gray-100": isExpanded,
                },
                className
            )}
        >
            {/* Header */}
            <div
                className="cursor-pointer transition flex flex-row px-5 items-center justify-between w-full h-fit py-5 gap-x-3"
                onClick={
                    () => router.replace(`?app=${id}`, { scroll: false })
                    /* isExpanded
                        ? router.replace("/", { scroll: false })
                        : router.replace(`?app=${id}`, { scroll: false }) */
                }
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
                        "transform rotate-180": isExpanded,
                    })}
                />
            </div>
            {/* Content */}
            <div
                className={clsx(
                    "px-5 pt-0 overflow-hidden transition-[max-height,opacity] duration-700 max-h-0 bg-primary-200",
                    {
                        "max-h-[50rem]": isExpanded,
                        "max-h-0": !isExpanded,
                    }
                )}
            >
                {children && children}
            </div>
        </li>
    );
}
