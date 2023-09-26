"use client";
import clsx from "clsx";
import { useSearchParams, useRouter } from "next/navigation";

interface SectionProps {
    id: string;
    name: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export default function Section({
    id,
    name,
    icon,
    children,
    className,
}: SectionProps) {
    const router = useRouter();

    const searchParams = useSearchParams();
    const currentSection = searchParams?.get("app");
    const isExpanded =
        currentSection == id || (!currentSection && id == "public-key");

    // O uso da tag !important (! no tailwind) é necessário para sobrescrever o "xl:max-w-fit" quando houver animação, visto que já existe um valor definido para o mesmo na versão mobile

    // Gambiarra: o valor 50rem no atual "xl:!max-w-[75vw]" faz a animação funcionar sem nenhum travamento, no entanto, o valor 50rem é menor que o tamanho da tela, fazendo com que o conteúdo não ocupe todo o tamanho.

    // Para alterar o tamanho do "header" da seção, altere o valor do "xl:w-48" para o tamanho desejado, e o valor do "xl:!max-w-[12rem]" para o tamanho desejado (o equivalente ao tamanho no tailwind)
    return (
        <li
            className={clsx(
                "flex flex-col xl:flex-row group aria-expanded:hover:bg-primary-200 aria-expanded:dark:hover:bg-gray-100 bg-white-200 dark:bg-gray-200 w-full xl:max-w-fit xl:h-96 overflow-hidden ease-in-out flex-grow xl:transition-[max-width] xl:duration-700 motion-reduce:!transition-none",
                {
                    "xl:!max-w-[calc(100vw-24em-var(--wrapper)*2)]": isExpanded,
                    "xl:!max-w-[12rem]": !isExpanded,
                },
                className
            )}
            aria-expanded={!isExpanded}
        >
            {/* Header */}
            <div
                className="group-aria-expanded:cursor-pointer transition flex flex-row px-5 items-center xl:items-end justify-between xl:w-48 py-5 gap-x-3"
                onClick={
                    () => router.replace(`?app=${id}`, { scroll: false })
                    /* isExpanded
                        ? router.replace("/", { scroll: false })
                        : router.replace(`?app=${id}`, { scroll: false }) */
                }
            >
                <div className="flex flex-row flex-wrap items-center justify-start gap-x-6">
                    {icon}
                    <p className="text-text-100 font-bold font-title leading-tight text-2xl break-words overflow-ellipsis">
                        {name}
                    </p>
                </div>
            </div>
            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
                <div
                    className={clsx(
                        "pt-0 w-full xl:min-w-[calc(100vw-36rem-var(--wrapper)*2)] transition-[max-height,opacity] duration-700 bg-primary-100 dark:bg-primary-200 motion-reduce:!transition-none",
                        {
                            "max-xl:max-h-[50rem]": isExpanded,
                            "max-xl:max-h-0": !isExpanded,
                        }
                    )}
                >
                    {children && children}
                </div>
            </div>
        </li>
    );
}
