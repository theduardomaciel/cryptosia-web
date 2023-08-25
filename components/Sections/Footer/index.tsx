import Link from "next/link";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Logo from "@/public/Logo";

import ThemePicker from "./subcomponents/ThemePicker";
import LanguagePicker from "./subcomponents/LanguagePicker";

export default function Footer() {
    return (
        <div className="flex w-full flex-col lg:flex-row bg-white-200 dark:bg-stone-900 justify-start lg:justify-between items-start gap-6 mt-24 px-[var(--wrapper)] py-14 font-sans">
            <div className="flex flex-col lg:justify-between items-start justify-start gap-5">
                <div className="flex flex-row max-md:w-full justify-between items-center gap-6">
                    <Logo />
                    <p className="font-title">@2023 | cryptosia</p>
                </div>

                <p className="hidden lg:flex max-w-[35vw]">
                    Projeto de Matemática Discreta desenvolvido por graduandos
                    em Ciência e Engenharia da Computação.
                </p>
            </div>

            <div className="flex flex-col items-center justify-start gap-6">
                <div className="flex flex-col items-end justify-center gap-6 w-full lg:order-2">
                    <p className="flex lg:hidden">
                        Projeto de Matemática Discreta desenvolvido por
                        graduandos em Ciência e Engenharia da Computação.
                    </p>
                    <div className="flex items-center justify-between w-full gap-2 lg:w-fit">
                        <ThemePicker />
                        <LanguagePicker />
                    </div>
                </div>

                {/* Github Link */}
                <Link
                    href={"https://github.com/theduardomaciel/cryptosia"}
                    target="_blank"
                    className="flex flex-col items-center justify-center px-4 py-2 outline-1 outline-dashed outline-black dark:outline-primary-100 w-full rounded-lg lg:order-1 hover:outline-offset-1 hover:outline-2 transition"
                >
                    <p className="text-sm font-title inline-flex gap-2.5 self-center justify-center items-center">
                        Para explorar o código fonte, acesse o repositório no
                        GitHub:{" "}
                        <GitHubLogoIcon
                            width={`1.25rem`}
                            height={`1.25rem`}
                            className="text-black dark:text-[var(--neutral)] cursor-pointer"
                        />
                    </p>
                </Link>
            </div>
        </div>
    );
}
