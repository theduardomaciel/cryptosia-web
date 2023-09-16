"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";

interface Props {
    subsections: {
        title: string;
        description: string;
    }[];
}

export default function SectionHeader({ subsections }: Props) {
    const currentSubsection = useSearchParams()?.get("subsection") || 0;

    return (
        <div className="w-full flex flex-row items-start justify-start gap-8 h-fit overflow-x-hidden overflow-y-hidden transition-transform">
            <div
                className="flex flex-row items-start justify-start"
                style={{
                    transform: `translateX(calc(-${currentSubsection} * 100%))`,
                    transition: "transform 0.5s ease-in-out",
                }}
            >
                {subsections.map((subsection, index) => (
                    <div
                        className="flex min-w-full flex-col items-start justify-start gap-2.5 transition-[500ms]"
                        style={{
                            opacity: index == currentSubsection ? 1 : 0.25,
                        }}
                    >
                        <h3 className="text-black text-2xl font-extrabold font-title leading-tight pointer-events-none inline-flex items-center justify-start flex-row gap-3">
                            {/* {index !== 0 && (
                                <span>
                                    <ArrowLeftIcon
                                        color="black"
                                        width={24}
                                        height={24}
                                    />
                                </span>
                            )} */}
                            {index + 1}. {subsection.title}
                        </h3>
                        <div className="border-b w-full border-b-black rounded" />
                        <SectionDescription>
                            {subsection.description}
                        </SectionDescription>
                    </div>
                ))}
            </div>
        </div>
    );
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
