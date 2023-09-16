"use client";

import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeader from "./Header";
import SectionButton from "./Button";

export type Subsection = {
    title: string;
    description: string;
    children?: ReactNode;
};

interface Props {
    subsections: Subsection[];
}

export default function SectionWrapper({ subsections }: Props) {
    const currentSubsection = useSearchParams()?.get("subsection") || 0;

    return (
        <div className="flex h-full w-full flex-col items-start justify-start py-6 px-1 gap-4 lg:justify-center lg:gap-8 lg:py-16 lg:px-8 overflow-x-hidden overflow-y-hidden transition-transform">
            <div
                className="flex flex-row items-start justify-start gap-16"
                style={{
                    transform: `translateX(calc(-${currentSubsection} * 35%))`,
                    transition: "transform 0.5s ease-in-out",
                }}
            >
                {subsections.map((subsection, index) => (
                    <div
                        className="flex h-full w-[calc(100vw-36rem-var(--wrapper)*2-4rem)] flex-col items-start justify-start gap-8 transition-opacity duration-700"
                        style={{
                            opacity: index == currentSubsection ? 1 : 0,
                        }}
                    >
                        <SectionHeader index={index} subsection={subsection} />
                        {subsection.children}
                    </div>
                ))}
            </div>
            <SectionButton
                query={{
                    key: "subsection",
                    value: currentSubsection
                        ? parseInt(currentSubsection) + 1
                        : 1,
                }}
            >
                Continuar
            </SectionButton>
        </div>
    );
}

{
    /* <div className="flex h-full bg-transparent flex-col items-start justify-start py-6 px-1 gap-4 lg:justify-center lg:gap-8 lg:py-16 lg:px-8">
            {children}
        </div> */
}
