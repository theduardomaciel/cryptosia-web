"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectGroup,
    SelectScrollUp,
    SelectScrollDown,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";

export default function LanguagePicker() {
    return (
        <Select defaultValue="pt-BR" disabled>
            <SelectTrigger className="border-0">
                <SelectValue placeholder="Idioma" />
            </SelectTrigger>
            <SelectContent>
                <SelectScrollUp />
                <SelectGroup>
                    <SelectLabel>Idioma</SelectLabel>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en">Inglês</SelectItem>
                </SelectGroup>
                <SelectScrollDown />
            </SelectContent>
        </Select>
    );
}
