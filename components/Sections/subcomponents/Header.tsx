"use client";

import { cn } from "@/lib/utils";
import type { Subsection } from "./MultisectionWrapper";

interface Props {
    index: number;
    amount: number;
    subsection: Subsection;
}

export default function SectionHeader({ index, amount, subsection }: Props) {
    return (
        <div
            className={cn(
                "flex min-w-full flex-col items-start justify-start gap-2.5 transition-[500ms]",
                {
                    "items-center justify-center": index == amount - 1,
                }
            )}
        >
            <h3 className="text-black text-2xl font-extrabold font-title leading-tight pointer-events-none inline-flex items-center justify-start flex-row gap-3">
                {index != amount - 1 && `${index + 1}.`} {subsection.title}
            </h3>
            <div className="border-b w-full border-b-black rounded" />
            <div className="flex flex-col items-start justify-start gap-2.5">
                {subsection.description instanceof Array ? (
                    subsection.description.map((description) => (
                        <SectionDescription>{description}</SectionDescription>
                    ))
                ) : (
                    <SectionDescription>
                        {subsection.description}
                    </SectionDescription>
                )}
            </div>
        </div>
    );
}

{
    /* {index !== 0 && (
    <span>
        <ArrowLeftIcon
            color="black"
            width={24}
            height={24}
        />
    </span>
)} */
}

export function SectionDescription({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <p className="text-black text-lg lg:text-base font-normal font-serif leading-none lg:leading-none whitespace-pre-line">
            {children}
        </p>
    );
}
