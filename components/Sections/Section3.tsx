"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Components
import SectionWrapper from "./subcomponents/Wrapper";
import { Input, InputHeader, InputRoot } from "../ui/Input";
import { Button } from "../ui/Button";

// Icons
import EncryptedIcon from "@/public/icons/Encrypted";
import { DownloadIcon } from "@radix-ui/react-icons";

// Utils
import type { WasmFunctions, WasmMethods } from "@/lib/@types";

export default function Section3() {
    const [privateKey, setPrivateKey] = useState<string>("");
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

        setMessage(decryptedMessage);
        setPrivateKey("");
    }, [privateKey, message]);

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
                        className="text-center"
                        style={{
                            wordSpacing: "0.5rem",
                        }}
                        min={0}
                        max={100000}
                        maxLength={51}
                        value={privateKey}
                        onChange={(e) => {
                            if (
                                e.target.value.length > 0 &&
                                isNaN(parseFloat(e.target.value)) &&
                                !isFinite(parseInt(e.target.value))
                            )
                                return;

                            setPrivateKey(e.target.value);
                        }}
                    />
                </InputRoot>
            </div>
            <div className="flex w-full h-full flex-1 relative">
                <textarea
                    name="message"
                    id="message"
                    placeholder="[...]"
                    className={
                        "flex flex-1 border-2 border-dashed border-black rounded-md p-4 resize-none bg-transparent text-black placeholder-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                    className="absolute bottom-0 right-0 w-10 h-10 transition-opacity"
                    style={{
                        opacity: message.length === 0 ? 0 : 1,
                    }}
                    disabled={message.length === 0}
                    onClick={() => {
                        if (message.length === 0)
                            return console.error(
                                `Mensagem descriptografada ausente`
                            );

                        const file = new Blob([message], {
                            type: "text/plain",
                        });
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(file);
                        a.download = "decrypted-message";
                        a.click();
                    }}
                >
                    <DownloadIcon width={18} height={18} color="white" />
                </Button>
            </div>
            <Button
                disabled={privateKey.length == 0 || message.length === 0}
                onClick={decryptographMessage}
            >
                Descriptografar texto
            </Button>
        </SectionWrapper>
    );
}
