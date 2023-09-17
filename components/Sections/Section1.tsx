"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { SectionDescription } from "./subcomponents/Header";
import { MultisectionsSectionWrapper } from "./subcomponents/Wrapper";

export default function Section1() {
    return (
        <MultisectionsSectionWrapper
            subsections={[
                {
                    title: "Precisamos de números primos...",
                    description:
                        "Para começar a gerar sua chave pública, digite dois números primos nos campos abaixo",
                    children: <Subsection1 />,
                    buttonDescription: "Próximo",
                },
                {
                    title: "E agora de um expoente",
                    description: [
                        "Agora, precisamos de um número que será utilizado como expoente para criptografia.",
                        "Pra facilitar sua vida, geramos alguns expoentes válidos:",
                    ],
                    children: <Subsection2 />,
                    buttonDescription: "Gerar chave pública",
                },
                {
                    title: "Vòilá!",
                    description:
                        "Está tudo prontinho!\nSua chave pública já foi gerada e pode ser utilizada por qualquer outra pessoa que queira encriptar mensagens.",
                    children: <Subsection3 />,
                    buttonDescription: "Voltar ao início",
                },
            ]}
        />
    );
}

function Subsection1() {
    return (
        <div className="flex flex-col gap-2.5 w-full">
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
    const numbers = [25, 12, 28, 42, 14, 46];

    return (
        <div className="flex flex-col gap-2.5 w-full">
            <div className="px-6 xl:px-9 py-2 xl:py-1 rounded-[5px] border border-dashed border-black justify-center items-center overflow-x-scroll gap-6 xl:gap-9 inline-flex hide_scrollbar">
                {numbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => {
                            const exponentInput = document.getElementById(
                                "exponent"
                            ) as HTMLInputElement;
                            exponentInput.value = number.toString();
                        }}
                    >
                        <p className="text-black text-lg font-black font-title hover:scale-105 transition-transform">
                            {number}
                        </p>
                    </button>
                ))}
            </div>
            <SectionDescription>
                Você pode escolher um dos que estão acima, ou inserir o seu
                próprio.
            </SectionDescription>
            <Input
                id="exponent"
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
        <div className="flex flex-col gap-2.5 w-full">
            <div className="flex flex-row items-center justify-center xl:justify-between flex-wrap bg-black rounded-md px-4 py-2">
                <p className="text-white text-lg xl:text-base font-medium font-title">
                    Utilizamos como dados:
                </p>
                <div className="flex flex-row items-center justify-center flex-wrap gap-5 text-white text-lg xl:text-base font-black font-title text-center">
                    <p>2 e 63 como números primos</p>
                    <p>54 como expoente</p>
                </div>
            </div>
            <SectionDescription>
                Você pode copiar a chave numérica ou baixar um arquivo .txt que
                a contém.
            </SectionDescription>
            <div className="flex flex-row items-center justify-between gap-2.5">
                <div className="px-6 xl:px-9 py-2 xl:py-1 rounded-[5px] border border-dashed border-black justify-center items-center overflow-x-scroll gap-6 xl:gap-9 inline-flex hide_scrollbar w-full ">
                    <p className="text-center text-black text-lg xl:text-base font-black font-title underline cursor-pointer">
                        92367834 29837423
                    </p>
                </div>
                <Button className="w-12">
                    <DownloadIcon color={"white"} width={18} height={18} />
                </Button>
            </div>
        </div>
    );
}
