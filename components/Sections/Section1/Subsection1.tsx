"use client";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/Input";
import PrimesGenerator from "../subcomponents/PrimesGenerator";

import { ErrorsProps } from ".";

export default function Subsection1({ errors, setErrors }: ErrorsProps) {
    return (
        <div className="flex flex-col gap-2.5 w-full h-full items-center justify-center">
            <Input
                type="number"
                min={2}
                max={1000000000}
                placeholder="1º número primo (p)"
                className={cn(
                    "text-center",
                    errors?.p &&
                        "border-red-500 outline outline-red-500 outline-offset-1 outline-1"
                )}
                /* onChange={() =>
                    (errors.p || errors.general) &&
                    setErrors((errors) => ({
                        ...errors,
                        p: undefined,
                        general: undefined,
                    }))
                } */
                name="p"
                id="p"
            />
            {errors?.p && (
                <p className="text-red-500 text-sm -mt-2 w-full text-right">
                    {errors.p}
                </p>
            )}
            <Input
                type="number"
                min={2}
                max={1000000000}
                placeholder="2º número primo (q)"
                className={cn(
                    "text-center",
                    errors?.q &&
                        "border-red-500 outline outline-red-500 outline-offset-1 outline-1"
                )}
                /* onChange={() =>
                    (errors.q || errors.general) &&
                    setErrors((errors) => ({
                        ...errors,
                        q: undefined,
                        general: undefined,
                    }))
                } */
                name={"q"}
                id="q"
            />
            {errors?.q && (
                <p className="text-red-500 text-sm -mt-2 w-full text-right">
                    {errors.q}
                </p>
            )}

            {errors?.general && (
                <p className="text-red-500 text-sm w-full text-center font-semibold whitespace-pre-line">
                    {errors.general}
                </p>
            )}

            <div className="flex max-md:flex-col flex-row items-center max-md:justify-start justify-between flex-wrap w-full gap-2.5">
                <div className="flex flex-row items-center justify-start gap-2.5">
                    <LampIcon />
                    <p className="font-title text-base font-bold text-black leading-none selection:!bg-black selection:!text-white">
                        Perdido em quais números primos escolher?
                    </p>
                </div>
                <PrimesGenerator
                    generated={() =>
                        setErrors({
                            ...errors,
                            p: undefined,
                            q: undefined,
                            general: undefined,
                        })
                    }
                />
            </div>
        </div>
    );
}

function LampIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask
                id="mask0_255_457"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="18"
                height="18"
            >
                <rect width="18" height="18" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_255_457)">
                <path
                    d="M9 16.5C8.675 16.5 8.38125 16.4219 8.11875 16.2656C7.85625 16.1094 7.65 15.9 7.5 15.6375C7.0875 15.6375 6.73438 15.4906 6.44063 15.1969C6.14688 14.9031 6 14.55 6 14.1375V11.475C5.2625 10.9875 4.67187 10.3438 4.22812 9.54375C3.78438 8.74375 3.5625 7.875 3.5625 6.9375C3.5625 5.425 4.09062 4.14062 5.14687 3.08437C6.20312 2.02812 7.4875 1.5 9 1.5C10.5125 1.5 11.7969 2.02812 12.8531 3.08437C13.9094 4.14062 14.4375 5.425 14.4375 6.9375C14.4375 7.9 14.2156 8.775 13.7719 9.5625C13.3281 10.35 12.7375 10.9875 12 11.475V14.1375C12 14.55 11.8531 14.9031 11.5594 15.1969C11.2656 15.4906 10.9125 15.6375 10.5 15.6375C10.35 15.9 10.1438 16.1094 9.88125 16.2656C9.61875 16.4219 9.325 16.5 9 16.5ZM7.5 14.1375H10.5V13.4625H7.5V14.1375ZM7.5 12.7125H10.5V12H7.5V12.7125ZM7.35 10.5H8.4375V8.475L7.18125 7.21875C7.06875 7.10625 7.0125 6.975 7.0125 6.825C7.0125 6.675 7.06875 6.54375 7.18125 6.43125C7.29375 6.31875 7.425 6.2625 7.575 6.2625C7.725 6.2625 7.85625 6.31875 7.96875 6.43125L9 7.4625L10.0312 6.43125C10.1438 6.31875 10.275 6.2625 10.425 6.2625C10.575 6.2625 10.7063 6.31875 10.8188 6.43125C10.9313 6.54375 10.9875 6.675 10.9875 6.825C10.9875 6.975 10.9313 7.10625 10.8188 7.21875L9.5625 8.475V10.5H10.65C11.325 10.175 11.875 9.69688 12.3 9.06563C12.725 8.43438 12.9375 7.725 12.9375 6.9375C12.9375 5.8375 12.5563 4.90625 11.7938 4.14375C11.0313 3.38125 10.1 3 9 3C7.9 3 6.96875 3.38125 6.20625 4.14375C5.44375 4.90625 5.0625 5.8375 5.0625 6.9375C5.0625 7.725 5.275 8.43438 5.7 9.06563C6.125 9.69688 6.675 10.175 7.35 10.5Z"
                    fill="black"
                />
            </g>
        </svg>
    );
}
