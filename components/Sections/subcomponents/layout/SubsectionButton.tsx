"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

import { Button } from "../../../ui/Button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import type { Subsection } from "./Wrapper";

type ButtonProps = Subsection["buttonProps"];

type Props = ButtonProps & {
	query?: {
		key: string;
		value: number;
	};
};

export default function SubsectionButton({
	query,
	children,
	onVerify,
	...rest
}: Props) {
	const searchParams = useSearchParams()!;
	const currentSubsection = searchParams.get("subsection");

	const router = useRouter();
	const pathname = usePathname();

	// Get a new searchParams string by merging the current
	// searchParams with a provided key/value pair
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);

			if (value == "0") {
				params.delete(name);
			} else {
				params.set(name, value);
			}

			return params.toString();
		},
		[searchParams]
	);

	const goToSection = useCallback(
		(key: string, value: string) => {
			router.push(pathname + "?" + createQueryString(key, value), {
				scroll: false,
			});
		},
		[createQueryString, pathname, router]
	);

	return (
		<div className="flex flex-row items-center justify-between w-full transition-all">
			<div
				className={clsx(
					"flex items-center justify-center w-1/6 overflow-hidden ease-in-out flex-grow max-w-[0px] motion-safe:transition-all motion-safe:duration-500",
					{
						"!max-w-[5rem] mr-2.5 overflow-visible":
							currentSubsection &&
							parseInt(currentSubsection) > 0 &&
							parseInt(currentSubsection) < 2,
					}
				)}
			>
				<Button
					className={clsx("flex flex-1", {
						"disabled: opacity-50": !query,
					})}
					disabled={query?.value == 0}
					onClick={() =>
						query
							? goToSection(
									query.key,
									(query.value - 2 > 0
										? query.value - 2
										: 0
									).toString()
							  )
							: {}
					}
				>
					<ArrowLeftIcon width={24} height={24} color="white" />
				</Button>
			</div>
			<Button
				onClick={() => {
					const isVerified = !onVerify || onVerify();
					if (isVerified) {
						goToSection(query!.key, query!.value.toString());
					}
				}}
				{...rest}
			>
				{children}
			</Button>
		</div>
	);
}
