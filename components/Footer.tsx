import Link from "next/link";

import Logo from "@/public/Logo";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
    return (
        <div className="flex w-full flex-col bg-stone-900 justify-start items-start gap-6 mt-24 px-9 py-12 font-sans">
            <div className="flex flex-row w-full justify-between items-center gap-2.5">
                <Logo />
                <p className="font-title">@2023 | cryptosia</p>
            </div>
            <p className="">
                Projeto de Matemática Discreta desenvolvido por graduandos em
                Ciência e Engenharia da Computação.
            </p>

            <div className="flex items-center justify-center px-4 py-2 border border-dashed border-primary-200 w-full rounded-lg">
                <p className="text-sm font-title inline-flex gap-2.5 self-center justify-center items-center">
                    Para explorar o código fonte, acesse o repositório no
                    GitHub:{" "}
                    <Link
                        href={"https://github.com/theduardomaciel/cryptosia"}
                        target="_blank"
                    >
                        <GitHubLogoIcon
                            width={`1.25rem`}
                            height={`1.25rem`}
                            className="text-black dark:text-white cursor-pointer"
                        />
                    </Link>
                </p>
            </div>
        </div>
    );
}
