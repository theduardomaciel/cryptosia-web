"use client";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";

// Icons
import { PublicKeyIcon } from "@/public/icons/Sections";
import { TrashIcon } from "@radix-ui/react-icons";
import EncryptedIcon from "@/public/icons/Encrypted";
import { useRouter, useSearchParams } from "next/navigation";

interface Keys {
	[key: string]: {
		publicKey: string;
		privateKey: string;
	};
}

interface Props {
	type: "encrypt" | "decrypt";
	setKey: React.Dispatch<React.SetStateAction<string>>;
}

export default function SavedKeys({ type, setKey }: Props) {
	const router = useRouter();
	const isVisible = useSearchParams()?.get("keys") == "true";
	const section = useSearchParams()?.get("app") || "encrypt";

	const [keys, setKeys] = useState<Keys>({});

	const animate = () => {
		const savedKeys = document.getElementById(`saved-keys_${type}`);
		if (!savedKeys) return console.error("savedKeys não encontrado");

		if (isVisible) {
			savedKeys.style.display = "flex";

			setTimeout(() => {
				savedKeys.style.opacity = "1";
				savedKeys.style.transform = "translateX(0%)";
			}, 25);
		} else {
			savedKeys.style.opacity = "0";
			savedKeys.style.transform = "translateX(100%)";

			setTimeout(() => {
				savedKeys.style.display = "none";
			}, 300);
		}
	};

	const handleToggle = () => {
		const keysString = window.localStorage.getItem("saved_keys");
		setKeys(keysString ? JSON.parse(keysString) : {});

		router.replace(`/?app=${section}${isVisible ? "" : "&keys=true"}`, {
			scroll: false,
		});
	};

	useEffect(() => {
		if (type == "decrypt") {
			const privateKey = window.sessionStorage.getItem("private_key");

			if (privateKey) {
				setKey(privateKey);
				window.sessionStorage.removeItem("private_key");
			}
		} else {
			const publicKey = window.sessionStorage.getItem("public_key");

			if (publicKey) {
				setKey(publicKey);
				window.sessionStorage.removeItem("public_key");
			}
		}

		animate();
	}, [isVisible]);

	return (
		<>
			<Button type="button" onClick={handleToggle}>
				<PublicKeyIcon className="w-6 h-6" color={"white"} />
			</Button>
			<div
				id={`saved-keys_${type}`}
				className="absolute top-0 left-0 w-full h-full hidden flex-col items-center justify-center gap-5 z-50 motion-safe:transition-[transform, opacity] motion-reduce:transition-none duration-300 py-6 px-5 md:px-10 bg-primary-100 dark:bg-primary-200 translate-x-0"
			>
				<div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-4">
					<PublicKeyIcon className="w-8 h-8" color="black" />
					<h3 className="font-title text-2xl font-bold text-black">
						Suas Chaves
					</h3>
				</div>

				<ul className="flex flex-col items-center justify-start gap-3 h-full w-full">
					{Object.keys(keys).length > 0 ? (
						Object.keys(keys).map((key) => (
							<KeyHolder
								key={key}
								id={key}
								type={type}
								publicKey={keys[key].publicKey}
								privateKey={keys[key].privateKey}
							/>
						))
					) : (
						<div className="flex flex-1 flex-col lg:flex-row items-center justify-center gap-5">
							<EmptyIcon />
							<p className="font-title text-lg font-bold text-black text-center leading-tight">
								Nenhuma chave salva no momento
							</p>
						</div>
					)}
				</ul>

				<Button
					type="button"
					className="max-lg:w-full px-8 z-[100] hover:bg-transparent hover:border border-black hover:text-black outline-0 outline-none py-2 lg:py-1"
					onClick={handleToggle}
				>
					Voltar
				</Button>
			</div>
		</>
	);
}

//  border border-white hover:bg-white hover:text-black bg-transparent hover:bg-transparent

interface KeyHolderProps {
	id: string;
	type: "encrypt" | "decrypt";
	publicKey: string;
	privateKey: string;
}

function KeyHolder({ publicKey, privateKey, id, type }: KeyHolderProps) {
	const router = useRouter();
	const [isHidden, setIsHidden] = useState<boolean>(true);

	const onDelete = useCallback(() => {
		const keysString = window.localStorage.getItem("saved_keys");

		if (!keysString)
			return console.error("Não há chaves salvas no localStorage");

		const keys = JSON.parse(keysString);

		window.localStorage.setItem(
			"saved_keys",
			JSON.stringify({
				...keys,
				[id]: undefined,
			})
		);

		const element = document.getElementById(id);
		if (!element) return;

		element.style.opacity = "0";
		element.style.maxHeight = "0";
		element.style.transform = "translateX(100%)";

		setTimeout(() => {
			element.style.display = "none";
		}, 300);
	}, [id]);

	const onSelect = useCallback(() => {
		if (type == "decrypt") {
			window.sessionStorage.setItem("private_key", privateKey);
			router.replace("/?app=decrypt", { scroll: false });
		} else if (type == "encrypt") {
			window.sessionStorage.setItem("public_key", publicKey);
			router.replace("/?app=encrypt", { scroll: false });
		}
	}, [publicKey, privateKey]);

	return (
		<li
			id={id}
			key={id}
			className="flex flex-col md:flex-row items-center justify-between gap-2 w-full motion-safe:transition-[max-height,opacity,transform] motion-reduce:transition-none translate-x-0 duration-300 overflow-hidden max-h-[25rem] opacity-100 p-1"
		>
			<button
				type="button"
				onClick={onSelect}
				className="flex flex-col md:flex-row max-lg:w-full items-center justify-start lg:justify-center gap-2.5 px-4 py-2 rounded-md font-title text-base font-black bg-black text-white hover:bg-transparent border border-black hover:text-black flex-1 motion-safe:transition-colors motion-reduce:transition-none duration-100"
			>
				<div className="flex flex-row items-center justify-start w-full lg:justify-center gap-2.5 cursor-pointer overflow-hidden">
					<PublicKeyIcon className="w-6 h-6 min-w-[1.5rem]" />
					<p className=" text-ellipsis overflow-hidden whitespace-nowrap pointer-events-none select-none">
						{publicKey}
					</p>
				</div>
				<div className="flex flex-row items-center justify-start w-full lg:justify-center gap-2.5 overflow-hidden">
					<EncryptedIcon className="w-6 h-6 min-w-[1.5rem]" />
					<p className="text-ellipsis overflow-hidden whitespace-nowrap pointer-events-none select-none">
						{isHidden ? `******** ********` : privateKey}
					</p>
				</div>
			</button>
			<div className="flex flex-row items-center justify-end max-md:w-full gap-2.5">
				<Button
					type="button"
					className="flex w-full h-full min-w-[24px]"
					onClick={() => {
						setIsHidden(!isHidden);
					}}
				>
					{isHidden ? <EyeIcon2 /> : <EyeIcon />}
				</Button>
				<Button
					type="button"
					className="flex w-full h-full min-w-[24px]"
					onClick={onDelete}
				>
					<TrashIcon width={24} height={24} />
				</Button>
			</div>
		</li>
	);
}

function EyeIcon() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<mask
				id="mask0_299_1483"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="24"
				height="24"
			>
				<rect width="24" height="24" fill="white" />
			</mask>
			<g mask="url(#mask0_299_1483)">
				<path
					d="M11.9999 16C13.2499 16 14.3124 15.5625 15.1874 14.6875C16.0624 13.8125 16.4999 12.75 16.4999 11.5C16.4999 10.25 16.0624 9.1875 15.1874 8.3125C14.3124 7.4375 13.2499 7 11.9999 7C10.7499 7 9.6874 7.4375 8.8124 8.3125C7.9374 9.1875 7.4999 10.25 7.4999 11.5C7.4999 12.75 7.9374 13.8125 8.8124 14.6875C9.6874 15.5625 10.7499 16 11.9999 16ZM11.9999 14.2C11.2499 14.2 10.6124 13.9375 10.0874 13.4125C9.5624 12.8875 9.2999 12.25 9.2999 11.5C9.2999 10.75 9.5624 10.1125 10.0874 9.5875C10.6124 9.0625 11.2499 8.8 11.9999 8.8C12.7499 8.8 13.3874 9.0625 13.9124 9.5875C14.4374 10.1125 14.6999 10.75 14.6999 11.5C14.6999 12.25 14.4374 12.8875 13.9124 13.4125C13.3874 13.9375 12.7499 14.2 11.9999 14.2ZM11.9999 19C9.76657 19 7.72907 18.4 5.8874 17.2C4.04574 16 2.59157 14.4167 1.5249 12.45C1.44157 12.3 1.37907 12.1458 1.3374 11.9875C1.29574 11.8292 1.2749 11.6667 1.2749 11.5C1.2749 11.3333 1.29574 11.1708 1.3374 11.0125C1.37907 10.8542 1.44157 10.7 1.5249 10.55C2.59157 8.58333 4.04574 7 5.8874 5.8C7.72907 4.6 9.76657 4 11.9999 4C14.2332 4 16.2707 4.6 18.1124 5.8C19.9541 7 21.4082 8.58333 22.4749 10.55C22.5582 10.7 22.6207 10.8542 22.6624 11.0125C22.7041 11.1708 22.7249 11.3333 22.7249 11.5C22.7249 11.6667 22.7041 11.8292 22.6624 11.9875C22.6207 12.1458 22.5582 12.3 22.4749 12.45C21.4082 14.4167 19.9541 16 18.1124 17.2C16.2707 18.4 14.2332 19 11.9999 19ZM11.9999 17C13.8832 17 15.6124 16.5042 17.1874 15.5125C18.7624 14.5208 19.9666 13.1833 20.7999 11.5C19.9666 9.81667 18.7624 8.47917 17.1874 7.4875C15.6124 6.49583 13.8832 6 11.9999 6C10.1166 6 8.3874 6.49583 6.8124 7.4875C5.2374 8.47917 4.03324 9.81667 3.1999 11.5C4.03324 13.1833 5.2374 14.5208 6.8124 15.5125C8.3874 16.5042 10.1166 17 11.9999 17Z"
					fill="white"
				/>
			</g>
		</svg>
	);
}

function EyeIcon2() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<mask
				id="mask0_311_521"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="24"
				height="24"
			>
				<rect width="24" height="24" fill="white" />
			</mask>
			<g mask="url(#mask0_311_521)">
				<path
					d="M16.1 13.3L14.65 11.85C14.8333 10.9666 14.6042 10.2125 13.9625 9.58748C13.3208 8.96248 12.55 8.71664 11.65 8.84998L10.2 7.39998C10.4833 7.26664 10.775 7.16664 11.075 7.09998C11.375 7.03331 11.6833 6.99998 12 6.99998C13.25 6.99998 14.3125 7.43748 15.1875 8.31248C16.0625 9.18748 16.5 10.25 16.5 11.5C16.5 11.8166 16.4667 12.125 16.4 12.425C16.3333 12.725 16.2333 13.0166 16.1 13.3ZM19.3 16.45L17.85 15.05C18.4833 14.5666 19.05 14.0291 19.55 13.4375C20.05 12.8458 20.4667 12.2 20.8 11.5C19.9667 9.81664 18.7625 8.47914 17.1875 7.48748C15.6125 6.49581 13.8833 5.99998 12 5.99998C11.5167 5.99998 11.0458 6.03331 10.5875 6.09998C10.1292 6.16664 9.66667 6.26664 9.2 6.39998L7.65 4.84998C8.35 4.56664 9.0625 4.35414 9.7875 4.21248C10.5125 4.07081 11.25 3.99998 12 3.99998C14.2833 3.99998 16.3708 4.59998 18.2625 5.79998C20.1542 6.99998 21.6 8.61664 22.6 10.65C22.6667 10.7833 22.7167 10.9208 22.75 11.0625C22.7833 11.2041 22.8 11.35 22.8 11.5C22.8 11.65 22.7875 11.7958 22.7625 11.9375C22.7375 12.0791 22.6917 12.2166 22.625 12.35C22.2583 13.1666 21.7917 13.9208 21.225 14.6125C20.6583 15.3041 20.0167 15.9166 19.3 16.45ZM12 19C9.76667 19 7.725 18.3958 5.875 17.1875C4.025 15.9791 2.56667 14.3916 1.5 12.425C1.41667 12.2916 1.35417 12.1458 1.3125 11.9875C1.27083 11.8291 1.25 11.6666 1.25 11.5C1.25 11.3333 1.26667 11.175 1.3 11.025C1.33333 10.875 1.39167 10.725 1.475 10.575C1.80833 9.90831 2.19583 9.27081 2.6375 8.66248C3.07917 8.05414 3.58333 7.49998 4.15 6.99998L2.075 4.89998C1.89167 4.69998 1.80417 4.46248 1.8125 4.18748C1.82083 3.91248 1.91667 3.68331 2.1 3.49998C2.28333 3.31664 2.51667 3.22498 2.8 3.22498C3.08333 3.22498 3.31667 3.31664 3.5 3.49998L20.5 20.5C20.6833 20.6833 20.7792 20.9125 20.7875 21.1875C20.7958 21.4625 20.7 21.7 20.5 21.9C20.3167 22.0833 20.0833 22.175 19.8 22.175C19.5167 22.175 19.2833 22.0833 19.1 21.9L15.6 18.45C15.0167 18.6333 14.425 18.7708 13.825 18.8625C13.225 18.9541 12.6167 19 12 19ZM5.55 8.39998C5.06667 8.83331 4.625 9.30831 4.225 9.82498C3.825 10.3416 3.48333 10.9 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5041 10.1167 17 12 17C12.3333 17 12.6583 16.9791 12.975 16.9375C13.2917 16.8958 13.6167 16.85 13.95 16.8L13.05 15.85C12.8667 15.9 12.6917 15.9375 12.525 15.9625C12.3583 15.9875 12.1833 16 12 16C10.75 16 9.6875 15.5625 8.8125 14.6875C7.9375 13.8125 7.5 12.75 7.5 11.5C7.5 11.3166 7.5125 11.1416 7.5375 10.975C7.5625 10.8083 7.6 10.6333 7.65 10.45L5.55 8.39998Z"
					fill="white"
				/>
			</g>
		</svg>
	);
}

function EmptyIcon() {
	return (
		<svg
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<mask
				id="mask0_313_520"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="25"
				height="25"
			>
				<rect
					x="0.807495"
					y="0.467773"
					width="24"
					height="24"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask0_313_520)">
				<path
					d="M16.7575 12.7678L12.5075 8.51777C12.4075 8.41777 12.3367 8.30944 12.295 8.19277C12.2533 8.07611 12.2325 7.95111 12.2325 7.81777C12.2325 7.68444 12.2533 7.55944 12.295 7.44277C12.3367 7.32611 12.4075 7.21777 12.5075 7.11777L16.7575 2.86777C16.8575 2.76777 16.9658 2.69694 17.0825 2.65527C17.1992 2.61361 17.3242 2.59277 17.4575 2.59277C17.5908 2.59277 17.7158 2.61361 17.8325 2.65527C17.9492 2.69694 18.0575 2.76777 18.1575 2.86777L22.4075 7.11777C22.5075 7.21777 22.5783 7.32611 22.62 7.44277C22.6617 7.55944 22.6825 7.68444 22.6825 7.81777C22.6825 7.95111 22.6617 8.07611 22.62 8.19277C22.5783 8.30944 22.5075 8.41777 22.4075 8.51777L18.1575 12.7678C18.0575 12.8678 17.9492 12.9386 17.8325 12.9803C17.7158 13.0219 17.5908 13.0428 17.4575 13.0428C17.3242 13.0428 17.1992 13.0219 17.0825 12.9803C16.9658 12.9386 16.8575 12.8678 16.7575 12.7678ZM3.8075 10.4678V4.46777C3.8075 4.18444 3.90333 3.94694 4.095 3.75527C4.28666 3.56361 4.52416 3.46777 4.8075 3.46777H10.8075C11.0908 3.46777 11.3283 3.56361 11.52 3.75527C11.7117 3.94694 11.8075 4.18444 11.8075 4.46777V10.4678C11.8075 10.7511 11.7117 10.9886 11.52 11.1803C11.3283 11.3719 11.0908 11.4678 10.8075 11.4678H4.8075C4.52416 11.4678 4.28666 11.3719 4.095 11.1803C3.90333 10.9886 3.8075 10.7511 3.8075 10.4678ZM13.8075 20.4678V14.4678C13.8075 14.1844 13.9033 13.9469 14.095 13.7553C14.2867 13.5636 14.5242 13.4678 14.8075 13.4678H20.8075C21.0908 13.4678 21.3283 13.5636 21.52 13.7553C21.7117 13.9469 21.8075 14.1844 21.8075 14.4678V20.4678C21.8075 20.7511 21.7117 20.9886 21.52 21.1803C21.3283 21.3719 21.0908 21.4678 20.8075 21.4678H14.8075C14.5242 21.4678 14.2867 21.3719 14.095 21.1803C13.9033 20.9886 13.8075 20.7511 13.8075 20.4678ZM3.8075 20.4678V14.4678C3.8075 14.1844 3.90333 13.9469 4.095 13.7553C4.28666 13.5636 4.52416 13.4678 4.8075 13.4678H10.8075C11.0908 13.4678 11.3283 13.5636 11.52 13.7553C11.7117 13.9469 11.8075 14.1844 11.8075 14.4678V20.4678C11.8075 20.7511 11.7117 20.9886 11.52 21.1803C11.3283 21.3719 11.0908 21.4678 10.8075 21.4678H4.8075C4.52416 21.4678 4.28666 21.3719 4.095 21.1803C3.90333 20.9886 3.8075 20.7511 3.8075 20.4678ZM5.8075 9.46777H9.8075V5.46777H5.8075V9.46777ZM17.4825 10.6678L20.3075 7.84277L17.4825 5.01777L14.6575 7.84277L17.4825 10.6678ZM15.8075 19.4678H19.8075V15.4678H15.8075V19.4678ZM5.8075 19.4678H9.8075V15.4678H5.8075V19.4678Z"
					fill="black"
				/>
			</g>
		</svg>
	);
}
