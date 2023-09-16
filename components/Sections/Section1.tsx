import { Input } from "../ui/Input";
import SectionButton from "./subcomponents/Button";

import SectionHeader from "./subcomponents/Header";
import SectionWrapper from "./subcomponents/Wrapper";

export default function Section1() {
    return (
        <SectionWrapper
            subsections={[
                {
                    title: "Números primos",
                    description:
                        "Para começar a gerar sua chave pública, digite dois números primos nos campos abaixo",
                    children: <Subsection1 />,
                },
                {
                    title: "Expoente",
                    description:
                        "Agora, precisamos de um número que será utilizado como expoente para criptografia.",
                    children: <Subsection2 />,
                },
                {
                    title: "Vòilá!",
                    description:
                        "Está tudo prontinho!\nSua chave pública já foi gerada e pode ser utilizada por qualquer outra pessoa que queira encriptar mensagens.",
                    children: <Subsection3 />,
                },
            ]}
        />
    );
}

function Subsection1() {
    return (
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
    );
}

function Subsection2() {
    return (
        <div className="flex flex-col lg:flex-row gap-2.5 w-full">
            <p>testando</p>
            <Input
                type="text"
                pattern="\d*"
                maxLength={4}
                placeholder="[insira ou selecione um expoente]"
                className="text-center"
            />
        </div>
    );
}

function Subsection3() {
    return (
        <div className="flex flex-col lg:flex-row gap-2.5 w-full">
            <p>aqui é a terceira página :)</p>
        </div>
    );
}
