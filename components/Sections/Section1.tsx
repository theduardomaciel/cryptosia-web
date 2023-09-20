"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

import { MultisectionsSectionWrapper } from "./subcomponents/Wrapper";
import { SectionDescription } from "./subcomponents/Header";

import { CopyIcon, DownloadIcon } from "@radix-ui/react-icons";

interface WasmFunctions {
    _n_factor: (p: number, q: number) => number;
    _publicKey_totient: (p: number, q: number) => number;
    _publicKey_e: (totient: number, initialExponent: number) => number;
    _privateKey_d: (totient: number, exponent: number) => number;
    _mdc: (a: number, b: number) => number;
}

interface WasmMethods {
    cwrap: (name: string, returnType: string, argTypes: string[]) => any;
    ccall: (
        name: string,
        returnType: string,
        argTypes: string[],
        args: any[]
    ) => any;
}

interface FormValues {
    p: number;
    q: number;
    exponent: number;
}

interface OtherValues {
    general: string;
}

type FormErrors = Partial<
    Record<keyof (FormValues & OtherValues), string | undefined>
>;

interface Data extends FormValues {
    publicKey: string;
}

const EXPONENTS_AMOUNT = 10; // quantidade de expoentes a serem gerados

export default function Section1() {
    const [errors, setErrors] = useState<FormErrors>({});
    const [exponents, setExponents] = useState<number[]>([]);
    const [data, setData] = useState<Record<keyof Data, string> | undefined>(
        undefined
    );

    const router = useRouter();
    const WASM = useRef<WasmFunctions | null>(null);

    useEffect(() => {
        console.log("Verificando WASM...");
        if (
            typeof (window as any).CRYPTOSIA === "function" &&
            WASM.current === null
        ) {
            console.log("Carregando WASM...");
            (window as any).CRYPTOSIA().then((wasm: WasmFunctions) => {
                console.log("WASM carregou!");
                WASM.current = wasm;
                // ...
            });
        }
    }, []);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!WASM.current) return;
        if (errors.p || errors.q || errors.general) return;

        const formData = new FormData(event.currentTarget);
        const unformattedData = Object.fromEntries(formData.entries());

        const values = Object.fromEntries(
            Object.entries(unformattedData).map(([key, value]) => [
                key,
                parseInt(value.toString()),
            ])
        ) as unknown as FormValues;

        const n = WASM.current?._n_factor(values.p, values.q);
        const totient = WASM.current?._publicKey_totient(values.p, values.q);

        if (WASM.current?._mdc(values.exponent, totient) !== 1) {
            setErrors((errors) => ({
                ...errors,
                exponent:
                    "O expoente deve ser coprimo ao ao produto dos números primos menos 1 (totiente). Tente outro expoente!",
            }));
            return;
        }

        //console.log(values);

        const privateKey = WASM.current?._privateKey_d(
            totient,
            values.exponent
        );

        const publicKey = `${n} ${values.exponent}`;
        const privateKeyString = `${n} ${privateKey}`;

        console.log("Public key:", publicKey);
        console.log("Private key:", privateKeyString);

        setData((data) =>
            Object.assign({}, data, { ...unformattedData, publicKey })
        );

        router.push("/?subsection=2", { scroll: false });

        event.currentTarget.reset();
    };

    return (
        <MultisectionsSectionWrapper
            id="public-key-section"
            onSubmit={onSubmit}
            subsections={[
                {
                    title: "Precisamos de números primos...",
                    description:
                        "Para começar a gerar sua chave pública, digite dois números primos nos campos abaixo",
                    children: (
                        <Subsection1 errors={errors} setErrors={setErrors} />
                    ),
                    buttonProps: {
                        children: <>Próximo</>,
                        type: "button",
                        id: "generate-exponent",
                        onVerify: () => {
                            if (!WASM.current) return false;

                            const p = parseInt(
                                document
                                    .getElementById("public-key-section")
                                    ?.querySelector<HTMLInputElement>(
                                        '[name="p"]'
                                    )?.value || ""
                            );

                            const q = parseInt(
                                document
                                    .getElementById("public-key-section")
                                    ?.querySelector<HTMLInputElement>(
                                        '[name="q"]'
                                    )?.value || ""
                            );

                            /* document.querySelector<HTMLInputElement>(
                                "#q"
                            )?.value */

                            console.log(p, q);

                            if (!p) {
                                setErrors((errors) => ({
                                    ...errors,
                                    p: "Este campo é obrigatório",
                                }));
                            }

                            if (!q) {
                                setErrors((errors) => ({
                                    ...errors,
                                    q: "Este campo é obrigatório",
                                }));
                            }

                            if (!p || !q) return false;

                            const totient = WASM.current?._publicKey_totient(
                                p!,
                                q!
                            );

                            console.log("Totiente: " + totient);

                            if (totient == -1) {
                                setErrors((errors) => ({
                                    ...errors,
                                    p: "O número inserido é muito grande para nossa capacidade :(",
                                }));
                            }

                            if (totient == -2) {
                                setErrors((errors) => ({
                                    ...errors,
                                    general:
                                        "A multiplicação dos números primos é muito pequena, portanto não é possível gerar uma chave pública segura com eles. Tente valores maiores!",
                                }));
                            }

                            if (totient == -3) {
                                setErrors((errors) => ({
                                    ...errors,
                                    p: "O número inserido não é primo",
                                }));
                            }

                            if (totient == -4) {
                                setErrors((errors) => ({
                                    ...errors,
                                    q: "O número inserido não é primo",
                                }));
                            }

                            if (totient == -5) {
                                setErrors((errors) => ({
                                    ...errors,
                                    p: "O número inserido não é primo",
                                }));
                                setErrors((errors) => ({
                                    ...errors,
                                    q: "O número inserido não é primo",
                                }));
                            }

                            if (totient < 0) return false;

                            /* const exponents = Array.from(
                                { length: EXPONENTS_AMOUNT },
                                (_, i) =>
                                    WASM.current?._publicKey_e(
                                        totient,
                                        i + 1
                                    ) as number
                            ); */

                            let exponents: number[] = [];
                            for (let i = 0; i < EXPONENTS_AMOUNT; i++) {
                                const exponent = WASM.current?._publicKey_e(
                                    totient,
                                    exponents[i - 1] || -1
                                ) as number;
                                exponents.push(exponent);
                            }
                            console.log(exponents);

                            setExponents(exponents);

                            return true;
                        },
                    },
                },
                {
                    title: "E agora precisamos de um expoente",
                    description: [
                        "Este expoente será utilizado como expoente para criptografia.",
                        "Pra facilitar sua vida, geramos alguns expoentes válidos:",
                    ],
                    children: (
                        <Subsection2
                            errors={errors}
                            setErrors={setErrors}
                            exponents={exponents}
                        />
                    ),
                    buttonProps: {
                        children: <>Gerar chave pública</>,
                    },
                },
                {
                    title: "Vòilá!",
                    description:
                        "Está tudo prontinho! Sua chave pública já foi gerada e pode ser utilizada.",
                    children: <Subsection3 data={data} />,
                    buttonProps: {
                        children: <>Voltar para o início</>,
                        type: "button",
                    },
                },
            ]}
        />
    );
}

interface ErrorsProps {
    errors: FormErrors;
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

function Subsection1({ errors, setErrors }: ErrorsProps) {
    return (
        <div className="flex flex-col gap-2.5 w-full h-full items-center justify-center">
            <Input
                type="text"
                pattern="\d*"
                maxLength={10}
                placeholder="1º número primo (p)"
                className={cn(
                    "text-center",
                    errors?.p &&
                        "border-red-500 outline outline-red-500 outline-offset-1 outline-1"
                )}
                onChange={() =>
                    (errors.p || errors.general) &&
                    setErrors((errors) => ({
                        ...errors,
                        p: undefined,
                        general: undefined,
                    }))
                }
                name="p"
                id="p"
            />
            {errors?.p && (
                <p className="text-red-500 text-sm -mt-2 w-full text-right">
                    {errors.p}
                </p>
            )}
            <Input
                type="text"
                pattern="\d*"
                maxLength={10}
                placeholder="2º número primo (q)"
                className={cn(
                    "text-center",
                    errors?.q &&
                        "border-red-500 outline outline-red-500 outline-offset-1 outline-1"
                )}
                onChange={() =>
                    (errors.q || errors.general) &&
                    setErrors((errors) => ({
                        ...errors,
                        q: undefined,
                        general: undefined,
                    }))
                }
                name={"q"}
                id="q"
            />
            {errors?.q && (
                <p className="text-red-500 text-sm -mt-2 w-full text-right">
                    {errors.q}
                </p>
            )}

            {errors?.general && (
                <p className="text-red-500 text-sm w-full text-center font-semibold whitespace-pre-line">
                    {errors.general}
                </p>
            )}
        </div>
    );
}

function Subsection2({
    errors,
    setErrors,
    exponents,
}: ErrorsProps & {
    exponents: number[];
}) {
    const [exponent, setExponent] = useState<string>("");

    return (
        <div className="flex flex-col gap-2.5 w-full h-full items-center justify-center">
            <div className="px-6 xl:px-9 py-2 xl:py-1 rounded-[5px] border border-dashed border-black justify-center items-center overflow-x-scroll gap-6 xl:gap-9 inline-flex hide_scrollbar w-full">
                {exponents.map((exponent) => (
                    <button
                        key={exponent}
                        type="button"
                        onClick={() => setExponent(exponent.toString())}
                    >
                        <p className="text-black text-lg font-black font-title hover:scale-105 transition-transform">
                            {exponent}
                        </p>
                    </button>
                ))}
            </div>
            <SectionDescription>
                Você pode escolher um acima, ou inserir o seu próprio.
            </SectionDescription>
            <Input
                id="exponent"
                type="text"
                pattern="\d*"
                maxLength={4}
                placeholder="[insira ou selecione um expoente]"
                className={cn(
                    "text-center",
                    errors?.exponent &&
                        "border-red-500 outline outline-red-500 outline-offset-1 outline-1"
                )}
                tabIndex={-1}
                name="exponent"
                value={exponent}
                onChange={(event) => {
                    setExponent(event.target.value);
                    if (errors?.exponent) {
                        setErrors((errors) => ({
                            ...errors,
                            exponent: undefined,
                        }));
                    }
                }}
            />
            {errors?.exponent && (
                <p className="text-red-500 text-sm w-full text-center font-semibold">
                    {errors.exponent}
                </p>
            )}
        </div>
    );
}

function Subsection3({
    data,
}: {
    data: Record<keyof Data, string> | undefined | undefined;
}) {
    return (
        <div className="flex flex-col gap-2.5 w-full h-full items-center justify-center">
            <div className="flex flex-row items-center justify-center xl:justify-between flex-wrap gap-5 bg-black rounded-md px-4 py-3 w-full">
                <p className="text-white text-lg xl:text-base font-medium font-title leading-none">
                    Utilizamos como dados:
                </p>
                <div className="flex flex-row items-center justify-center flex-wrap max-sm:gap-1 gap-5 text-white text-base font-black font-title text-center leading-none">
                    <p>
                        {data?.p} e {data?.q} como números primos
                    </p>
                    <p>{data?.exponent} como expoente</p>
                </div>
            </div>
            <SectionDescription>
                Você pode copiar a chave ou baixar um arquivo .txt
            </SectionDescription>
            <div className="flex flex-row items-center justify-between gap-2.5 w-full">
                <button
                    className="px-6 xl:px-9 py-1 rounded-[5px] justify-center items-center overflow-x-scroll gap-6 xl:gap-9 inline-flex hide_scrollbar w-full relative outline-dashed outline-black outline-1 hover:outline-offset-1 hover:outline-2 group/public_key"
                    type="button"
                    onClick={() => {
                        const publicKeyInput = document.getElementById(
                            "public-key"
                        ) as HTMLInputElement;
                        publicKeyInput.select();
                        navigator.clipboard.writeText(publicKeyInput.value);

                        const tempText = publicKeyInput.value;
                        publicKeyInput.value = "Chave pública copiada!";
                        publicKeyInput.style.cursor = "default";
                        setTimeout(() => {
                            publicKeyInput.value = tempText;
                            publicKeyInput.style.cursor = "pointer";
                        }, 1000);
                    }}
                >
                    <input
                        id="public-key"
                        className="text-center text-black text-lg xl:text-base font-black font-title hover:underline cursor-pointer bg-transparent ring-0 outline-none border-none w-full"
                        defaultValue={data?.publicKey}
                        tabIndex={-1}
                        readOnly
                    />
                    <CopyIcon
                        className="absolute right-4 top-1/2 -translate-y-1/2 group-hover/public_key:scale-110 transition-transform duration-100"
                        color="black"
                        width={16}
                        height={16}
                    />
                </button>
                <Button className="w-12 h-full">
                    <DownloadIcon
                        color={"white"}
                        width={18}
                        height={18}
                        type="button"
                        onClick={() => {
                            const file = new Blob([data?.publicKey!], {
                                type: "text/plain",
                            });
                            const a = document.createElement("a");
                            a.href = URL.createObjectURL(file);
                            a.download = "public-key.txt";
                            a.click();
                        }}
                    />
                </Button>
            </div>
        </div>
    );
}

/* 
    var a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
*/
