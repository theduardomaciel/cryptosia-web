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
                onChange={() =>
                    (errors.p || errors.general) &&
                    setErrors((errors) => ({
                        ...errors,
                        p: undefined,
                        general: undefined,
                    }))
                }
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
                onChange={() =>
                    (errors.q || errors.general) &&
                    setErrors((errors) => ({
                        ...errors,
                        q: undefined,
                        general: undefined,
                    }))
                }
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

            <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-between flex-wrap w-full gap-2.5">
                <p className="font-title text-base font-bold text-black leading-none">
                    Perdido em quais números primos escolher?
                </p>
                <PrimesGenerator />
            </div>
        </div>
    );
}
