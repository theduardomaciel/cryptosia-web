"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Components
import { Button } from "@/components/ui/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/Popover";
import { useCallback } from "react";

export default function AlphabetSelector() {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	// Get a new searchParams string by merging the current
	// searchParams with a provided key/value pair
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button>
					<AlphabetIcon className="w-6 h-6" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="flex flex-col gap-4">
				<div className="grid gap-4 w-full">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">
							Utilizar alfabeto
						</h4>
						<p className="text-sm text-muted-foreground">
							Escolha qual será utilizado para criptografar a
							mensagem.
						</p>
					</div>
					<div className="grid gap-2">
						<RadioGroup
							defaultValue="utf-8"
							onValueChange={(value) =>
								router.push(
									pathName +
										"?" +
										createQueryString("alphabet", value),
									{ scroll: false }
								)
							}
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="utf-8" id="utf-8" />
								<label htmlFor="utf-8">UTF-8</label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="ascii" id="ascii" />
								<label htmlFor="ascii">ASCII</label>
							</div>
						</RadioGroup>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

function AlphabetIcon({ className }: { className?: string }) {
	return (
		<svg
			width="24"
			height="25"
			viewBox="0 0 24 25"
			fill="none"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<mask
				id="mask0_335_529"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="24"
				height="25"
			>
				<rect y="0.5" width="24" height="24" fill="white" />
			</mask>
			<g mask="url(#mask0_335_529)">
				<path
					d="M5.60034 2.55H7.55034L10.9253 11.55H9.05034L8.30034 9.4H4.85034L4.10034 11.55H2.22534L5.60034 2.55ZM5.72534 12.6C6.42534 12.6 7.01701 12.8417 7.50034 13.325C7.98368 13.8083 8.22534 14.4 8.22534 15.1C8.22534 15.4333 8.16284 15.7542 8.03784 16.0625C7.91284 16.3708 7.73368 16.6417 7.50034 16.875L7.12534 17.225L7.82534 17.925L9.25034 16.525L10.6753 17.95L9.27534 19.35L10.6753 20.775L9.25034 22.175L7.85034 20.775L6.80034 21.825C6.55034 22.075 6.26701 22.2625 5.95034 22.3875C5.63368 22.5125 5.30034 22.575 4.95034 22.575C4.25034 22.575 3.66701 22.3292 3.20034 21.8375C2.73368 21.3458 2.50034 20.75 2.50034 20.05C2.50034 19.7167 2.56701 19.3958 2.70034 19.0875C2.83368 18.7792 3.01701 18.5083 3.25034 18.275L4.30034 17.225L3.95034 16.875C3.71701 16.6417 3.53368 16.375 3.40034 16.075C3.26701 15.775 3.20034 15.4583 3.20034 15.125C3.20034 14.425 3.44618 13.8292 3.93784 13.3375C4.42951 12.8458 5.02534 12.6 5.72534 12.6ZM5.72534 18.65L4.65034 19.7C4.60034 19.75 4.56701 19.8042 4.55034 19.8625C4.53368 19.9208 4.52534 19.9833 4.52534 20.05C4.52534 20.1833 4.57118 20.3 4.66284 20.4C4.75451 20.5 4.86701 20.55 5.00034 20.55C5.06701 20.55 5.12951 20.5375 5.18784 20.5125C5.24618 20.4875 5.30034 20.45 5.35034 20.4L6.42534 19.35L5.72534 18.65ZM5.70034 14.6C5.56701 14.6 5.45451 14.65 5.36284 14.75C5.27118 14.85 5.22534 14.9667 5.22534 15.1C5.22534 15.1667 5.23368 15.2292 5.25034 15.2875C5.26701 15.3458 5.30034 15.4 5.35034 15.45L5.72534 15.8L6.05034 15.475C6.10034 15.425 6.13784 15.3708 6.16284 15.3125C6.18784 15.2542 6.20034 15.1917 6.20034 15.125C6.20034 14.9917 6.15034 14.8708 6.05034 14.7625C5.95034 14.6542 5.83368 14.6 5.70034 14.6ZM6.52534 4.5L5.37534 7.85H7.77534L6.62534 4.5H6.52534ZM17.4753 1.875C17.6087 2.09167 17.7212 2.31667 17.8128 2.55C17.9045 2.78333 17.9837 3.01667 18.0503 3.25L16.9753 3.575L22.0003 3.55V5.575H20.3253C20.142 6.125 19.9045 6.64583 19.6128 7.1375C19.3212 7.62917 18.9837 8.08333 18.6003 8.5C19.0503 8.76667 19.517 8.9875 20.0003 9.1625C20.4837 9.3375 20.9837 9.49167 21.5003 9.625L21.0253 11.55C20.3087 11.3667 19.6128 11.1417 18.9378 10.875C18.2628 10.6083 17.617 10.2667 17.0003 9.85C16.3837 10.25 15.7378 10.5875 15.0628 10.8625C14.3878 11.1375 13.692 11.3667 12.9753 11.55L12.5253 9.625C13.0253 9.49167 13.517 9.3375 14.0003 9.1625C14.4837 8.9875 14.9503 8.76667 15.4003 8.5C15.017 8.08333 14.6795 7.62917 14.3878 7.1375C14.0962 6.64583 13.867 6.125 13.7003 5.575H12.0003V3.575H16.4003C16.3503 3.35833 16.2837 3.14583 16.2003 2.9375C16.117 2.72917 16.0337 2.525 15.9503 2.325L17.4753 1.875ZM20.0753 12.975L21.5003 14.375L13.7253 22.15L12.3003 20.75L20.0753 12.975ZM14.5003 13.55C14.917 13.55 15.2712 13.6958 15.5628 13.9875C15.8545 14.2792 16.0003 14.6333 16.0003 15.05C16.0003 15.4667 15.8545 15.8208 15.5628 16.1125C15.2712 16.4042 14.917 16.55 14.5003 16.55C14.0837 16.55 13.7295 16.4042 13.4378 16.1125C13.1462 15.8208 13.0003 15.4667 13.0003 15.05C13.0003 14.6333 13.1462 14.2792 13.4378 13.9875C13.7295 13.6958 14.0837 13.55 14.5003 13.55ZM15.8253 5.575C15.9587 5.89167 16.1253 6.19167 16.3253 6.475C16.5253 6.75833 16.7503 7.025 17.0003 7.275C17.2503 7.025 17.4753 6.75833 17.6753 6.475C17.8753 6.19167 18.0503 5.89167 18.2003 5.575H15.8253ZM19.5003 18.55C19.917 18.55 20.2712 18.6958 20.5628 18.9875C20.8545 19.2792 21.0003 19.6333 21.0003 20.05C21.0003 20.4667 20.8545 20.8208 20.5628 21.1125C20.2712 21.4042 19.917 21.55 19.5003 21.55C19.0837 21.55 18.7295 21.4042 18.4378 21.1125C18.1462 20.8208 18.0003 20.4667 18.0003 20.05C18.0003 19.6333 18.1462 19.2792 18.4378 18.9875C18.7295 18.6958 19.0837 18.55 19.5003 18.55Z"
					fill="white"
				/>
			</g>
		</svg>
	);
}
