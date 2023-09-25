"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Components
import SectionWrapper from "./subcomponents/Wrapper";
import { Input, InputHeader, InputRoot } from "../ui/Input";
import { Button } from "../ui/Button";

// Icons
import { PublicKeyIcon } from "@/public/icons/Sections";
import { DownloadIcon } from "@radix-ui/react-icons";

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

        setMessage(encryptedMessage);
        setPublicKey("");

        const downloadButton = document.getElementById(
            "download-encrypted-message"
        );

        if (downloadButton) {
            downloadButton.style.display = "flex";
        }
    }, [publicKey, message]);

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
            <div className="flex w-full flex-1 relative">
                <textarea
                    name="message"
                    id="message"
                    placeholder="[insira aqui a mensagem a ser criptografada]"
                    className={
                        "flex flex-1 border-2 border-dashed border-black rounded-md p-4 resize-none w-full h-full bg-transparent text-black placeholder-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                    id="download-encrypted-message"
                    className="absolute bottom-0 right-0 w-10 h-10"
                    onClick={() => {
                        if (message.length === 0)
                            return console.error(
                                `Mensagem criptografada ausente`
                            );

                        const file = new Blob([message], {
                            type: "text/plain",
                        });
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(file);
                        a.download = "encrypted-message";
                        a.click();
                    }}
                >
                    <DownloadIcon width={18} height={18} color="white" />
                </Button>
            </div>
            <Button
                disabled={publicKey.length == 0 || message.length === 0}
                onClick={cryptographMessage}
            >
                Criptografar texto
            </Button>
        </SectionWrapper>
    );
}
