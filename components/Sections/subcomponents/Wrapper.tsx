"use client";

import React, { ReactNode } from "react";
import { useSearchParams } from "next/navigation";

import SectionHeader from "./Header";
import SubsectionButton from "./SubsectionButton";

import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    children?: ReactNode;
}

export default function SectionWrapper({ className, children }: Props) {
    return (
        <div className={cn("flex h-full w-full flex-col items-start justify-start py-6 px-6 gap-4 xl:justify-center xl:px-10", className)}>
            {children}
        </div>
    );
}

export type Subsection = {
    title: string;
    description: string | string[];
    children?: ReactNode;
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
        onVerify?: () => boolean;
    };
};

type ReactFormProps = React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
>;

interface MultisectionsProps extends ReactFormProps {
    subsections: Subsection[];
}

export function MultisectionsSectionWrapper({
    subsections,
    ...rest
}: MultisectionsProps) {
    const currentSubsectionParam = useSearchParams()?.get("subsection") || "0";
    const currentSubsection = parseInt(currentSubsectionParam);

    const lastSubsection = subsections.length - 1;
    const percentageWidth = (currentSubsection * 100) / subsections.length;

    const buttonProps = subsections[currentSubsection]?.buttonProps || {};
    const { children: buttonChildren, ...buttonPropsRest } = buttonProps;

    return (
        <form
            className="flex h-full w-full flex-col items-start justify-start py-6 px-5 gap-4 xl:justify-center xl:py-16 xl:px-10 overflow-x-hidden overflow-y-hidden"
            {...rest}
        >
            <div
                /* O gap aqui deve corresponder ao dobro do padding horizontal (px) da div parente (no mobile) */
                className="flex flex-row items-start justify-start motion-safe:transition-transform motion-reduce:transition-none motion-safe:duration-500 motion-safe:ease-in-out"
                style={{
                    transform: `translateX(calc(-${percentageWidth}%))`,
                }}
            >
                {subsections.map((subsection, index) => (
                    <div
                        /* O cálculo da largura é o seguinte: 
                        /* Versão mobile (design vertical): 100vw - (px da div no topo da hierarquia * 2) - [var(--wrapper) * 2] */
                        /* Versão desktop (design horizontal): 100vw - (px da div no topo da hierarquia * 2) - [var(--wrapper) * 2] - [tamanho dos 3 "headers" das seções (cada um vale 12, portanto: 12 * 3 = 36rem)] */
                        className="flex h-full w-[calc(100vw-2.5rem-var(--wrapper)*2)] xl:w-[calc(100vw-5rem-var(--wrapper)*2-36rem)] flex-col items-start justify-start gap-4 motion-safe:transition-opacity motion-safe:duration-500 dark_selection"
                        style={{
                            opacity: index == currentSubsection ? 1 : 0,
                        }}
                        key={index}
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
            <SubsectionButton
                query={{
                    key: "subsection",
                    value: currentSubsection
                        ? currentSubsection < lastSubsection
                            ? currentSubsection + 1
                            : 0
                        : 1,
                }}
                tabIndex={100}
                className={cn("bg-black text-white w-full", {
                    "bg-transparent text-black hover:outline-black hover:outline-[1px] hover:bg-transparent":
                        currentSubsection == lastSubsection,
                })}
                {...buttonPropsRest}
            >
                {currentSubsection == lastSubsection && (
                    <ArrowLeftIcon
                        color={
                            currentSubsection == lastSubsection
                                ? "black"
                                : "white"
                        }
                        width={12}
                        height={12}
                    />
                )}
                {buttonChildren}
            </SubsectionButton>
        </form>
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
