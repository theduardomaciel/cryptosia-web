"use client";

import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";

import SectionHeader from "./Header";
import SectionButton from "./SubsectionButton";

import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

interface Props {
    children?: ReactNode;
}

export default function SectionWrapper({ children }: Props) {
    return (
        <div className="flex h-full w-full flex-col items-start justify-start py-6 px-5 gap-4 lg:justify-center lg:px-[6.5%]">
            {children}
        </div>
    );
}

export type Subsection = {
    title: string;
    description: string | string[];
    children?: ReactNode;
    buttonDescription?: string;
};

interface MultisectionsProps {
    subsections: Subsection[];
}

export function MultisectionsSectionWrapper({
    subsections,
}: MultisectionsProps) {
    const currentSubsectionParam = useSearchParams()?.get("subsection") || "0";
    const currentSubsection = parseInt(currentSubsectionParam);

    return (
        <div className="flex h-full w-full flex-col items-start justify-start py-6 px-5 gap-4 lg:justify-center lg:py-16 lg:px-[5%] overflow-x-hidden overflow-y-hidden transition-transform">
            <div
                /* O gap aqui deve corresponder ao dobro do padding horizontal (px) da div parente (no mobile) */
                className="flex flex-row items-start justify-start gap-10 lg:gap-[5%]"
                style={{
                    transform: `translateX(calc(-${currentSubsection} * 35%))`,
                    transition: "transform 0.5s ease-in-out",
                }}
            >
                {subsections.map((subsection, index) => (
                    <div
                        /* O cálculo da largura é o seguinte: 
                        /* Versão mobile (design vertical): 100vw - (px da div no topo da hierarquia * 2) - [var(--wrapper) * 2] */
                        /* Versão desktop (design horizontal): 100vw - [var(--wrapper) * 2] - [tamanho dos 3 "headers" das seções (cada um vale 12, portanto: 12 * 3 = 36rem)] */
                        className="flex h-full w-[calc(100vw-2.5rem-var(--wrapper)*2)] lg:w-[calc(100vw-var(--wrapper)*2-36rem)] flex-col items-start justify-start gap-4 transition-opacity duration-700"
                        style={{
                            opacity: index == currentSubsection ? 1 : 0,
                        }}
                    >
                        <SectionHeader
                            index={index}
                            amount={subsections.length}
                            subsection={subsection}
                        />
                        {subsection.children}
                    </div>
                ))}
            </div>
            <SectionButton
                query={{
                    key: "subsection",
                    value: currentSubsection
                        ? currentSubsection < subsections.length - 1
                            ? currentSubsection + 1
                            : 0
                        : 1,
                }}
                className={cn("bg-black text-white", {
                    "bg-transparent text-black hover:outline-black hover:outline-[1px]":
                        currentSubsection == subsections.length - 1,
                })}
            >
                {currentSubsection == subsections.length - 1 && (
                    <ArrowLeftIcon
                        color={
                            currentSubsection == subsections.length - 1
                                ? "black"
                                : "white"
                        }
                        width={12}
                        height={12}
                    />
                )}
                {
                    subsections[currentSubsection ? currentSubsection : 0]
                        ?.buttonDescription
                }
            </SectionButton>
        </div>
    );
}

/* 
<Suspense
    fallback={
        <SectionButton>
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Carregando...
                </span>
            </div>
        </SectionButton>
    }
>  
</Suspense>
*/
