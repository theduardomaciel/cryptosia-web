import Section from "./Section";

import {
    PublicKeyIcon,
    EncryptIcon,
    DecryptIcon,
} from "@/public/SectionsIcons";

export default function SectionsHolder() {
    return (
        <div
            id="app"
            className="flex flex-col items-end justify-end w-full pt-link -mt-link"
        >
            <ul className="flex flex-col items-center justify-center w-full">
                <Section
                    id="public-key"
                    className="rounded-tl-lg rounded-tr-lg border-b border-transparent border-b-gray-100"
                    icon={<PublicKeyIcon className={"w-9 h-9"} />}
                    name="Gerar chave pública"
                >
                    <div className="h-64 w-full bg-transparent"></div>
                </Section>
                <Section
                    id="encrypt"
                    className="border-b border-transparent border-b-gray-100"
                    icon={<EncryptIcon className={"w-9 h-9"} />}
                    name="Encriptar"
                >
                    <div className="h-64 w-full bg-transparent"></div>
                </Section>
                <Section
                    id="decrypt"
                    className="rounded-bl-lg rounded-br-lg"
                    icon={<DecryptIcon className={"w-9 h-9"} />}
                    name="Desencriptar"
                >
                    <div className="h-64 w-full bg-transparent"></div>
                </Section>
            </ul>
        </div>
    );
}
