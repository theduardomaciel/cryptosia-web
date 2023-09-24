"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Components
import SectionWrapper from "./subcomponents/Wrapper";
import { Input, InputHeader, InputRoot } from "../ui/Input";
import { Button } from "../ui/Button";

// Icons
import { PublicKeyIcon } from "@/public/icons/Sections";

// Utils
import type { WasmFunctions, WasmMethods } from "@/lib/@types";

export default function Section2() {
    const [publicKey, setPublicKey] = useState<string>("");
    const [message, setMessage] = useState<string>("");

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
        const messagePointer = WASM.current?.stringToNewUTF8(message);
        const e = WASM.current?.stringToNewUTF8("65537");
        const n = WASM.current?.stringToNewUTF8("49163");

        const encryptedMessage = WASM.current?.ccall(
            "cryptosia_encrypt",
            "string",
            ["number", "number", "number"],
            [messagePointer, e, n]
        );

        console.log("Mensagem criptografada: " + encryptedMessage);

        /* // Convertemos a string da mensagem para um ponteiro
        const messagePointer = WASM.current?.stringToNewUTF8(message);
        console.log("Mensagem convertida em ponteiro: " + messagePointer);

        const [n, exponent] = publicKey.split(" ");
        const nPointer = WASM.current?.stringToNewUTF8(n);
        const exponentPointer = WASM.current?.stringToNewUTF8(exponent);

        if (!messagePointer || !nPointer || !exponentPointer)
            return console.error(
                "Erro ao criptografar mensagem (ausência de conversão)"
            );

        console.log("n local: " + n);
        console.log("e local: " + exponent);

        const resultPointer = WASM.current?._cryptosia_encrypt(
            messagePointer,
            exponentPointer,
            nPointer
        );

        //WASM.current?.free(convertedMessage);

        if (!resultPointer)
            return console.error(
                "Erro ao criptografar mensagem (ausência de ponteiro)"
            );

        console.log("Ponteiro da mensagem criptografada: " + resultPointer);

        const encryptedMessage = WASM.current?.UTF8ToString(resultPointer);
        console.log("Mensagem criptografada: " + encryptedMessage);

        if (!encryptedMessage)
            return console.error(
                "Erro ao criptografar mensagem (ausência de mensagem)"
            );

        setMessage(encryptedMessage);
        setPublicKey(""); */
    }, [publicKey, message]);

    return (
        <SectionWrapper>
            <div className="flex flex-col items-center justify-center w-full gap-4">
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
                        className="text-center"
                        style={{
                            wordSpacing: "0.5rem",
                        }}
                        type="text"
                        maxLength={51}
                        value={publicKey}
                        onChange={(e) => {
                            if (
                                e.target.value.length > 0 &&
                                isNaN(parseFloat(e.target.value)) &&
                                !isFinite(parseInt(e.target.value))
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
            <textarea
                name="message"
                id="message"
                cols={30}
                rows={10}
                placeholder="[insira aqui a mensagem a ser criptografada]"
                className={
                    "flex flex-1 border-2 border-dashed border-black rounded-md p-4 resize-none w-full h-full bg-transparent text-black placeholder-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button
                disabled={publicKey.length == 0 || message.length === 0}
                onClick={cryptographMessage}
            >
                Criptografar texto
            </Button>
        </SectionWrapper>
    );
}
