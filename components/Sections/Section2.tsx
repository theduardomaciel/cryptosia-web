"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

// Components
import SectionWrapper from "./subcomponents/layout/Wrapper";
import ActionsHolder from "./subcomponents/ActionsHolder";
import { Input, InputHeader, InputRoot } from "../ui/Input";
import { Button } from "../ui/Button";

// Subcomponents
import SavedKeys from "./subcomponents/SavedKeys";
import AlphabetSelector from "./subcomponents/AlphabetSelector";

// Icons
import { PublicKeyIcon } from "@/public/icons/SectionsIcons";

// Utils
import type { WasmFunctions, WasmMethods } from "@/lib/@types";

export default function Section2() {
	const [publicKey, setPublicKey] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [hasEncryptedMessage, setHasEncryptedMessage] =
		useState<boolean>(false);
	const useAscii = useSearchParams().get("alphabet") === "ascii" ? 1 : 0;

	const WASM = useRef<(WasmFunctions & WasmMethods) | null>(null);

	useEffect(() => {
		//console.log("Verificando WASM para seção 2...");
		if (
			typeof (window as any).CRYPTOSIA === "function" &&
			WASM.current === null
		) {
			//console.log("Carregando WASM para seção 2...");
			(window as any)
				.CRYPTOSIA()
				.then((wasm: WasmFunctions & WasmMethods) => {
					//console.log("WASM carregou para seção 2!");
					WASM.current = wasm;
					// ...
				});
		}
	}, []);

	const cryptographMessage = useCallback(() => {
		const [e_value, n_value] = publicKey.split(" ");

		const messagePointer = WASM.current?.stringToNewUTF8(message);
		const e = WASM.current?.stringToNewUTF8(e_value);
		const n = WASM.current?.stringToNewUTF8(n_value);

		const encryptedMessage = WASM.current?.ccall(
			"cryptosia_encrypt",
			"string",
			["number", "number", "number", "number"],
			[messagePointer, e, n, useAscii]
		);

		console.log("Mensagem criptografada: " + encryptedMessage);

		if (!encryptedMessage)
			return console.error(
				"Erro ao criptografar mensagem (ausência de mensagem)"
			);

		setPublicKey("");
		setMessage("");
		setHasEncryptedMessage(false);

		const velocity = 10;

		const textArea = document.getElementById(
			"encrypted-message"
		) as HTMLTextAreaElement;
		textArea.scrollTop = textArea.scrollHeight;
		textArea.focus();

		const isAnimationDisabled =
			window.localStorage.getItem("disable-typing-animation") === "true";
		console.log("isAnimationDisabled: " + isAnimationDisabled);

		if (isAnimationDisabled) {
			setMessage(encryptedMessage);
			setHasEncryptedMessage(true);
		} else {
			// Animamos o surgimento da mensagem criptografada
			let i = 0;
			const intervalId = setInterval(() => {
				setMessage(encryptedMessage.slice(0, i));
				textArea.setSelectionRange(i, i);
				i++;

				if (i > encryptedMessage.length) {
					clearInterval(intervalId);
					setMessage(encryptedMessage);
					setHasEncryptedMessage(true);
				}
			}, velocity);
		}
	}, [publicKey, message, useAscii]);

	const keySplit = useMemo(() => publicKey.split(" "), [publicKey]);

	return (
		<SectionWrapper className="relative">
			<div className="flex w-full flex-col items-start gap-4">
				<InputRoot className="w-full">
					<InputHeader
						tabIndex={0}
						className="selection:!bg-black selection:!text-white"
						icon={
							<PublicKeyIcon
								className="w-5 h-5"
								color={"black"}
							/>
						}
					>
						Chave pública
					</InputHeader>
					<div className="flex flex-row items-center justify-between w-full gap-2.5">
						<Input
							id="public-key"
							placeholder="[insira aqui a chave pública] (e, n)"
							className="text-center font-bold"
							style={{
								wordSpacing: "0.5rem",
							}}
							tabIndex={1}
							type="text"
							maxLength={51}
							value={publicKey}
							onFocus={(e) => {
								// Limpamos o campo de chave caso haja uma mensagem criptografada
								if (hasEncryptedMessage) {
									setPublicKey("");
									setHasEncryptedMessage(false);
								}
							}}
							onChange={(e) => {
								if (
									(e.target.value.length > 0 &&
										isNaN(parseFloat(e.target.value)) &&
										!isFinite(parseInt(e.target.value))) ||
									e.target.value.split(" ").length > 2
								)
									return;

								setPublicKey(e.target.value);
							}}
						/>
						<SavedKeys type="encrypt" setKey={setPublicKey} />
						<AlphabetSelector />
					</div>
				</InputRoot>
			</div>
			<div className="flex w-full flex-1 relative overflow-hidden">
				<textarea
					name="encrypted-message"
					id="encrypted-message"
					placeholder="[insira aqui a mensagem a ser criptografada]"
					className={
						"flex flex-1 border-2 border-dashed border-black rounded-md p-4 resize-none w-full h-full bg-transparent text-black placeholder-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-xl:min-h-[15rem] font-sans text-base selection:!bg-black selection:!text-white"
					}
					value={message}
					onChange={(e) => {
						if (hasEncryptedMessage) {
							setMessage("");
							setHasEncryptedMessage(false);
						} else {
							setMessage(e.target.value);
						}
					}}
				/>
				<ActionsHolder
					isVisible={hasEncryptedMessage}
					textareaId="encrypted-message"
				/>
			</div>
			<Button
				disabled={
					publicKey.length == 0 ||
					message.length === 0 ||
					keySplit.length < 2 ||
					(keySplit[1] !== undefined && keySplit[1].length < 1)
				}
				className="w-full"
				onClick={cryptographMessage}
			>
				Criptografar texto
			</Button>
		</SectionWrapper>
	);
}
