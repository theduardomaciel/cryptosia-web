import { Input } from "../ui/Input";
import SectionButton from "./subcomponents/Button";

import SectionHeader from "./subcomponents/Header";
import SectionWrapper from "./subcomponents/Wrapper";

export default function Section1() {
    return (
        <SectionWrapper>
            <SectionHeader
                subsections={[
                    {
                        title: "Números primos",
                        description:
                            "Para começar a gerar sua chave pública, digite dois números primos nos campos abaixo",
                    },
                    {
                        title: "Expoente",
                        description:
                            "Agora, precisamos de um número que será utilizado como expoente para criptografia.",
                    },
                    {
                        title: "Vòilá!",
                        description:
                            "Está tudo prontinho!\nSua chave pública já foi gerada e pode ser utilizada por qualquer outra pessoa que queira encriptar mensagens.",
                    },
                ]}
            />
            <Subsection1 />
        </SectionWrapper>
    );
}

function Subsection1() {
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-2.5 w-full">
                <Input
                    type="text"
                    pattern="\d*"
                    maxLength={4}
                    placeholder="1º número primo"
                    className="text-center"
                />
                <Input
                    type="text"
                    pattern="\d*"
                    maxLength={4}
                    placeholder="2º número primo"
                    className="text-center"
                />
            </div>
            <SectionButton
                query={{
                    key: "subsection",
                    value: 1,
                }}
            >
                Continuar
            </SectionButton>
        </>
    );
}
