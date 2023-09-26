"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Components
import SectionWrapper from "./subcomponents/Wrapper";
import ActionsHolder from "./subcomponents/ActionsHolder";
import { Input, InputHeader, InputRoot } from "../ui/Input";
import { Button } from "../ui/Button";

// Icons
import { PublicKeyIcon } from "@/public/icons/Sections";

// Utils
import type { WasmFunctions, WasmMethods } from "@/lib/@types";

export default function Section2() {
    const [publicKey, setPublicKey] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [hasEncryptedMessage, setHasEncryptedMessage] =
        useState<boolean>(false);

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
            ["number", "number", "number"],
            [messagePointer, e, n]
        );

        console.log("Mensagem criptografada: " + encryptedMessage);

        if (!encryptedMessage)
            return console.error(
                "Erro ao criptografar mensagem (ausência de mensagem)"
            );

        setMessage("");
        setHasEncryptedMessage(false);

        const velocity = encryptedMessage.length / 1000;

        const textArea = document.getElementById(
            "encrypted-message"
        ) as HTMLTextAreaElement;
        textArea.scrollTop = textArea.scrollHeight;
        textArea.focus();

        // Animamos o surgimento da mensagem criptografada
        let i = 0;
        const intervalId = setInterval(() => {
            setMessage(encryptedMessage.slice(0, i));
            textArea.setSelectionRange(i, i);
            i++;

            if (i > encryptedMessage.length) {
                clearInterval(intervalId);
                setHasEncryptedMessage(true);
            }
        }, velocity);

        /* let i = message.length;
        const wipingInterval = setInterval(() => {
            setMessage(message_cache.slice(0, i));

            i--;

            if (i <= -1) {
                clearInterval(wipingInterval);
                
            }
        }, 1); */
    }, [publicKey, message]);

    const keySplit = useMemo(() => publicKey.split(" "), [publicKey]);

    return (
        <SectionWrapper>
            <div className="flex w-full flex-col items-start gap-4">
                <InputRoot className="w-full">
                    <InputHeader
                        icon={
                            <PublicKeyIcon
                                className="w-5 h-5"
                                color={"black"}
                            />
                        }
                    >
                        Chave pública
                    </InputHeader>
                    <Input
                        placeholder="[insira aqui a chave pública] (e, n)"
                        className="text-center font-bold"
                        style={{
                            wordSpacing: "0.5rem",
                        }}
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
                </InputRoot>
                {/* <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between w-full gap-2.5">
                    <div>
                        <InputRoot>
                            <InputHeader>
                                Utilizar alfabeto
                            </InputHeader>
                        </InputRoot>
                    </div>
                </div> */}
            </div>
            <div className="flex w-full flex-1 relative overflow-hidden">
                <textarea
                    name="encrypted-message"
                    id="encrypted-message"
                    placeholder="[insira aqui a mensagem a ser criptografada]"
                    className={
                        "flex flex-1 border-2 border-dashed border-black rounded-md p-4 resize-none w-full h-full bg-transparent text-black placeholder-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-xl:min-h-[15rem] font-sans text-base"
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
                onClick={cryptographMessage}
            >
                Criptografar texto
            </Button>
        </SectionWrapper>
    );
}
