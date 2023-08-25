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

    // O uso da tag !important (! no tailwind) é necessário para sobrescrever o "lg:max-w-fit" quando houver animação, visto que já existe um valor definido para o mesmo na versão mobile
    return (
        <li
            className={clsx(
                "flex flex-col lg:flex-row group aria-expanded:hover:bg-primary-200 aria-expanded:dark:hover:bg-gray-100 bg-white-200 dark:bg-gray-200 dark:bg-dark-gray-400 w-full lg:max-w-fit lg:h-96 overflow-hidden ease-in-out flex-grow lg:transition-[max-width] lg:duration-700",
                {
                    "lg:!max-w-[50rem]": isExpanded,
                    "lg:!max-w-[10rem]": !isExpanded,
                },
                className
            )}
            aria-expanded={!isExpanded}
        >
            {/* Header */}
            <div
                className="group-aria-expanded:cursor-pointer transition flex flex-row px-5 items-center lg:items-end justify-between lg:w-40 py-5 gap-x-3"
                onClick={
                    () => router.replace(`?app=${id}`, { scroll: false })
                    /* isExpanded
                        ? router.replace("/", { scroll: false })
                        : router.replace(`?app=${id}`, { scroll: false }) */
                }
            >
                <div className="flex flex-row flex-wrap items-center justify-start gap-x-6">
                    {icon}
                    <p className="text-text-100 font-bold font-title leading-tight text-2xl break-words overflow-ellipsis">
                        {name}
                    </p>
                </div>
            </div>
            {/* Content */}
            <div
                className={clsx(
                    "max-md:px-5 pt-0 overflow-hidden transition-[max-height,opacity] duration-700 bg-primary-100 dark:bg-primary-200 flex-1",
                    {
                        "max-lg:max-h-[50rem]": isExpanded,
                        "max-lg:max-h-0": !isExpanded,
                    }
                )}
            >
                {children && children}
            </div>
        </li>
    );
}
