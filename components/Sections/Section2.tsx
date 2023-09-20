"use client";

import SectionWrapper from "./subcomponents/Wrapper";
import { Input, InputHeader, InputLabel, InputRoot } from "../ui/Input";
import { Button } from "../ui/Button";

import { PublicKeyIcon } from "@/public/icons/Sections";

export default function Section2() {
    return (
        <SectionWrapper>
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between w-full gap-2.5">
                <InputRoot className="w-full">
                    <InputHeader
                        icon={
                            <PublicKeyIcon
                                className="w-5 h-5"
                                color={"black"}
                            />
                        }
                    >
                        Chave pública (e)
                    </InputHeader>
                    <Input placeholder="e" pattern="\d*" maxLength={10} />
                </InputRoot>
                <InputRoot className="w-full">
                    <InputLabel>Produto "n"</InputLabel>
                    <Input
                        placeholder="produto n "
                        pattern="\d*"
                        maxLength={10}
                    />
                </InputRoot>
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
            />
            <Button disabled>Criptografar texto</Button>
        </SectionWrapper>
    );
}
