"use client";

import { DownloadIcon } from "@radix-ui/react-icons";

import SectionWrapper from "./subcomponents/Wrapper";
import { Input, InputHeader, InputLabel, InputRoot } from "../ui/Input";
import { Button } from "../ui/Button";

import EncryptedIcon from "@/public/icons/Encrypted";

export default function Section3() {
    return (
        <SectionWrapper>
            <div className="flex w-full flex-col xl:flex-row items-start justify-between gap-2.5">
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
                        type="password"
                    />
                </InputRoot>
            </div>
            <div className="flex w-full h-full flex-1 relative">
                <textarea
                    name="message"
                    id="message"
                    placeholder="[...]"
                    disabled
                    className={
                        "flex flex-1 border-2 border-dashed border-black rounded-md p-4 resize-none bg-transparent text-black placeholder-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                />
                <Button className="absolute bottom-0 right-0 w-10 h-10">
                    <DownloadIcon width={18} height={18} color="white" />
                </Button>
            </div>
            <Button disabled>Descriptografar texto</Button>
        </SectionWrapper>
    );
}
