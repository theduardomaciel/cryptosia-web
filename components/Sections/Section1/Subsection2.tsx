"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/Input";

import { ErrorsProps } from ".";

export default function Subsection2({
	errors,
	setErrors,
	exponents,
}: ErrorsProps & {
	exponents: number[];
}) {
	return (
		<div className="flex flex-col gap-2.5 w-full h-full items-center justify-center">
			<div className="px-6 xl:px-9 py-2 xl:py-1 rounded-[5px] border border-dashed border-black justify-start lg:justify-center items-center overflow-x-scroll gap-6 xl:gap-9 inline-flex hide_scrollbar w-full">
				{exponents.map((exponent) => (
					<button
						key={exponent}
						type="button"
						onClick={() => {
							const input = document.getElementById(
								"exponent"
							) as HTMLInputElement;

							input.value = exponent.toString();

							setErrors((errors) => ({
								...errors,
								exponent: undefined,
							}));
						}}
						tabIndex={-1}
					>
						<p className="text-black text-lg font-black font-title hover:scale-105 transition-transform selection:!bg-black selection:!text-white">
							{exponent}
						</p>
					</button>
				))}
			</div>
			<Input
				id="exponent"
				type="text"
				pattern="\d*"
				maxLength={10}
				placeholder="[insira ou selecione um expoente]"
				className={cn(
					"text-center",
					errors?.exponent &&
						"border-red-500 outline outline-red-500 outline-offset-1 outline-1"
				)}
				tabIndex={-1}
				name="exponent"
				onChange={(event) => {
					if (errors?.exponent) {
						setErrors((errors) => ({
							...errors,
							exponent: undefined,
						}));
					}
				}}
			/>
			{errors?.exponent && (
				<p className="text-red-500 text-sm w-full text-center font-semibold">
					{errors.exponent}
				</p>
			)}
		</div>
	);
}
