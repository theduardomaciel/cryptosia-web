import { Fragment } from "react";
import Link from "next/link";

// Components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Card from "@/components/Card";

// Icons
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import Star from "@/public/Star";
import Mark from "@/public/Mark";
import EncryptIcon from "@/public/Encrypt";

// - Cards
import {
    ComputerIcon,
    CryptographyIcon,
    RocketIcon,
} from "@/public/CardsIcons";
import SectionsHolder from "@/components/Sections/Holder";

export default function Home() {
    return (
        <Fragment>
            <main className="flex w-full min-h-screen flex-col items-center justify-start px-9">
                <Header />
                <div className="flex w-full flex-col items-center justify-start mt-28 gap-12">
                    <Link href={"https://google.com"} target="_blank">
                        <div className="flex cursor-pointer items-center justify-center border border-primary-01 px-6 py-2 rounded-full gap-2 hover:outline outline-offset-2 outline-primary-01">
                            <p className="text-xs text-primary-01">
                                se tiver um tempo,{" "}
                                <span className="underline">
                                    avalie o projeto
                                </span>
                                !
                            </p>
                            <Star />
                        </div>
                    </Link>
                    <h1 className="text-center w-full text-white text-[42px] font-title font-black leading-tight">
                        Proteja suas mensagens com{" "}
                        <span className="relative">
                            criptografia{" "}
                            <Mark className="absolute -bottom-3 left-0" />
                            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-2/3 h-[300px] w-[480px] rounded-full  bg-gradient-radial from-white to-transparent blur-2xl content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-yellow-100 after:via-yellow-200 after:blur-2xl after:content-[''] dark:bg-gradient-to-br dark:from-transparent dark:to-primary-01 dark:opacity-10 after:dark:from-primary-01 after:dark:via-[#f0cf7d] after:dark:opacity-40 lg:h-[360px] z-[-1] overflow-hidden" />
                        </span>{" "}
                        RSA simplificada
                    </h1>
                    <p className="text-center text-white text-[22px] font-normal font-serif">
                        Suas chaves pública e privada trabalham em harmonia,
                        protegendo informações com precisão: encripte com a
                        chave pública, desencripte com a chave privada.{" "}
                    </p>
                    <Link
                        className="w-full px-10 py-4 bg-primary-01 rounded-[50px] border border-white border-opacity-10 justify-center items-center gap-2.5 inline-flex hover:brightness-105 transition"
                        href={`/#app`}
                    >
                        <p className="text-center text-neutral-900 text-md font-bold">
                            Começar a criptografar
                        </p>
                        <div className="w-7 h-7 relative">
                            <EncryptIcon />
                        </div>
                    </Link>
                    <Link
                        className="flex flex-row items-center justify-center gap-2 group"
                        href={"https://google.com"}
                        target="_blank"
                    >
                        <span className="relative text-base group">
                            aprender mais{" "}
                            <div className="absolute w-full scale-x-0 h-[2px] transition bg-white group-hover:scale-x-100 origin-left" />{" "}
                        </span>
                        <ArrowTopRightIcon className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
                <ul className="flex flex-col w-full items-center justify-start my-14 gap-14">
                    <Card
                        icon={<ComputerIcon />}
                        title="Tudo em um só lugar"
                        description="Gere uma chave pública, criptografe e descriptografe em um só local, facilitando seu uso."
                    />
                    <Card
                        icon={<CryptographyIcon />}
                        title="Simplificadamente seguro"
                        description="Tenha a segurança de que suas mensagens estão seguras após simples e curtos passos."
                    />
                    <Card
                        icon={<RocketIcon />}
                        title="Fácil e rápido"
                        description="Utilize da criptografia RSA para codificar mensagens que necessitam de uma camada de proteção maior."
                    />
                </ul>
                <SectionsHolder />
            </main>
            <Footer />
        </Fragment>
    );
}
