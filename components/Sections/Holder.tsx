import Section from "./subcomponents/Section";

import {
    PublicKeyIcon,
    EncryptIcon,
    DecryptIcon,
} from "@/public/icons/Sections";

import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

export default function SectionsHolder() {
    return (
        <div
            id="app"
            className="flex flex-col lg:flex-row items-end justify-end w-full pt-link -mt-link"
        >
            <ul className="flex flex-col lg:flex-row items-center justify-center w-full">
                <Section
                    id="public-key"
                    className="rounded-tl-lg lg:rounded-bl-lg max-md:rounded-tr-lg max-md:border-b lg:border-r border-transparent border-r-primary-100 border-b-primary-100 lg:dark:border-r-gray-100 dark:border-b-gray-100"
                    icon={<PublicKeyIcon className={"w-9 h-9"} />}
                    name="Gerar chave pública"
                >
                    <Section1 />
                </Section>
                <Section
                    id="encrypt"
                    className="max-md:border-b lg:border-r border-transparent border-r-primary-100 border-b-primary-100 lg:dark:border-r-gray-100 dark:border-b-gray-100"
                    icon={<EncryptIcon className={"w-9 h-9"} />}
                    name="Encriptar"
                >
                    <Section2 />
                </Section>
                <Section
                    id="decrypt"
                    className="max-md:rounded-bl-lg lg:rounded-tr-lg rounded-br-lg"
                    icon={<DecryptIcon className={"w-9 h-9"} />}
                    name="Desencriptar"
                >
                    <Section3 />
                </Section>
            </ul>
        </div>
    );
}
