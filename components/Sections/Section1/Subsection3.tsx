"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

// Components
import { Button } from "@/components/ui/Button";

// Icons
import {
	CheckIcon,
	CopyIcon,
	DownloadIcon,
	TrashIcon,
} from "@radix-ui/react-icons";
import { PublicKeyIcon } from "@/public/icons/SectionsIcons";
import EncryptedIcon from "@/public/icons/Encrypted";
import SaveIcon from "@/public/icons/Save";

// Interfaces
import type { Data } from ".";

interface Props {
	data: Record<keyof Data, string>;
}

export default function Subsection3({ data }: Props) {
	const keysId = useId();
	const [hasSavedKey, setHasSavedKeys] = useState(false);

	const saveKeys = () => {
		if (hasSavedKey) {
			const keysString = window.localStorage.getItem("saved_keys");

			if (!keysString)
				return console.error("Não há chaves salvas no localStorage");

			const keys = JSON.parse(keysString);

			window.localStorage.setItem(
				"saved_keys",
				JSON.stringify({
					...keys,
					[keysId]: undefined,
				})
			);
			setHasSavedKeys(false);
		} else {
			const keysString = window.localStorage.getItem("saved_keys");

			if (!keysString) {
				window.localStorage.setItem(
					"saved_keys",
					JSON.stringify({
						[keysId]: {
							publicKey: data?.publicKey,
							privateKey: data?.privateKey,
						},
					})
				);
			} else {
				const keys = JSON.parse(keysString);

				window.localStorage.setItem(
					"saved_keys",
					JSON.stringify({
						...keys,
						[keysId]: {
							publicKey: data?.publicKey,
							privateKey: data?.privateKey,
						},
					})
				);
			}

			setHasSavedKeys(true);
		}
	};

	return (
		<div className="flex flex-col w-full h-full items-center justify-center gap-4">
			<div className="flex flex-col lg:flex-row items-center justify-between gap-2.5 w-full">
				<div
					className={
						"flex bg-black rounded-md px-4 py-3 xl:py-2 w-full overflow-hidden"
					}
				>
					<div
						className={cn(
							"flex items-center justify-center w-[100%] transition-transform translate-x-0 duration-500 motion-reduce:transition-none",
							{
								"translate-x-[-100%]": hasSavedKey,
							}
						)}
					>
						<div
							className={cn(
								"flex flex-row items-center justify-center xl:justify-between flex-wrap gap-5 w-full transition-opacity motion-reduce:transition-none opacity-100",
								{
									"opacity-0": hasSavedKey,
								}
							)}
						>
							<p className="text-white text-lg xl:text-base font-medium font-title leading-none">
								Utilizamos como dados:
							</p>
							<div className="flex flex-row items-center justify-center flex-wrap max-sm:gap-1 gap-5 text-white text-base font-black font-title text-center leading-none">
								<p>
									{data?.p} e {data?.q} como números primos
								</p>
								<p>{data?.exponent} como expoente</p>
							</div>
						</div>
						<div
							className={cn(
								"flex flex-row items-center justify-center w-full h-full gap-2.5 transition-opacity motion-reduce:transition-none absolute top-0 left-full opacity-0",
								{
									"opacity-100": hasSavedKey,
								}
							)}
						>
							<CheckIcon width={16} height={16} color="white" />
							<p className="text-white text-base font-black font-title text-center leading-none">
								As chaves geradas foram salvas!
							</p>
						</div>
					</div>
				</div>
				<Button
					type="button"
					className="relative max-lg:w-full"
					onClick={saveKeys}
				>
					<SaveIcon
						className={cn("scale-100 transition-transform", {
							"scale-0": hasSavedKey,
						})}
					/>
					<TrashIcon
						width={24}
						height={24}
						color="white"
						className={cn(
							"scale-0 transition-transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
							{
								"scale-100": hasSavedKey,
							}
						)}
					/>
				</Button>
			</div>
			<div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
				<KeyView
					keyString={data?.publicKey}
					icon={<PublicKeyIcon className="w-5 h-5" color="black" />}
					title="Chave pública"
				/>
				<KeyView
					keyString={data?.privateKey}
					icon={<EncryptedIcon className="w-5 h-5" color="black" />}
					title="Chave privada"
				/>
			</div>
		</div>
	);
}

interface KeyViewProps {
	keyString?: string;
	icon: React.ReactNode;
	title: string;
}

function KeyView({ keyString, icon, title }: KeyViewProps) {
	const id = useId();

	return (
		<div className="flex flex-col items-start justify-start flex-1 gap-2.5 w-full">
			<div className="flex flex-row items-center justify-start gap-2.5">
				{icon}
				<p className="text-black text-lg xl:text-base font-medium font-serif leading-none selection:!bg-black selection:!text-white">
					{title}
				</p>
			</div>
			<div className="flex flex-row items-center justify-between gap-2.5 w-full">
				<button
					className="px-6 xl:px-9 py-1 rounded-[5px] justify-center items-center overflow-x-scroll gap-6 xl:gap-9 inline-flex hide_scrollbar w-full relative outline-dashed outline-black outline-1 hover:outline-offset-1 hover:outline-2 group/public_key selection:!bg-black selection:!text-white"
					type="button"
					tabIndex={-1}
					onClick={() => {
						const input = document.getElementById(
							id
						) as HTMLInputElement;
						input.select();
						navigator.clipboard.writeText(input.value);

						const tempText = input.value;
						input.value = `${title} copiada!`;
						input.style.cursor = "default";
						input.style.pointerEvents = "none";
						input.style.userSelect = "none";
						setTimeout(() => {
							input.value = tempText;
							input.style.cursor = "pointer";
							input.style.pointerEvents = "auto";
							input.style.userSelect = "auto";
						}, 1000);
					}}
				>
					<input
						id={id}
						className="text-center text-black text-lg xl:text-base font-black font-title hover:underline cursor-pointer bg-transparent ring-0 outline-none border-none w-full"
						value={keyString}
						onChange={() => {}}
						tabIndex={-1}
						readOnly
					/>
					<CopyIcon
						className="absolute right-4 top-1/2 -translate-y-1/2 group-hover/public_key:scale-105 transition-transform duration-100"
						color="black"
						width={16}
						height={16}
					/>
				</button>
				<Button
					className="w-12 h-full"
					tabIndex={-1}
					type="button"
					onClick={() => {
						if (!keyString)
							return console.error(`${title} ausente`);

						const file = new Blob([keyString], {
							type: "text/plain",
						});
						const a = document.createElement("a");
						a.href = URL.createObjectURL(file);
						a.download = `${title
							.toLowerCase()
							.replaceAll(" ", "-")}.txt`
							.normalize("NFC")
							.normalize("NFD")
							.replace(/\p{Diacritic}/gu, "");
						a.click();
					}}
				>
					<DownloadIcon
						className="flex-1 select-none pointer-events-none"
						color={"white"}
						width={18}
						height={18}
						tabIndex={-1}
					/>
				</Button>
			</div>
		</div>
	);
}

/* 
    var a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
*/
