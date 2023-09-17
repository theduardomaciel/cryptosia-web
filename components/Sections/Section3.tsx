"use client";

import SectionWrapper from "./subcomponents/Wrapper";
import { Input, InputLabel, InputRoot } from "../ui/Input";
import { Button } from "../ui/Button";
import { DownloadIcon } from "@radix-ui/react-icons";

export default function Section3() {
    return (
        <SectionWrapper>
            <div className="flex w-full flex-col xl:flex-row items-start justify-between gap-2.5">
                <InputRoot className="w-full">
                    <InputLabel>1º número primo</InputLabel>
                    <Input placeholder="número 1" />
                </InputRoot>
                <InputRoot className="w-full">
                    <InputLabel>2º número primo</InputLabel>
                    <Input placeholder="número 2" />
                </InputRoot>
                <InputRoot className="w-full">
                    <InputLabel>Expoente</InputLabel>
                    <Input placeholder="expoente" />
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
