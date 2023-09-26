"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Components
import SectionWrapper from "./subcomponents/Wrapper";
import ActionsHolder from "./subcomponents/ActionsHolder";
import { Input, InputHeader, InputRoot } from "../ui/Input";
import { Button } from "../ui/Button";

// Icons
import EncryptedIcon from "@/public/icons/Encrypted";

// Utils
import type { WasmFunctions, WasmMethods } from "@/lib/@types";

export default function Section3() {
    const [privateKey, setPrivateKey] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [hasDecryptedMessage, setHasDecryptedMessage] =
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

    const decryptographMessage = useCallback(() => {
        const [d_value, n_value] = privateKey.split(" ");

        const messagePointer = WASM.current?.stringToNewUTF8(message);
        const d = WASM.current?.stringToNewUTF8(d_value);
        const n = WASM.current?.stringToNewUTF8(n_value);

        const decryptedMessage = WASM.current?.ccall(
            "cryptosia_decrypt",
            "string",
            ["number", "number", "number"],
            [messagePointer, d, n]
        );

        console.log("Mensagem descriptografada: " + decryptedMessage);

        if (!decryptedMessage)
            return console.error(
                "Erro ao descriptografar mensagem (ausência de mensagem)"
            );

        setPrivateKey("");
        setMessage("");
        setHasDecryptedMessage(false);

        const velocity = decryptedMessage.length / 1000;

        const textArea = document.getElementById(
            "decrypted-message"
        ) as HTMLTextAreaElement;
        textArea.scrollTop = textArea.scrollHeight;
        textArea.focus();

        // Animamos o surgimento da mensagem descriptografada
        let i = 0;
        const intervalId = setInterval(() => {
            setMessage(decryptedMessage.slice(0, i));
            textArea.setSelectionRange(i, i);
            i++;

            if (i > decryptedMessage.length) {
                clearInterval(intervalId);
                setHasDecryptedMessage(true);
            }
        }, velocity);
    }, [privateKey, message]);

    const keySplit = useMemo(() => privateKey.split(" "), [privateKey]);

    return (
        <SectionWrapper>
            <div className="flex w-full flex-col items-start gap-4">
                <InputRoot className="w-full">
                    <InputHeader
                        icon={<EncryptedIcon className="w-5 h-5 text-black" />}
                    >
                        Chave privada
                    </InputHeader>
                    <Input
                        placeholder="[insira aqui a chave privada] (d, n)"
                        className="text-center font-bold"
                        style={{
                            wordSpacing: "0.5rem",
                        }}
                        min={0}
                        max={100000}
                        maxLength={51}
                        value={privateKey}
                        onFocus={(e) => {
                            // Limpamos o campo de chave caso haja uma mensagem criptografada
                            if (hasDecryptedMessage) {
                                setPrivateKey("");
                                setHasDecryptedMessage(false);
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

                            setPrivateKey(e.target.value);
                        }}
                    />
                </InputRoot>
            </div>
            <div className="flex w-full h-full flex-1 relative overflow-hidden">
                <textarea
                    name="decrypted-message"
                    id="decrypted-message"
                    placeholder="[insira aqui a mensagem criptografada]"
                    className={
                        "flex flex-1 border-2 border-dashed border-black rounded-md p-4 resize-none bg-transparent text-black placeholder-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-xl:min-h-[15rem]"
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <ActionsHolder
                    isVisible={hasDecryptedMessage}
                    textareaId="decrypted-message"
                />
            </div>
            <Button
                disabled={
                    privateKey.length == 0 ||
                    message.length === 0 ||
                    keySplit.length < 2 ||
                    (keySplit[1] !== undefined && keySplit[1].length < 1)
                }
                onClick={decryptographMessage}
            >
                Descriptografar texto
            </Button>
        </SectionWrapper>
    );
}
