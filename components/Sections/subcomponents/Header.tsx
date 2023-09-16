"use client";

import type { Subsection } from "./Wrapper";

interface Props {
    index: number;
    subsection: Subsection;
}

export default function SectionHeader({ index, subsection }: Props) {
    return (
        <div className="flex min-w-full flex-col items-start justify-start gap-2.5 transition-[500ms]">
            <h3 className="text-black text-2xl font-extrabold font-title leading-tight pointer-events-none inline-flex items-center justify-start flex-row gap-3">
                {index + 1}. {subsection.title}
            </h3>
            <div className="border-b w-full border-b-black rounded" />
            <SectionDescription>{subsection.description}</SectionDescription>
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
        <p className="text-black text-lg font-normal font-serif leading-none whitespace-pre-line">
            {children}
        </p>
    );
}
